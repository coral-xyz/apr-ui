import {
  ClockIcon,
  CodeIcon,
  DocumentTextIcon,
  FolderOpenIcon,
  ShieldCheckIcon,
  TerminalIcon,
} from "@heroicons/react/solid";
import * as React from "react";
import { memo } from "react";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const Readme = dynamic(() => import("./readme"));
const Builds = dynamic(() => import("./builds"));
const IdlViewer = dynamic(() => import("./idl-viewer"), { ssr: false });
const SourceFiles = dynamic(() => import("./source-files"));

const tabs = [
  { name: "Readme", icon: DocumentTextIcon },
  { name: "Explorer", icon: CodeIcon },
  { name: "IDL", icon: TerminalIcon },
  { name: "Builds", icon: ClockIcon },
  { name: "Audits", icon: ShieldCheckIcon, disabled: true },
  { name: "Dependencies", icon: FolderOpenIcon, disabled: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Tabs({ selectedBuild, builds, readme, files }: TabsProps) {
  const router = useRouter();
  const { data: idl } = useSWR(selectedBuild.artifacts.idl as string, fetcher);

  const selectedTab = router.query.tab || "Readme";

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          defaultValue={tabs.find((tab) => tab.name === selectedTab).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => {
                  // setSelectedTab(tab.name)
                  router.push(
                    `/program/${router.query.address}?tab=${tab.name}`
                  );
                }}
                disabled={tab.disabled || (tab.name === "IDL" && !idl)}
                className={classNames(
                  tab.name === selectedTab
                    ? "border-amber-500 text-amber-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium disabled:cursor-not-allowed disabled:text-gray-300"
                )}
                aria-current={tab.name === selectedTab ? "page" : undefined}
              >
                <tab.icon
                  className={classNames(
                    tab.name === selectedTab
                      ? "text-amber-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    (tab.disabled || (tab.name === "IDL" && !idl)) &&
                      "text-gray-300 group-hover:text-gray-300",
                    "-ml-0.5 mr-2 h-5 w-5"
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {selectedTab === "Readme" && <Readme readme={readme} />}
      {selectedTab === "Builds" && <Builds builds={builds} />}
      {selectedTab === "Explorer" && (
        <SourceFiles name={selectedBuild.name} files={files} readme={readme} />
      )}
      {selectedTab === "IDL" && idl && (
        <IdlViewer data={idl} url={selectedBuild.artifacts.idl} />
      )}
    </div>
  );
}

interface TabsProps {
  readme: string;
  selectedBuild: any;
  builds: any[];
  files: string[];
}

export default memo(Tabs);
