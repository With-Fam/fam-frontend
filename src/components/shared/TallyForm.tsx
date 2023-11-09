'use client'
import Head from 'next/head'
import { FC } from 'react'

const TallyIframe: FC = () => (
  <div>
    <Head>
      <title>Fam Early Access Signup</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
      <script async src="https://tally.so/widgets/embed.js" />
      <style jsx global>{`
        html {
          margin: 0;
          height: 100%;
          overflow: hidden;
        }
        iframe {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          border: 0;
        }
      `}</style>
    </Head>
    <iframe
      src="https://tally.so/r/m6KaaB?transparentBackground=1"
      width="100%"
      height="100%"
      className="h-screen w-screen"
      title="Fam Early Access Signup"
    />
  </div>
)

export default TallyIframe
