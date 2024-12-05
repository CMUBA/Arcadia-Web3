"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import { WalletSelector } from "@/components/WalletSelector";
import { useAutoConnect } from "@/components/AutoConnectProvider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const { autoConnect, setAutoConnect } = useAutoConnect();

  return (
    <nav className="border-b w-full bg-background sticky top-0 z-50">
      <div className="max-w-[1000px] mx-auto px-6 md:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-xl">
              Arcadia
            </Link>
            
            <div className="flex gap-4">
              <Link 
                href="/landing"
                className={`${pathname === '/landing' ? 'text-primary font-medium' : 'text-muted-foreground'} hover:text-primary transition-colors`}
              >
                Landing
              </Link>
              <Link 
                href="/marketplace"
                className={`${pathname === '/marketplace' ? 'text-primary font-medium' : 'text-muted-foreground'} hover:text-primary transition-colors`}
              >
                Marketplace
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <Switch
                id="auto-connect-switch"
                checked={autoConnect}
                onCheckedChange={setAutoConnect}
              />
              <Label htmlFor="auto-connect-switch" className="text-sm">
                Auto reconnect
              </Label>
            </label>
            <ThemeToggle />
            <WalletSelector />
          </div>
        </div>
      </div>
    </nav>
  );
} 