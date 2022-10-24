import { DiskStorage, MemoryStorage, Storage } from "../storage";
import { UploadFilterHandler } from "./filter";
import * as busboy from "@fastify/busboy";

export type UploadOptions = busboy.BusboyConfig & {
  dest?: string;
  storage?: Storage;
  filter?: UploadFilterHandler;
};

export const DEFAULT_UPLOAD_OPTIONS: Partial<UploadOptions> = {
  storage: new MemoryStorage(),
};

export const transformUploadOptions = (
  opts?: UploadOptions | Partial<UploadOptions>,
): UploadOptions | Partial<UploadOptions> => {
  if (opts == null) return DEFAULT_UPLOAD_OPTIONS;

  if (opts.dest != null) {
    return {
      ...opts,
      storage: new DiskStorage({
        dest: opts.dest,
        ...opts.storage?.options,
      }),
    };
  }

  return { ...DEFAULT_UPLOAD_OPTIONS, ...opts };
};
