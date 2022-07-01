import { memo } from "react";
import ReactJson from "react-json-view";

function IdlViewer({ data, url }: IDLViewerProps) {
  return (
    <div>
      <div className="flex justify-end rounded-t-md rounded-t-md border border-b-0 border-slate-300 bg-slate-100">
        <a
          className="mr-2 p-2 tracking-wide"
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          Raw
        </a>
      </div>
      <div className="border border-slate-300 p-2 font-mono text-base">
        <ReactJson src={data} displayDataTypes={false} collapsed={5} />
      </div>
    </div>
  );
}

interface IDLViewerProps {
  data: any;
  url: string;
}

export default memo(IdlViewer);
