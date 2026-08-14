"use strict";

const { PrometheusExporter } = require("@opentelemetry/exporter-prometheus");
const {
  AggregationType,
  MeterProvider,
} = require("@opentelemetry/sdk-metrics");

const durationBoundariesSeconds = [
  0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5,
];

const prometheusExporter = new PrometheusExporter({
  preventServerStart: true,
});

const meterProvider = new MeterProvider({
  readers: [prometheusExporter],
  views: [
    {
      instrumentName: "lab05_request_duration",
      name: "lab05_request_duration_seconds",
      aggregation: {
        type: AggregationType.EXPLICIT_BUCKET_HISTOGRAM,
        options: {
          boundaries: durationBoundariesSeconds,
        },
      },
    },
  ],
});

module.exports = {
  durationBoundariesSeconds,
  meter: meterProvider.getMeter("lab05-app", "1.0.0"),
  meterProvider,
  prometheusExporter,
};
