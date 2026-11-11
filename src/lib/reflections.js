// Every .md file in src/content/reflections is picked up at build time.
// Adding a reflection means adding one file — nothing here needs to change.
const files = import.meta.glob('../content/reflections/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const WORDS_PER_MINUTE = 200

/**
 * Strip one layer of matching quotes from a scalar value.
 */
function unquote(value) {
  const trimmed = value.trim()
  if (trimmed.length >= 2) {
    const first = trimmed[0]
    const last = trimmed[trimmed.length - 1]
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
      return trimmed.slice(1, -1)
    }
  }
  return trimmed
}

/**
 * Parse an inline array like ["a", "b"] or [a, b] into a string array.
 * Splits on commas that sit outside of quotes so values may contain commas.
 */
function parseArray(value) {
  const inner = value.trim().slice(1, -1)
  if (!inner.trim()) return []

  const items = []
  let current = ''
  let quote = null

  for (const char of inner) {
    if (quote) {
      if (char === quote) quote = null
      else current += char
    } else if (char === '"' || char === "'") {
      quote = char
    } else if (char === ',') {
      items.push(current)
      current = ''
    } else {
      current += char
    }
  }
  items.push(current)

  return items.map((item) => item.trim()).filter(Boolean)
}

/**
 * Hand-rolled frontmatter parser. Deliberately small: gray-matter drags a
 * Node Buffer polyfill into the bundle and falls over in the browser.
 * Handles `key: value` strings and `key: [a, b]` arrays.
 */
export function parseFrontmatter(raw) {
  const source = raw.replace(/\r\n/g, '\n')
  const match = source.match(/^---\n([\s\S]*?)\n---\n?/)

  if (!match) {
    return { data: {}, body: source.trim() }
  }

  const data = {}
  for (const line of match[1].split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const separator = trimmed.indexOf(':')
    if (separator === -1) continue

    const key = trimmed.slice(0, separator).trim()
    const rawValue = trimmed.slice(separator + 1).trim()
    if (!key) continue

    data[key] =
      rawValue.startsWith('[') && rawValue.endsWith(']')
        ? parseArray(rawValue)
        : unquote(rawValue)
  }

  return { data, body: source.slice(match[0].length).trim() }
}

/**
 * Reading time in whole minutes, floored at 1.
 */
export function readingTime(body) {
  const words = body.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

/**
 * Entry number from the filename prefix — 03-whatever.md is entry 3, and
 * final-02-whatever.md is entry 2 of its term. Numbering restarts per term.
 * Falls back to chronological position when a file isn't numbered.
 */
const PREFIX = /^(?:[a-z]+[-_])?(\d+)[-_]?/i

function numberFromPath(path) {
  const name = path.split('/').pop() ?? ''
  const match = name.match(PREFIX)
  return match ? Number(match[1]) : null
}

function slugFromPath(path) {
  return (path.split('/').pop() ?? '').replace(/\.md$/, '').replace(PREFIX, '')
}

/**
 * Sort key that keeps ordering stable when two reflections share a date.
 */
function chronological(a, b) {
  if (a.date !== b.date) return a.date < b.date ? -1 : 1
  return (a.number ?? 0) - (b.number ?? 0)
}

/**
 * Reflections grouped by term, newest term first. Entries without a term
 * share one unnamed group.
 */
export function groupByTerm(entries) {
  const groups = []
  for (const entry of entries) {
    let group = groups.find((g) => g.term === entry.term)
    if (!group) {
      group = { term: entry.term, entries: [] }
      groups.push(group)
    }
    group.entries.push(entry)
  }
  return groups
}

function load() {
  const entries = Object.entries(files).map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw)

    return {
      ...data,
      path,
      slug: data.slug || slugFromPath(path),
      title: data.title || slugFromPath(path),
      date: data.date || '',
      term: data.term || '',
      course: data.course || '',
      tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
      summary: data.summary || '',
      number: numberFromPath(path),
      body,
      readingTime: readingTime(body),
    }
  })

  // Oldest first, so unnumbered files can inherit their position in their term…
  entries.sort(chronological)
  const counts = {}
  entries.forEach((entry) => {
    counts[entry.term] = (counts[entry.term] ?? 0) + 1
    if (entry.number === null) entry.number = counts[entry.term]
  })

  // …then newest first for display.
  return entries.reverse()
}

/** All reflections, newest first. */
export const reflections = load()

export function getReflection(slug) {
  return reflections.find((entry) => entry.slug === slug) ?? null
}

/**
 * Chronological neighbours: `previous` is the earlier reflection,
 * `next` is the later one.
 */
export function getNeighbours(slug) {
  const index = reflections.findIndex((entry) => entry.slug === slug)
  if (index === -1) return { previous: null, next: null }

  return {
    previous: reflections[index + 1] ?? null,
    next: reflections[index - 1] ?? null,
  }
}

/**
 * "2026-08-01" formatted without letting the browser's timezone shift the day.
 */
export function formatDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value ?? '')
  if (!match) return value ?? ''

  const [, year, month, day] = match
  return new Date(Number(year), Number(month) - 1, Number(day)).toLocaleDateString(
    'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' },
  )
}
