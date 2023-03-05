module.exports = {
  images: {
    domains: [
      "gravatar.com",
      "res.cloudinary.com",
      "www.notion.so",
      "notion.so",
      "s3.us-west-2.amazonaws.com",
    ],
  },
  eslint: {
    dirs: ["components", "layouts", "lib", "pages"],
  },
  async headers() {
    return [
      {
        source: "/:path*{/}?",
        headers: [
          {
            key: "Permissions-Policy",
            value: "interest-cohort=()",
          },
        ],
      },
    ];
  },
};
