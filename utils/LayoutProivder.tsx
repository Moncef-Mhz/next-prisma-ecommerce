"use client";
import Header from "@/components/global/Header";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/lib/theme-provider";
import { useEffect, useState } from "react";
import { StateContext, useStateContext } from "@/context/StateContext";

const LayoutProivder = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const path = usePathname();
  const isDashboard = path?.split("/")[1] === "dashboard";

  if (!mounted) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (isDashboard) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    );
  } else {
    return (
      <>
        <StateContext>
          <Header />
          {children}
        </StateContext>
      </>
    );
  }
};
export default LayoutProivder;
