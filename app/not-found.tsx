// Root not-found: renders for paths that never matched a locale segment.
// Keep it dependency-free so it works without the intl provider.
import Link from "next/link";
import "./globals.css";

export default function RootNotFound() {
  return (
    <html lang="sr">
      <body className="flex min-h-full flex-col items-center justify-center p-8 text-center">
        <h1 className="text-3xl font-semibold">404</h1>
        <p className="mt-2">Stranica ne postoji. / Page not found.</p>
        <Link href="/" className="mt-6 underline">
          sepic.me
        </Link>
      </body>
    </html>
  );
}
