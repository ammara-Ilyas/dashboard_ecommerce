/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {

  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "via.placeholder.com",
  //       port: "",
  //       pathname: "/**",
  //     },
  //     {
  //       protocol: "https",
  //       hostname: "fakestoreapi.com",
  //       port: "",
  //       pathname: "/**",
  //     },
  //     {
  //       protocol: "https",
  //       hostname: "res.cloudinary.com",
  //       port: "",
  //       pathname: "/**",
  //     },
  //   ],
  // },
  images: {
    domains: ["res.cloudinary.com", "via.placeholder.com"],
  },
};

export default nextConfig;
