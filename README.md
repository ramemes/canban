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


## Environment Variables Template (test/dev environment)

# Deployment used by `npx convex dev`

CONVEX_DEPLOYMENT=dev:your-deployment-string
NEXT_PUBLIC_CONVEX_URL=https://your-deployment-string.convex.cloud

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...


Running your own Backend and Authentication: Sign up on Convex and Clerk and get your own environment variables accordingly
