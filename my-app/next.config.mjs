/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "sportstock.co.il",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.fitbander.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "bashgal.co.il",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "komodosports.co.uk",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
