import Link from "next/link";
import "./globals.css";

export default function RootNotFound() {
  return (
    <html lang="sr">
      <head>
        <title>404 | Nikola Šepić</title>
        <meta name="robots" content="noindex" />
      </head>
      <body className="flex min-h-dvh flex-col items-center justify-center p-8 text-center">
        <h1 className="text-5xl font-medium tracking-tight">404</h1>
        <p className="mt-3 text-ink-2">Stranica ne postoji. / Page not found.</p>
        <Link href="/" className="btn btn-primary mt-8">
          sepic.me →
        </Link>
      </body>
    </html>
  );
}
