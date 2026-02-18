"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupGlobalTrueRTE = void 0;
const ScriptLoader_1 = require("./ScriptLoader");
/** Function to clean up and remove TrueRTE-related scripts and links from the document */
const cleanupGlobalTrueRTE = () => {
    ScriptLoader_1.ScriptLoader.reinitialize();
    delete globalThis.truerte;
    delete globalThis.trueRTE;
    /** Helper function to check if an element has a TrueRTE-related URI in a specific attribute */
    const hasTrueRTEUri = (attrName) => (elm) => {
        const src = elm.getAttribute(attrName);
        return src != null && src.includes('truerte');
    };
    // Find all script and link elements that have a TrueRTE-related URI
    [
        ...Array.from(document.querySelectorAll('script')).filter(hasTrueRTEUri('src')),
        ...Array.from(document.querySelectorAll('link')).filter(hasTrueRTEUri('href'))
    ].forEach((elm) => elm.remove());
};
exports.cleanupGlobalTrueRTE = cleanupGlobalTrueRTE;
