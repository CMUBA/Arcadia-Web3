import { Link } from "react-router-dom";
import { Disclosure } from '@headlessui/react';
import { WalletSelector } from "./WalletSelector";
import { Collection } from "@/types/collection";
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

// Change to named export
export function NavBar({ onCollectionSelect, currentCollectionId, showCollectionSelector = true }: NavBarProps) {
  return (
    <Disclosure as="nav" className="bg-black">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Left side - Navigation Links */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="/logo.svg"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side - Collection Selector and Wallet */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {showCollectionSelector && onCollectionSelect && (
                  <CollectionSelector
                    onCollectionSelect={onCollectionSelect}
                    currentCollectionId={currentCollectionId}
                  />
                )}
                <WalletSelector />
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
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