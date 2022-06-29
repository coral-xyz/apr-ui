import { memo } from "react";
import ReactJson from "react-json-view";

function IdlViewer({ data, url }) {
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
      <div className="border border-slate-300 p-2">
        <ReactJson
          src={data}
          displayDataTypes={false}
          iconStyle="square"
          collapsed={2}
        />
      </div>
    </div>
  );
}

export default memo(IdlViewer);
