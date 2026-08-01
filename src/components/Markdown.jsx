import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const components = {
  h2: ({ children, ...props }) => (
    <h2
      {...props}
      className="mt-14 mb-4 border-t border-rule pt-7 text-[1.75rem] leading-tight text-paper sm:text-[2rem]"
    >
      {children}
    </h2>
  ),

  h3: ({ children, ...props }) => (
    <h3
      {...props}
      className="mt-10 mb-3 text-[1.3125rem] leading-snug text-paper sm:text-[1.4375rem]"
    >
      {children}
    </h3>
  ),

  h4: ({ children, ...props }) => (
    <h4
      {...props}
      className="label mt-9 mb-3 text-paper-dim"
    >
      {children}
    </h4>
  ),

  p: ({ children, ...props }) => (
    <p {...props} className="my-6">
      {children}
    </p>
  ),

  strong: ({ children, ...props }) => (
    <strong {...props} className="font-semibold text-paper">
      {children}
    </strong>
  ),

  em: ({ children, ...props }) => (
    <em {...props} className="italic">
      {children}
    </em>
  ),

  blockquote: ({ children, ...props }) => (
    <blockquote
      {...props}
      className="my-9 border-l-2 border-stamp py-1 pl-6 text-[1.1875rem] leading-relaxed text-paper italic sm:pl-8"
    >
      {children}
    </blockquote>
  ),

  code: ({ className, children, ...props }) => {
    const isFenced = /language-/.test(className ?? '')

    if (isFenced) {
      return (
        <code {...props} className="font-mono text-[0.875rem] leading-relaxed">
          {children}
        </code>
      )
    }

    return (
      <code
        {...props}
        className="md-inline-code rounded-[3px] border border-rule bg-ink-raised px-[0.4em] py-[0.12em] font-mono text-[0.85em] text-stamp-lift"
      >
        {children}
      </code>
    )
  },

  pre: ({ children, ...props }) => (
    <pre
      {...props}
      className="my-8 overflow-x-auto rounded-[3px] border border-rule bg-ink-raised px-5 py-4 text-paper"
    >
      {children}
    </pre>
  ),

  // A printed rule, not a browser default: a short hatch break in the accent.
  hr: () => (
    <div className="my-12 flex items-center justify-center gap-2" role="separator">
      <span className="h-px w-16 bg-rule" />
      <span className="h-[3px] w-[3px] rotate-45 bg-stamp" />
      <span className="h-px w-16 bg-rule" />
    </div>
  ),

  a: ({ children, ...props }) => (
    <a {...props} target="_blank" rel="noreferrer noopener">
      {children}
    </a>
  ),

  table: ({ children, ...props }) => (
    <div className="my-8 overflow-x-auto">
      <table {...props} className="w-full border-collapse text-[0.9375rem]">
        {children}
      </table>
    </div>
  ),

  th: ({ children, ...props }) => (
    <th
      {...props}
      className="label border-b border-rule px-3 py-2.5 text-left text-paper-dim"
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }) => (
    <td {...props} className="border-b border-rule-soft px-3 py-2.5 align-top">
      {children}
    </td>
  ),
}

export default function Markdown({ children }) {
  return (
    <div className="md">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
