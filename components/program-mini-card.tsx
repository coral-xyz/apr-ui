import { memo } from "react";
import Link from "next/link";

function ProgramMiniCard({ name, address, id }: ProgramMiniCardProps) {
  const programUrl: string = id
    ? `/program/${address}/build/${id}`
    : `/program/${address}`;

  return (
    <Link href={programUrl}>
      <div className="flex w-96 cursor-pointer flex-col justify-between gap-2 rounded-lg border border-gray-100 bg-gray-100 py-5 px-4 shadow-md hover:border-slate-100 hover:bg-slate-100 lg:w-full">
        <div className="flex flex-row justify-between">
          {/* Program Name */}
          <h4 className="text-lg font-medium">{name}</h4>
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
  id: string | boolean;
}

export default memo(ProgramMiniCard);
