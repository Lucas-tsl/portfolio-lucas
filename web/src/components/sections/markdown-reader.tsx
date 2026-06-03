export function MarkdownReader({ title, summary, body, metadata }: { title: string; summary?: string; body: string; metadata: Array<[string, string | string[] | undefined]> }) {
  return (
    <article className="mt-10 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      {metadata.length ? (
        <div className="flex flex-wrap gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
          {metadata.map(([label, value]) =>
            value ? (
              <span key={label} className="rounded-full bg-zinc-100 px-3 py-1 dark:bg-zinc-800">
                <span className="font-semibold">{label}: </span>
                {Array.isArray(value) ? value.join(", ") : value}
              </span>
            ) : null,
          )}
        </div>
      ) : null}
      <h2 className="mt-4 text-2xl font-bold text-zinc-950 dark:text-zinc-50">{title}</h2>
      {summary ? <p className="mt-3 text-lg leading-7 text-zinc-600 dark:text-zinc-400">{summary}</p> : null}
      <div className="mt-6 whitespace-pre-line rounded-2xl bg-zinc-50 p-5 text-sm leading-7 text-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
        {body}
      </div>
    </article>
  );
}
