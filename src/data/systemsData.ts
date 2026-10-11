import { SystemBase } from '../types';

export const systemsList: SystemBase[] = [
  {
    id: 'telemetry-engine',
    code: 'SYS-041-TELEMETRY',
    title: 'Telemetry Engine',
    subtitle: 'Distributed Ingestion & Time-Series Transformation',
    category: 'STREAMING',
    categoryTag: '// 01 STREAMING',
    statusBadge: 'PRODUCTION READY',
    statusColor: '#22c55e',
    description:
      'Horizontally partitioned streaming pipeline that ingests, enriches, and dispatches high-velocity telemetry spans without backpressure degradation under peak loads.',
    architectureType: 'Event-Driven Microservices',
    heroImage: '/src/assets/images/telemetry_stream_topology_1791751723688.jpg',
    technologies: [
      { name: 'Go', percentage: 65, color: '#38bdf8', detail: 'Ingestión zero-alloc, buffers gRPC' },
      { name: 'Kafka', percentage: 20, color: '#f59e0b', detail: 'Particionamiento & Backpressure' },
      { name: 'ClickHouse', percentage: 15, color: '#ec4899', detail: 'MergeTree Clustered Analytics' },
      { name: 'OpenTelemetry', percentage: 5, color: '#a855f7', detail: 'Colectores OTLP & Semantics' },
    ],
    rfcNumber: 'RFC-2023-09A',
    slaStatus: 'En Producción (SLA 99.99%)',
    role: 'Lead Backend Architect',
    pattern: 'Event-Driven Stream Processing',
    throughput: '1.4M ev/sec',
    stackVersion: 'v2.4 Core',
    blueprintId: 'ARCH-SPEC-TEL-01',
    blueprintScale: 'ClickHouse MergeTree Engine',
    phases: [
      {
        phase: 'FASE 01',
        tech: 'gRPC / Protobuf',
        title: 'Capa de Ingestión',
        description:
          'Puntos de terminación balanceados por eBPF que reciben streams persistentes desde dispositivos IoT, logstash y OpenTelemetry Collectors. Emplea serialización Protocol Buffers estricta para reducir el payload en un 68% frente a JSON estándar.',
        metricLabel: 'Pooling zero-alloc sync.Pool',
        metricValue: '< 3.2ms',
      },
      {
        phase: 'FASE 02',
        tech: 'Apache Kafka Cluster',
        title: 'Broker & Particionamiento',
        description:
          'Topología de 24 particiones con balanceador basado en hash determinista por tenant_id:device_uuid. Previene hotspotting de discos NVMe mediante log segmentation reactiva y control de backpressure con pausa de consumidores.',
        metricLabel: 'Throughput sostenido',
        metricValue: '850 MB/s',
      },
      {
        phase: 'FASE 03',
        tech: 'ClickHouse Clustered',
        title: 'Almacenamiento Columnar',
        description:
          'Consumidores en Go realizan micro-batching dinámico de 50k filas o 500ms y vuelcan directo a tablas motor ReplacingMergeTree y AggregatingMergeTree. Permite consultas analíticas sobre miles de millones de filas en milisegundos.',
        metricLabel: 'Tiempo de agregación p95',
        metricValue: '18ms / 10B rows',
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
    specs: {
      identifier: 'SYS.TEL-ENG-99',
      deploymentEnv: 'Kubernetes (Bare-Metal + AWS EKS)',
      partitionNodes: '6 Brokers NVMe (KRaft mode)',
      clusterTopology: '3 Shards x 2 Replicas',
      compressionRatio: '8.4x (ZSTD lv3)',
      monitoring: 'Prometheus + Grafana + OTel',
    },
    quote: {
      text:
        'Este proyecto sintetiza mi enfoque de diseño: resolver la concurrencia en la capa de software con asignaciones nulas y dejar que Kafka y ClickHouse hagan su trabajo con estructuras inmutables y compactación continua.',
      author: 'Alex Rivera',
      role: 'Distributed Systems Specialist',
      location: 'Madrid / Operación Remota Global',
    },
    liveMetrics: {
      totalMessagesDaily: '2.5B / día',
      avgLatencyP99: 42.8,
      cpuUsage: 14.2,
      availability: '99.998%',
      baseThroughput: 1424987,
    },
  },
  {
    id: 'raft-consensus',
    code: 'SYS-042-CONSENSUS',
    title: 'Raft Consensus Coordinator',
    subtitle: 'Replicated State Machine & Distributed Leases',
    category: 'CONSENSUS',
    categoryTag: '// 02 CONSENSUS STER',
    statusBadge: 'RAFT ACTIVE',
    statusColor: '#38bdf8',
    description:
      'Robust quorum consensus engine engineered in Rust Tokio providing distributed mutual exclusion and consistent state replication across multi-region failure domains.',
    architectureType: 'Replicated State Machine',
    heroImage: '/src/assets/images/raft_consensus_diagram_1791751734009.jpg',
    technologies: [
      { name: 'Rust Tokio', percentage: 70, color: '#f97316', detail: 'Async runtime, zero-cost state machine' },
      { name: 'gRPC', percentage: 20, color: '#38bdf8', detail: 'Tonic inter-node consensus vectors' },
      { name: 'RocksDB', percentage: 10, color: '#10b981', detail: 'LSM persistent append-only WAL' },
    ],
    rfcNumber: 'RFC-2024-03C',
    slaStatus: 'En Producción (SLA 99.999%)',
    role: 'Principal Systems Architect',
    pattern: 'Multi-Raft Cluster with Dynamic Membership',
    throughput: '320k ops/sec',
    stackVersion: 'v1.8 Engine',
    blueprintId: 'ARCH-SPEC-RAFT-04',
    blueprintScale: 'Quorum Consensus • Tokio Async Reactor',
    phases: [
      {
        phase: 'FASE 01',
        tech: 'Rust Tokio Reactor',
        title: 'Elección de Líder & Heartbeats',
        description:
          'Máquina de estados determinista sin bloqueos globales con timers adaptativos de heartbeat para mitigar particiones de red y oscilaciones por jitter transatlántico.',
        metricLabel: 'Elección de líder en split-brain',
        metricValue: '< 65ms',
      },
      {
        phase: 'FASE 02',
        tech: 'AppendEntries Pipeline',
        title: 'Replicación en Quorum Mayoritario',
        description:
          'Envío paralelo de entradas de registro mediante Tonic gRPC con pipelining de confirmaciones asíncronas para desacoplar el flush a disco del cómputo de la mayoría.',
        metricLabel: 'Commit quorum 3/5 nodos',
        metricValue: '< 4.8ms',
      },
      {
        phase: 'FASE 03',
        tech: 'RocksDB LSM Compaction',
        title: 'Compacción de Log & Snapshots',
        description:
          'Generación de snapshots en memoria con copy-on-write para purgar entradas de WAL antiguas sin congelar las operaciones de lectura linealizables.',
        metricLabel: 'Snapshot delta sync',
        metricValue: '1.2 GB/s',
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
    specs: {
      identifier: 'SYS.RAFT-COR-12',
      deploymentEnv: 'Bare-Metal Equinix Metal + Direct Connect',
      partitionNodes: '5 Nodos Quorum Dedicados (NVMe PCI-e 4.0)',
      clusterTopology: 'Multi-AZ Quorum 3/5',
      compressionRatio: 'Snappy LSM Compaction',
      monitoring: 'OpenTelemetry Trace Vectors + Tokio Console',
    },
    quote: {
      text:
        'Raft no admite atajos. Cuando diseñas consenso, cada caso límite en el log de replicación debe demostrarse matemática y experimentalmente bajo inyección de particiones estocásticas.',
      author: 'Alex Rivera',
      role: 'Principal Systems Architect',
      location: 'Madrid / Operación Remota Global',
    },
    liveMetrics: {
      totalMessagesDaily: '650M / día',
      avgLatencyP99: 6.4,
      cpuUsage: 19.8,
      availability: '99.999%',
      baseThroughput: 320400,
    },
  },
  {
    id: 'rate-limiter',
    code: 'SYS-043-EDGE',
    title: 'Adaptive Rate Limiter & Edge Routing',
    subtitle: 'Dynamic Token Bucket & Sliding Window Gateways',
    category: 'EDGE & PROXY',
    categoryTag: '// 03 EDGE & PROXY',
    statusBadge: 'ENVOY MESH',
    statusColor: '#a855f7',
    description:
      'Distributed API gateway filter enforcing localized sliding-window limits and circuit breakers to defend core systems against traffic surges and DDoS vectors.',
    architectureType: 'Distributed Gateway & Reverse Proxy',
    heroImage: '/src/assets/images/rate_limiter_edge_mesh_1791751743650.jpg',
    technologies: [
      { name: 'Go', percentage: 55, color: '#38bdf8', detail: 'Filtros gRPC de baja latencia' },
      { name: 'Redis Cluster', percentage: 30, color: '#ef4444', detail: 'Scripts Lua atómicos de ventana rodante' },
      { name: 'Envoy/Lua', percentage: 15, color: '#6366f1', detail: 'Proxy mesh edge termination' },
    ],
    rfcNumber: 'RFC-2024-07B',
    slaStatus: 'En Producción (SLA 99.995%)',
    role: 'Staff Infrastructure Engineer',
    pattern: 'Decentralized Sliding Window with Local Token Buckets',
    throughput: '950k req/sec',
    stackVersion: 'v3.1 Edge',
    blueprintId: 'ARCH-SPEC-RATE-09',
    blueprintScale: 'Envoy Filter Mesh • Redis Cluster Lua',
    phases: [
      {
        phase: 'FASE 01',
        tech: 'Envoy External Auth & Filter',
        title: 'Inspección de Borde (Edge)',
        description:
          'Evaluación en sub-milisegundo de tokens JWT y huellas de cliente HTTP/2 en Envoy Proxy con fallback local si el rate limiter central presenta jitter.',
        metricLabel: 'Overhead de inspección edge',
        metricValue: '< 0.45ms',
      },
      {
        phase: 'FASE 02',
        tech: 'Redis Cluster Lua Scripts',
        title: 'Sliding Window Atómica',
        description:
          'Contadores deslizantes en Redis ejecutados mediante scripts Lua atómicos que impiden el "boundary effect" donde clientes maliciosos doblaban su cupo.',
        metricLabel: 'Evaluación de cuota en clúster',
        metricValue: '1.2ms p99',
      },
      {
        phase: 'FASE 03',
        tech: 'Circuit Breaker Adaptativo',
        title: 'Mitigación de Avalancha',
        description:
          'Cierre preventivo de circuitos cuando las latencias de microservicios internos superan el p99 establecido, respondiendo HTTP 429 con Retry-After adaptativo.',
        metricLabel: 'Aislamiento de cascada',
        metricValue: '100% Protegido',
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
    specs: {
      identifier: 'SYS.RATE-EDGE-44',
      deploymentEnv: 'Kubernetes Edge Ingress (AWS + Cloudflare Workers)',
      partitionNodes: '12 Nodos Redis Cluster (In-Memory Sentinel)',
      clusterTopology: 'Multi-Region Anycast Ingress',
      compressionRatio: 'Zero-Alloc In-Memory Buffers',
      monitoring: 'Envoy Prometheus Metrics + Datadog APM',
    },
    quote: {
      text:
        'El mejor rate limiter no es el que bloquea más paquetes, sino el que preserva la estabilidad del downstream con el menor impacto en la latencia de los usuarios honestos.',
      author: 'Alex Rivera',
      role: 'Staff Infrastructure Engineer',
      location: 'Madrid / Operación Remota Global',
    },
    liveMetrics: {
      totalMessagesDaily: '1.8B / día',
      avgLatencyP99: 1.8,
      cpuUsage: 22.4,
      availability: '99.999%',
      baseThroughput: 950000,
    },
  },
  {
    id: 'financial-ledger',
    code: 'SYS-044-LEDGER',
    title: 'Event-Sourced Financial Ledger',
    subtitle: 'Double-Entry Auditability & Cryptographic Proofs',
    category: 'FINANCIAL ENGINE',
    categoryTag: '// 04 FINANCIAL CORE',
    statusBadge: 'ACID PROVEN',
    statusColor: '#10b981',
    description:
      'Immutable transactional core leveraging Merkle tree verification and transactional outbox patterns for zero-discrepancy financial accounting and auditing.',
    architectureType: 'Event Sourcing & CQRS',
    heroImage: '/src/assets/images/financial_ledger_merkle_1791751753884.jpg',
    technologies: [
      { name: 'Rust', percentage: 60, color: '#f97316', detail: 'Motor inmutable y verificación Merkle' },
      { name: 'PostgreSQL', percentage: 25, color: '#38bdf8', detail: 'Particionado por libros mayores & outbox' },
      { name: 'NATS', percentage: 15, color: '#22c55e', detail: 'Bus de eventos de baja latencia JetStream' },
    ],
    rfcNumber: 'RFC-2024-11E',
    slaStatus: 'En Producción (SLA 99.999%)',
    role: 'Principal Backend Architect',
    pattern: 'Deterministic Event Sourcing with Merkle Audit Logs',
    throughput: '120k tx/sec',
    stackVersion: 'v4.0 Ledger',
    blueprintId: 'ARCH-SPEC-FIN-18',
    blueprintScale: 'Cryptographic Ledger • Merkle Root Proofs',
    phases: [
      {
        phase: 'FASE 01',
        tech: 'Rust Transaction Engine',
        title: 'Validación de Partida Doble',
        description:
          'Comprobación estricta en memoria de que débitos y créditos sumen exactamente cero antes de emitir el evento inmutable a disco.',
        metricLabel: 'Validación matemática',
        metricValue: '0 discrepancias',
      },
      {
        phase: 'FASE 02',
        tech: 'Merkle Tree Chaining',
        title: 'Pruebas Criptográficas',
        description:
          'Cada bloque de 1,000 transacciones genera una raíz Merkle SHA-256 anclada en un registro inviolable para auditorías externas en tiempo real.',
        metricLabel: 'Tiempo de prueba de inclusión',
        metricValue: '< 0.8ms',
      },
      {
        phase: 'FASE 03',
        tech: 'NATS JetStream Outbox',
        title: 'Proyección CQRS & Read-Models',
        description:
          'Difusión reactiva a proyecciones de saldos de clientes con semántica exactly-once mediante deduplicación de claves de idempotencia.',
        metricLabel: 'Lag de proyección de saldo',
        metricValue: '< 12ms',
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
    specs: {
      identifier: 'SYS.FIN-LEDGER-01',
      deploymentEnv: 'Tier-4 PCI-DSS Compliant Private Cloud',
      partitionNodes: '8 Nodos PostgreSQL Partitioned + NVMe Direct',
      clusterTopology: 'Active-Standby Synchronous Replication',
      compressionRatio: 'Postgres pg_wal ZSTD',
      monitoring: 'OpenTelemetry Trace + Financial Anomaly Probes',
    },
    quote: {
      text:
        'En ingeniería fintech, la mutabilidad es la madre de todos los desastres contables. Si cada transacción es un hecho histórico inmutable con prueba criptográfica, la reconciliación deja de ser un problema.',
      author: 'Alex Rivera',
      role: 'Principal Backend Architect',
      location: 'Madrid / Operación Remota Global',
    },
    liveMetrics: {
      totalMessagesDaily: '120M / día',
      avgLatencyP99: 11.2,
      cpuUsage: 16.5,
      availability: '99.999%',
      baseThroughput: 120000,
    },
  },
];
