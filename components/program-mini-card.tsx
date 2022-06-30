import { memo } from "react";
import Link from "next/link";
import Status from "./status";

function ProgramMiniCard({
  name,
  address,
  id,
  buildStatus,
}: ProgramMiniCardProps) {
  const programUrl: string = id
    ? `/program/${address}/build/${id}`
    : `/program/${address}`;

  return (
    <Link href={programUrl}>
      <div className="flex h-28 w-96 flex-col justify-between rounded-lg border border-gray-100 bg-gray-100 py-5 px-4 shadow-md lg:w-full">
        <div className="flex flex-row justify-between">
          {/* Program Name */}
          <h4 className="text-lg font-medium">{name}</h4>

          {/* Verification Status */}
          <Status buildStatus={buildStatus} />
        </div>

        {/* Program Address */}

        <h5 className="overflow-hidden text-ellipsis text-sm">{address}</h5>
      </div>
    </Link>
  );
}

interface ProgramMiniCardProps {
  name: string;
  address: string;
  verified: boolean;
  id: string | boolean;
  buildStatus: string;
}

export default memo(ProgramMiniCard);
