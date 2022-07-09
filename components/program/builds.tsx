import { memo } from "react";

import { CalendarIcon } from "@heroicons/react/outline";
import InputIcon from "@mui/icons-material/Input";
import Link from "next/link";
import Status from "../status";
import FormatDate from "../../utils/format-date";
const CardActionArea = ({ children }) => {
  return (
    <div className=" container m-3 mx-auto flex flex-col  justify-evenly gap-4 rounded-md p-2 align-baseline  text-[#666666] shadow-md sm:px-6 md:flex-row md:align-middle lg:px-8">
      {children}
    </div>
  );
};
const Item = ({ children }) => {
  return <CardActionArea>{children}</CardActionArea>;
};
const Box = ({ children }) => {
  return <div className="mx-auto md:w-min">{children}</div>;
};
const Stack = ({ children, sx }) => {
  return (
    <div style={sx} className="overflow-hidden rounded-md">
      <ul role="list" className="divide-y-2 divide-gray-200">
        {children}
      </ul>
    </div>
  );
};
// padding: theme.spacing(2),
// color: theme.palette.text.secondary,
// display: "flex",
// justifyContent: "flex-start",
function Builds({ builds }: BuildsProps) {
  return (
    <Stack
      sx={{ paddingTop: "1rem", paddingLeft: "1rem", paddingRight: "1rem" }}
    >
      {/* spacing={3} sx={{ paddingTop: 3 }} */}
      {builds.map((build) => {
        return (
          <Link
            key={build.id}
            href={`/program/${build.address}/build/${build.id}`}
            passHref
          >
            <div className=" overflow-hidden rounded-lg   bg-white">
              <div className="px-4">
                <Item>
                  <div className="md:w-xs mb-2 flex flex-col justify-center">
                    <h6 className="prose-zinc  font-medium   lg:prose-lg">
                      Build #{build.id}
                    </h6>
                  </div>
                  <Box>
                    <div className="flex flex-col gap-4">
                      <div className="justifystart flex gap-2 md:gap-4">
                        <CalendarIcon height="26" />
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
                  </Box>

                  <div className="flex flex-col justify-center">
                    <Status buildStatus={build.buildStatus} />
                  </div>
                </Item>
              </div>
            </div>
          </Link>
        );
      })}
    </Stack>
  );
}

interface BuildsProps {
  builds: any[];
}

export default memo(Builds);
