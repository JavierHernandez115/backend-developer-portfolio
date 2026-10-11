import { Lang } from '../i18n/translations';

/**
 * Localized text for every project ("system case").
 * Non-text data (images, colors, percentages, metrics) stays in systemsData.ts.
 */
export interface SystemText {
  subtitle: string;
  description: string;
  architectureType: string;
  slaStatus: string;
  pattern: string;
  kicker: string;
  problemHeading: string;
  decisionsHeading: string;
  partitionLabel: string;
  topologyLabel: string;
  techDetails: string[];
  phases: { phase: string; title: string; description: string; metricLabel: string }[];
  deepDive: {
    problemTitle: string;
    problemDescription: string;
    problemImpacts: string[];
    decisionsTitle: string;
    decisionsIntro: string;
    decisions: { title: string; description: string }[];
    faultToleranceTitle: string;
    faultToleranceIntro: string;
    faultToleranceItems: { title: string; description: string }[];
  };
  specs: Partial<{
    deploymentEnv: string;
    partitionNodes: string;
    clusterTopology: string;
    compressionRatio: string;
    monitoring: string;
  }>;
  quoteText: string;
}

export const systemsText: Record<string, Record<Lang, SystemText>> = {
  /* ------------------------------------------------------------------ */
  'telemetry-engine': {
    es: {
      subtitle: 'Ingestión Distribuida y Transformación de Series Temporales',
      description:
        'Pipeline de streaming particionado horizontalmente que ingiere, enriquece y despacha spans de telemetría de alta velocidad sin degradación por backpressure en picos de carga.',
      architectureType: 'Microservicios Orientados a Eventos',
      slaStatus: 'En Producción (SLA 99.99%)',
      pattern: 'Procesamiento de Streams Orientado a Eventos',
      kicker: 'NÚCLEO DE STREAMING DE ALTA CONCURRENCIA',
      problemHeading: 'Colapso de pipelines tradicionales bajo ráfagas no lineales de telemetría IoT',
      decisionsHeading: 'Zero-copy Buffers, Particionamiento Determinista y Micro-Batching',
      partitionLabel: 'Nodos de Partición Kafka:',
      topologyLabel: 'Topología ClickHouse:',
      techDetails: [
        'Ingestión zero-alloc, buffers gRPC',
        'Particionamiento & Backpressure',
        'MergeTree Clustered Analytics',
        'Colectores OTLP & Semantics',
      ],
      phases: [
        {
          phase: 'FASE 01',
          title: 'Capa de Ingestión',
          description:
            'Puntos de terminación balanceados por eBPF que reciben streams persistentes desde dispositivos IoT, logstash y OpenTelemetry Collectors. Emplea serialización Protocol Buffers estricta para reducir el payload en un 68% frente a JSON estándar.',
          metricLabel: 'Pooling zero-alloc sync.Pool',
        },
        {
          phase: 'FASE 02',
          title: 'Broker & Particionamiento',
          description:
            'Topología de 24 particiones con balanceador basado en hash determinista por tenant_id:device_uuid. Previene hotspotting de discos NVMe mediante log segmentation reactiva y control de backpressure con pausa de consumidores.',
          metricLabel: 'Throughput sostenido',
        },
        {
          phase: 'FASE 03',
          title: 'Almacenamiento Columnar',
          description:
            'Consumidores en Go realizan micro-batching dinámico de 50k filas o 500ms y vuelcan directo a tablas motor ReplacingMergeTree y AggregatingMergeTree. Permite consultas analíticas sobre miles de millones de filas en milisegundos.',
          metricLabel: 'Tiempo de agregación p95',
        },
      ],
      deepDive: {
        problemTitle: '01 / EL PROBLEMA Y RETO DE ESCALA',
        problemDescription:
          'Colapso de pipelines tradicionales bajo ráfagas no lineales de telemetría IoT. La infraestructura previa se sustentaba sobre un clúster de PostgreSQL con particionado por rangos temporales y colas RabbitMQ en serie. Al superar los 250,000 eventos concurrentes por segundo procedentes de gateways industriales en Europa y América, el sistema experimentó un agotamiento crítico de descriptores de socket (I/O saturation) y una penalización inmanejable de vacuums en Postgres.',
        problemImpacts: [
          'Pérdida de paquetes de telemetría durante picos de sincronización de flotas (hasta 4.2% data loss).',
          'Lag de consumidor acumulado superior a 38 minutos en colas AMQP.',
          'Consumo desmedido de memoria RAM debido a serializadores JSON reflexivos en el runtime de ingestión.',
        ],
        decisionsTitle: '02 / DECISIONES CLAVE DE DISEÑO E IMPLEMENTACIÓN',
        decisionsIntro:
          'Zero-copy Buffers, Particionamiento Determinista y Micro-Batching. Para alcanzar el objetivo de 1.4M ev/s sin disparar los costes operativos en la nube se implementaron tres directrices fundamentales en el núcleo de Go:',
        decisions: [
          {
            title: 'Zero-Allocation Protobuf Ingestion Pools',
            description:
              'En lugar de instanciar estructuras para cada datagrama gRPC entrante, creamos un gestor de piscinas de memoria con sync.Pool y slices reusables. Se redujo el overhead del Garbage Collector de Go en un 92%, manteniendo la pausa de GC (STW) por debajo de 1.1ms de forma sostenida.',
          },
          {
            title: 'Hash Particionado Determinista en Kafka',
            description:
              'Se construyó un custom partitioner usando el algoritmo MurmurHash3 sobre la clave compuesta de la entidad de origen. Esto garantizó que todos los eventos cronológicos de un dispositivo caigan en la misma partición física, habilitando deduplicación en ventana sin necesidad de locks distribuidos en memoria tipo Redis.',
          },
          {
            title: 'Mitigación de "Too Many Parts" en ClickHouse',
            description:
              'Hacer inserciones unitarias en bases columnares es fatal. Diseñamos un despachador en memoria en cada worker con doble disparador adaptativo: vuelco por tamaño de bloque (65,536 registros) o por umbral de tiempo (400ms). Esto permitió compactaciones automáticas óptimas en el motor MergeTree sin saturar la I/O de disco.',
          },
        ],
        faultToleranceTitle: '03 / TOLERANCIA A FALLOS Y SEMÁNTICA DE ENTREGA',
        faultToleranceIntro:
          'Garantías At-Least-Once con Deduplicación Idempotente. Los entornos IoT sufren desconexiones constantes que provocan retransmisiones masivas. Diseñar el pipeline asumiendo idempotencia radical fue prioritario:',
        faultToleranceItems: [
          {
            title: 'OFFSET MANAGEMENT MANUAL',
            description:
              'Los offsets de Kafka se confirman (commit) únicamente después de que el batch de ClickHouse responde con HTTP 200 OK y checksum validado. Si un worker muere a mitad de inserción, el nuevo consumidor toma el segmento previo sin pérdida de trazas.',
          },
          {
            title: 'REPLACINGMERGETREE RECONCILER',
            description:
              'La clave primaria en ClickHouse incluye event_uuid y timestamp_nano. Ante reintentos idénticos, ClickHouse descarta las copias obsoletas en la compactación de fondo sin provocar errores en ingestión.',
          },
        ],
      },
      specs: {},
      quoteText:
        'Este proyecto sintetiza mi enfoque de diseño: resolver la concurrencia en la capa de software con asignaciones nulas y dejar que Kafka y ClickHouse hagan su trabajo con estructuras inmutables y compactación continua.',
    },
    en: {
      subtitle: 'Distributed Ingestion & Time-Series Transformation',
      description:
        'Horizontally partitioned streaming pipeline that ingests, enriches, and dispatches high-velocity telemetry spans without backpressure degradation under peak loads.',
      architectureType: 'Event-Driven Microservices',
      slaStatus: 'In Production (99.99% SLA)',
      pattern: 'Event-Driven Stream Processing',
      kicker: 'HIGH-CONCURRENCY STREAMING CORE',
      problemHeading: 'Traditional pipelines collapsing under non-linear IoT telemetry bursts',
      decisionsHeading: 'Zero-copy Buffers, Deterministic Partitioning and Micro-Batching',
      partitionLabel: 'Kafka Partition Nodes:',
      topologyLabel: 'ClickHouse Topology:',
      techDetails: [
        'Zero-alloc ingestion, gRPC buffers',
        'Partitioning & Backpressure',
        'MergeTree Clustered Analytics',
        'OTLP Collectors & Semantics',
      ],
      phases: [
        {
          phase: 'PHASE 01',
          title: 'Ingestion Layer',
          description:
            'eBPF-balanced termination points receiving persistent streams from IoT devices, logstash and OpenTelemetry Collectors. Uses strict Protocol Buffers serialization to cut the payload by 68% compared with standard JSON.',
          metricLabel: 'Zero-alloc sync.Pool pooling',
        },
        {
          phase: 'PHASE 02',
          title: 'Broker & Partitioning',
          description:
            'A 24-partition topology with a deterministic hash balancer on tenant_id:device_uuid. Prevents NVMe disk hotspotting through reactive log segmentation and backpressure control by pausing consumers.',
          metricLabel: 'Sustained throughput',
        },
        {
          phase: 'PHASE 03',
          title: 'Columnar Storage',
          description:
            'Go consumers perform dynamic micro-batching of 50k rows or 500ms and flush directly into ReplacingMergeTree and AggregatingMergeTree engine tables. Enables analytical queries over billions of rows in milliseconds.',
          metricLabel: 'p95 aggregation time',
        },
      ],
      deepDive: {
        problemTitle: '01 / THE PROBLEM & SCALE CHALLENGE',
        problemDescription:
          'Traditional pipelines collapsing under non-linear IoT telemetry bursts. The previous infrastructure relied on a PostgreSQL cluster with time-range partitioning and serial RabbitMQ queues. Once it exceeded 250,000 concurrent events per second coming from industrial gateways in Europe and the Americas, the system suffered critical socket descriptor exhaustion (I/O saturation) and an unmanageable vacuum penalty in Postgres.',
        problemImpacts: [
          'Telemetry packet loss during fleet synchronization peaks (up to 4.2% data loss).',
          'Accumulated consumer lag above 38 minutes on AMQP queues.',
          'Excessive RAM consumption caused by reflective JSON serializers in the ingestion runtime.',
        ],
        decisionsTitle: '02 / KEY DESIGN & IMPLEMENTATION DECISIONS',
        decisionsIntro:
          'Zero-copy Buffers, Deterministic Partitioning and Micro-Batching. To reach the 1.4M ev/s goal without blowing up cloud operating costs, three core guidelines were implemented in the Go core:',
        decisions: [
          {
            title: 'Zero-Allocation Protobuf Ingestion Pools',
            description:
              'Instead of instantiating structs for every incoming gRPC datagram, we built a memory pool manager with sync.Pool and reusable slices. Go Garbage Collector overhead dropped by 92%, keeping the GC (STW) pause consistently below 1.1ms.',
          },
          {
            title: 'Deterministic Hash Partitioning in Kafka',
            description:
              'A custom partitioner was built using the MurmurHash3 algorithm over the composite key of the source entity. This guaranteed that all chronological events from a device land on the same physical partition, enabling windowed deduplication without in-memory distributed locks such as Redis.',
          },
          {
            title: 'Mitigating "Too Many Parts" in ClickHouse',
            description:
              'Single-row inserts into columnar databases are fatal. We designed an in-memory dispatcher in each worker with a dual adaptive trigger: flush by block size (65,536 records) or by time threshold (400ms). This enabled optimal automatic compactions in the MergeTree engine without saturating disk I/O.',
          },
        ],
        faultToleranceTitle: '03 / FAULT TOLERANCE & DELIVERY SEMANTICS',
        faultToleranceIntro:
          'At-Least-Once guarantees with Idempotent Deduplication. IoT environments suffer constant disconnections that trigger massive retransmissions. Designing the pipeline around radical idempotency was a priority:',
        faultToleranceItems: [
          {
            title: 'MANUAL OFFSET MANAGEMENT',
            description:
              'Kafka offsets are committed only after the ClickHouse batch answers with HTTP 200 OK and a validated checksum. If a worker dies mid-insert, the new consumer picks up the previous segment without losing traces.',
          },
          {
            title: 'REPLACINGMERGETREE RECONCILER',
            description:
              'The ClickHouse primary key includes event_uuid and timestamp_nano. On identical retries, ClickHouse discards stale copies during background compaction without causing ingestion errors.',
          },
        ],
      },
      specs: {
        partitionNodes: '6 NVMe Brokers (KRaft mode)',
      },
      quoteText:
        'This project sums up my design approach: solve concurrency in the software layer with zero allocations and let Kafka and ClickHouse do their job with immutable structures and continuous compaction.',
    },
  },

  /* ------------------------------------------------------------------ */
  'raft-consensus': {
    es: {
      subtitle: 'Máquina de Estados Replicada y Leases Distribuidos',
      description:
        'Motor robusto de consenso por quórum desarrollado en Rust Tokio que ofrece exclusión mutua distribuida y replicación consistente de estado entre dominios de fallo multirregión.',
      architectureType: 'Máquina de Estados Replicada',
      slaStatus: 'En Producción (SLA 99.999%)',
      pattern: 'Clúster Multi-Raft con Membresía Dinámica',
      kicker: 'NÚCLEO DE CONSENSO DISTRIBUIDO',
      problemHeading: 'Split-brains y bloqueos lentos en clústeres multirregión',
      decisionsHeading: 'Lecturas Linealizables, Pipelining y Pre-Vote',
      partitionLabel: 'Nodos del Quórum:',
      topologyLabel: 'Topología del Clúster:',
      techDetails: [
        'Runtime asíncrono, máquina de estados de coste cero',
        'Vectores de consenso inter-nodo con Tonic',
        'WAL LSM persistente append-only',
      ],
      phases: [
        {
          phase: 'FASE 01',
          title: 'Elección de Líder & Heartbeats',
          description:
            'Máquina de estados determinista sin bloqueos globales con timers adaptativos de heartbeat para mitigar particiones de red y oscilaciones por jitter transatlántico.',
          metricLabel: 'Elección de líder en split-brain',
        },
        {
          phase: 'FASE 02',
          title: 'Replicación en Quorum Mayoritario',
          description:
            'Envío paralelo de entradas de registro mediante Tonic gRPC con pipelining de confirmaciones asíncronas para desacoplar el flush a disco del cómputo de la mayoría.',
          metricLabel: 'Commit quorum 3/5 nodos',
        },
        {
          phase: 'FASE 03',
          title: 'Compacción de Log & Snapshots',
          description:
            'Generación de snapshots en memoria con copy-on-write para purgar entradas de WAL antiguas sin congelar las operaciones de lectura linealizables.',
          metricLabel: 'Snapshot delta sync',
        },
      ],
      deepDive: {
        problemTitle: '01 / EL PROBLEMA Y RETO DE CONSISTENCIA',
        problemDescription:
          'En clústeres multirregión distribuidos entre Fráncfort, Virginia y Tokio, los split-brains y los bloqueos lentos en bases de datos tradicionales causaban condiciones de carrera graves en la asignación de licencias de hardware y transacciones financieras.',
        problemImpacts: [
          'Doble asignación de recursos durante particiones transitorias de cables submarinos.',
          'Latencias de commit erráticas (hasta 1.2s) debido a locks pesados de dos fases (2PC).',
          'Imposibilidad de realizar lecturas consistentes sin consultar al nodo central saturado.',
        ],
        decisionsTitle: '02 / DECISIONES CLAVE DE DISEÑO',
        decisionsIntro:
          'Implementación en Rust con Tokio para garantizar invariantes matemáticas sin riesgo de data-races en tiempo de compilación:',
        decisions: [
          {
            title: 'ReadIndex y Lease Reads para lecturas sin coste de quórum',
            description:
              'Implementación de ReadIndex protocol que permite servir lecturas fuertemente consistentes directamente desde el líder sin escribir una entrada de log adicional en el quórum.',
          },
          {
            title: 'Pipelining Asíncrono de Entradas de Log',
            description:
              'Separación del canal de transmisión de red del canal de fsync de disco usando hilos dedicados de RocksDB, elevando el rendimiento a 320,000 operaciones por segundo.',
          },
          {
            title: 'Pre-Vote Protocol para Prevenir Perturbaciones',
            description:
              'Un nodo desconectado que se reconecta consulta en fase previa si su registro está al día antes de incrementar su término, evitando degradar al líder activo.',
          },
        ],
        faultToleranceTitle: '03 / TOLERANCIA A PARTICIONES',
        faultToleranceIntro:
          'Resiliencia ante la caída simultánea de 2 de 5 nodos sin perder linealizabilidad ni una sola confirmación:',
        faultToleranceItems: [
          {
            title: 'AUTOMATIC JOINT CONSENSUS',
            description:
              'Cambios dinámicos de membresía del clúster (añadir o retirar brokers) sin detener el servicio mediante configuraciones transitorias C_old,new.',
          },
          {
            title: 'CRASH-RECOVERY WAL VERIFIER',
            description:
              'Verificación de sumas de comprobación CRC32c en cada entrada de registro para garantizar que un corte de energía no corrompa el estado.',
          },
        ],
      },
      specs: {},
      quoteText:
        'Raft no admite atajos. Cuando diseñas consenso, cada caso límite en el log de replicación debe demostrarse matemática y experimentalmente bajo inyección de particiones estocásticas.',
    },
    en: {
      subtitle: 'Replicated State Machine & Distributed Leases',
      description:
        'Robust quorum consensus engine engineered in Rust Tokio providing distributed mutual exclusion and consistent state replication across multi-region failure domains.',
      architectureType: 'Replicated State Machine',
      slaStatus: 'In Production (99.999% SLA)',
      pattern: 'Multi-Raft Cluster with Dynamic Membership',
      kicker: 'DISTRIBUTED CONSENSUS CORE',
      problemHeading: 'Split-brains and slow locking across multi-region clusters',
      decisionsHeading: 'Linearizable Reads, Pipelining and Pre-Vote',
      partitionLabel: 'Quorum Nodes:',
      topologyLabel: 'Cluster Topology:',
      techDetails: [
        'Async runtime, zero-cost state machine',
        'Tonic inter-node consensus vectors',
        'LSM persistent append-only WAL',
      ],
      phases: [
        {
          phase: 'PHASE 01',
          title: 'Leader Election & Heartbeats',
          description:
            'Deterministic state machine with no global locks and adaptive heartbeat timers to mitigate network partitions and transatlantic jitter oscillations.',
          metricLabel: 'Leader election during split-brain',
        },
        {
          phase: 'PHASE 02',
          title: 'Majority Quorum Replication',
          description:
            'Parallel dispatch of log entries over Tonic gRPC with asynchronous acknowledgment pipelining to decouple disk flush from the majority computation.',
          metricLabel: 'Commit quorum 3/5 nodes',
        },
        {
          phase: 'PHASE 03',
          title: 'Log Compaction & Snapshots',
          description:
            'In-memory copy-on-write snapshot generation to purge old WAL entries without freezing linearizable read operations.',
          metricLabel: 'Snapshot delta sync',
        },
      ],
      deepDive: {
        problemTitle: '01 / THE PROBLEM & CONSISTENCY CHALLENGE',
        problemDescription:
          'In multi-region clusters spread across Frankfurt, Virginia and Tokyo, split-brains and slow locks in traditional databases caused severe race conditions in hardware license allocation and financial transactions.',
        problemImpacts: [
          'Double allocation of resources during transient submarine cable partitions.',
          'Erratic commit latencies (up to 1.2s) caused by heavy two-phase locks (2PC).',
          'Impossible to perform consistent reads without querying the saturated central node.',
        ],
        decisionsTitle: '02 / KEY DESIGN DECISIONS',
        decisionsIntro:
          'Implementation in Rust with Tokio to guarantee mathematical invariants with no risk of data races at compile time:',
        decisions: [
          {
            title: 'ReadIndex and Lease Reads for quorum-free reads',
            description:
              'Implementation of the ReadIndex protocol, which serves strongly consistent reads directly from the leader without writing an additional log entry to the quorum.',
          },
          {
            title: 'Asynchronous Log Entry Pipelining',
            description:
              'Separation of the network transmission channel from the disk fsync channel using dedicated RocksDB threads, raising throughput to 320,000 operations per second.',
          },
          {
            title: 'Pre-Vote Protocol to Prevent Disruptions',
            description:
              'A disconnected node that reconnects first checks whether its log is up to date before incrementing its term, avoiding disruption of the active leader.',
          },
        ],
        faultToleranceTitle: '03 / PARTITION TOLERANCE',
        faultToleranceIntro:
          'Resilience to the simultaneous loss of 2 out of 5 nodes without losing linearizability or a single acknowledgment:',
        faultToleranceItems: [
          {
            title: 'AUTOMATIC JOINT CONSENSUS',
            description:
              'Dynamic cluster membership changes (adding or removing brokers) without stopping the service, using transitional C_old,new configurations.',
          },
          {
            title: 'CRASH-RECOVERY WAL VERIFIER',
            description:
              'CRC32c checksum verification on every log entry to guarantee that a power cut does not corrupt state.',
          },
        ],
      },
      specs: {
        partitionNodes: '5 Dedicated Quorum Nodes (NVMe PCI-e 4.0)',
      },
      quoteText:
        'Raft allows no shortcuts. When you design consensus, every edge case in the replication log must be proven mathematically and experimentally under stochastic partition injection.',
    },
  },

  /* ------------------------------------------------------------------ */
  'rate-limiter': {
    es: {
      subtitle: 'Token Bucket Dinámico y Gateways de Ventana Deslizante',
      description:
        'Filtro de API gateway distribuido que aplica límites de ventana deslizante locales y circuit breakers para proteger los sistemas centrales frente a picos de tráfico y vectores DDoS.',
      architectureType: 'Gateway Distribuido y Reverse Proxy',
      slaStatus: 'En Producción (SLA 99.995%)',
      pattern: 'Ventana Deslizante Descentralizada con Token Buckets Locales',
      kicker: 'GATEWAY DE BORDE Y CONTROL DE TRÁFICO',
      problemHeading: 'Picos de tráfico y fallos en cascada',
      decisionsHeading: 'Token Buckets Locales y Ventana Deslizante Central',
      partitionLabel: 'Nodos Redis:',
      topologyLabel: 'Topología de Ingress:',
      techDetails: [
        'Filtros gRPC de baja latencia',
        'Scripts Lua atómicos de ventana rodante',
        'Proxy mesh edge termination',
      ],
      phases: [
        {
          phase: 'FASE 01',
          title: 'Inspección de Borde (Edge)',
          description:
            'Evaluación en sub-milisegundo de tokens JWT y huellas de cliente HTTP/2 en Envoy Proxy con fallback local si el rate limiter central presenta jitter.',
          metricLabel: 'Overhead de inspección edge',
        },
        {
          phase: 'FASE 02',
          title: 'Sliding Window Atómica',
          description:
            'Contadores deslizantes en Redis ejecutados mediante scripts Lua atómicos que impiden el "boundary effect" donde clientes maliciosos doblaban su cupo.',
          metricLabel: 'Evaluación de cuota en clúster',
        },
        {
          phase: 'FASE 03',
          title: 'Mitigación de Avalancha',
          description:
            'Cierre preventivo de circuitos cuando las latencias de microservicios internos superan el p99 establecido, respondiendo HTTP 429 con Retry-After adaptativo.',
          metricLabel: 'Aislamiento de cascada',
        },
      ],
      deepDive: {
        problemTitle: '01 / EL PROBLEMA DE PICOS Y AVALANCHA',
        problemDescription:
          'Campañas masivas de flash sales y raspado no autorizado saturaban los servicios de base de datos internos con más de 800,000 llamadas concurrentes por segundo, derivando en caídas en cascada.',
        problemImpacts: [
          'Efecto estampida (thundering herd) tras reintentos agresivos sin retroceso exponencial.',
          'Saturación de los pools de conexiones a Postgres.',
          'Penalización de usuarios legítimos debido a clientes abusivos en la misma IP compartida.',
        ],
        decisionsTitle: '02 / DECISIONES CLAVE DE INGENIERÍA',
        decisionsIntro:
          'Hibridación de token buckets locales con sincronización estocástica hacia Redis para eliminar contenciones de red:',
        decisions: [
          {
            title: 'Dos Niveles: Token Bucket Local + Ventana Rodante Central',
            description:
              'Cada worker de Envoy mantiene un crédito local de 1,000 peticiones en memoria; solo cuando agota el bloque consulta a Redis, reduciendo el tráfico de red en un 88%.',
          },
          {
            title: 'Algoritmo de Sliding Window Logarítmico',
            description:
              'Cálculo de pesos de ventana en base a marcas de tiempo Unix de alta resolución, asegurando que un burst en el segundo 59.9 y otro en el 00.1 no sobrepasen el umbral por minuto.',
          },
        ],
        faultToleranceTitle: '03 / FAIL-OPEN VS FAIL-SECURE',
        faultToleranceIntro:
          'Modo degradado configurable para priorizar disponibilidad sobre bloqueo estricto en situaciones de emergencia en Redis:',
        faultToleranceItems: [
          {
            title: 'DYNAMIC SHADOW LIMITING',
            description:
              'Medición de clientes sospechosos en modo sombra sin bloquear tráfico real hasta confirmar comportamiento anómalo sostenido.',
          },
        ],
      },
      specs: {},
      quoteText:
        'El mejor rate limiter no es el que bloquea más paquetes, sino el que preserva la estabilidad del downstream con el menor impacto en la latencia de los usuarios honestos.',
    },
    en: {
      subtitle: 'Dynamic Token Bucket & Sliding Window Gateways',
      description:
        'Distributed API gateway filter enforcing localized sliding-window limits and circuit breakers to defend core systems against traffic surges and DDoS vectors.',
      architectureType: 'Distributed Gateway & Reverse Proxy',
      slaStatus: 'In Production (99.995% SLA)',
      pattern: 'Decentralized Sliding Window with Local Token Buckets',
      kicker: 'EDGE GATEWAY & TRAFFIC CONTROL',
      problemHeading: 'Traffic surges and cascading failures',
      decisionsHeading: 'Local Token Buckets and a Central Sliding Window',
      partitionLabel: 'Redis Nodes:',
      topologyLabel: 'Ingress Topology:',
      techDetails: [
        'Low-latency gRPC filters',
        'Atomic rolling-window Lua scripts',
        'Proxy mesh edge termination',
      ],
      phases: [
        {
          phase: 'PHASE 01',
          title: 'Edge Inspection',
          description:
            'Sub-millisecond evaluation of JWT tokens and HTTP/2 client fingerprints in Envoy Proxy, with a local fallback if the central rate limiter shows jitter.',
          metricLabel: 'Edge inspection overhead',
        },
        {
          phase: 'PHASE 02',
          title: 'Atomic Sliding Window',
          description:
            'Sliding counters in Redis executed through atomic Lua scripts that prevent the "boundary effect" where malicious clients doubled their quota.',
          metricLabel: 'Cluster quota evaluation',
        },
        {
          phase: 'PHASE 03',
          title: 'Avalanche Mitigation',
          description:
            'Preventive circuit opening when internal microservice latencies exceed the configured p99, answering HTTP 429 with an adaptive Retry-After.',
          metricLabel: 'Cascade isolation',
        },
      ],
      deepDive: {
        problemTitle: '01 / THE SURGE & AVALANCHE PROBLEM',
        problemDescription:
          'Massive flash-sale campaigns and unauthorized scraping saturated internal database services with more than 800,000 concurrent calls per second, leading to cascading outages.',
        problemImpacts: [
          'Thundering herd effect after aggressive retries without exponential backoff.',
          'Saturation of the Postgres connection pools.',
          'Penalization of legitimate users because of abusive clients behind the same shared IP.',
        ],
        decisionsTitle: '02 / KEY ENGINEERING DECISIONS',
        decisionsIntro:
          'Hybridization of local token buckets with stochastic synchronization to Redis to eliminate network contention:',
        decisions: [
          {
            title: 'Two Tiers: Local Token Bucket + Central Rolling Window',
            description:
              'Each Envoy worker keeps a local in-memory credit of 1,000 requests; only when it exhausts the block does it query Redis, cutting network traffic by 88%.',
          },
          {
            title: 'Logarithmic Sliding Window Algorithm',
            description:
              'Window weights are computed from high-resolution Unix timestamps, ensuring that a burst at second 59.9 and another at 00.1 do not exceed the per-minute threshold.',
          },
        ],
        faultToleranceTitle: '03 / FAIL-OPEN VS FAIL-SECURE',
        faultToleranceIntro:
          'Configurable degraded mode to prioritize availability over strict blocking during Redis emergencies:',
        faultToleranceItems: [
          {
            title: 'DYNAMIC SHADOW LIMITING',
            description:
              'Measuring suspicious clients in shadow mode without blocking real traffic until sustained anomalous behavior is confirmed.',
          },
        ],
      },
      specs: {
        partitionNodes: '12 Redis Cluster Nodes (In-Memory Sentinel)',
      },
      quoteText:
        'The best rate limiter is not the one that blocks the most packets, but the one that preserves downstream stability with the least impact on honest users\' latency.',
    },
  },

  /* ------------------------------------------------------------------ */
  'financial-ledger': {
    es: {
      subtitle: 'Auditabilidad de Partida Doble y Pruebas Criptográficas',
      description:
        'Núcleo transaccional inmutable que aprovecha la verificación con árboles Merkle y el patrón transactional outbox para una contabilidad y auditoría financiera sin discrepancias.',
      architectureType: 'Event Sourcing y CQRS',
      slaStatus: 'En Producción (SLA 99.999%)',
      pattern: 'Event Sourcing Determinista con Logs de Auditoría Merkle',
      kicker: 'NÚCLEO FINANCIERO INMUTABLE',
      problemHeading: 'Auditoría y concurrencia en sistemas financieros',
      decisionsHeading: 'Inmutabilidad, Árboles Merkle y CQRS',
      partitionLabel: 'Nodos PostgreSQL:',
      topologyLabel: 'Replicación:',
      techDetails: [
        'Motor inmutable y verificación Merkle',
        'Particionado por libros mayores & outbox',
        'Bus de eventos de baja latencia JetStream',
      ],
      phases: [
        {
          phase: 'FASE 01',
          title: 'Validación de Partida Doble',
          description:
            'Comprobación estricta en memoria de que débitos y créditos sumen exactamente cero antes de emitir el evento inmutable a disco.',
          metricLabel: 'Validación matemática',
        },
        {
          phase: 'FASE 02',
          title: 'Pruebas Criptográficas',
          description:
            'Cada bloque de 1,000 transacciones genera una raíz Merkle SHA-256 anclada en un registro inviolable para auditorías externas en tiempo real.',
          metricLabel: 'Tiempo de prueba de inclusión',
        },
        {
          phase: 'FASE 03',
          title: 'Proyección CQRS & Read-Models',
          description:
            'Difusión reactiva a proyecciones de saldos de clientes con semántica exactly-once mediante deduplicación de claves de idempotencia.',
          metricLabel: 'Lag de proyección de saldo',
        },
      ],
      deepDive: {
        problemTitle: '01 / EL RETO DE AUDITORÍA Y CONCURRENCIA FINANCIERA',
        problemDescription:
          'Sistemas basados en UPDATE directo sobre saldos de cuentas sufren inconsistencias irreversibles bajo picos de concurrencia y fallos de nodo durante la conciliación bancaria.',
        problemImpacts: [
          'Dificultad extrema para reconstruir el historial financiero exacto tras una discrepancia.',
          'Bloqueos pesados a nivel de fila (SELECT FOR UPDATE) que asfixiaban la tasa de transacción a menos de 400 ops/s.',
          'Costes millonarios en auditorías contables manuales de fin de trimestre.',
        ],
        decisionsTitle: '02 / ARQUITECTURA EVENT-SOURCED EN RUST',
        decisionsIntro:
          'Los saldos no existen en base de datos; son proyecciones deterministas calculadas a partir del flujo inmutable de asientos contables:',
        decisions: [
          {
            title: 'Inmutabilidad Absoluta en PostgreSQL',
            description:
              'Tablas con permisos que prohíben estrictamente sentencias UPDATE o DELETE en la base de datos de producción; solo se permiten INSERTs atómicos.',
          },
          {
            title: 'Árboles Merkle para Verificación Criptográfica',
            description:
              'Auditorías instantáneas: cualquier auditor puede comprobar con la raíz Merkle pública que un asiento no ha sido alterado retroactivamente.',
          },
        ],
        faultToleranceTitle: '03 / EXACTLY-ONCE CON IDEMPOTENCIA',
        faultToleranceIntro:
          'Manejo de reintentos bancarios sin duplicar cargos ni generar descubiertos no autorizados:',
        faultToleranceItems: [
          {
            title: 'TRANSACTIONAL OUTBOX PATTERN',
            description:
              'El evento se guarda en la misma transacción ACID que la entrada del libro contable, garantizando que el bus de mensajería nunca pierda una emisión.',
          },
        ],
      },
      specs: {},
      quoteText:
        'En ingeniería fintech, la mutabilidad es la madre de todos los desastres contables. Si cada transacción es un hecho histórico inmutable con prueba criptográfica, la reconciliación deja de ser un problema.',
    },
    en: {
      subtitle: 'Double-Entry Auditability & Cryptographic Proofs',
      description:
        'Immutable transactional core leveraging Merkle tree verification and transactional outbox patterns for zero-discrepancy financial accounting and auditing.',
      architectureType: 'Event Sourcing & CQRS',
      slaStatus: 'In Production (99.999% SLA)',
      pattern: 'Deterministic Event Sourcing with Merkle Audit Logs',
      kicker: 'IMMUTABLE FINANCIAL CORE',
      problemHeading: 'Auditability and concurrency in financial systems',
      decisionsHeading: 'Immutability, Merkle Trees and CQRS',
      partitionLabel: 'PostgreSQL Nodes:',
      topologyLabel: 'Replication:',
      techDetails: [
        'Immutable engine & Merkle verification',
        'Ledger partitioning & outbox',
        'Low-latency JetStream event bus',
      ],
      phases: [
        {
          phase: 'PHASE 01',
          title: 'Double-Entry Validation',
          description:
            'Strict in-memory check that debits and credits sum to exactly zero before the immutable event is written to disk.',
          metricLabel: 'Mathematical validation',
        },
        {
          phase: 'PHASE 02',
          title: 'Cryptographic Proofs',
          description:
            'Every block of 1,000 transactions generates a SHA-256 Merkle root anchored in a tamper-proof record for real-time external audits.',
          metricLabel: 'Inclusion proof time',
        },
        {
          phase: 'PHASE 03',
          title: 'CQRS Projection & Read-Models',
          description:
            'Reactive fan-out to customer balance projections with exactly-once semantics through idempotency key deduplication.',
          metricLabel: 'Balance projection lag',
        },
      ],
      deepDive: {
        problemTitle: '01 / THE AUDIT & FINANCIAL CONCURRENCY CHALLENGE',
        problemDescription:
          'Systems based on direct UPDATE statements over account balances suffer irreversible inconsistencies under concurrency peaks and node failures during bank reconciliation.',
        problemImpacts: [
          'Extreme difficulty reconstructing the exact financial history after a discrepancy.',
          'Heavy row-level locks (SELECT FOR UPDATE) that choked the transaction rate to under 400 ops/s.',
          'Multi-million costs in manual end-of-quarter accounting audits.',
        ],
        decisionsTitle: '02 / EVENT-SOURCED ARCHITECTURE IN RUST',
        decisionsIntro:
          'Balances do not exist in the database; they are deterministic projections computed from the immutable stream of ledger entries:',
        decisions: [
          {
            title: 'Absolute Immutability in PostgreSQL',
            description:
              'Tables with permissions that strictly forbid UPDATE or DELETE statements in the production database; only atomic INSERTs are allowed.',
          },
          {
            title: 'Merkle Trees for Cryptographic Verification',
            description:
              'Instant audits: any auditor can verify with the public Merkle root that an entry has not been retroactively altered.',
          },
        ],
        faultToleranceTitle: '03 / EXACTLY-ONCE WITH IDEMPOTENCY',
        faultToleranceIntro:
          'Handling banking retries without duplicating charges or generating unauthorized overdrafts:',
        faultToleranceItems: [
          {
            title: 'TRANSACTIONAL OUTBOX PATTERN',
            description:
              'The event is stored in the same ACID transaction as the ledger entry, guaranteeing that the messaging bus never loses an emission.',
          },
        ],
      },
      specs: {
        partitionNodes: '8 Partitioned PostgreSQL Nodes + NVMe Direct',
      },
      quoteText:
        'In fintech engineering, mutability is the mother of all accounting disasters. If every transaction is an immutable historical fact with cryptographic proof, reconciliation stops being a problem.',
    },
  },
};
