import { Link, useParams } from 'react-router-dom'
import Markdown from '../components/Markdown.jsx'
import NotFound from './NotFound.jsx'
import usePageTitle from '../components/usePageTitle.js'
import { formatDate, getNeighbours, getReflection } from '../lib/reflections.js'

function NeighbourLink({ reflection, direction, divided }) {
  if (!reflection) return <div className="hidden sm:block" />

  const isPrevious = direction === 'previous'

  return (
    <Link
      to={`/reflections/${reflection.slug}`}
      className={`group flex flex-col gap-2 py-6 sm:py-8 ${
        isPrevious ? 'sm:pr-8' : 'sm:items-end sm:border-l sm:border-rule sm:pl-8'
      } ${divided ? 'border-t border-rule-soft sm:border-t-0' : ''}`}
    >
      <span className="label text-paper-faint transition-colors duration-200 group-hover:text-stamp">
        {isPrevious ? '← Previous' : 'Next →'}
        <span className="ml-2 text-rule">/</span>
        <span className="ml-2">
          {reflection.term && `${reflection.term} `}
          {String(reflection.number).padStart(2, '0')}
        </span>
      </span>

      <span
        className={`font-display text-[1.375rem] leading-snug text-paper sm:text-[1.5rem] ${
          isPrevious ? '' : 'sm:text-right'
        }`}
      >
        {reflection.title}
      </span>
    </Link>
  )
}

export default function Reflection() {
  const { slug } = useParams()
  const reflection = getReflection(slug)

  // undefined lets NotFound own the title when the slug doesn't resolve
  usePageTitle(reflection?.title)

  if (!reflection) return <NotFound />

  const { number, term, title, date, course, tags, body, readingTime } = reflection
  const { previous, next } = getNeighbours(slug)
  const hasNeighbours = Boolean(previous || next)

  return (
    <div className="mx-auto w-full max-w-[42rem] px-5 py-8 sm:px-8 sm:py-14">
      <Link
        to="/"
        className="label inline-block text-paper-faint transition-colors duration-200 hover:text-stamp"
      >
        ← Index
      </Link>

      <article className="mt-14 sm:mt-20">
        <header>
          <p className="label text-stamp">
            {term && `${term} · `}Reflection {String(number).padStart(2, '0')}
            {course && (
              <>
                <span className="mx-2 text-rule">/</span>
                <span className="text-paper-faint">{course}</span>
              </>
            )}
          </p>

          <h1 className="mt-5 text-[2.375rem] leading-[1.05] tracking-[-0.01em] text-paper sm:text-[3.125rem]">
            {title}
          </h1>

          <div className="label mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-rule pt-5 text-paper-faint">
            <span>{formatDate(date)}</span>
            <span className="text-rule">·</span>
            <span>{readingTime} min read</span>

            {tags.map((tag) => (
              <span key={tag} className="flex items-center gap-x-2">
                <span className="text-rule">·</span>
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="mt-12">
          <Markdown>{body}</Markdown>
        </div>

        {/* Printer's end mark */}
        <div className="mt-16 h-[9px] w-[9px] bg-stamp" aria-hidden="true" />
      </article>

      {hasNeighbours && (
        <nav
          aria-label="Reflection navigation"
          className="mt-16 grid grid-cols-1 border-t border-rule sm:mt-20 sm:grid-cols-2"
        >
          <NeighbourLink reflection={previous} direction="previous" />
          <NeighbourLink
            reflection={next}
            direction="next"
            divided={Boolean(previous)}
          />
        </nav>
      )}

      <footer className="mt-14 border-t border-rule pt-6">
        <Link
          to="/"
          className="label text-paper-faint transition-colors duration-200 hover:text-stamp"
        >
          ← Back to the index
        </Link>
      </footer>
    </div>
  )
}
