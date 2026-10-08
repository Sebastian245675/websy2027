// Load configuration from environment or config file
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

// Environment variable overrides
const config = {
  disableHotReload: process.env.DISABLE_HOT_RELOAD === 'true',
};

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig, { env }) => {
      // Blog posts live in src/blogs/posts/*.md and are imported as plain strings: each post is its own
      // chunk, loaded only when that post is opened (see src/blogs/postContent.js)
      const oneOfRule = webpackConfig.module.rules.find((rule) => Array.isArray(rule.oneOf));
      oneOfRule.oneOf.unshift({ test: /\.md$/, type: 'asset/source' });


      // Optimizaciones de producción
      if (env === 'production') {
        // Deshabilitar source maps en producción
        webpackConfig.devtool = false;

        // Aggressive code splitting for better caching
        webpackConfig.optimization = {
          ...webpackConfig.optimization,
          moduleIds: 'deterministic',
          runtimeChunk: 'single',
          splitChunks: {
            chunks: 'all',
            maxInitialRequests: 30,
            minSize: 10000,
            maxSize: 244000, // Keep chunks under 244KB for better caching
            cacheGroups: {
              // React core - critical, cache aggressively
              react: {
                test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
                name: 'react-core',
                priority: 30,
                reuseExistingChunk: true,
                enforce: true,
              },
              // React Router - separate chunk
              router: {
                test: /[\\/]node_modules[\\/](react-router|react-router-dom)[\\/]/,
                name: 'react-router',
                priority: 25,
                reuseExistingChunk: true,
              },
              // Firebase - split into smaller chunks
              firebase: {
                test: /[\\/]node_modules[\\/](firebase|@firebase)[\\/]/,
                name(module) {
                  const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                  if (packageName.includes('firestore')) return 'firebase-firestore';
                  if (packageName.includes('auth')) return 'firebase-auth';
                  if (packageName.includes('functions')) return 'firebase-functions';
                  return 'firebase-core';
                },
                priority: 20,
                reuseExistingChunk: true,
                enforce: true,
              },
              // UI Libraries (Radix, without lucide-react as we use inline SVGs)
              ui: {
                test: /[\\/]node_modules[\\/](@radix-ui|cmdk)[\\/]/,
                name: 'ui-vendor',
                priority: 18,
                reuseExistingChunk: true,
                enforce: true,
              },
              // Date utilities
              dates: {
                test: /[\\/]node_modules[\\/](date-fns|react-day-picker)[\\/]/,
                name: 'date-vendor',
                priority: 15,
                reuseExistingChunk: true,
              },
              // Form libraries
              forms: {
                test: /[\\/]node_modules[\\/](react-hook-form|@hookform|zod)[\\/]/,
                name: 'form-vendor',
                priority: 14,
                reuseExistingChunk: true,
              },
              // Other node_modules
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name(module) {
                  const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                  return `npm.${packageName.replace('@', '')}`;
                },
                priority: 10,
                reuseExistingChunk: true,
              },
              // Common code used in multiple places
              common: {
                minChunks: 2,
                priority: 5,
                reuseExistingChunk: true,
                name: 'common',
                minSize: 30000,
              },
              // Default vendor for remaining node_modules
              defaultVendors: {
                test: /[\/]node_modules[\/]/,
                priority: -10,
                reuseExistingChunk: true,
              },
            },
          },
          minimize: true,
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                parse: {
                  ecma: 8,
                },
                compress: {
                  ecma: 5,
                  warnings: false,
                  comparisons: false,
                  inline: 2,
                  drop_console: true,
                  drop_debugger: true,
                  pure_funcs: ['console.log', 'console.info', 'console.debug'],
                  passes: 2,
                },
                mangle: {
                  safari10: true,
                },
                output: {
                  ecma: 5,
                  comments: false,
                  ascii_only: true,
                },
              },
              parallel: true,
              extractComments: false,
            }),
          ],
          usedExports: true,
          sideEffects: true,
          concatenateModules: true, // Concatenate modules for better minification
        };

        // Performance budgets - warn but don't fail
        webpackConfig.performance = {
          maxAssetSize: 300000,
          maxEntrypointSize: 300000,
          hints: 'warning'
        };
      }

      // Disable hot reload completely if environment variable is set
      if (config.disableHotReload) {
        // Remove hot reload related plugins
        webpackConfig.plugins = webpackConfig.plugins.filter(plugin => {
          return !(plugin.constructor.name === 'HotModuleReplacementPlugin');
        });

        // Disable watch mode
        webpackConfig.watch = false;
        webpackConfig.watchOptions = {
          ignored: /.*/, // Ignore all files
        };
      } else {
        // Add ignored patterns to reduce watched directories
        webpackConfig.watchOptions = {
          ...webpackConfig.watchOptions,
          ignored: [
            '**/node_modules/**',
            '**/.git/**',
            '**/build/**',
            '**/dist/**',
            '**/coverage/**',
            '**/public/**',
          ],
        };
      }

      return webpackConfig;
    },
  },
};