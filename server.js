const express = require("express");
const Parser = require("rss-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const parser = new Parser();

let cache = {
  items: [],
  updatedAt: null
};

async function fetchNews() {
  try {
    const feed = await parser.parseURL(
      "https://home.treasury.gov/news/press-releases/rss"
    );

    cache = {
      items: (feed.items || []).slice(0, 30).map((item, i) => ({
        id: item.guid || item.link || `${item.title}-${i}`,
        title: item.title || "Treasury Announcement",
        link:
          item.link ||
          "https://home.treasury.gov/news/press-releases",
        date: item.isoDate || item.pubDate || null,
        description: (item.contentSnippet || "")
          .replace(/<[^>]*>/g, "")
          .trim()
          .slice(0, 300)
      })),
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.log("Treasury feed error:", error.message);
  }

  return cache;
}

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/news", async (req, res) => {
  const news = await fetchNews();

  res.json({
    ...news,
    checkedAt: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Treasury News Monitor running on port ${PORT}`);
  fetchNews();
});
