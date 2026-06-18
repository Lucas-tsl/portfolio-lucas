import { marked, Renderer } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js/lib/common";
import sanitizeHtml from "sanitize-html";

// Inject id attributes on h2/h3 so the TOC can link to them
const renderer = new Renderer();
renderer.heading = function ({ text, depth }) {
  if (depth === 2 || depth === 3) {
    const id = text
      .replace(/<[^>]+>/g, "")
      .replace(/[*_`~]/g, "")
      .trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    return `<h${depth} id="${id}">${text}</h${depth}>\n`;
  }
  return `<h${depth}>${text}</h${depth}>\n`;
};

marked.use(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
);

marked.setOptions({ gfm: true, breaks: true });

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    ...sanitizeHtml.defaults.allowedTags,
    "img", "h1", "h2", "h3", "h4", "h5", "h6",
    "details", "summary", "mark", "del", "ins",
  ],
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    a: ["href", "name", "target", "rel"],
    img: ["src", "alt", "title", "width", "height", "loading"],
    code: ["class"],
    pre: ["class"],
    "*": ["id", "class"],
  },
  allowedSchemes: ["https", "http", "mailto"],
};

function renderMarkdown(body: string): string {
  const raw = marked.parse(body, { renderer }) as string;
  return sanitizeHtml(raw, SANITIZE_OPTIONS);
}

export function MarkdownReader({
  title,
  summary,
  body,
  metadata,
}: {
  title: string;
  summary?: string;
  body: string;
  metadata: Array<[string, string | string[] | undefined]>;
}) {
  const htmlBody = renderMarkdown(body);

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
      {title ? <h2 className="mt-4 text-2xl font-bold text-zinc-950 dark:text-zinc-50">{title}</h2> : null}
      {summary ? <p className="mt-3 text-lg leading-7 text-zinc-600 dark:text-zinc-400">{summary}</p> : null}
      <div
        className="markdown-body mt-6"
        dangerouslySetInnerHTML={{ __html: htmlBody }}
      />
    </article>
  );
}
