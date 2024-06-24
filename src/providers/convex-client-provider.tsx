"use client";

import { AuthLoading, Authenticated, ConvexReactClient, Unauthenticated } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Loading } from "@/components/auth/loading";

interface ConvexClientProviderProps {
  children: React.ReactNode
}


const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL
const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

const convex = new ConvexReactClient(convexUrl as string)


export const ConvexClientProvider = ( {
  children
}: ConvexClientProviderProps) => {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>

        <Authenticated>
          {children}
        </Authenticated>

        <Unauthenticated>
          {children}
        </Unauthenticated>

        <AuthLoading>
          <Loading />
        </AuthLoading>
        
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
};

