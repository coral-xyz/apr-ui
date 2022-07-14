import { memo, useCallback, useEffect, useState } from "react";
import { AnchorProvider, Program } from "@project-serum/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import AccountSelector from "./account-selector";
import AccountsDataFilter from "./filter";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { CollectionIcon } from "@heroicons/react/solid";

function AccountsData({ idl, programID }: AccountsDataProps) {
  const [selectedAccount, setSelectedAccount] = useState<string>();
  const [data, setData] = useState<any[]>([]);
  // Pagination
  const [accountsLength, setAccountsLength] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pages, setPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  // Filter
  const [option, setOption] = useState("");
  const [filter, setFilter] = useState<any>({});

  // Initialize Anchor program
  const defineProgram = useCallback(async (): Promise<any> => {
    try {
      // TODO: env var
      const connection = new Connection(
        process.env.NEXT_PUBLIC_NODE_URL as string
      );

      const provider = new AnchorProvider(
        connection,
        {
          publicKey: PublicKey.default,
          signAllTransactions: undefined,
          signTransaction: undefined,
        },
        { commitment: "processed", skipPreflight: true }
      );

      return new Program(idl, programID, provider);
    } catch (e) {
      console.error("Error:", e);
    }
  }, [idl, programID]);

  // Find all accounts
  const getAccounts = useCallback(
    async (accountName: string): Promise<any> => {
      try {
        const program = await defineProgram();

        // normalize account name
        const name = accountName.charAt(0).toLowerCase() + accountName.slice(1);

        let accountFilter: any | undefined = undefined;
        if (filter.offset && filter.bytes) {
          accountFilter = [
            {
              memcmp: {
                offset: Number(filter.offset),
                bytes: filter.bytes,
              },
            },
          ];
        }

        // Get all accounts
        const accounts = await program.account[name].all(accountFilter);

        // Pagination
        setAccountsLength(accounts.length);
        setPages(Math.ceil(accounts.length / 10));

        return accounts.map((account) => {
          return account.publicKey;
        });
      } catch (e) {
        console.log("Error:", e);
      }
    },
    [defineProgram, filter]
  );

  // Get data for selected accounts
  const getData = useCallback(
    async (accountName: string): Promise<any> => {
      try {
        const program = await defineProgram();

        // normalize account name
        const name = accountName.charAt(0).toLowerCase() + accountName.slice(1);

        // Check if I need to find an specific account or all accounts
        if (filter.address) {
          const data = await program.account[name].fetch(filter.address);
          setAccountsLength(1);
          setPages(1);
          return data;
        } else {
          const pks = await getAccounts(accountName);
          return await program.account[name].fetchMultiple(
            pks.slice(currentPage, currentPage + pageSize)
          );
        }
      } catch (e) {
        console.log("Error:", e);
      }
    },
    [defineProgram, getAccounts, currentPage, pageSize]
  );

  useEffect(() => {
    async function fetchData() {
      const data = await getData(selectedAccount);
      setData(data);
    }
    if (selectedAccount) fetchData();
  }, [getData, selectedAccount, filter]);

  // List of accounts names to display
  const listOfAccounts = idl.accounts.map((account) => account.name);

  return (
    <div>
      <div className="my-4 flex flex-col gap-4 md:flex-row">
        <div className="w-6/12">
          <AccountSelector
            selectedAccount={selectedAccount}
            setSelectedAccount={setSelectedAccount}
            accounts={listOfAccounts}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div>
          <AccountsDataFilter
            filter={filter}
            setFilter={setFilter}
            option={option}
            setOption={setOption}
          />
        </div>
      </div>

      <div className="rounded-t-md border border-slate-300">
        <div className="flex justify-between bg-slate-100 py-2 px-4">
          {/* Account name */}
          <div className="flex items-center gap-2">
            <CollectionIcon className="h-6 w-6 text-gray-500" />
            <h5 className=" tracking-wide text-gray-700">
              {selectedAccount ? selectedAccount : "Select an Account"}
            </h5>
          </div>

          {/* Pagination state */}
          {selectedAccount && (
            <div className="flex items-center">
              Showing {currentPage * pageSize} to{" "}
              {accountsLength >= pageSize
                ? pageSize * currentPage + pageSize
                : accountsLength}{" "}
              of {accountsLength} results
            </div>
          )}

          {/* Pagination actions */}
          <div className="flex justify-between sm:justify-end">
            <button
              disabled={currentPage === 0}
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
              className="relative inline-flex items-center rounded-md border border-gray-300
               bg-white px-4 py-2 text-sm font-medium text-gray-700
                hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="relative ml-3 inline-flex items-center
               rounded-md border border-gray-300 bg-white px-4 py-2
                text-sm font-medium text-gray-700 hover:bg-gray-50
                 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={currentPage === pages - 1 || !selectedAccount}
            >
              Next
            </button>
          </div>
        </div>

        <div className="prose min-w-full border-t prose-img:mx-auto prose-img:mt-0 prose-img:mb-0 prose-img:max-h-[150px] prose-img:max-w-[150px]">
          <SyntaxHighlighter
            showLineNumbers
            wrapLongLines
            language="json"
            customStyle={{ fontSize: 15, margin: 0 }}
          >
            {JSON.stringify(data, null, 2)}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}

interface AccountsDataProps {
  idl: any;
  programID: string;
}

export default memo(AccountsData);

// {
//   "publicKey": "HWx6Bcau9SJGcdX5PYTeFGzrhwVcFRrj2D1jadicLVkj",
//     "account": {
//   "realm": "78TbURwqF71Qk4w1Xp6Jd2gaoQb6EC7yKBh5xDJmq6qh",
//       "governingTokenMint": "JET6zMJWkCN9tpRT2v2jfAmm5VnQFDpUBCyaKojmGtz",
//       "owner": "CNEnSergUBN37aAXYTAGxKScv46eS1zTBfettQkKMhJ9",
//       "voterWeight": "1e2033af",
//       "voterWeightExpiry": null,
//       "weightAction": {
//     "castVote": {}
//   },
//   "weightActionTarget": null,
//       "reserved": [
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0
//   ]
// }
// }
