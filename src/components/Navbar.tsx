"use client";

import { WalletSelector } from "./WalletSelector";
import { ThemeToggle } from "./ThemeToggle";
import { useHero } from "./HeroProvider";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Link from "next/link";

export function Navbar() {
  const { connected } = useWallet();
  const { hero } = useHero();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Arcadia</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/marketplace">Marketplace</Link>
            <Link href="/landing">Game</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {hero && (
            <div className="text-sm">
              Level {hero.level} Hero
            </div>
          )}
          <ThemeToggle />
          <WalletSelector />
        </div>
      </div>
    </header>
  );
} 