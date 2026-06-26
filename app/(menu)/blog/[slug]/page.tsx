import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  LandingNavbar,
  type NavLink,
} from "@/components/landing/landing-navbar";
import { LandingFooter } from "@/components/landing/landing-footer";
import { BlogThumb } from "../_components/blog-thumb";
import { BlogMarkdown } from "../_components/blog-markdown";
import { POSTS, getPost } from "../posts";

const PAGE_NAV: NavLink[] = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Blog", href: "/blog" },
];

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found · DoxieAI" };
  return {
    title: `${post.title} · DoxieAI Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <LandingNavbar navLinks={PAGE_NAV} />

      <main className="flex-1">
        <article className="mx-auto w-full max-w-3xl px-6 py-12 lg:py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to blog
          </Link>

          <header className="mt-6">
            <span className="inline-flex w-fit items-center rounded-md bg-brand/15 px-2 py-0.5 font-mono text-[0.65rem] font-semibold uppercase tracking-wide text-brand ring-1 ring-brand/20">
              {post.category}
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-5 flex items-center gap-3">
              <Avatar size="sm">
                <AvatarFallback className="bg-brand text-[0.65rem] font-semibold text-brand-foreground">
                  {post.author.initials}
                </AvatarFallback>
              </Avatar>
              <span className="font-mono text-xs text-muted-foreground">
                {post.author.name} · {post.date} · {post.readTime}
              </span>
            </div>
          </header>

          <BlogThumb
            image={post.image}
            category={post.category}
            className="mt-8 aspect-[16/9] rounded-2xl"
          />

          <BlogMarkdown className="mt-8">{post.content}</BlogMarkdown>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="border-t border-border/60">
            <div className="mx-auto w-full max-w-6xl px-6 py-16">
              <h2 className="mb-8 text-2xl font-bold tracking-tight">
                Continue reading
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card ring-1 ring-foreground/5 transition-colors hover:border-brand/40"
                  >
                    <BlogThumb
                      image={p.image}
                      category={p.category}
                      className="aspect-[16/9]"
                    />
                    <div className="flex flex-1 flex-col gap-2 p-5">
                      <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-wide text-brand">
                        {p.category}
                      </span>
                      <h3 className="text-lg font-semibold leading-snug">
                        {p.title}
                      </h3>
                      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {p.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <LandingFooter />
    </div>
  );
}
