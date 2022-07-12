import { memo } from "react";
import useSWR from "swr";
import fetchMD from "../../utils/fetcher-md";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
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
    <div>
      {name !== "README.md" ? (
        <>
          <div className="flex justify-end rounded-t-md border border-b-0 border-slate-300 bg-slate-100">
            <a
              className="mr-2 p-2 tracking-wide"
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              Raw
            </a>
          </div>
          <div className="border border-slate-300 py-2">
            <SyntaxHighlighter
              showLineNumbers
              wrapLongLines
              language={language(name)}
              customStyle={{ fontSize: 15, margin: 0 }}
            >
              {data}
            </SyntaxHighlighter>
          </div>
        </>
      ) : (
        <Readme readme={readme} />
      )}
    </div>
  );
}

interface SourceProps {
  name: string;
  url: string;
  readme: string;
}

export default memo(Source);
