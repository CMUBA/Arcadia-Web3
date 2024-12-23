import { Link } from "react-router-dom";
import { Disclosure } from '@headlessui/react';
import { WalletSelector } from "./WalletSelector";
import { Collection } from "@/config/collections";
import { CollectionSelector } from "./CollectionSelector";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// Define navigation items interface
interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

// Define navigation array with proper typing
const navigation: NavigationItem[] = [
  { name: 'Home', href: '/', current: false },
  { name: 'Market', href: '/mint', current: true },
];

interface NavBarProps {
  onCollectionSelect?: (collection: Collection) => void;
  currentCollectionId?: string;
  showCollectionSelector?: boolean;
}

export function NavBar({ onCollectionSelect, currentCollectionId, showCollectionSelector = true }: NavBarProps) {
  return (
    <Disclosure as="nav" className="bg-black">
      {() => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              {/* Left side - Navigation Links and Collection Selector */}
              <div className="flex flex-1 items-center justify-start">
                <div className="flex items-center space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-4 py-3 text-lg font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                  {/* Collection Selector moved here */}
                  {showCollectionSelector && onCollectionSelect && (
                    <CollectionSelector
                      onCollectionSelect={onCollectionSelect}
                      currentCollectionId={currentCollectionId}
                    />
                  )}
                </div>
              </div>

              {/* Right side - Wallet */}
              <div className="flex items-center">
                <WalletSelector />
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-2 px-4 pb-4 pt-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-4 py-3 text-lg font-medium w-full text-left'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
} 