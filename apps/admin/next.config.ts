import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'dummyimage.com',
      'd36sbsugtnkcik.cloudfront.net',
      'static.toss.im',
      'park-mate-bucket.s3.ap-northeast-2.amazonaws.com',
    ],
  },
};

export default nextConfig;
