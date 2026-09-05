const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/avatar.jpg");
  eleventyConfig.addPassthroughCopy({ "404.html": "404.html" });

  eleventyConfig.addFilter("readingTime", (text) => {
    const words = String(text).replace(/<[^>]+>/g, "").trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
  });

  eleventyConfig.addFilter("dateDisplay", (date) =>
    new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  );

  eleventyConfig.addFilter("dateShort", (date) =>
    new Date(date).toLocaleDateString("en-US", { month: "short", day: "2-digit" })
  );

  eleventyConfig.addFilter("slug", (str) =>
    String(str).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
  );

  // Every unique post tag except the internal "posts" collection marker,
  // used to generate one archive page per tag.
  eleventyConfig.addCollection("tagList", (collectionApi) => {
    const tagSet = new Set();
    collectionApi.getFilteredByTag("posts").forEach((post) => {
      (post.data.tags || []).forEach((tag) => {
        if (tag !== "posts") tagSet.add(tag);
      });
    });
    return [...tagSet].sort();
  });

  // Tag → post count, sorted most-used first, for the tag cloud at the top of the blog index.
  eleventyConfig.addCollection("tagCounts", (collectionApi) => {
    const counts = {};
    collectionApi.getFilteredByTag("posts").forEach((post) => {
      (post.data.tags || []).forEach((tag) => {
        if (tag !== "posts") counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
  });

  // Posts grouped by year, newest year first, for the timeline on the blog index.
  eleventyConfig.addCollection("postsByYear", (collectionApi) => {
    const posts = collectionApi.getFilteredByTag("posts").sort((a, b) => b.date - a.date);
    const groups = [];
    const indexByYear = {};
    posts.forEach((post) => {
      const year = post.date.getFullYear();
      if (!(year in indexByYear)) {
        indexByYear[year] = groups.length;
        groups.push({ year, posts: [] });
      }
      groups[indexByYear[year]].posts.push(post);
    });
    return groups;
  });

  // Newest 3 posts, for the blog preview on the home page.
  eleventyConfig.addCollection("recentPosts", (collectionApi) =>
    collectionApi.getFilteredByTag("posts").sort((a, b) => b.date - a.date).slice(0, 3)
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
