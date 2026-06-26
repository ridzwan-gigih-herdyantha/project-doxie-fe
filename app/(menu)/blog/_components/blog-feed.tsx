"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlogThumb } from "./blog-thumb";
import { POSTS, type Category, type Post } from "../posts";

const FILTERS = [
  "All Posts",
  "Product Updates",
  "How-tos",
  "AI Research",
  "Case Studies",
] as const;

const FEATURED = POSTS[0];
const CARDS = POSTS.slice(1, 4);
const WIDE = POSTS.slice(4, 6);

function CategoryBadge({ category }: { category: Category }) {
  return (
    <span className="inline-flex w-fit items-center rounded-md bg-brand/15 px-2 py-0.5 font-mono text-[0.65rem] font-semibold uppercase tracking-wide text-brand ring-1 ring-brand/20">
      {category}
    </span>
  );
}

function NewsletterCard() {
  return (
    <div className="flex flex-col items-center rounded-lg border border-brand/20 bg-brand/5 p-8 text-center ring-1 ring-foreground/5">
      <div className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20">
        <Mail className="size-6" />
      </div>
      <h3 className="mt-4 text-xl font-bold text-brand">Stay Integrated</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Get bi-weekly insights on LLMs, document engineering, and Doxie product
        updates directly to your inbox.
      </p>
      <form
        className="mt-6 flex w-full flex-col gap-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <Input
          type="email"
          placeholder="work@company.com"
          className="h-11 rounded-sm"
        />
        <Button
          type="submit"
          className="h-11 rounded-sm bg-brand font-semibold text-brand-foreground hover:bg-brand/90"
        >
          Subscribe Now
        </Button>
      </form>
      <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-wide text-muted-foreground">
        No spam. Only high-density technical value.
      </p>
    </div>
  );
}

export function BlogFeed() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All Posts");
  const isAll = filter === "All Posts";

  return (
    <div className="mt-10">
      {/* Category filter */}
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              filter === f
                ? "bg-brand text-brand-foreground"
                : "border border-border text-muted-foreground hover:border-brand/40 hover:text-foreground",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-6 border-t border-border/60 pt-10">
        {isAll ? <AllPostsLayout /> : <FilteredGrid filter={filter} />}
      </div>

      <Pagination />
    </div>
  );
}

function AllPostsLayout() {
  return (
    <div className="flex flex-col gap-6">
      {/* Featured post + newsletter */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Link
          href={`/blog/${FEATURED.slug}`}
          className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card ring-1 ring-foreground/5 transition-colors hover:border-brand/40 lg:col-span-2"
        >
          <BlogThumb
            image={FEATURED.image}
            category={FEATURED.category}
            className="aspect-[16/9]"
          >
            <span className="absolute left-4 top-4">
              <CategoryBadge category={FEATURED.category} />
            </span>
          </BlogThumb>
          <div className="flex flex-col gap-3 p-6">
            <h3 className="text-2xl font-bold tracking-tight">{FEATURED.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {FEATURED.excerpt}
            </p>
            <div className="mt-1 flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">
                {FEATURED.date} · {FEATURED.readTime}
              </span>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-brand group-hover:underline">
                Read more <ArrowUpRight className="size-4" />
              </span>
            </div>
          </div>
        </Link>

        <NewsletterCard />
      </div>

      {/* 3 cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>

      {/* 2 wide */}
      <div className="grid gap-6 lg:grid-cols-2">
        {WIDE.map((p) => (
          <WidePost key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}

function FilteredGrid({ filter }: { filter: Category }) {
  const posts = POSTS.filter((p) => p.category === filter);
  if (posts.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        No posts in this category yet.
      </p>
    );
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <PostCard key={p.slug} post={p} />
      ))}
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card ring-1 ring-foreground/5 transition-colors hover:border-brand/40"
    >
      <BlogThumb
        image={post.image}
        category={post.category}
        className="aspect-[16/9]"
      />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-2">
          <CategoryBadge category={post.category} />
          <span className="font-mono text-xs text-muted-foreground">
            {post.readTime}
          </span>
        </div>
        <h3 className="text-lg font-semibold leading-snug">{post.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}

function WidePost({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex gap-4 rounded-lg border border-border bg-card p-4 ring-1 ring-foreground/5 transition-colors hover:border-brand/40"
    >
      <BlogThumb
        image={post.image}
        category={post.category}
        className="size-24 shrink-0 rounded-xl sm:size-28"
        iconClassName="size-8"
      />
      <div className="flex min-w-0 flex-col gap-1.5">
        <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
          {post.category} · {post.date}
        </span>
        <h3 className="text-lg font-semibold leading-snug">{post.title}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}

function Pagination() {
  const pages = ["1", "2", "3", "…", "12"];
  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      <button
        type="button"
        aria-label="Previous page"
        className="flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
      </button>
      {pages.map((p, i) => (
        <button
          key={i}
          type="button"
          disabled={p === "…"}
          className={cn(
            "flex size-9 items-center justify-center rounded-md text-sm font-medium transition-colors",
            p === "1"
              ? "bg-brand text-brand-foreground"
              : "border border-border text-muted-foreground hover:border-brand/40 hover:text-foreground disabled:pointer-events-none disabled:border-transparent",
          )}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        aria-label="Next page"
        className="flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}
