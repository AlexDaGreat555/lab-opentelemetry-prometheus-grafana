# Prometheus Query Lab

This repository contains the starter service and deterministic tooling for Lab 5.
Open it in the provided devcontainer and follow the tasks on the course website.

The devcontainer starts a local stack with:

* The lab app at <http://localhost:3000>
* Prometheus at <http://localhost:9090>
* Grafana at <http://localhost:3001>

Grafana is configured for anonymous local access and already has a Prometheus
datasource named `Prometheus`.

Run the checker before making changes to see the expected failing baseline:

```console
./scripts/check-lab
```

Generate the baseline or degraded traffic profile with:

```console
./scripts/generate-traffic baseline
./scripts/generate-traffic degraded
```

The traffic helper rebuilds the application first, so it always exercises the
current contents of `src/`. If the stack is not running, start it with:

```console
./scripts/start-lab
```

The application and its OpenTelemetry instrumentation are complete.
The only student-owned deliverable is `lab05/success-ratio.promql`.
Do not commit generated data from Prometheus or Grafana.
