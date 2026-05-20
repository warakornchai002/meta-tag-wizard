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

const tabs: Array<{ id: Tab; label: string }> = [
  { id: "basic", label: "Basic" },
  { id: "openGraph", label: "Open Graph" },
  { id: "twitter", label: "Twitter Card" },
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
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-3 py-4 sm:gap-6 sm:px-6 sm:py-6 lg:px-8">
        <header className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:gap-4 sm:pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-cyan-300 sm:text-sm">
              SEO Utility
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:mt-3 sm:text-3xl lg:text-4xl">
              Meta Tag Wizard
            </h1>
            <p className="mt-2 max-w-2xl text-xs leading-5 text-neutral-400 sm:mt-3 sm:text-sm sm:leading-6">
              Build search, social, and crawler metadata from one focused editor.
            </p>
          </div>
          <button
            type="button"
            onClick={copyTags}
            className="inline-flex h-10 w-full items-center justify-center rounded-md bg-cyan-400 px-5 text-sm font-semibold text-neutral-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-neutral-950 sm:h-11 sm:w-auto"
          >
            {copied ? "Copied" : "Copy all tags"}
          </button>
        </header>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.86fr)]">
          <section className="rounded-lg border border-white/10 bg-neutral-900/80 shadow-2xl shadow-black/30">
            <div className="border-b border-white/10 p-2">
              <div className="grid grid-cols-3 gap-1 rounded-md bg-neutral-950/80 p-1 sm:gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`h-9 rounded px-2 text-xs font-medium transition sm:h-10 sm:px-3 sm:text-sm ${
                      activeTab === tab.id
                        ? "bg-cyan-400 text-neutral-950"
                        : "text-neutral-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 p-4 sm:space-y-5 sm:p-5 lg:p-6">
              {activeTab === "basic" && (
                <div className="space-y-4 sm:space-y-5">
                  <TextInput
                    label="Title"
                    value={form.title}
                    onChange={(value) => updateField("title", value)}
                    counterLimit={60}
                  />
                  <TextArea
                    label="Description"
                    value={form.description}
                    onChange={(value) => updateField("description", value)}
                    counterLimit={160}
                  />
                  <TextInput
                    label="Keywords"
                    value={form.keywords}
                    onChange={(value) => updateField("keywords", value)}
                    placeholder="seo, metadata, web tools"
                  />
                  <TextInput
                    label="Author"
                    value={form.author}
                    onChange={(value) => updateField("author", value)}
                  />
                  <TextInput
                    label="Canonical URL"
                    value={form.canonicalUrl}
                    onChange={(value) => updateField("canonicalUrl", value)}
                    placeholder="https://example.com/page"
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <SelectInput
                      label="Robots index"
                      value={form.robotsIndex}
                      options={["index", "noindex"]}
                      onChange={(value) => updateField("robotsIndex", value as RobotsIndex)}
                    />
                    <SelectInput
                      label="Robots follow"
                      value={form.robotsFollow}
                      options={["follow", "nofollow"]}
                      onChange={(value) => updateField("robotsFollow", value as RobotsFollow)}
                    />
                  </div>
                </div>
              )}

              {activeTab === "openGraph" && (
                <div className="space-y-4 sm:space-y-5">
                  <TextInput
                    label="og:title"
                    value={form.ogTitle}
                    onChange={(value) => updateField("ogTitle", value)}
                  />
                  <TextArea
                    label="og:description"
                    value={form.ogDescription}
                    onChange={(value) => updateField("ogDescription", value)}
                  />
                  <TextInput
                    label="og:image URL"
                    value={form.ogImageUrl}
                    onChange={(value) => updateField("ogImageUrl", value)}
                    placeholder="https://example.com/image.jpg"
                  />
                  <SelectInput
                    label="og:type"
                    value={form.ogType}
                    options={ogTypes}
                    onChange={(value) => updateField("ogType", value)}
                  />
                </div>
              )}

              {activeTab === "twitter" && (
                <div className="space-y-4 sm:space-y-5">
                  <SelectInput
                    label="Twitter card type"
                    value={form.twitterCardType}
                    options={twitterCardTypes}
                    onChange={(value) => updateField("twitterCardType", value)}
                  />
                  <TextInput
                    label="Twitter site handle"
                    value={form.twitterSiteHandle}
                    onChange={(value) => updateField("twitterSiteHandle", value)}
                    placeholder="@example"
                  />
                </div>
              )}
            </div>
          </section>

          <aside className="rounded-lg border border-white/10 bg-neutral-900 shadow-2xl shadow-black/30">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5 sm:py-4">
              <div>
                <h2 className="text-sm font-semibold text-white sm:text-base">Live HTML Preview</h2>
                <p className="mt-0.5 text-xs text-neutral-400 sm:mt-1">
                  Empty fields are omitted automatically.
                </p>
              </div>
              <div className="rounded bg-neutral-800 px-2 py-1 text-xs font-medium text-neutral-300 sm:px-2.5">
                {generatedTags.split("\n").filter(Boolean).length} tags
              </div>
            </div>
            <pre className="min-h-[300px] overflow-auto whitespace-pre-wrap p-4 text-xs leading-5 text-cyan-100 sm:min-h-[400px] sm:p-5 sm:text-sm sm:leading-6 lg:min-h-[560px]">
              <code>{generatedTags}</code>
            </pre>
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  counterLimit?: number;
}) {
  return (
    <label className="block">
      <FieldHeader label={label} value={value} counterLimit={counterLimit} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 h-11 w-full rounded-md border border-white/10 bg-neutral-950 px-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  counterLimit,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  counterLimit?: number;
}) {
  return (
    <label className="block">
      <FieldHeader label={label} value={value} counterLimit={counterLimit} />
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="mt-2 w-full resize-none rounded-md border border-white/10 bg-neutral-950 px-3 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-neutral-600 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
      />
    </label>
  );
}

function SelectInput({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-neutral-200">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-md border border-white/10 bg-neutral-950 px-3 text-sm text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
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
}: {
  label: string;
  value: string;
  counterLimit?: number;
}) {
  return (
    <span className="flex items-center justify-between gap-3">
      <span className="text-sm font-medium text-neutral-200">{label}</span>
      {counterLimit ? (
        <span className={`text-xs font-semibold ${getCounterTone(value.length, counterLimit)}`}>
          {value.length}/{counterLimit}
        </span>
      ) : null}
    </span>
  );
}
