import { isBuffer } from './isBuffer.js';
import { stringify } from './stringify.js';

export const handleBuffer = (value: string | Buffer) => {
  if (isBuffer(value)) {
    return stringify(value);
  }
  return value;
};
