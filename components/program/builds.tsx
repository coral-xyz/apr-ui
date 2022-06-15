import { memo } from "react";
import { Card, CardActionArea, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InputIcon from "@mui/icons-material/Input";
import Link from "next/link";
import Status from "../status";
import FormatDate from "../../utils/format-date";

const Item = styled(CardActionArea)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  display: "flex",
  justifyContent: "flex-start",
}));

function Builds({ builds }: BuildsProps) {
  return (
    <Stack spacing={3} sx={{ paddingTop: 3 }}>
      {builds.map((build) => {
        return (
          <Link
            key={build.id}
            href={`/program/${build.address}/build/${build.id}`}
            passHref
          >
            <Card elevation={2}>
              <Item
                sx={{
                  display: "flex",
                  height: 88,
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                      marginRight: 5,
                      cursor: "pointer",
                      paddingLeft: 2,
                      paddingRight: 2,
                    }}
                  >
                    <Typography variant="h6">Build #{build.id}</Typography>
                  </Box>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <CalendarMonthIcon />
                      <Typography variant="subtitle2">
                        Publish {FormatDate(build.updated_at)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1 }}>
                      {build.sha256 && (
                        <>
                          <InputIcon />
                          <Typography variant="subtitle2">
                            {build.sha256}
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Status buildStatus={build.buildStatus} />
                </Box>
              </Item>
            </Card>
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
