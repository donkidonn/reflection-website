import { Link } from 'react-router-dom'
import SecurityTint from '../components/SecurityTint.jsx'
import usePageTitle from '../components/usePageTitle.js'
import { formatDate, groupByTerm, reflections } from '../lib/reflections.js'

const COURSE = reflections[0]?.course ?? 'Information Assurance and Security'

function Masthead() {
  return (
    <header className="relative overflow-hidden border border-rule bg-ink">
      <div className="absolute inset-0" aria-hidden="true">
        <SecurityTint id="tint-masthead" />
      </div>

      {/* The address window: the one place the contents show through */}
      <div className="relative px-5 pt-14 pb-9 sm:px-10 sm:pt-20 sm:pb-14 lg:px-14 lg:pt-28 lg:pb-20">
        <div className="max-w-2xl rounded-[3px] border border-rule bg-ink px-6 py-8 sm:px-10 sm:py-12">
          <p className="label text-stamp">Reflection archive</p>

          <h1 className="mt-5 text-[2.75rem] leading-[0.95] tracking-[-0.01em] text-paper sm:text-[4rem] lg:text-[4.75rem]">
            Donald Lee
            <br />
            Novo
          </h1>

          <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-paper-dim">
            Notes I keep while working through {COURSE}. One entry per topic,
            written after the material has had time to settle.
          </p>
        </div>
      </div>
    </header>
  )
}

function Entry({ reflection, index }) {
  const { number, title, slug, date, tags, summary, readingTime } = reflection

  return (
    <li
      className="rise border-b border-rule-soft"
      style={{ animationDelay: `${80 + index * 70}ms` }}
    >
      <Link
        to={`/reflections/${slug}`}
        className="group grid grid-cols-[2.25rem_1fr] gap-x-4 py-8 sm:grid-cols-[4rem_1fr] sm:gap-x-6 sm:py-10"
      >
        <span className="pt-1 font-mono text-sm font-medium text-paper-faint transition-colors duration-200 group-hover:text-stamp">
          {String(number).padStart(2, '0')}
        </span>

        <div className="border-l border-rule pl-5 transition-all duration-200 group-hover:border-stamp sm:pl-8 sm:group-hover:translate-x-1">
          <div className="flex flex-col gap-x-10 gap-y-3 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="max-w-xl text-[1.5rem] leading-tight text-paper sm:text-[1.875rem]">
              {title}
            </h2>

            <p className="label shrink-0 text-paper-faint sm:text-right">
              {formatDate(date)}
              <span className="mx-2 text-rule">/</span>
              {readingTime} min
            </p>
          </div>

          <p className="mt-3 max-w-xl leading-relaxed text-paper-dim">{summary}</p>

          {tags.length > 0 && (
            <ul className="label mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-paper-faint">
              {tags.map((tag, i) => (
                <li key={tag} className="flex items-center gap-x-2">
                  {i > 0 && <span className="text-rule">·</span>}
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Link>
    </li>
  )
}

export default function Home() {
  usePageTitle(null)

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-8 sm:py-14">
      <Masthead />

      <main className="mt-16 sm:mt-24">
        <div className="label flex items-baseline justify-between border-b border-rule pb-4 text-paper-faint">
          <h2 className="label text-paper-dim">
            Entries
            <span className="ml-2 text-stamp">
              {String(reflections.length).padStart(2, '0')}
            </span>
          </h2>
          <p className="hidden sm:block">{COURSE}</p>
        </div>

        {reflections.length === 0 ? (
          <p className="py-16 text-paper-dim">
            No reflections yet. Add a markdown file to{' '}
            <code className="font-mono text-sm text-stamp-lift">
              src/content/reflections/
            </code>{' '}
            and it will appear here.
          </p>
        ) : (
          groupByTerm(reflections).map(({ term, entries }) => (
            <section key={term || 'untermed'}>
              {term && (
                <h3 className="label mt-10 flex items-baseline gap-x-2 border-b border-rule-soft pb-3 text-stamp first:mt-6">
                  {term} term
                  <span className="text-paper-faint">
                    {String(entries.length).padStart(2, '0')}
                  </span>
                </h3>
              )}
              <ul>
                {entries.map((reflection) => (
                  <Entry
                    key={reflection.slug}
                    reflection={reflection}
                    index={reflections.indexOf(reflection)}
                  />
                ))}
              </ul>
            </section>
          ))
        )}
      </main>

      <footer className="label mt-20 border-t border-rule pt-6 text-paper-faint sm:mt-28">
        Donald Lee Novo
        <span className="mx-2 text-rule">/</span>
        <span className="sm:hidden">{COURSE}</span>
        <span className="hidden sm:inline">Reflection archive</span>
      </footer>
    </div>
  )
}
