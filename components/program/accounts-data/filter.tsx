import { memo } from "react";

function AccountsDataFilter({ filter, setFilter }: AccountsDataFilterProps) {
  return (
    <div>
      <label
        htmlFor="offset"
        className="mt-2 block text-base font-medium text-gray-500"
      >
        Filter by:
      </label>

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
    </div>
  );
}

interface AccountsDataFilterProps {
  filter: any;
  setFilter: (filter: any) => void;
}

export default memo(AccountsDataFilter);
