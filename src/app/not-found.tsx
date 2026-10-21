import Link from "next/link";

import SiteFooter from "../components/SiteFooter";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-background">
      <main className="flex w-full flex-1 flex-col px-6">
        <div className="notfound">
          <p className="notfound-code">404</p>
          <h1 className="notfound-title">Page not found</h1>
          <p className="notfound-text">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <Link href="/" className="notfound-link">
            Back home
          </Link>
        </div>
        <SiteFooter />
      </main>
    </div>
  );
}
