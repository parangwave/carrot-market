/** @type {import('next').NextConfig} */
// NextJS의 Image는 이미지를 자동으로 최적화 -> 성능 up, 빠른 로딩
// 하지만 외부 호스트의 이미지(다른 사이트의 이미지 링크 등)를 불러올 때는 보안 상의 이유로 허용 X
// 따라서 next.config.mjs에서 hostname들을 등록해야함
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "imagedelivery.net",
      },
    ],
  },
}

export default nextConfig
