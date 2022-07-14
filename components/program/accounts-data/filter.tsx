import { memo } from "react";
import { RadioGroup } from "@headlessui/react";

const filterOptions = ["address", "memcmp"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function AccountsDataFilter({
  filter,
  setFilter,
  option,
  setOption,
}: AccountsDataFilterProps) {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-600">Filter using:</h2>
      </div>

      <RadioGroup value={option} onChange={setOption} className="mt-2">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {filterOptions.map((option) => (
            <RadioGroup.Option
              key={option}
              value={option}
              onClick={() => setFilter({})}
              className={({ active, checked }) =>
                classNames(
                  "cursor-pointer focus:outline-none",
                  active ? "ring-2 ring-amber-500 ring-offset-2" : "",
                  checked
                    ? "border-transparent bg-amber-600 text-white hover:bg-amber-700"
                    : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
                  "flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium sm:flex-1"
                )
              }
            >
              <RadioGroup.Label as="span">{option}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>

      {option === "address" && (
        <div className="mt-5 flex w-full rounded-md shadow-sm">
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
            account
          </span>
          <input
            type="text"
            name="offset"
            id="offset"
            onChange={(event) =>
              setFilter({ ...filter, address: event.target.value })
            }
            className="block w-28 flex-1 rounded-none rounded-r-md border-gray-300 px-3 py-2 focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
            placeholder="HWx6Bcau9SJGcdX5PYTeFGzrhwVcFRrj2D1jadicLVkj"
          />
        </div>
      )}

      {option === "memcmp" && (
        <>
          <div className="mt-5 flex w-fit rounded-md shadow-sm">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
              offset
            </span>
            <input
              type="number"
              name="offset"
              id="offset"
              onChange={(event) =>
                setFilter({ ...filter, offset: event.target.value })
              }
              className="block w-28 flex-1 rounded-none rounded-r-md border-gray-300 px-3 py-2 focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
              placeholder="1"
            />
          </div>

          <div className="mt-5 flex rounded-md shadow-sm">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
              bytes
            </span>
            <input
              type="text"
              name="bytes"
              onChange={(event) =>
                setFilter({ ...filter, bytes: event.target.value })
              }
              id="bytes"
              className="block w-96 flex-1 rounded-none rounded-r-md border-gray-300 px-3 py-2 focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
              placeholder="AYtuQqncT1C7rY1M5sgupBNj8tqemkN3PJ9smGVdRgMJ"
            />
          </div>
        </>
      )}
    </div>
  );
}

interface AccountsDataFilterProps {
  filter: any;
  option: string;
  setFilter: (filter: any) => void;
  setOption: (option: string) => void;
}

export default memo(AccountsDataFilter);
