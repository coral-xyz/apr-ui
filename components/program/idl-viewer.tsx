import { memo } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Link from "@mui/material/Link";
import ReactJson from "react-json-view";

function IdlViewer({ data, url }) {
  return (
    <Box>
      <Box
        sx={{
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "flex-end",
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          borderBottomStyle: "none",
          backgroundColor: "grey.50",
        }}
      >
        <Link href={url} target="_blank" rel="noopener">
          <Button color="secondary">Raw</Button>
        </Link>
      </Box>
      <Box
        sx={{
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: "divider",
          paddingY: 2,
          paddingX: 4,
        }}
      >
        <ReactJson
          src={data}
          displayDataTypes={false}
          iconStyle="square"
          collapsed={2}
        />
      </Box>
    </Box>
  );
}

export default memo(IdlViewer);
