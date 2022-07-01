import { memo } from "react";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import FormatDate from "../../utils/format-date";
import { CloudDownloadOutlined } from "@mui/icons-material";
import dynamic from "next/dynamic";

const Status = dynamic(() => import("../status"));

function ProgramCard({
  name,
  address,
  verified,
  buildId,
  buildStatus,
  selectedBuild,
  latest,
}: ProgramCardProps) {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 lg:flex-row">
              {/* Program Name */}
              <h1 className="text-3xl font-semibold text-gray-700">{name}</h1>
              {/* Program SHA */}
              <h2 className="mt-2 flex gap-1 pr-10 text-sky-500">
                <ExternalLinkIcon className="h-6 w-6" />
                <a
                  target="_blank"
                  href={`https://explorer.solana.com/address/${address}`}
                  className="truncate font-medium tracking-wide text-sky-500"
                  rel="noreferrer"
                >
                  {address}
                </a>
              </h2>
            </div>

            {/* Tags */}
            <div className="flex flex-row gap-2">
              <span className="rounded-lg bg-orange-100  px-2 py-1 text-sm font-medium tracking-wide text-gray-500">
                build #{buildId}
              </span>
              {latest && (
                <span className="rounded-lg bg-orange-100 px-2 py-1 text-sm font-medium tracking-wide text-gray-500">
                  latest
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-200" />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6 pr-4 lg:flex-row">
          {/* Verification Status */}
          <div className="flex flex-col gap-2">
            <h5 className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Status
            </h5>
            {verified ? (
              <Status buildStatus="verified" />
            ) : (
              <Status buildStatus="failed" />
            )}
          </div>

          {/* Last Updated */}
          <div className="flex flex-col gap-2">
            <h5 className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Last Updated
            </h5>
            <h5 className="font-medium tracking-wide text-gray-700">
              {FormatDate(selectedBuild.updated_at)}
            </h5>
          </div>

          {/* Build */}
          <div className="flex flex-col gap-2">
            <h5 className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Build
            </h5>
            <div className="flex flex-row gap-1 text-sky-500">
              <CloudDownloadOutlined />
              <a
                className="max-w-xs truncate font-medium text-sky-500"
                href={selectedBuild.artifacts.tarball}
              >
                {selectedBuild.sha256}
              </a>
            </div>
          </div>

          {/* Artifact */}
          <div className="flex flex-col gap-2">
            <h5 className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Artifact
            </h5>
            <div className="flex flex-row gap-1 text-sky-500">
              <CloudDownloadOutlined />
              <a
                className="font-medium text-sky-500"
                href={selectedBuild.artifacts.binary}
              >
                {selectedBuild.name}.so
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface ProgramCardProps {
  name: string;
  buildId: number;
  address: string;
  verified: boolean;
  buildStatus: string;
  selectedBuild: any;
  latest: boolean;
}

export default memo(ProgramCard);
