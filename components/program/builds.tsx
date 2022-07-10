import { memo } from "react";
import { CalendarIcon } from "@heroicons/react/outline";
import InputIcon from "@mui/icons-material/Input";
import Link from "next/link";
import Status from "../status";
import FormatDate from "../../utils/format-date";

function Builds({ builds }: BuildsProps) {
  return (
    <div className="overflow-hidden rounded-md pt-4 pl-4 pr-4">
      <ul role="list" className="divide-y-2 divide-gray-200">
        {builds.map((build) => {
          return (
            <Link
              key={build.id}
              href={`/program/${build.address}/build/${build.id}`}
              passHref
            >
              <div className=" overflow-hidden rounded-lg   bg-white">
                <div className="px-4">
                  <div className=" container m-3 mx-auto flex flex-col  justify-evenly gap-4 rounded-md p-2 align-baseline  text-[#666666] shadow-md sm:px-6 md:flex-row md:align-middle lg:px-8">
                    <div className="md:w-xs mb-2 flex flex-col justify-center">
                      <h6 className="prose-zinc  font-medium   lg:prose-lg">
                        Build #{build.id}
                      </h6>
                    </div>
                    <div className="mx-auto md:w-min">
                      <div className="flex flex-col gap-4">
                        <div className="justifystart flex gap-2 md:gap-4">
                          <span className="h-6 w-6">
                            <CalendarIcon />
                          </span>
                          <div className="prose-md prose-gray text-sm font-medium">
                            Publish {FormatDate(build.updated_at)}
                          </div>
                        </div>

                        <div className="flex gap-4 ">
                          {build.sha256 && (
                            <>
                              <InputIcon />
                              <div className="prose-md prose-gray text-sm font-medium">
                                {build.sha256}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center">
                      <Status buildStatus={build.buildStatus} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

interface BuildsProps {
  builds: any[];
}

export default memo(Builds);
