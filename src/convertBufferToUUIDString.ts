import { stringify } from './stringify.js';

const convertBufferToUUIDString = (originalBuf: Buffer): string => {
  return stringify(originalBuf);
};

export { convertBufferToUUIDString };
