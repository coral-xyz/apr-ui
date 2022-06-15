import dynamic from "next/dynamic";
import { memo } from "react";

const ProgramBanner = dynamic(() => import("./program-banner"));
const ProgramTabs = dynamic(() => import("./program-tabs"));

function Program({
  program,
  selectedBuild,
  builds,
  readme,
  files,
}: ProgramProps) {
  return (
    <>
      <ProgramBanner
        name={program.name}
        address={program.address}
        verified={program.verified}
        buildId={selectedBuild.id}
        buildStatus={selectedBuild.buildStatus}
      />

      <ProgramTabs
        selectedBuild={selectedBuild}
        builds={builds}
        readme={readme}
        files={files}
      />
    </>
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
