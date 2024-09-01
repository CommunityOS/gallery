import React from "react";
import "./globals.css";
import { Nav } from "../src/components/Nav";
import { Toaster } from "../src/components/ui/toaster";
import { Metadata } from "next";
import { ShallowRoutingProvider } from "../src/components/Transitions/ShallowRoutingProvider";

export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    metadataBase: new URL("/", process.env.NEXT_PUBLIC_BASE_URL),
    title: "CommunityOS Gallery",
    description: "Revive los eventos de la comunidad de CommunityOS!",
    openGraph: {
      siteName: "CommunityOS Gallery",
      title: "CommunityOS Gallery",
      description: "Revive los eventos de la comunidad de CommunityOS!",
      type: "website",
      images: [
        new URL("/og-image.jpg", process.env.NEXT_PUBLIC_BASE_URL).toString(),
      ],
      url: new URL(`/`, process.env.NEXT_PUBLIC_BASE_URL).toString(),
    },
    twitter: {
      card: "summary_large_image",
      site: "@CommunityOS_",
      title: "CommunityOS Gallery",
      description: "Revive los eventos de la comunidad de CommunityOS!",
      images: [
        {
          url: new URL(
            `/og-image.png`,
            process.env.NEXT_PUBLIC_BASE_URL,
          ).toString(),
          width: 1200,
          height: 630,
          alt: "CommunityOS Gallery",
        },
      ],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ShallowRoutingProvider>
      <html lang="es">
        <head />
        <body className="dark antialiased h-[100dvh] w-[100dvw] flex flex-col overflow-hidden">
          <Nav />
          <div className="h-full overflow-auto relative flex flex-col">
            {children}
          </div>
          <Toaster />
        </body>
      </html>
    </ShallowRoutingProvider>
  );
}
