import dynamic from "next/dynamic";
import { memo } from "react";

const ProgramBanner = dynamic(() => import("./program-banner"));
const Tabs = dynamic(() => import("./tabs"));

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
        verified={program.verified}
        buildId={selectedBuild.id}
        buildStatus={selectedBuild.buildStatus}
        selectedBuild={selectedBuild}
        latest={latestBuild}
      />

      <Tabs
        selectedBuild={selectedBuild}
        builds={builds}
        readme={readme}
        files={files}
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
