export default function renderArguments(args) {
  let component = [];

  for (let i = 0; i < args.length; i++) {
    let type = "";

    if (args[i].type.array) {
      type = `[${args[i].type.array[0]}; ${args[i].type.array[1]}]`;
    } else if (args[i].type.vec) {
      if (args[i].type.vec.defined) {
        type = `Vec<${args[i].type.vec.defined}>`;
      } else if (args[i].type.vec.array) {
        type = `Vec<[${args[i].type.vec.array[0]}; ${args[i].type.vec.array[1]}]>`;
      } else {
        type = `Vec<${args[i].type.vec}>`;
      }
    } else if (args[i].type.defined) {
      type = args[i].type.defined;
    } else if (args[i].type.option) {
      type = `Option<${args[i].type.option}>`;
    } else {
      type = args[i].type;
    }
    component.push(
      <div key={args[i].name} className="pb-1">
        <span>
          {args[i].name}:
          <span className="inline-flex items-center rounded bg-sky-100 px-2 py-0.5 text-xs font-semibold text-sky-800">
            `{type}`
          </span>
          {args[i].index && (
            <span className="ml-1 inline-flex items-center rounded bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800">
              index
            </span>
          )}
        </span>
      </div>
    );
  }

  return component;
}
