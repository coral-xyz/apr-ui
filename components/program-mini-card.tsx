import { memo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "next/link";
import Status from "./status";

function ProgramMiniCard({ name, address, id, buildStatus }: ProgramMiniCardProps) {
  const programUrl: string = id ? `/program/${address}/build/${id}` : `/program/${address}`;

  return (
    <Card
      sx={{
        maxWidth: 500,
        minWidth: 400,
        backgroundColor: "grey.50",
        border: 1,
        borderColor: "grey.200",
      }}
    >
      <CardActionArea>
        <Link href={programUrl}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {/* Program Name */}
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                noWrap
                sx={{ fontSize: 19, maxWidth: 275 }}
              >
                {name}
              </Typography>

              {/* Verification Status */}
              <Status buildStatus={buildStatus} />
            </Box>

            {/* Program Address */}
            <Typography noWrap variant="subtitle2" color="text.secondary" sx={{ maxWidth: 360 }}>
              {address}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
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
