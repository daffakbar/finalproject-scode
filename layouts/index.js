import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const MenuComponent = dynamic(() => import("@/components/menu"));
const HeaderComponent = dynamic(() => import("@/components/header"));

export default function Layout({
  children,
  metaTitle,
  metaDescription,
  metaKeyword,
}) {
  const router = useRouter();
  const { pathname } = router;

  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";
  const shouldHideHeaderAndMenu = isLoginPage || isRegisterPage;
  return (
    <div className="container mx-auto">
      <Head>
        <title>{`DialogueTalk - ${metaTitle}`}</title>
        <meta name="description" content={metaDescription || "DialogueTalk"} />
        <meta name="keywords" content={metaKeyword || "DialogueTalk"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!shouldHideHeaderAndMenu && <HeaderComponent />}
      <div>{children}</div>
      {!shouldHideHeaderAndMenu && <MenuComponent />}
    </div>
  );
}
