import Link from "next/link";
import { site } from "../site";

export function placeholderMetadata(title, path) {
  return {
    title,
    description: `${title} at Unnity Media. This page is being prepared.`,
    robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
    ...(site.url ? { alternates: { canonical: path } } : {}),
  };
}

export default function PlaceholderPage({ title }) {
  return <main id="main-content" tabIndex={-1} className="mx-auto flex min-h-[65svh] w-full max-w-4xl flex-col items-center justify-center px-6 py-24 text-center">
    <p className="mb-6 text-xs tracking-wide text-[#8b7c9c]">Unnity Media</p>
    <h1 className="text-4xl font-medium tracking-tight text-[#0f032b] sm:text-5xl">{title}</h1>
    <p className="mt-6 max-w-sm text-sm leading-7 text-[#786e85]">Something thoughtful is on its way. This page is being prepared.</p>
    <Link href="/" className="mt-9 rounded-md bg-[#0f032b] px-6 py-3 text-sm text-white transition-colors hover:bg-[#080709] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8f74b3]">Back to home <span aria-hidden="true">↗</span></Link>
  </main>;
}
