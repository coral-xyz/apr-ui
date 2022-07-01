import { Fragment, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { FilterIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Search({ programs, open, setOpen }: ProgramsProps) {
  const [query, setQuery] = useState("");

  const filteredPrograms =
    query === ""
      ? []
      : programs.filter((program) => {
          if (program.name.toLowerCase().includes(query.toLowerCase())) {
            return true;
          } else if (
            program.address.toLowerCase().includes(query.toLowerCase())
          ) {
            return true;
          }
          return false;
        });

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setQuery("")}
      appear
    >
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform rounded-xl bg-white p-2 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox
                onChange={(program) =>
                  (window.location = `/program/${program.address}`)
                }
              >
                <Combobox.Input
                  className="w-full rounded-md border-0 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  placeholder="Search by name or address"
                  onChange={(event) => setQuery(event.target.value)}
                />

                {filteredPrograms.length > 0 && (
                  <Combobox.Options
                    static
                    className="-mb-2 max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                  >
                    {filteredPrograms.map((program) => (
                      <Combobox.Option
                        key={program.id}
                        value={program}
                        className={({ active }) =>
                          classNames(
                            "cursor-default select-none border-b border-gray-200 px-4 py-2",
                            active && "bg-sky-50 text-sky-500"
                          )
                        }
                      >
                        <div className="flex flex-col gap-1">
                          <span className="font-medium tracking-wide">
                            {program.name}
                          </span>
                          <span className="tracking-wide">
                            {program.address}
                          </span>
                        </div>
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}

                {query !== "" && filteredPrograms.length === 0 && (
                  <div className="py-14 px-4 text-center sm:px-14">
                    <FilterIcon
                      className="mx-auto h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                    <p className="mt-4 text-sm text-gray-900">
                      No programs found using that search term.
                    </p>
                  </div>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

interface ProgramsProps {
  programs: any[];
  open: boolean;
  setOpen: (open: boolean) => void;
}
