import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
      },
      propFilter: {
        skipPropsWithoutDoc: false,
      },
    },
  },
  webpackFinal: async (config) => {
    config.resolve = config.resolve || {};
    if (config.module?.rules) {
      config.module.rules.push(
        // Add SVGR loader for SVG files
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
        // Tailwind css loader
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
        {
          test: /\.(ts|tsx)$/,
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: [
              // Add React automatic JSX transform
              ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
            ],
          },
          exclude: "/node_modules/",
        },
      );
    }

    // Return the modified config
    return config;
  },
};

export default config;
