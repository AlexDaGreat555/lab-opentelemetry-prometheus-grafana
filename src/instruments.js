"use strict";

function registerInstruments(meter) {
  // TODO: Replace these no-op instruments with a counter and histogram created
  // from the supplied meter, then return the created instruments in this shape.
  const requestCounter = {
    add() {},
  };
  const requestDuration = {
    record() {},
  };

  return { requestCounter, requestDuration };
}

module.exports = { registerInstruments };
