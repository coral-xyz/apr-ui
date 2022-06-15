export default function filesTree(paths: string[]): any {
  let result = [];
  let level = { result };

  paths.forEach((path) => {
    let parts = path.split(":")[0];
    let url = path.split(":")[1] + ":" + path.split(":")[2];
    parts.split("/").reduce((r, name, i, a) => {
      if (!r[name]) {
        r[name] = { result: [] };
        let type = name.split(".").length > 1 ? "file" : "folder";

        if (type === "folder" && name === "LICENSE") {
          type = "file";
        }

        const elem = { name, type, children: r[name].result, url: "" };
        if (type === "file") elem.url = url;
        r.result.push(elem);
      }

      return r[name];
    }, level);
  });

  return result;
}
