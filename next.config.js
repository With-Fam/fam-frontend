/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      'api.zora.co',
      'zora-prod.mypinata.cloud',
      'nftstorage.link',
      'zora-dev.mypinata.cloud',
      'ipfs.zora.co',
      'ipfs.decentralized-content.com',
      'ipfs.io',
      'nouns.build',
      'i.ibb.co',
      // 'euc.li',
      'cloudflare-ipfs.com',
      'media.discordapp.net',
      'i.imgur.com',
      'partydao.mypinata.cloud',
      'euc.li',
      'ens.xyz',
      'i.seadn.io',
      'storage.googleapis.com',
      'openseauserdata.com',
      'metadata.ens.domains',
    ],
    // remotePatterns: [
    //   {
    //     protocol: 'ipfs',
    //     hostname: '*',
    //     port: '',
    //     pathname: '',
    //   },
    // ],
  },
  experimental: {
    webpackBuildWorker: true,
    missingSuspenseWithCSRBailout: false,
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
}

module.exports = nextConfig
