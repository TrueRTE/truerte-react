/* eslint-disable @typescript-eslint/no-unused-vars */
import { Assertions } from '@ephox/agar';
import { beforeEach, describe, it } from '@ephox/bedrock-client';

import { CDN_VERSIONS, VERSIONS, type Version } from '../alien/TestHelpers';
import { render } from '../alien/Loader';
import { ScriptLoader } from 'src/main/ts/ScriptLoader2';

const assertTrueRTEVersion = (version: Version) => {
  Assertions.assertEq(`Loaded version of TrueRTE should be ${version}`, version, (globalThis as any).truerte.majorVersion);
};

export const deleteTrueRTE = () => {
  ScriptLoader.reinitialize();

  delete (globalThis as any).truerte;
  delete (globalThis as any).trueRTE;

  const hasTrueRTEUri = (attrName: string) => (elm: Element) => {
    const src = elm.getAttribute(attrName);
    return src != null && src.includes('truerte');
  };

  [
    ...Array.from(document.querySelectorAll('script')).filter(hasTrueRTEUri('src')),
    ...Array.from(document.querySelectorAll('link')).filter(hasTrueRTEUri('href'))
  ].forEach((elm) => elm.remove());
};

describe('LoadTinyTest', () => {
  beforeEach(() => {
    deleteTrueRTE();
  });

  VERSIONS.forEach((version) => {
    it(`Should be able to load local version (${version}) of TrueRTE using the truerteScriptSrc prop`, async () => {
      using _ = await render({ truerteScriptSrc: `/project/node_modules/truerte-${version}/truerte.min.js` });
      assertTrueRTEVersion(version);
    });
  });

  CDN_VERSIONS.forEach((version) => {
    it(`Should be able to load TrueRTE from CDN (${version})`, async () => {
      using _ = await render({ cdnVersion: version });
      assertTrueRTEVersion(version);
      Assertions.assertEq(
        'TrueRTE should have been loaded from jsDelivr CDN',
        `https://cdn.jsdelivr.net/npm/truerte@${version}`,
        (globalThis as any).truerte.baseURI.source
      );
    });
  });
});
