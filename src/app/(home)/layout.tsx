import CopyRight from "@/components/home/layout/copyRight";
import FooterSection from "@/components/home/layout/footer";
import Header from "@/components/home/layout/header";
import IntroVideo from "@/components/introVideo/introVideo";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
  <Header/>
  {children}
  <FooterSection/>
  <CopyRight/>
   <IntroVideo/>
  </>;
}
