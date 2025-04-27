# Gargi's Birthday Website

A celebratory website for Gargi's birthday with themed pages featuring her favorite things.

## Image System

The website now includes an image system for displaying images on all theme cards. Here's how it works:

1. All images are stored in the `public/images` directory
2. Each theme has its own subdirectory:
   - `/public/images/bts/` - BTS members
   - `/public/images/aot/` - Attack on Titan scenes
   - `/public/images/cats/` - Cat images
   - `/public/images/dogs/` - Dog images
   - `/public/images/nature/` - Nature landscapes
   - `/public/images/wildlife/` - Wildlife images

3. Image naming convention:
   - Images should be named according to the name in each card, but lowercase and with spaces replaced by hyphens
   - Examples:
     - "RM" -> `rm.jpg`
     - "Majestic Lion" -> `majestic-lion.jpg`
     - "Mountain Peak" -> `mountain-peak.jpg`

4. Image format:
   - All images should be in JPG format
   - Recommended aspect ratio for most images is 1:1 (square)
   - For nature scenes, 16:9 aspect ratio is used

5. Fallback:
   - If an image is not found, a placeholder will be shown instead

## How to Add/Replace Images

1. Prepare your images in the correct format (jpg)
2. Name them according to the naming convention above
3. Place them in the appropriate theme directory
4. The website will automatically use these images for the cards

## Development

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
