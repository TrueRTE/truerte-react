/**
 * Official TrueRTE React component
 * Copyright (c) 2026 TrueRTE contributors
 * Licensed under the MIT license (https://github.com/truerte/truerte-react/blob/main/LICENSE.TXT)
 */

let unique = 0;

export const uuid = (prefix: string): string => {
  const time = Date.now();
  const random = Math.floor(Math.random() * 1000000000);
  unique++;
  return prefix + '_' + random + unique + String(time);
};
