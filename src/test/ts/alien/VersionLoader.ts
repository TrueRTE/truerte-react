/* Based on code from TinyMCE, MODIFIED */
/* See LICENSE.txt for the original license information */

import { cleanupGlobalTrueRTE } from './TestHelpers';

const loadScript = (url: string, success: () => void, failure: (err: Error) => void): void => {
  const script = document.createElement('script');
  script.src = url;

  const onLoad = (): void => {
    script.removeEventListener('load', onLoad);
    script.removeEventListener('error', onError);
    success();
  };

  const onError = (): void => {
    script.removeEventListener('error', onError);
    script.removeEventListener('load', onLoad);
    failure(new Error(`Failed to load script: ${url}`));
  };

  script.addEventListener('load', onLoad);
  script.addEventListener('error', onError);
  document.body.appendChild(script);
};

const getTrueRTE = (): any => (globalThis as any).truerte;

const setTrueRTEBaseUrl = (truerte: any, baseUrl: string): void => {
  const prefix = document.location.protocol + '//' + document.location.host;
  truerte.baseURL = baseUrl.indexOf('://') === -1 ? prefix + baseUrl : baseUrl;
  truerte.baseURI = new truerte.util.URI(truerte.baseURL);
};

const updateTrueRTEUrls = (packageName: string): void => {
  const truerte = getTrueRTE();
  if (truerte) {
    setTrueRTEBaseUrl(truerte, `/project/node_modules/${packageName}`);
  }
};

const versionToPackageName = (version: string): string => version === 'latest' ? 'truerte' : `truerte-${version}`;

const unload = (): void => {
  const truerte = getTrueRTE();
  if (truerte) {
    truerte.remove();
  }
  cleanupGlobalTrueRTE();
};

const load = (version: string, success: () => void, failure: (err: Error) => void): void => {
  const packageName = versionToPackageName(version);
  unload();
  loadScript(`/project/node_modules/${packageName}/truerte.min.js`, () => {
    updateTrueRTEUrls(versionToPackageName(version));
    success();
  }, failure);
};

export const pLoadVersion = (version: string): Promise<void> =>
  new Promise((resolve, reject) => {
    load(version, resolve, reject);
  });
