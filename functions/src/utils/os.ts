import { ensureDirSync } from "fs-extra";
import * as os from "os";
import * as path from "path";

export const tempFilePath = (name: string, prefix = "") => {
  const containsDir = name.includes("/");
  if (containsDir) {
    const segments = name.split("/");
    const last = segments[segments.length - 1];
    const prefixed = prefix + last;
    name = path.dirname(name) + prefixed;
  }
  const fullPath = path.join(os.tmpdir(), name);
  const directory = path.dirname(fullPath);
  ensureDirSync(directory);
  return fullPath;
};
