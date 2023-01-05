module.exports = {
    apps: [
      {
        name: "alshefaa",
        script: "node ./build/src/index.js",
        instances: "max",
        autorestart: true,
        watch: [
          "./build/src/*"
        ],
        max_memory_restart: '500mb',
        ignore_watch: [
          "./node_modules",
          "./public",
          "./logs",
          "./Database",
          "./src",
          "./logs",
          "./art",
          "./tsconfig.json",
          "./knexfile.ts",
          "./symlink.js",
          "./Database",
          "./public",
          "./.env",
          "./.gitignore",
          "./src",
          "./package.json",
          "./README.md",
          "./Documentation",
          "./docker-compose.yml",
          "./Dockerfile",
          ".git",
          ".dockerignore",
        ]
      }
    ]
  }