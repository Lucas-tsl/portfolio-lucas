/* Render Notion blocks (splitbee API format) to safe HTML */

type RichTextToken = [string, Array<[string, string?]>?];
type NotionBlock = {
  value?: {
    value?: {
      type?: string;
      properties?: {
        title?: RichTextToken[];
        language?: RichTextToken[];
        caption?: RichTextToken[];
        checked?: RichTextToken[];
        source?: RichTextToken[];
      };
      content?: string[];
      format?: {
        display_source?: string;
        block_width?: number;
        block_color?: string;
        page_icon?: string;
      };
    };
  };
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderRichText(tokens: RichTextToken[] = []): string {
  return tokens
    .map(([text, decorations = []]) => {
      let html = escapeHtml(text);
      for (const [type, value] of decorations) {
        if (type === "b") html = `<strong>${html}</strong>`;
        else if (type === "i") html = `<em>${html}</em>`;
        else if (type === "s") html = `<del>${html}</del>`;
        else if (type === "c") html = `<code>${html}</code>`;
        else if (type === "a" && value) html = `<a href="${escapeHtml(value)}" target="_blank" rel="noreferrer">${html}</a>`;
        else if (type === "_") html = `<span style="text-decoration:underline">${html}</span>`;
      }
      return html;
    })
    .join("");
}

export interface RenderedNotion {
  title: string;
  html: string;
}

export function renderNotionBlocks(
  data: Record<string, NotionBlock>,
  rootId: string
): RenderedNotion {
  const normalizeId = (id: string) => id.replace(/-/g, "");

  const rootBlock = data[normalizeId(rootId)]?.value?.value ?? data[rootId]?.value?.value;
  const title = renderRichText(rootBlock?.properties?.title ?? [["Sans titre"]]);
  const childIds: string[] = rootBlock?.content ?? [];

  const lines: string[] = [];
  let listBuffer: { type: "ul" | "ol"; items: string[] } | null = null;

  function flushList() {
    if (!listBuffer) return;
    const tag = listBuffer.type;
    lines.push(`<${tag} class="notion-list">${listBuffer.items.map((i) => `<li>${i}</li>`).join("")}</${tag}>`);
    listBuffer = null;
  }

  for (const rawId of childIds) {
    const block = data[normalizeId(rawId)]?.value?.value ?? data[rawId]?.value?.value;
    if (!block) continue;

    const type = block.type ?? "";
    const props = block.properties ?? {};
    const text = renderRichText(props.title);
    const color = block.format?.block_color;
    const colorClass = color ? ` notion-color-${color}` : "";

    if (type === "bulleted_list") {
      if (listBuffer?.type !== "ul") { flushList(); listBuffer = { type: "ul", items: [] }; }
      listBuffer.items.push(text);
      continue;
    }
    if (type === "numbered_list") {
      if (listBuffer?.type !== "ol") { flushList(); listBuffer = { type: "ol", items: [] }; }
      listBuffer.items.push(text);
      continue;
    }
    flushList();

    switch (type) {
      case "header":
        lines.push(`<h2 class="notion-h2${colorClass}">${text}</h2>`);
        break;
      case "sub_header":
        lines.push(`<h3 class="notion-h3${colorClass}">${text}</h3>`);
        break;
      case "sub_sub_header":
        lines.push(`<h4 class="notion-h4${colorClass}">${text}</h4>`);
        break;
      case "text":
        if (text.trim()) lines.push(`<p class="notion-p${colorClass}">${text}</p>`);
        else lines.push(`<div class="notion-spacer"></div>`);
        break;
      case "quote":
        lines.push(`<blockquote class="notion-quote">${text}</blockquote>`);
        break;
      case "code": {
        const lang = props.language?.[0]?.[0]?.toLowerCase() ?? "";
        lines.push(`<pre class="notion-code" data-lang="${escapeHtml(lang)}"><code>${text}</code></pre>`);
        break;
      }
      case "divider":
        lines.push(`<hr class="notion-hr" />`);
        break;
      case "to_do": {
        const checked = props.checked?.[0]?.[0] === "Yes";
        lines.push(
          `<label class="notion-todo"><input type="checkbox" ${checked ? "checked" : ""} disabled /><span>${text}</span></label>`
        );
        break;
      }
      case "callout": {
        const icon = block.format?.page_icon ?? "💡";
        lines.push(`<div class="notion-callout${colorClass}"><span class="notion-callout-icon">${icon}</span><span>${text}</span></div>`);
        break;
      }
      case "image": {
        const src = block.format?.display_source ?? props.source?.[0]?.[0] ?? "";
        const caption = renderRichText(props.caption);
        if (src) {
          lines.push(
            `<figure class="notion-image"><img src="${escapeHtml(src)}" alt="${escapeHtml(caption || title)}" loading="lazy" />${caption ? `<figcaption>${caption}</figcaption>` : ""}</figure>`
          );
        }
        break;
      }
      case "page":
        // Child page — skip (not rendered inline)
        break;
      default:
        if (text.trim()) lines.push(`<p class="notion-p">${text}</p>`);
    }
  }

  flushList();

  return { title: title.replace(/<[^>]+>/g, ""), html: lines.join("\n") };
}
