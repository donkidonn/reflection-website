import { Link } from 'react-router-dom'
import SecurityTint from '../components/SecurityTint.jsx'
import usePageTitle from '../components/usePageTitle.js'

export default function NotFound() {
  usePageTitle('Not found')

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-4 py-16 sm:px-8">
      <div className="relative overflow-hidden border border-rule">
        <div className="absolute inset-0" aria-hidden="true">
          <SecurityTint id="tint-404" />
        </div>

        {/* An empty window — nothing behind it to read */}
        <div className="relative px-5 py-14 sm:px-12 sm:py-20">
          <div className="max-w-md rounded-[3px] border border-rule bg-ink px-6 py-8 sm:px-10 sm:py-10">
            <p className="label text-stamp">404</p>

            <h1 className="mt-4 text-[2.25rem] leading-tight text-paper sm:text-[2.75rem]">
              No entry here
            </h1>

            <p className="mt-4 leading-relaxed text-paper-dim">
              That address doesn&rsquo;t match a reflection in the archive. Check
              the link, or start from the index.
            </p>

            <Link
              to="/"
              className="label mt-8 inline-block border-b border-stamp pb-1 text-paper transition-colors duration-200 hover:text-stamp"
            >
              ← Go to the index
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
