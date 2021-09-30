import { ensureDirSync } from "fs-extra";
import * as os from "os";
import * as path from "path";

export const tempFilePath = (name: string) => {
  const fullPath = path.join(os.tmpdir(), name);
  const directory = path.dirname(fullPath);
  ensureDirSync(directory);
  return fullPath;
};
