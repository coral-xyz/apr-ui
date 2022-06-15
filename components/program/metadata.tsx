import { Button, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { CloudDownloadOutlined, OpenInNew } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import FormatDate from "../../utils/format-date";

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontSize: 13,
  color: theme.palette.grey["600"],
  fontWeight: "bold",
  textTransform: "uppercase",
}));

export default function Metadata({ data }) {
  return (
    <Box sx={{ gap: 2, display: "flex", flexDirection: "column" }}>
      <Box>
        <StyledTitle>Last Updated</StyledTitle>
        <Typography variant="subtitle2" sx={{ fontSize: 17 }}>
          {FormatDate(data.updated_at)}
        </Typography>
      </Box>

      <Divider />

      <Box>
        <StyledTitle>Artifact</StyledTitle>
        <Button
          href={data.artifacts.binary}
          variant="text"
          target="_blank"
          startIcon={<CloudDownloadOutlined />}
          color="info"
        >
          <Typography noWrap variant="subtitle2" sx={{ maxWidth: 250 }}>
            {data.name}.so
          </Typography>
        </Button>
      </Box>

      <Divider />

      {data.sha256 && (
        <Box component="div">
          <StyledTitle>Build</StyledTitle>
          <Button
            href={data.artifacts.tarball}
            target="_blank"
            startIcon={<CloudDownloadOutlined />}
            color="info"
            sx={{
              width: "fit-content",
            }}
          >
            <Typography noWrap variant="subtitle2" sx={{ maxWidth: 250 }}>
              {data.sha256}
            </Typography>
          </Button>
        </Box>
      )}

      {data.upgrade_authority && (
        <>
          <Divider />

          <Box>
            <StyledTitle>Upgrade authority</StyledTitle>
            <Button
              href={`https://explorer.solana.com/address/${data.upgrade_authority}`}
              variant="text"
              target="_blank"
              startIcon={<OpenInNew />}
              color="info"
              sx={{
                width: "fit-content",
              }}
            >
              <Typography noWrap variant="subtitle2" sx={{ maxWidth: 250 }}>
                {data.upgrade_authority}
              </Typography>
            </Button>
          </Box>
        </>
      )}

      {data.verified_slot && (
        <>
          <Divider />
          <Box>
            <StyledTitle>Slot deployed</StyledTitle>
            <Button
              href={`https://explorer.solana.com/block/${data.verified_slot}`}
              variant="text"
              target="_blank"
              startIcon={<OpenInNew />}
              color="info"
              sx={{
                width: "fit-content",
              }}
            >
              <Typography noWrap variant="subtitle2" sx={{ maxWidth: 250 }}>
                {data.verified_slot}
              </Typography>
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
