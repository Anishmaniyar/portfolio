import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm font-medium tracking-widest text-zinc-500 uppercase">
        404
      </p>
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="max-w-md text-zinc-600 dark:text-zinc-400">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:opacity-90"
      >
        Go back home
      </Link>
    </main>
  );
}
