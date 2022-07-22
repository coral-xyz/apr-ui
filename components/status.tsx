import { memo } from "react";
import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
} from "@heroicons/react/solid";

function Status({ buildStatus }: StatusProps) {
  return (
    <div>
      {buildStatus === "verified" && (
        <span className="inline-flex items-center gap-1 rounded-md bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
          <CheckCircleIcon className="h-5 w-5" />
          Verified
        </span>
      )}

      {buildStatus === "failed" && (
        <span className="md:ml-18 inline-flex items-center gap-1 rounded-md  bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800  ">
          <ExclamationCircleIcon className="h-5 w-5" />
          Verification Failed
        </span>
      )}

      {buildStatus === "aborted" && (
        <span className="inline-flex items-center gap-1 rounded-md bg-yellow-100 px-2.5 py-0.5 text-sm font-medium text-yellow-800">
          <ExclamationIcon className="h-5 w-5" />
          Build Aborted
        </span>
      )}

      {buildStatus === "building" && (
        <span className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">
          <ClockIcon className="h-5 w-5" />
          Building
        </span>
      )}

      {buildStatus === "built" && (
        <span className="inline-flex items-center gap-1 rounded-md bg-gray-200 px-2.5 py-0.5 text-sm font-medium text-gray-800">
          <ClockIcon className="h-5 w-5" />
          Built
        </span>
      )}
    </div>
  );
}

interface StatusProps {
  buildStatus: string;
}

export default memo(Status);
