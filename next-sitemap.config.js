const BLOG = require("./blog.config");

module.exports = {
  siteUrl: BLOG.link,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/con"],
  // ...other options
  // https://github.com/iamvishnusankar/next-sitemap/tree/v1.6.203
};
