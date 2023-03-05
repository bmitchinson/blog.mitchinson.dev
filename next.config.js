module.exports = {
  images: {
    domains: ["gravatar.com", "res.cloudinary.com"],
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
