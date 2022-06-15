import { CheckCircle } from "@mui/icons-material";
import { Chip } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import DangerousIcon from "@mui/icons-material/Dangerous";
import AutorenewIcon from "@mui/icons-material/Autorenew";

export default function Status({ buildStatus }: StatusProps) {
  return (
    <>
      {buildStatus === "verified" && (
        <Chip
          variant="filled"
          label="Verified"
          color="success"
          icon={<CheckCircle />}
        />
      )}

      {buildStatus === "failed" && (
        <Chip
          variant="filled"
          label="Verification Failed"
          color="error"
          icon={<ReportIcon />}
        />
      )}
      {buildStatus === "aborted" && (
        <Chip
          variant="outlined"
          label="Build Aborted"
          color="warning"
          icon={<DangerousIcon />}
        />
      )}
      {buildStatus === "building" && (
        <Chip
          variant="outlined"
          label="Building"
          color="info"
          icon={<AutorenewIcon />}
        />
      )}
    </>
  );
}

interface StatusProps {
  buildStatus: string;
}
