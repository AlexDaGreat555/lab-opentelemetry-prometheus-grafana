"use strict";

function registerInstruments(meter) {
  const requestCounter = meter.createCounter("lab05_requests", {
    description: "HTTP requests handled by the lab service",
  });
  const requestDuration = meter.createHistogram("lab05_request_duration", {
    description: "HTTP request duration",
    unit: "s",
  });

  return { requestCounter, requestDuration };
}

module.exports = { registerInstruments };
