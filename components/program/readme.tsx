import { memo } from "react";
import { BookOpenIcon } from "@heroicons/react/solid";

function Readme({ readme }: ReadmeProps) {
  return (
    <div className="rounded-t-md border border-slate-300">
      <div className="flex items-center gap-1 bg-slate-100 py-2 pl-4">
        <BookOpenIcon className="h-6 w-6 text-gray-500" />
        <h5 className=" tracking-wide text-gray-700">Readme</h5>
      </div>

      <div
        className="prose min-w-full border-t p-10 prose-img:mx-auto prose-img:mt-0 prose-img:mb-0 prose-img:max-h-[150px] prose-img:max-w-[150px]"
        dangerouslySetInnerHTML={{ __html: readme }}
      />
    </div>
  );
}

interface ReadmeProps {
  readme: string;
}

export default memo(Readme);
