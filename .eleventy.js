const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/avatar.jpg");
  eleventyConfig.addPassthroughCopy("src/Zafar_Mahmood_CV.pdf");
  eleventyConfig.addPassthroughCopy({ "404.html": "404.html" });

  eleventyConfig.addFilter("readingTime", (text) => {
    const words = String(text).replace(/<[^>]+>/g, "").trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
  });

  eleventyConfig.addFilter("dateDisplay", (date) =>
    new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
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
