"use client";
import Header from "@/components/global/Header";
import { usePathname } from "next/navigation";
const LayoutProivder = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const path = usePathname();
  //   console.log(path.split("/")[1]);
  if (path.split("/")[1] === "dashboard") {
    return <>{children}</>;
  } else {
    return (
      <>
        <Header />
        {children}
      </>
    );
  }
};
export default LayoutProivder;
