import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { SoundscapeProvider } from "@/components/sound/soundscape-provider";
import { site } from "@/lib/site";

import "./globals.css";

// Self-hosted, subset to the glyphs the site uses and instanced to the axes it needs
// (see scripts/subset-fonts.py): 46 KB for both families instead of 81 KB from Google Fonts.
const fraunces = localFont({
  src: "./fonts/fraunces-soft.woff2",
  variable: "--font-fraunces",
  weight: "400 600",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

// "optional": body text never re-renders after first paint, which keeps LCP at first paint
// and CLS at zero. The font is preloaded, so it's almost always ready in time.
const figtree = localFont({
  src: "./fonts/figtree.woff2",
  variable: "--font-figtree",
  weight: "400 700",
  display: "optional",
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [site.author],
  creator: site.author.name,
  keywords: [
    "somatic journal",
    "body scan",
    "box breathing",
    "emotional check-in",
    "mindfulness",
    "journaling app",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    url: "/",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  appleWebApp: { title: site.name, statusBarStyle: "default" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f2ec" },
    { media: "(prefers-color-scheme: dark)", color: "#141016" },
  ],
  colorScheme: "light dark",
};

/**
 * Runs before first paint: applies the saved theme and motion setting (no flash) and stores the
 * visitor's time zone in a cookie so server-rendered dates match their clock.
 */
const bootScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.dataset.theme=t;var m=JSON.parse(localStorage.getItem("pref:motion")||"null");if(m==="reduce"||m==="full")d.dataset.motion=m}catch(e){}try{var z=encodeURIComponent(Intl.DateTimeFormat().resolvedOptions().timeZone);if(z&&document.cookie.indexOf("tz="+z)<0)document.cookie="tz="+z+";path=/;max-age=31536000;samesite=lax"}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className={`${fraunces.variable} ${figtree.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-primary px-5 py-3 font-semibold text-on-primary focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SoundscapeProvider>{children}</SoundscapeProvider>
      </body>
    </html>
  );
}
