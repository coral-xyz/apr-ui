import { Box } from "@mui/material";
import { memo } from "react";

function Readme({ readme }: ReadmeProps) {
  return <Box dangerouslySetInnerHTML={{ __html: readme }} />;
}

interface ReadmeProps {
  readme: string;
}

export default memo(Readme);
