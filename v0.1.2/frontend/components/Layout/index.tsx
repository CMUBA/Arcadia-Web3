import { FC, ReactNode } from 'react';
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Arcadia Game</h1>
          <WalletSelector />
        </nav>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout; 