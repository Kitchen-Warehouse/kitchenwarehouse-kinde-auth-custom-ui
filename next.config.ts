import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['res.cloudinary.com'],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' kitchenwarehouse.com.au *.kitchenwarehouse.com.au https://js.stripe.com https://auth-staging.kitchenwarehouse.com.au https://cdn.jsdelivr.net https://cdnjs.cloudflare.com *.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: res.cloudinary.com; font-src 'self' data: https:; connect-src 'self' kitchenwarehouse.com.au *.kitchenwarehouse.com.au;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
