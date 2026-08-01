import { useEffect } from 'react'

const SITE = 'Donald Lee Novo — Reflection Archive'

/**
 * `null` sets the site title, a string sets a page title, and `undefined`
 * stands down entirely — a parent effect runs after its child's, so a page
 * that delegates to another page must not claim the title itself.
 */
export default function usePageTitle(title) {
  useEffect(() => {
    if (title === undefined) return
    document.title = title === null ? SITE : `${title} — Reflection Archive`
  }, [title])
}
