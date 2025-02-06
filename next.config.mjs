/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export", // Enables static export mode
    reactStrictMode: true,
    assetPrefix: "/tucanu10.github.io/", // ✅ FIXED: Added leading slash
    basePath: "/tucanu10.github.io",
    images: {
      unoptimized: true
    }
  };
  
  export default nextConfig;
  