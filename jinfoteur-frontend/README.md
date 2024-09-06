# JInfoTeur Frontend

NextJS Frontend for JinfoTeur system made with Hexagonal Architecture and DDD as a modular monolith.

## Most Important Domain Concepts of this app.

1. Everything's based around the concept of integrations with other services whenever possible, ideally they should be cheap or "free" (able to be self-hosted).

2. Categories and tags will act as a means to organize information, the idea is to make the system as flexible as possible. Initially most categories will be created as default categories, with the possibility to create more categories with a default UI/UX and functionality (personalization in this matter is not a priority).

3. It will be possible to create arbitrary subcategories within any subcategory to further organize its information.

4. Global search functionality will be implemented to browse information more easily.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
