import { memo } from "react";
import Typography from "@mui/material/Typography";
import { Button, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { OpenInNew } from "@mui/icons-material";
import Status from "../status";
import { grey } from "@mui/material/colors";

function ProgramCard({
  name,
  address,
  verified,
  buildId,
  buildStatus,
}: ProgramCardProps) {
  return (
    <Paper
      sx={{
        minWidth: 400,
        backgroundColor: grey["A100"],
        border: 1,
        borderColor: grey["200"],
      }}
      elevation={0}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          padding: 2,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Program Name */}

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Typography gutterBottom variant="h4" component="h1" noWrap>
              {name}
            </Typography>
            <Typography variant="h6" sx={{ color: "grey.600" }}>
              #{buildId}
            </Typography>
          </Box>

          {/* Verification Status */}
          {verified ? (
            <Status buildStatus="verified" />
          ) : (
            <Status buildStatus="failed" />
          )}
        </Box>

        {/* Program SHA */}
        <Button
          href={`https://explorer.solana.com/address/${address}`}
          target="_blank"
          startIcon={<OpenInNew />}
          color="info"
          sx={{
            width: "fit-content",
          }}
        >
          <Typography variant="subtitle2">{address}</Typography>
        </Button>
      </Box>
    </Paper>
  );
}

interface ProgramCardProps {
  name: string;
  buildId: number;
  address: string;
  verified: boolean;
  buildStatus: string;
}

export default memo(ProgramCard);
