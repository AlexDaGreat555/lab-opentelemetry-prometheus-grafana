"use strict";

const express = require("express");

const { registerInstruments } = require("./instruments");
const { meter, meterProvider, prometheusExporter } = require("./telemetry");

const port = Number.parseInt(process.env.PORT || "3000", 10);
const app = express();
const { requestCounter, requestDuration } = registerInstruments(meter);

app.get("/metrics", (request, response) => {
  prometheusExporter.getMetricsRequestHandler(request, response);
});

app.get("/health", (_request, response) => {
  response.type("text/plain").send("lab05 healthy\n");
});

app.use((request, response, next) => {
  const startedAt = process.hrtime.bigint();

  response.once("finish", () => {
    const elapsedSeconds = Number(process.hrtime.bigint() - startedAt) / 1e9;
    const attributes = {
      method: request.method,
      status: String(response.statusCode),
    };

    requestCounter.add(1, attributes);
    requestDuration.record(elapsedSeconds, attributes);
  });

  next();
});

app.get("/work", (_request, response) => {
  response.json({ ok: true });
});

app.use((_request, response) => {
  response.status(404).json({ error: "not found" });
});

const server = app.listen(port, "0.0.0.0", () => {
  process.stdout.write(`Lab 5 app listening on port ${port}\n`);
});

async function shutdown(signal) {
  process.stdout.write(`Received ${signal}; shutting down\n`);
  server.close(async () => {
    await meterProvider.shutdown();
    process.exit(0);
  });
}

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));
