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

  if (!mounted) {
    return <div />; // Or a loading spinner
  }
  if (path.split("/")[1] === "dashboard") {
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
