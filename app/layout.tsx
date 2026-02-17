import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { personal } from "@/data/personal";
import Navbar from "@/components/nav/Navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const description =
  "Data scientist and engineer at the intersection of machine learning, cloud infrastructure, and scalable data systems.";

export const metadata: Metadata = {
  metadataBase: new URL(personal.siteUrl),
  title: `${personal.name} | ${personal.title}`,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${personal.name} | ${personal.title}`,
    description,
    url: "/",
    siteName: personal.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} | ${personal.title}`,
    description,
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  jobTitle: personal.title,
  url: personal.siteUrl,
  email: `mailto:${personal.email}`,
  sameAs: [personal.linkedin, personal.github],
};

const themeScript = `(function(){var t=localStorage.getItem('theme');if(t==='light'||(!t&&window.matchMedia('(prefers-color-scheme: light)').matches)){document.documentElement.classList.remove('dark')}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white text-slate-700 dark:bg-slate-950 dark:text-slate-200`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
