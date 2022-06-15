import { memo } from "react";
import useSWR from "swr";
import fetchMD from "../../utils/fetcher-md";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Link from "@mui/material/Link";
import Readme from "./readme";

function language(file: string): string {
  const extension = file.split(".")[1];
  switch (extension) {
    case "rs":
      return "rust";
    case "js":
      return "javascript";
    case "ts":
      return "typescript";
    case "yaml":
      return "yaml";
    case "md":
      return "markdown";
    case "jsx":
      return "jsx";
    case "tsx":
      return "tsx";
    case "sql":
      return "sql";
    case "toml":
      return "toml";
    case "json":
      return "json";
    case "sh":
      return "bash";
    default:
      return "";
  }
}

function Source({ url, name, readme }: SourceProps) {
  const { data } = useSWR(url as string, fetchMD);

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
        }}
      >
        {name !== "README.md" ? (
          <SyntaxHighlighter
            showLineNumbers
            wrapLongLines
            language={language(name)}
            customStyle={{ fontSize: 15, margin: 0 }}
          >
            {data}
          </SyntaxHighlighter>
        ) : (
          <Box sx={{ paddingX: 4, paddingY: 2 }}>
            <Readme readme={readme} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

interface SourceProps {
  name: string;
  url: string;
  readme: string;
}

export default memo(Source);
