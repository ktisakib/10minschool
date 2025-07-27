import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-links",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  webpackFinal: async (config) => {
    config.module?.rules?.push(
      // svgr loader
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      // postcss loader
      {
        test: /\.css$/,
        use: [
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["@tailwindcss/postcss"],
              },
            },
          },
        ],
      },
    );

    return config;
  },
};

export default config;
