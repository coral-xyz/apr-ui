import dynamic from "next/dynamic";
import { memo } from "react";
import {
  ClockIcon,
  CodeIcon,
  DatabaseIcon,
  DocumentTextIcon,
  TerminalIcon,
} from "@heroicons/react/solid";

const ProgramBanner = dynamic(() => import("./program-banner"));
const Tabs = dynamic(() => import("./tabs"));

const tabs = [
  { name: "Readme", icon: DocumentTextIcon },
  { name: "Explorer", icon: CodeIcon },
  { name: "IDL", icon: TerminalIcon },
  { name: "Accounts Data", icon: DatabaseIcon },
  { name: "Builds", icon: ClockIcon },
];

function Program({
  program,
  selectedBuild,
  builds,
  readme,
  files,
}: ProgramProps) {
  const latestBuild = selectedBuild.id === builds[0].id;

  return (
    <div className="flex flex-col gap-8">
      <ProgramBanner
        name={program.name}
        address={program.address}
        selectedBuild={selectedBuild}
        latest={latestBuild}
      />

      <Tabs
        tabs={tabs}
        selectedBuild={selectedBuild}
        builds={builds}
        readme={readme}
        files={files}
        networkIdl={undefined}
      />
    </div>
  );
}

interface ProgramProps {
  program: any;
  builds: any[];
  selectedBuild: any;
  readme: string;
  files: string[];
}

export default memo(Program);
