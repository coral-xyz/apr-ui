import { Fragment, memo, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/solid";
import {
  DuplicateIcon,
  ExternalLinkIcon,
  IdentificationIcon,
  LinkIcon,
  LogoutIcon,
  MenuIcon,
  SearchIcon,
  XIcon,
} from "@heroicons/react/outline";
import { GlobalHotKeys } from "react-hotkeys";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useSWR from "swr";
import { signIn, signOut, useSession } from "next-auth/react";
import bs58 from "bs58";
import fetcher from "../utils/fetcher";

const Search = dynamic(() => import("./search"));

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function Nav() {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const { data = [], error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v0/programs/latest`,
    fetcher
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { pathname } = useRouter();
  const { data: session, status } = useSession();
  const { wallet, publicKey, signMessage, connected } = useWallet();
  const { setVisible } = useWalletModal();

  const keyMap = {
    SEARCH: "command+k",
  };

  const handlers = {
    SEARCH: () => setShowSearch(true),
  };

  useEffect(() => {
    async function login() {
      const message = `Sign this message for authenticating with your wallet`;
      const encodedMessage = new TextEncoder().encode(message);
      try {
        const signedMessage = await signMessage(encodedMessage);

        signIn("credentials", {
          publicKey: publicKey,
          signature: bs58.encode(signedMessage),
          callbackUrl: `${window.location.origin}/`,
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (connected && status === "unauthenticated") login();
  }, [wallet, status, publicKey, connected, signMessage]);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Disclosure as="nav" className="bg-gray-900">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex items-center gap-4 px-2 lg:px-0">
                  {/* Logo */}
                  <Link href="/">
                    <div className="flex cursor-pointer">
                      <Image
                        alt=""
                        src="/logo.png"
                        width="120px"
                        height="40px"
                      />
                    </div>
                  </Link>
                </div>

                {/* Search */}
                {pathname !== "/" && (
                  <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
                    <div className="hidden justify-center gap-2 lg:flex">
                      <div className="relative w-96">
                        <button
                          onClick={() => setShowSearch(true)}
                          className="shadow-xs flex h-12 w-full cursor-text items-center
                justify-between rounded-md border border-gray-700 bg-gray-700 px-5  shadow focus:outline-none"
                        >
                          <div className="flex flex-row items-center gap-2 text-gray-500">
                            <SearchIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="text-gray-400">
                              Search by name or address
                            </span>
                          </div>
                          <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                            <kbd className="inline-flex items-center rounded border border-gray-500 px-2 font-sans text-sm font-medium text-gray-400">
                              ⌘K
                            </kbd>
                          </div>
                        </button>
                      </div>
                    </div>
                  </GlobalHotKeys>
                )}

                {/* Actions */}
                <div className="flex flex-row items-center gap-8">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://anchor-lang.com?utm_source=apr.dev"
                    className="hidden items-center gap-1 font-medium text-gray-50 hover:text-gray-100 sm:flex"
                  >
                    Docs
                    <ExternalLinkIcon className="h-5 w-5" aria-hidden="true" />
                  </a>

                  {/* Wallet not connected  */}
                  {status === "unauthenticated" && (
                    <button
                      type="button"
                      className="flex flex-row items-center gap-1 rounded-md border-0 bg-gradient-to-r from-teal-500 to-blue-500 px-4 py-2 text-sm font-medium tracking-wide text-gray-50 shadow-sm"
                      onClick={() => setVisible(true)}
                    >
                      <LinkIcon className="h-4 w-4" />
                      Login with Wallet
                    </button>
                  )}

                  {/* Wallet Connected desktop */}
                  {status === "authenticated" && (
                    <div className="hidden lg:block">
                      <div className="flex items-center">
                        {/* Auth or Profile */}
                        <Menu as="div" className="z-2 relative flex-shrink-0">
                          <div>
                            <Menu.Button className="flex cursor-pointer border-0 bg-gray-900">
                              <span className="sr-only">Open user menu</span>
                              <UserCircleIcon className="h-8 w-8 text-gray-100" />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              className="absolute right-0 mt-2
                        w-48 origin-top-right rounded-md bg-gray-50 py-1
                        shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <Menu.Item>
                                {({ active }) => (
                                  <div className="flex flex-col border-b px-3 py-2">
                                    <span>Connected as</span>
                                    <span className="font-bold">
                                      {publicKey && (
                                        <>
                                          {publicKey.toBase58().slice(0, 6)}...
                                          {publicKey.toBase58().slice(-4)}
                                        </>
                                      )}
                                    </span>
                                  </div>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Link href="/account">
                                    <a
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block flex w-full flex-row gap-2 px-4 py-2 text-sm text-gray-900"
                                      )}
                                    >
                                      <IdentificationIcon className="h-5 w-5" />
                                      My Account
                                    </a>
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block flex w-full flex-row gap-2 px-4 py-2 text-sm text-gray-900"
                                    )}
                                    onClick={() => {
                                      navigator.clipboard.writeText(
                                        publicKey.toBase58()
                                      );
                                    }}
                                  >
                                    <DuplicateIcon className="h-5 w-5" />
                                    Copy Address
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => signOut()}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block flex w-full flex-row gap-2 border-t px-4 py-2 text-sm text-gray-900"
                                    )}
                                  >
                                    <LogoutIcon className="h-5 w-5" />
                                    Disconnect
                                  </button>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  )}

                  {/* Mobile menu button */}
                  {status === "authenticated" && (
                    <div className="flex lg:hidden">
                      <Disclosure.Button
                        className="inline-flex items-center
                justify-center rounded-md p-2 text-gray-100 hover:bg-gray-700
                hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      >
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              {/* Connected menu, mobile version */}
              {status === "authenticated" && (
                <div className="mt-3 space-y-1">
                  <Disclosure.Button className="ml-3 block w-full text-left">
                    <div className="flex flex-col tracking-wide">
                      <span className="text-sm text-gray-300">
                        Connected as
                      </span>
                      <span className="text-gray-50">
                        {publicKey && (
                          <>
                            {publicKey.toBase58().slice(0, 6)}...
                            {publicKey.toBase58().slice(-4)}
                          </>
                        )}
                      </span>
                    </div>
                  </Disclosure.Button>

                  <Disclosure.Button
                    className="flex w-full items-center rounded-md
                   p-2 text-left
                     text-base font-medium text-gray-100 hover:bg-gray-700 hover:text-gray-50"
                  >
                    <Link href="/account">
                      <div className="flex gap-3 text-gray-100">
                        <IdentificationIcon className="h-5 w-5" />
                        My Account
                      </div>
                    </Link>
                  </Disclosure.Button>

                  <Disclosure.Button
                    className="flex w-full items-center gap-3 rounded-md
                    p-2 text-left text-base
                     font-medium text-gray-100 hover:bg-gray-700 hover:text-gray-50"
                    onClick={() => {
                      navigator.clipboard.writeText(publicKey.toBase58());
                    }}
                  >
                    <DuplicateIcon className="h-5 w-5" />
                    Copy Address
                  </Disclosure.Button>
                  <Disclosure.Button
                    className="flex w-full items-center gap-3 rounded-md
                    p-2 text-left text-base
                     font-medium text-gray-100 hover:bg-gray-700 hover:text-gray-50"
                    onClick={() => signOut()}
                  >
                    <LogoutIcon className="h-5 w-5" />
                    Disconnect
                  </Disclosure.Button>
                </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {showSearch && (
        <Search open={showSearch} setOpen={setShowSearch} programs={data} />
      )}
    </>
  );
}

export default memo(Nav);
