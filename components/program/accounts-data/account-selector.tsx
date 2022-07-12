import { memo, useState } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function AccountSelector({
  accounts,
  selectedAccount,
  setSelectedAccount,
  setCurrentPage,
}: AccountSelectorProps) {
  const [query, setQuery] = useState("");

  const filteredAccounts =
    query === ""
      ? accounts
      : accounts.filter((account) => {
          return account.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      className="w-80"
      as="div"
      value={selectedAccount}
      onChange={(account) => {
        setSelectedAccount(account);
        setCurrentPage(0);
      }}
    >
      <Combobox.Label className="block text-xl font-medium text-gray-700">
        Account
      </Combobox.Label>
      <div className="relative mt-5">
        <Combobox.Input
          placeholder="Select an account"
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(account) => account}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredAccounts.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredAccounts.map((account) => (
              <Combobox.Option
                key={account}
                value={account}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-amber-500 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex items-center">
                      {/* TODO: icon */}
                      <span
                        className={classNames(
                          "ml-3 truncate",
                          selected && "font-semibold"
                        )}
                      >
                        {account}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-amber-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}

interface AccountSelectorProps {
  accounts: string[];
  selectedAccount: string;
  setSelectedAccount: (account: string) => void;
  setCurrentPage: (page: number) => void;
}

export default memo(AccountSelector);
