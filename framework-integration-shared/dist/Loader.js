import { cleanupGlobalTrueRTE } from './TestHelpers';
/* Based on code from TinyMCE, MODIFIED */
/* See LICENSE.txt for the original license information */
const loadScript = (url, success, failure) => {
    const script = document.createElement('script');
    script.src = url;
    const onLoad = () => {
        script.removeEventListener('load', onLoad);
        script.removeEventListener('error', onError);
        success();
    };
    const onError = () => {
        script.removeEventListener('error', onError);
        script.removeEventListener('load', onLoad);
        failure(new Error(`Failed to load script: ${url}`));
    };
    script.addEventListener('load', onLoad);
    script.addEventListener('error', onError);
    document.body.appendChild(script);
};
const getTrueRTE = () => globalThis.truerte;
const setTrueRTEBaseUrl = (truerte, baseUrl) => {
    const prefix = document.location.protocol + '//' + document.location.host;
    truerte.baseURL = baseUrl.indexOf('://') === -1 ? prefix + baseUrl : baseUrl;
    truerte.baseURI = new truerte.util.URI(truerte.baseURL);
};
const updateTrueRTEUrls = (packageName) => {
    const truerte = getTrueRTE();
    if (truerte) {
        setTrueRTEBaseUrl(truerte, `/project/node_modules/${packageName}`);
    }
};
const versionToPackageName = (version) => version === 'latest' ? 'truerte' : `truerte-${version}`;
const unload = () => {
    const truerte = getTrueRTE();
    if (truerte) {
        truerte.remove();
    }
    cleanupGlobalTrueRTE();
};
const load = (version, success, failure) => {
    const packageName = versionToPackageName(version);
    unload();
    loadScript(`/project/node_modules/${packageName}/truerte.min.js`, () => {
        updateTrueRTEUrls(versionToPackageName(version));
        success();
    }, failure);
};
export const pLoadVersion = (version) => new Promise((resolve, reject) => {
    load(version, resolve, reject);
});
