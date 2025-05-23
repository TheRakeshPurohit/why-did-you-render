// jest.polyfills.js
/**
 * @note The block below contains polyfills for Node.js globals
 * required for Jest to function when running JSDOM tests.
 * These HAVE to be require's and HAVE to be in this exact
 * order, since "undici" depends on the "TextEncoder" global API.
 *
 * Consider migrating to a more modern test runner if
 * you don't want to deal with this.
 */
 
const {TextDecoder, TextEncoder} = require('node:util');
 
Object.defineProperties(globalThis, {
  TextDecoder: {value: TextDecoder},
  TextEncoder: {value: TextEncoder},
});
 
const {Blob, File} = require('node:buffer'); 
 
Object.defineProperties(globalThis, {
  Blob: {value: Blob},
  File: {value: File},
});

window.MessageChannel = jest.fn().mockImplementation(() => {
  let onmessage;
  return {
    port1: {
      set onmessage(cb) {
        onmessage = cb;
      },
    },
    port2: {
      postMessage: data => {
        if (onmessage) {
          onmessage({data});
        }
      },
    },
  };
});
