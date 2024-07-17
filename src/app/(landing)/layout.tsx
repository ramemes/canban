"use client";


interface LandingPageLayoutProps {
  children: React.ReactNode;
};

const LandingPageLayout = ({
  children
}: LandingPageLayoutProps) => {
  return (
    <>
      {children}
    </>
  )
}

export default LandingPageLayout;