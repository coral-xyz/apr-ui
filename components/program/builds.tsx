import { memo } from "react";
import { CalendarIcon, KeyIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Status from "../status";
import FormatDate from "../../utils/format-date";

function Builds({ builds }: BuildsProps) {
  return (
    <ul role="list" className="divide-y-2 divide-gray-200">
      {builds.map((build) => {
        return (
          <Link
            key={build.id}
            href={`/program/${build.address}/build/${build.id}`}
            passHref
          >
            <div className="m-5 flex flex-col justify-between rounded-md border border-gray-200/80 p-2 align-baseline text-gray-500 shadow-md sm:px-6 md:gap-5 lg:flex-row lg:px-8">
              {/*  Build */}
              <div className="mb-2 flex min-w-fit flex-col justify-center">
                <h6 className="font-medium lg:prose-lg">Build #{build.id}</h6>
              </div>

              {/*  Middle section */}
              <div className="flex w-full flex-col gap-3 py-2">
                {/*  Published date*/}
                <div className="flex gap-4">
                  <CalendarIcon className="h-6 w-6" />

                  <div className="text-sm font-medium">
                    Publish {FormatDate(build.updated_at)}
                  </div>
                </div>

                {/*  SHA */}
                {build.sha256 && (
                  <div className="flex gap-4">
                    <KeyIcon className="h-6 w-6" />

                    <div className="overflow-hidden text-ellipsis text-sm font-medium">
                      {build.sha256}
                    </div>
                  </div>
                )}
              </div>

              {/*  Build status */}
              <div className="flex w-auto min-w-fit flex-col justify-center">
                <Status buildStatus={build.buildStatus} />
              </div>
            </div>
          </Link>
        );
      })}
    </ul>
  );
}

interface BuildsProps {
  builds: any[];
}

export default memo(Builds);
