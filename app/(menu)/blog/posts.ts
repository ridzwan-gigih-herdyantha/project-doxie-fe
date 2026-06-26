import {
  BrainCircuit,
  BarChart3,
  PenTool,
  Rocket,
  type LucideIcon,
} from "lucide-react";

export type Category =
  | "Product Updates"
  | "How-tos"
  | "AI Research"
  | "Case Studies";

export interface Post {
  slug: string;
  category: Category;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: { name: string; initials: string };
  /** Optional cover image. Falls back to a category icon. */
  image?: string;
  /** Article body as markdown. */
  content: string;
}

/** Fallback icon per category — tech / AI / document themed. */
export const CATEGORY_ICON: Record<Category, LucideIcon> = {
  "Product Updates": Rocket,
  "How-tos": PenTool,
  "AI Research": BrainCircuit,
  "Case Studies": BarChart3,
};

export const POSTS: Post[] = [
  {
    slug: "how-our-rag-pipeline-cites-every-answer",
    category: "AI Research",
    title: "How Our RAG Pipeline Cites Every Answer",
    excerpt:
      "Retrieval-Augmented Generation (RAG) is the backbone of Doxie. Learn how we solved the citation problem by mapping semantic chunks back to original page coordinates in real-time.",
    date: "Oct 12, 2024",
    readTime: "12 min read",
    author: { name: "Elena Vance", initials: "EV" },
    content: [
      "## The attribution problem",
      "",
      "Retrieval is the easy part. **Attribution** is where most RAG systems quietly fail.",
      "",
      "When the model paraphrases three chunks into a single sentence, which page owns that sentence? Doxie answers this by carrying page coordinates through the entire pipeline:",
      "",
      "1. **Chunk** the document while keeping each chunk's page and bounding box.",
      "2. **Embed** the chunks and store the coordinates next to the vector.",
      "3. **Retrieve** the most relevant chunks for a question.",
      "4. **Align** the generated answer back to the chunks that grounded it.",
      "",
      "Each citation is just a small payload stored alongside the answer:",
      "",
      "```json",
      "{",
      '  "page": 12,',
      '  "chunk_id": "c_8a31",',
      '  "score": 0.92',
      "}",
      "```",
      "",
      "Clicking a citation calls a tiny helper that scrolls the viewer to the exact source:",
      "",
      "```ts",
      "Page 12",
      "```",
      "",
      "> An answer you can audit in one click. For legal and technical work, that verifiability is the entire point.",
    ].join("\n"),
  },
  {
    slug: "gpt-4o-vs-claude-3-5-vs-gemini",
    category: "Case Studies",
    title: "GPT-4o vs Claude 3.5 vs Gemini",
    excerpt:
      "A head-to-head technical benchmark focusing on extraction accuracy, reasoning speed, and context window efficiency for multi-modal document tasks.",
    date: "Oct 09, 2024",
    readTime: "8 min read",
    author: { name: "Marcus Thorne", initials: "MT" },
    content: [
      "## How we tested",
      "",
      "We ran every frontier model through the same battery of document tasks:",
      "",
      "- **Structured extraction** — pulling clean fields from invoices and forms.",
      "- **Multi-hop reasoning** — answers that span several sections.",
      "- **Long-context recall** — documents past 100,000 tokens.",
      "",
      "## The results",
      "",
      "**GPT-4o** led on structured-extraction precision and was the most consistent at returning valid JSON.",
      "",
      "**Claude 3.5 Sonnet** was strongest on nuanced synthesis and long-form reasoning across sections.",
      "",
      "**Gemini 1.5 Pro** made whole-document recall the most efficient thanks to its large context window.",
      "",
      "No single model won outright — which is exactly why Doxie is *model-agnostic*. You can switch mid-conversation.",
    ].join("\n"),
  },
  {
    slug: "automating-legal-review-with-doxie-api",
    category: "How-tos",
    title: "Automating Legal Review with Doxie API",
    excerpt:
      "A developer guide on setting up webhooks and automated risk scoring for incoming contracts using our Python SDK and REST API.",
    date: "Oct 02, 2024",
    readTime: "15 min read",
    author: { name: "Priya Nair", initials: "PN" },
    content: [
      "Whenever a new agreement lands in your intake bucket, a webhook can trigger ingestion, extraction, and a first-pass risk score — before a human ever opens the file.",
      "",
      "## 1. Install the SDK",
      "",
      "```bash",
      "pip install doxie",
      "```",
      "",
      "## 2. Upload and poll for status",
      "",
      "```python",
      "from doxie import Client",
      "",
      "client = Client(api_key='sk_live_...')",
      "doc = client.documents.upload('contract.pdf')",
      "",
      "while doc.status != 'ready':",
      "    doc = client.documents.get(doc.id)",
      "```",
      "",
      "## 3. Score the clauses that matter",
      "",
      "We flag the high-risk clauses on every incoming contract:",
      "",
      "- Liability caps",
      "- Auto-renewal windows",
      "- Governing law",
      "- Data-processing terms",
      "",
      "Each finding maps back to its **source page**, so a reviewer can jump straight to the language in question instead of skimming the whole agreement.",
    ].join("\n"),
  },
  {
    slug: "new-mobile-ocr-and-voice-search",
    category: "Product Updates",
    title: "New: Mobile OCR and Voice Search",
    excerpt:
      "Snap a photo of a physical document and chat with it immediately. Plus, our new voice interface makes hands-free research a reality.",
    date: "Sep 30, 2024",
    readTime: "3 min read",
    author: { name: "Tom Becker", initials: "TB" },
    content: [
      "This release is all about meeting documents where they live — on paper and on the go.",
      "",
      "- **Mobile OCR** — point your camera at a printed page, a whiteboard, or a signed contract, and Doxie digitizes it on-device before uploading.",
      "- **Voice search** — ask a question out loud and hear a cited answer back, which makes hands-free research practical away from the keyboard.",
      "",
      "Both features ship today on iOS and Android.",
    ].join("\n"),
  },
  {
    slug: "the-future-of-multi-modal-context",
    category: "AI Research",
    title: "The Future of Multi-Modal Context",
    excerpt:
      "How we're pushing the boundaries of what's possible with 1M+ token context windows for enterprise data.",
    date: "Oct 05, 2024",
    readTime: "10 min read",
    author: { name: "Elena Vance", initials: "EV" },
    content: [
      "## Bigger windows, new trade-offs",
      "",
      "Million-token context windows change the economics of document AI. Whole data rooms — not single files — fit into a single prompt.",
      "",
      "But naively stuffing context hurts:",
      "",
      "- Accuracy degrades as irrelevant tokens crowd the prompt.",
      "- Latency and cost climb with every extra token.",
      "",
      "## Our approach",
      "",
      "We blend long-context models with retrieval: the wide window handles global structure and cross-references, while specific claims stay grounded in precisely retrieved spans.",
      "",
      "> Context isn't just text. Tables, figures, and diagrams carry meaning that plain text loses — treating them as first-class citizens is where the next accuracy gains come from.",
    ].join("\n"),
  },
  {
    slug: "privacy-first-soc2-compliance",
    category: "Product Updates",
    title: "Privacy First: SOC2 Compliance",
    excerpt:
      "Doxie is now SOC2 Type II compliant. Your document data is encrypted, siloed, and never used for training.",
    date: "Sep 28, 2024",
    readTime: "4 min read",
    author: { name: "David Okafor", initials: "DO" },
    content: [
      "Doxie is now **SOC2 Type II** compliant. The audit covers how we handle your data end to end:",
      "",
      "- Encrypted in transit and at rest",
      "- Isolated per workspace",
      "- Never used to train public models",
      "",
      "Privacy is a default, not a setting. You can request our latest report from the Trust Center at any time.",
    ].join("\n"),
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
