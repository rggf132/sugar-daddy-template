const nextConfig = {
  // Enables browser source map generation during the production build
  productionBrowserSourceMaps: true,
  // Swaps Terser with Next.js compiler for minification
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.s3.*.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
      },
    ],
  },
  // next-offline options
  eslint: {
    // TODO: set back to false once ESLint plugin versions are aligned with TS 5.9
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TODO: set back to false once strict TS errors are resolved
    ignoreBuildErrors: true,
  },

  // // buildId, dev, isServer, defaultLoaders, webpack
  // webpack: (config, { dev }) => {
  //   const base = dev
  //     ? require('./.webpack/webpack.config.dev')
  //     : require('./.webpack/webpack.config.prod')

  //   if (base.plugins) {
  //     config.plugins = config.plugins.concat(base.plugins)
  //   }

  //   config.module.rules.push({
  //     test: /\.md$/,
  //     use: 'raw-loader',
  //   })

  //   return config
  // },
}

module.exports = nextConfig
