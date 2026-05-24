"use client";

import { useMemo, useState } from "react";

type Tab = "basic" | "openGraph" | "twitter";
type RobotsIndex = "index" | "noindex";
type RobotsFollow = "follow" | "nofollow";

type FormState = {
  title: string;
  description: string;
  keywords: string;
  author: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  ogType: string;
  twitterCardType: string;
  twitterSiteHandle: string;
  robotsIndex: RobotsIndex;
  robotsFollow: RobotsFollow;
};

const defaultForm: FormState = {
  title: "Meta Tag Wizard - Build Better Search Snippets",
  description:
    "Generate clean HTML meta tags for search engines, Open Graph previews, Twitter Cards, and crawler directives.",
  keywords: "meta tags, seo, open graph, twitter card, html generator",
  author: "Meta Tag Wizard",
  canonicalUrl: "https://example.com/meta-tag-wizard",
  ogTitle: "Meta Tag Wizard",
  ogDescription:
    "Create production-ready HTML metadata with live previews and character guidance.",
  ogImageUrl: "https://example.com/social-preview.jpg",
  ogType: "website",
  twitterCardType: "summary_large_image",
  twitterSiteHandle: "@metawizard",
  robotsIndex: "index",
  robotsFollow: "follow",
};

const tabs: Array<{ id: Tab; label: string; description: string }> = [
  {
    id: "basic",
    label: "Basic",
    description: "Search metadata and crawler directives",
  },
  {
    id: "openGraph",
    label: "Open Graph",
    description: "Rich link previews for social platforms",
  },
  {
    id: "twitter",
    label: "Twitter Card",
    description: "X / Twitter share card settings",
  },
];

const ogTypes = ["website", "article", "profile", "book", "music.song", "video.movie"];
const twitterCardTypes = ["summary_large_image", "summary", "app", "player"];

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getCounterTone(length: number, limit: number) {
  if (length > limit) return "text-rose-300";
  if (length >= Math.floor(limit * 0.9)) return "text-amber-300";
  return "text-emerald-300";
}

function getSnippet(value: string, fallback: string, maxLength: number) {
  const text = value.trim() || fallback;
  return text.length > maxLength ? `${text.slice(0, maxLength - 1)}…` : text;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("basic");
  const [form, setForm] = useState<FormState>(defaultForm);
  const [copied, setCopied] = useState(false);

  const updateField = <Key extends keyof FormState>(key: Key, value: FormState[Key]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setCopied(false);
  };

  const generatedTags = useMemo(() => {
    const tags: string[] = [];
    const addMeta = (name: string, content: string) => {
      if (content.trim()) {
        tags.push(`<meta name="${name}" content="${escapeHtml(content.trim())}">`);
      }
    };
    const addProperty = (property: string, content: string) => {
      if (content.trim()) {
        tags.push(`<meta property="${property}" content="${escapeHtml(content.trim())}">`);
      }
    };

    if (form.title.trim()) tags.push(`<title>${escapeHtml(form.title.trim())}</title>`);
    addMeta("description", form.description);
    addMeta("keywords", form.keywords);
    addMeta("author", form.author);
    addMeta("robots", `${form.robotsIndex}, ${form.robotsFollow}`);

    if (form.canonicalUrl.trim()) {
      tags.push(`<link rel="canonical" href="${escapeHtml(form.canonicalUrl.trim())}">`);
    }

    addProperty("og:title", form.ogTitle);
    addProperty("og:description", form.ogDescription);
    addProperty("og:image", form.ogImageUrl);
    addProperty("og:type", form.ogType);

    addMeta("twitter:card", form.twitterCardType);
    addMeta("twitter:site", form.twitterSiteHandle);

    return tags.join("\n");
  }, [form]);

  const tagCount = generatedTags ? generatedTags.split("\n").filter(Boolean).length : 0;
  const titleLength = form.title.length;
  const descriptionLength = form.description.length;

  const copyTags = async () => {
    try {
      await navigator.clipboard.writeText(generatedTags);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070c] text-neutral-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.14),_transparent_28%),linear-gradient(180deg,_rgba(255,255,255,0.03),_transparent_20%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[linear-gradient(180deg,_rgba(255,255,255,0.08),_transparent)] opacity-30 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-5 sm:gap-6 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <header className="rounded-[28px] border border-white/10 bg-white/[0.04] px-5 py-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-6 sm:py-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                  SEO Utility
                </span>
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-neutral-300">
                  Live HTML metadata editor
                </span>
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Meta Tag Wizard
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-300 sm:text-base sm:leading-7">
                Build search, social, and crawler metadata in one polished workspace. Edit the
                inputs, compare the preview instantly, and copy production-ready tags when they are
                right.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <StatPill label="Search" value={`${titleLength}/60 title chars`} />
                <StatPill label="Social" value={`${descriptionLength}/160 desc chars`} />
                <StatPill label="Output" value={`${tagCount} generated tags`} />
              </div>
            </div>

            <button
              type="button"
              onClick={copyTags}
              className="inline-flex h-11 items-center justify-center rounded-full border border-cyan-300/20 bg-gradient-to-r from-cyan-300 to-sky-300 px-5 text-sm font-semibold text-slate-950 shadow-[0_12px_40px_rgba(34,211,238,0.28)] transition hover:from-cyan-200 hover:to-sky-200 focus:outline-none focus:ring-4 focus:ring-cyan-300/20"
            >
              {copied ? "Copied to clipboard" : "Copy generated tags"}
            </button>
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:items-start">
          <section className="rounded-[28px] border border-white/10 bg-white/[0.045] shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="border-b border-white/10 p-3 sm:p-4">
              <div className="grid grid-cols-1 gap-2 rounded-2xl bg-black/20 p-2 sm:grid-cols-3">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    aria-pressed={activeTab === tab.id}
                    className={`group rounded-xl px-4 py-3 text-left transition ${
                      activeTab === tab.id
                        ? "bg-gradient-to-br from-cyan-300 to-sky-300 text-slate-950 shadow-lg shadow-cyan-400/15"
                        : "text-neutral-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="text-sm font-semibold">{tab.label}</div>
                    <div
                      className={`mt-1 text-xs leading-5 ${
                        activeTab === tab.id ? "text-slate-900/75" : "text-neutral-500"
                      }`}
                    >
                      {tab.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6 p-5 sm:p-6">
              <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                  Editing canvas
                </p>
                <p className="mt-2 text-sm leading-6 text-neutral-300">
                  Keep the page title concise, the description readable, and the preview metadata
                  aligned with the experience you want search engines and social platforms to show.
                </p>
              </div>

              {activeTab === "basic" && (
                <div className="space-y-5">
                  <TextInput
                    label="Title"
                    helperText="Used in browser tabs, SEO snippets, and the generated <title> tag."
                    value={form.title}
                    onChange={(value) => updateField("title", value)}
                    counterLimit={60}
                  />
                  <TextArea
                    label="Description"
                    helperText="This becomes the meta description and often powers your search snippet."
                    value={form.description}
                    onChange={(value) => updateField("description", value)}
                    counterLimit={160}
                  />
                  <TextInput
                    label="Keywords"
                    helperText="Optional for legacy support; keep the list short and focused."
                    value={form.keywords}
                    onChange={(value) => updateField("keywords", value)}
                    placeholder="seo, metadata, web tools"
                  />
                  <TextInput
                    label="Author"
                    helperText="Published author or brand name for the page metadata."
                    value={form.author}
                    onChange={(value) => updateField("author", value)}
                  />
                  <TextInput
                    label="Canonical URL"
                    helperText="The preferred URL search engines should treat as the source of truth."
                    value={form.canonicalUrl}
                    onChange={(value) => updateField("canonicalUrl", value)}
                    placeholder="https://example.com/page"
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <SelectInput
                      label="Robots index"
                      helperText="Control whether crawlers may index this page."
                      value={form.robotsIndex}
                      options={["index", "noindex"]}
                      onChange={(value) => updateField("robotsIndex", value as RobotsIndex)}
                    />
                    <SelectInput
                      label="Robots follow"
                      helperText="Control whether crawlers may follow links from this page."
                      value={form.robotsFollow}
                      options={["follow", "nofollow"]}
                      onChange={(value) => updateField("robotsFollow", value as RobotsFollow)}
                    />
                  </div>
                </div>
              )}

              {activeTab === "openGraph" && (
                <div className="space-y-5">
                  <TextInput
                    label="og:title"
                    helperText="Social share title. You can override the page title when needed."
                    value={form.ogTitle}
                    onChange={(value) => updateField("ogTitle", value)}
                  />
                  <TextArea
                    label="og:description"
                    helperText="Used by social platforms when they render your link preview."
                    value={form.ogDescription}
                    onChange={(value) => updateField("ogDescription", value)}
                  />
                  <TextInput
                    label="og:image URL"
                    helperText="Provide an absolute image URL for the social preview card."
                    value={form.ogImageUrl}
                    onChange={(value) => updateField("ogImageUrl", value)}
                    placeholder="https://example.com/image.jpg"
                  />
                  <SelectInput
                    label="og:type"
                    helperText="Choose the content type that best describes the page."
                    value={form.ogType}
                    options={ogTypes}
                    onChange={(value) => updateField("ogType", value)}
                  />
                </div>
              )}

              {activeTab === "twitter" && (
                <div className="space-y-5">
                  <SelectInput
                    label="Twitter card type"
                    helperText="Controls the card layout shown when the page is shared."
                    value={form.twitterCardType}
                    options={twitterCardTypes}
                    onChange={(value) => updateField("twitterCardType", value)}
                  />
                  <TextInput
                    label="Twitter site handle"
                    helperText="The account associated with the content, such as @brand."
                    value={form.twitterSiteHandle}
                    onChange={(value) => updateField("twitterSiteHandle", value)}
                    placeholder="@example"
                  />
                </div>
              )}
            </div>
          </section>

          <aside className="lg:sticky lg:top-6">
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl">
              <div className="flex flex-col gap-4 border-b border-white/10 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center rounded-full border border-emerald-300/15 bg-emerald-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200">
                      Live preview
                    </div>
                    <h2 className="mt-3 text-lg font-semibold text-white">Generated HTML</h2>
                    <p className="mt-1 max-w-sm text-sm leading-6 text-neutral-300">
                      Empty fields are omitted automatically. Update the form to see the final tag
                      output and a more realistic preview of how the metadata will read.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-right">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                      Tags
                    </div>
                    <div className="mt-1 text-lg font-semibold text-white">{tagCount}</div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <PreviewMetric label="Title length" value={`${titleLength} / 60`} tone={getCounterTone(titleLength, 60)} />
                  <PreviewMetric
                    label="Description length"
                    value={`${descriptionLength} / 160`}
                    tone={getCounterTone(descriptionLength, 160)}
                  />
                </div>
              </div>

              <div className="space-y-4 p-5">
                <div className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-4 shadow-inner shadow-black/20">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                        Search result preview
                      </p>
                      <p className="mt-1 text-xs text-neutral-400">
                        What a search engine snippet would feel like.
                      </p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] font-medium text-neutral-300">
                      {form.robotsIndex}, {form.robotsFollow}
                    </span>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-[#0b1220] p-4">
                    <div className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">
                      {getSnippet(form.canonicalUrl, "example.com/page", 38)}
                    </div>
                    <div className="mt-2 text-lg font-semibold leading-7 text-cyan-100">
                      {getSnippet(form.title, "Untitled page", 72)}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-neutral-300">
                      {getSnippet(form.description, "Describe the page in one clear sentence.", 165)}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <MiniCard
                    label="Open Graph"
                    title={getSnippet(form.ogTitle, "Social preview title", 34)}
                    description={getSnippet(form.ogDescription, "Social description copy", 88)}
                    footer={form.ogType}
                  />
                  <MiniCard
                    label="Twitter Card"
                    title={getSnippet(form.twitterCardType, "summary_large_image", 34)}
                    description={getSnippet(
                      form.twitterSiteHandle,
                      "@metawizard",
                      88,
                    )}
                    footer="Platform card"
                  />
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                        Generated code
                      </p>
                      <p className="mt-1 text-xs text-neutral-400">
                        Copy this block directly into your <code>&lt;head&gt;</code>.
                      </p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-neutral-300">
                      {tagCount} lines
                    </span>
                  </div>

                  <pre className="mt-4 max-h-[420px] overflow-auto rounded-2xl border border-white/10 bg-[#02050a] p-4 text-[12px] leading-6 text-cyan-100 shadow-inner shadow-black/40">
                    <code>{generatedTags}</code>
                  </pre>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function TextInput({
  label,
  value,
  onChange,
  placeholder,
  counterLimit,
  helperText,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  counterLimit?: number;
  helperText?: string;
}) {
  return (
    <label className="block">
      <FieldHeader label={label} value={value} counterLimit={counterLimit} helperText={helperText} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-3 h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white shadow-inner shadow-black/10 outline-none transition placeholder:text-neutral-500 focus:border-cyan-300/70 focus:bg-white/[0.06] focus:ring-4 focus:ring-cyan-300/10"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  counterLimit,
  helperText,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  counterLimit?: number;
  helperText?: string;
}) {
  return (
    <label className="block">
      <FieldHeader label={label} value={value} counterLimit={counterLimit} helperText={helperText} />
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={5}
        className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-white shadow-inner shadow-black/10 outline-none transition placeholder:text-neutral-500 focus:border-cyan-300/70 focus:bg-white/[0.06] focus:ring-4 focus:ring-cyan-300/10"
      />
    </label>
  );
}

function SelectInput({
  label,
  value,
  options,
  onChange,
  helperText,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  helperText?: string;
}) {
  return (
    <label className="block">
      <FieldHeader label={label} helperText={helperText} />
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-3 h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white shadow-inner shadow-black/10 outline-none transition focus:border-cyan-300/70 focus:bg-white/[0.06] focus:ring-4 focus:ring-cyan-300/10"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function FieldHeader({
  label,
  value,
  counterLimit,
  helperText,
}: {
  label: string;
  value?: string;
  counterLimit?: number;
  helperText?: string;
}) {
  return (
    <div className="space-y-1.5">
      <span className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold tracking-wide text-neutral-100">{label}</span>
        {counterLimit ? (
          <span className={`text-xs font-semibold ${getCounterTone(value?.length ?? 0, counterLimit)}`}>
            {(value?.length ?? 0)}/{counterLimit}
          </span>
        ) : null}
      </span>
      {helperText ? <p className="text-xs leading-5 text-neutral-400">{helperText}</p> : null}
    </div>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
        {label}
      </div>
      <div className="mt-1 text-sm font-medium text-white">{value}</div>
    </div>
  );
}

function PreviewMetric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
        {label}
      </div>
      <div className={`mt-1 text-sm font-semibold ${tone}`}>{value}</div>
    </div>
  );
}

function MiniCard({
  label,
  title,
  description,
  footer,
}: {
  label: string;
  title: string;
  description: string;
  footer: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 shadow-inner shadow-black/20">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200">
        {label}
      </div>
      <div className="mt-3 text-sm font-semibold text-white">{title}</div>
      <p className="mt-2 text-sm leading-6 text-neutral-300">{description}</p>
      <div className="mt-4 inline-flex rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] font-medium text-neutral-300">
        {footer}
      </div>
    </div>
  );
}
