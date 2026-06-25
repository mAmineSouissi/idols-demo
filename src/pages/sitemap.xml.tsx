import type { GetServerSideProps } from "next";
import { creators } from "@/data/creators";
import { blogPosts } from "@/data/blog-posts";

const SITE = "https://icons.so";

const STATIC_PAGES = [
  { loc: "/",            priority: "1.0", changefreq: "weekly"  },
  { loc: "/talents",   priority: "0.9", changefreq: "daily"   },
  { loc: "/brands",     priority: "0.9", changefreq: "weekly"  },
  { loc: "/pricing",    priority: "0.8", changefreq: "monthly" },
  { loc: "/blog",       priority: "0.8", changefreq: "weekly"  },
  { loc: "/about",      priority: "0.7", changefreq: "monthly" },
  { loc: "/contact",    priority: "0.6", changefreq: "monthly" },
  { loc: "/talents/apply", priority: "0.7", changefreq: "monthly" },
];

function buildSitemap(): string {
  const creatorUrls = creators.map((c) => ({
    loc: `/talents/${c.handle}`,
    priority: "0.7",
    changefreq: "weekly",
  }));

  const blogUrls = blogPosts.map((p) => ({
    loc: `/blog/${p.slug}`,
    priority: "0.6",
    changefreq: "monthly",
  }));

  const all = [...STATIC_PAGES, ...creatorUrls, ...blogUrls];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .map(
    ({ loc, priority, changefreq }) => `  <url>
    <loc>${SITE}${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate");
  res.write(buildSitemap());
  res.end();
  return { props: {} };
};

// Page component is never rendered — response is ended in getServerSideProps
export default function Sitemap() {
  return null;
}
