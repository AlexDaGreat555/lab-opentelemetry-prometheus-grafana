# OpenTelemetry, Prometheus, and Grafana Lab

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

After completing `src/instruments.js`, generate a deterministic set of requests:

```console
./scripts/generate-traffic
```

The traffic helper rebuilds the application first, so it always exercises the
current contents of `src/`. If the stack is not running, start it with:

```console
./scripts/start-lab
```

The only student-owned deliverables are `src/instruments.js`, the two query
files under `lab05/`, and `lab05/dashboard.json`. Do not commit generated data
from Prometheus or Grafana.
