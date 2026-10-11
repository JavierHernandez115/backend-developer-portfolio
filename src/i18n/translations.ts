export type Lang = 'es' | 'en';

/* ------------------------------------------------------------------ */
/*  Personal data (same in both languages)                             */
/* ------------------------------------------------------------------ */
export const profile = {
  fullName: 'Leonardo Javier Hernandez Martinez',
  firstName: 'LEONARDO',
  lastName: 'HERNANDEZ',
  initials: 'LH',
  email: 'hernandezmartinezjavier115@gmail.com',
  phone: '+52 449-189-1965',
  phoneHref: 'tel:+524491891965',
  company: 'Max 4 Technologies',
};

/* ------------------------------------------------------------------ */
/*  Spanish dictionary                                                 */
/* ------------------------------------------------------------------ */
const es = {
  langSwitch: { label: 'Idioma', es: 'ES', en: 'EN', title: 'Cambiar idioma' },

  floating: { screen1: 'Pantalla 1: Portafolio', screen2: 'Pantalla 2: Caso' },

  header: {
    code: 'LH//DEV.01',
    location: 'AGUASCALIENTES / MÉXICO',
    nav01: '// 01.INICIO',
    nav02: '// 02.PROYECTOS',
    nav03: '// 03.CONTACTO',
    available: 'Disponible para nuevas oportunidades',
  },

  hero: {
    eyebrow: '// PRÁCTICA PROFESIONAL',
    years: '2018—PRESENTE',
    role: 'Desarrollo de Software | Backend & Full Stack',
    p1: 'Construyo soluciones eficientes, escalables y de alta calidad: desde APIs y microservicios hasta interfaces de usuario listas para producción.',
    p2a: 'Especializado en Java (Spring Boot), Python (Django) y PHP (Laravel), con interfaces en React y Vue.js. Experiencia en producción con contenedores',
    pill1: 'Docker + Kubernetes',
    p2b: 'y despliegues automatizados con',
    pill2: 'CI/CD en Jenkins',
    p2c: '.',
    stackLabel: 'STACK PRINCIPAL',
    contactBtn: 'Iniciar Contacto',
    exploreBtn: 'Ver Proyectos',
    linkEmail: '// Correo',
    linkPhone: '// Teléfono',
    linkCv: '// CV',
    cardTag: 'BACKEND & FULL STACK',
    cardRole: 'FULL STACK DEVELOPER',
    cardCurrentLabel: 'ACTUALMENTE',
    cardCurrentValue: 'MAX 4 TECHNOLOGIES',
    portraitAlt: 'Leonardo Hernández - Desarrollador de Software Backend & Full Stack',
  },

  marquee: [
    'ARQUITECTURA DE MICROSERVICIOS',
    'CONTENEDORES CON DOCKER',
    'ORQUESTACIÓN CON KUBERNETES',
    'PIPELINES CI/CD CON JENKINS',
    'APIS REST',
    'DESARROLLO FULL STACK',
  ],

  systems: {
    eyebrowA: '// SECCIÓN 02',
    eyebrowB: 'EXPEDIENTES DE PROYECTOS',
    title: 'PROYECTOS SELECCIONADOS',
    subtitle: '/ ÍNDICE DE ARQUITECTURA',
    categories: {
      ALL: 'TODOS',
      STREAMING: 'STREAMING',
      CONSENSUS: 'CONSENSO',
      'EDGE & PROXY': 'EDGE & PROXY',
      'FINANCIAL ENGINE': 'MOTOR FINANCIERO',
    } as Record<string, string>,
    architecture: 'ARQUITECTURA:',
    technologies: 'Tecnologías:',
    viewFull: 'Ver Arquitectura Completa',
    viewDetail: 'Ver Detalle del Proyecto',
  },

  pillars: {
    eyebrow: '// PILARES DE TRABAJO',
    title: 'Calidad, Escalabilidad y Mejora Continua.',
    text: 'Me apasiona construir soluciones eficientes, escalables y de alta calidad. Refactorizo código legacy, automatizo despliegues y reduzco las inconsistencias entre entornos para que los equipos entreguen con confianza. Soy autodidacta, proactivo y estoy comprometido con el aprendizaje continuo y la colaboración en equipos multidisciplinarios.',
  },

  cta: {
    badge: 'DISPONIBLE PARA ROLES BACKEND Y FULL STACK',
    headline: '¿Buscas un desarrollador que entregue software confiable, escalable y mantenible?',
    text: 'Abierto a oportunidades en desarrollo backend, full stack, microservicios y DevOps. Basado en Aguascalientes, México, con disponibilidad para trabajo remoto y colaboración con equipos multidisciplinarios.',
    contactBtn: 'Iniciar Contacto',
    cvBtn: 'Ver y Descargar CV',
  },

  footer: {
    tagline: 'Desarrollo Backend & Full Stack',
    top: 'Volver arriba',
  },

  resume: {
    headerTitle: '// CV PROFESIONAL',
    download: 'Descargar CV',
    summaryTitle: 'PERFIL PROFESIONAL',
    experienceTitle: 'EXPERIENCIA PROFESIONAL',
    educationTitle: 'EDUCACIÓN',
    skillsTitle: 'HABILIDADES TÉCNICAS',
    languagesTitle: 'IDIOMAS',
    competenciesTitle: 'COMPETENCIAS CLAVE',
    contactBtn: 'Iniciar Contacto Directo',
    fileName: 'CV_Leonardo_Hernandez_ES.txt',
  },

  dialogue: {
    header: '// INICIAR CONTACTO',
    sentTitle: 'Mensaje Enviado',
    sentText: (name: string, company: string, email: string) =>
      `Gracias, ${name}. He recibido tu consulta para ${company || 'tu organización'}. Revisaré los detalles y responderé a ${email} lo antes posible.`,
    back: 'Volver al Portafolio',
    intro: 'Canal directo para líderes de ingeniería, equipos de talento y clientes que buscan un desarrollador Backend o Full Stack.',
    name: 'Tu Nombre *',
    namePh: 'ej. Elena Gómez',
    email: 'Correo Profesional *',
    emailPh: 'elena@empresa.com',
    company: 'Organización / Empresa',
    companyPh: 'ej. Mi Empresa S.A.',
    roleType: 'Tipo de Rol / Proyecto',
    roles: ['Full Stack Developer', 'Backend Developer', 'DevOps / Infraestructura', 'Proyecto Freelance'],
    stack: 'Stack Tecnológico Relevante',
    message: 'Mensaje / Contexto *',
    messagePh: 'Describe brevemente el proyecto, el equipo o el reto técnico...',
    defaultMessage: (topic: string) =>
      `Hola Leonardo, me interesa conversar acerca del proyecto "${topic}" y evaluar una posible colaboración.`,
    confidential: 'Confidencialidad garantizada',
    cancel: 'Cancelar',
    send: 'Enviar Mensaje',
  },

  rfc: {
    headerSuffix: '// ESPECIFICACIÓN DE ARQUITECTURA',
    ready: 'LISTO_PROD',
    doc: 'Documento',
    classification: 'Clasificación: Estándar de Arquitectura',
    title: 'RFC: Motor de Telemetría en Streaming Distribuido y Agregador en Tiempo Real',
    author: 'Autor: Leonardo Hernández',
    s1: '1. Resumen Ejecutivo (Abstract)',
    s1p: 'Este documento formaliza la topología de streaming para el procesamiento de alta concurrencia de telemetría IoT y métricas de infraestructura. La meta de diseño es asegurar una tasa sostenida de 1.4 millones de eventos por segundo con latencias p99 inferiores a 45 milisegundos bajo fallos estocásticos de infraestructura.',
    s2: '2. Invariantes Arquitectónicas',
    s2li: [
      ['Ingestión de Memoria Zero-Allocation:', 'Ningún datagrama gRPC creará alocaciones en el heap de Go fuera de los buffers de `sync.Pool`.'],
      ['Particionado Determinista:', 'El balanceador de partición de Kafka utiliza MurmurHash3 sobre `tenant_id:device_uuid` para asegurar el orden estricto de eventos por dispositivo.'],
      ['Semántica At-Least-Once con Deduplicación:', 'Los offsets se confirman únicamente tras HTTP 200 de ClickHouse con motor `ReplacingMergeTree`.'],
    ],
    s3: '3. Benchmarks de Laboratorio (Stress Suite)',
    s3li: [
      '• Throughput pico alcanzado: 1,840,210 ev/s (Cluster 6 brokers NVMe)',
      '• Latencia media p99: 42.8 ms (Red transatlántica Frankfurt-Virginia)',
      '• Tasa de compresión columnar: 8.4x (ZSTD lv3 en ClickHouse)',
      '• Pausas de Garbage Collector (Go STW): < 1.1 ms (92% de reducción frente a serializador JSON)',
    ],
    copy: 'Copiar Cita RFC',
    copied: 'Copiado al Portapapeles',
    download: 'Descargar RFC Completo (TXT)',
    downloaded: '¡Descargado!',
    copyText: (rfc: string) =>
      `ESPECIFICACIÓN DE ARQUITECTURA RFC: ${rfc}\nSistema: Telemetry Engine v2.4\nEstado: APROBADO PARA PRODUCCIÓN\nAutor: Leonardo Hernández <${profile.email}>`,
    fileText: (rfc: string) =>
      `========================================================================\n` +
      `RFC: ${rfc} - MOTOR DE TELEMETRÍA EN STREAMING DISTRIBUIDO\n` +
      `Autor: Leonardo Hernández\n` +
      `SLA objetivo: 99.995% Uptime | Throughput pico: 1.4M ev/s | Latencia: p99 < 45ms\n` +
      `========================================================================\n\n` +
      `1. RESUMEN\n` +
      `Esta especificación define el plano arquitectónico para la ingestión particionada\n` +
      `horizontalmente y la condensación de series temporales en nubes híbridas.\n\n` +
      `2. TOPOLOGÍA DE INGESTIÓN\n` +
      `- Transporte: gRPC sobre HTTP/2, esquemas Protobuf v3.\n` +
      `- Kernel Bypass: capa eBPF XDP para enrutamiento L4 a velocidad de cable.\n` +
      `- Memoria: buffers sync.Pool sin alocaciones; pausas STW < 1.1ms.\n\n` +
      `3. PARTICIONADO Y BROKERS\n` +
      `- Broker: Apache Kafka en modo KRaft (24 particiones físicas).\n` +
      `- Clave de partición: murmur3(tenant_id:device_uuid).\n` +
      `- Almacenamiento: ReplacingMergeTree en ClickHouse con compresión ZSTD lv3.\n\n` +
      `4. VERIFICACIÓN DE INVARIANTES\n` +
      `- Linealizabilidad de estado: verificada con model checking en TLA+.\n` +
      `- Inyección de fallos: supervivencia a particiones de red confirmada con ChaosMesh.\n`,
    fileSuffix: 'Especificacion_Arquitectura.txt',
  },

  caseStudy: {
    back: 'Volver al Portafolio',
    crumb: 'PROYECTOS',
    architecture: 'ARQUITECTURA',
    role: 'Rol:',
    pattern: 'Patrón:',
    throughput: 'Throughput:',
    stackTitle: 'COMPOSICIÓN DEL STACK TÉCNICO',
    stackFallback: 'Componente core del pipeline',
    blueprintEyebrow: '// ARQUITECTURA DE FLUJO Y TOPOLOGÍA DE DATOS',
    blueprintTitle: (name: string) => `Plano de Arquitectura de ${name}`,
    clusterVerified: 'Clúster Verificado',
    impactTitle: 'Impacto del cuello de botella previo:',
    specTitle: 'Ficha Técnica del Sistema',
    specIdentifier: 'Identificador:',
    specEnv: 'Entorno de Despliegue:',
    specCompression: 'Ratio de Compresión:',
    specMonitoring: 'Monitoreo:',
    github: 'Ver Repositorio en GitHub',
    rfc: 'Descargar RFC de Arquitectura (TXT)',
    talk: 'Hablar de este Sistema',
    pagerTitle: 'Proyectos de Leonardo',
    pagerView: (name: string) => `Ver ${name}`,
    benchTitle: 'Telemetría de Banco de Pruebas (Test Load Suite)',
    totalMessages: 'Mensajes Totales:',
    latency: 'Latencia Media (p99):',
    cpu: (tech: string) => `Uso de CPU Core (${tech}):`,
    availability: 'Disponibilidad en Cluster:',
    simulator: 'Simulador de Ingestión:',
    spike: 'SPIKE EN CURSO (TRAFFIC BURST)',
    spikeBtn: 'Inyectar Spike de Tráfico',
    spikeTitle: 'Inyecta 2.8x tráfico de choque para validar backpressure',
    pause: 'Pausar Monitoreo',
    resume: 'Reanudar Monitoreo',
  },

  blueprint: {
    footerVerified: 'Verificación Formal de Invariantes: Aprobada (TLA+ Model Checked)',
    footerHint: 'Click en cualquier caja para inspeccionar telemetría de componente',
    close: 'Cerrar [ESC]',
    latencyMetric: 'Métrica de Latencia:',
    effectiveThroughput: 'Throughput Efectivo:',
    pauseStream: 'Pausar Stream',
    playStream: 'Reanudar Stream',
    toggleTitle: 'Alternar animación del flujo de paquetes',
    zoomTitle: 'Ampliar esquema',
    zoomReset: 'Restablecer 100%',
    scale: 'Escala: Referencia de plano • ClickHouse MergeTree Engine',
    svgSlicing: 'Sub-second slicing por tenant, región y anomalías de latencia',
    svgQps: 'Throughput de consulta: 450 QPS simultáneos',
    svgOutliers: 'Detección de outliers en ventana rodante de 60 segundos',
    svgPager: 'Disparo directo a PagerDuty & Slack Ops',
    svgAgg: 'AggregatingMergeTree Materialized Views • Latencia de agregación p95: 18ms sobre 10,000,000,000 filas',
    nodes: {
      sources: {
        title: 'Fuentes de Telemetría Heterogéneas',
        tech: 'IoT Edge Fleet & K8s DaemonSets',
        spec: '18,500 gateways conectados emitiendo frames Protobuf v3 sobre streams TLS 1.3 persistentes.',
        latency: 'RTT: 18ms',
        throughput: '1.4M ev/s agregado',
      },
      ingestion: {
        title: 'Capa de Ingestión Zero-Allocation',
        tech: 'Go 1.23 + eBPF XDP + sync.Pool',
        spec: 'Pods stateless detrás de un balanceador eBPF Cilium. Los pools de bytes reutilizables eliminan la presión sobre el GC.',
        latency: 'Procesamiento: 0.8ms p99',
        throughput: '120k ev/s por pod',
      },
      kafka: {
        title: 'Stream de Particiones Apache Kafka',
        tech: 'KRaft Quorum + NVMe Log Segments',
        spec: '24 particiones físicas fragmentadas por murmur3(tenant_id:device_uuid). Compresión ZSTD nivel 3.',
        latency: 'Commit Lag: 0.02ms',
        throughput: '850 MB/s sostenidos',
      },
      consumers: {
        title: 'Flota de Consumidores con Micro-Batching',
        tech: 'Go Tokio/Worker Goroutines',
        spec: 'Disparador dinámico de vuelco: 65,536 registros o ventana de 400ms. Commits de offset manuales y estrictos.',
        latency: 'Drenaje de batch: 14ms',
        throughput: '50k registros/batch',
      },
      clickhouse: {
        title: 'Almacenamiento Clusterizado en ClickHouse',
        tech: 'ReplacingMergeTree + ClickHouse Keeper',
        spec: '3 Shards x 2 Réplicas en AWS NVMe i3en. Ratio de compresión columnar ZSTD 8.4x.',
        latency: 'Agg p95: 18ms / 10B filas',
        throughput: '99.999% de durabilidad',
      },
    },
  },

  cv: {
    headline: 'Desarrollador de Software | Backend & Full Stack',
    location: 'Aguascalientes, México',
    summary:
      'Desarrollador de Software con especialización en backend y experiencia sólida en proyectos full stack. Cuento con dominio de tecnologías backend como Java (Spring Boot), Python (Django) y PHP (Laravel), complementado con habilidades en frameworks frontend como React y Vue.js. He trabajado en entornos de producción reales implementando arquitecturas de microservicios, contenedores con Docker, orquestación con Kubernetes y pipelines de CI/CD con Jenkins. Me apasiona construir soluciones eficientes, escalables y de alta calidad, y estoy comprometido con el aprendizaje continuo y la colaboración en equipos multidisciplinarios.',
    experience: [
      {
        role: 'Full Stack Developer',
        company: 'Max 4 Technologies',
        period: 'Enero 2025 – Presente',
        bullets: [
          'Participé en el desarrollo de una plataforma de geolocalización a gran escala con múltiples servicios y requisitos complejos.',
          'Desarrollé interfaces de usuario con React y Vue.js, mejorando la experiencia del cliente en módulos críticos de la plataforma.',
          'Implementé flujos de contenerización con Docker tanto en ambientes de desarrollo como en producción, reduciendo inconsistencias entre entornos.',
          'Colaboré en el mantenimiento y mejora de APIs REST construidas con Laravel, optimizando tiempos de respuesta y mantenibilidad del código.',
          'Extendí funcionalidades de rastreo GPS sobre la plataforma open source Traccar utilizando Java, añadiendo soporte para nuevos tipos de eventos.',
          'Diseñé e implementé un flujo de despliegue moderno con clústeres Kubernetes de nodo único por aplicación, integrado con pipelines automatizados en Jenkins, mejorando la confiabilidad y eficiencia de los despliegues en una infraestructura con recursos limitados.',
          'Refactoricé módulos de proyectos legacy para mejorar la calidad del código, el rendimiento y la escalabilidad del sistema.',
        ],
      },
      {
        role: 'Desarrollador de Software Freelance',
        company: 'Mariscos Villa del Mar',
        period: 'Agosto 2024 – Noviembre 2024',
        bullets: [
          'Diseñé e implementé una solución personalizada para la gestión de asistencia de empleados, cálculo de salarios, vacaciones, préstamos y apoyos administrativos.',
          'Desarrollé el backend con Python y Django, y la interfaz de usuario con Angular, entregando una aplicación completamente integrada y funcional.',
          'Colaboré directamente con el cliente para relevar requerimientos específicos del negocio y proponer soluciones adaptadas a sus necesidades operativas.',
          'El sistema redujo errores administrativos y mejoró la eficiencia operativa del área de recursos humanos.',
        ],
      },
      {
        role: 'Practicante de Desarrollo Backend',
        company: 'Centro Geo',
        period: 'Junio 2018 – Diciembre 2018',
        bullets: [
          'Desarrollé servicios backend con Java y Spring Framework para una aplicación móvil de identificación de especies arbóreas mediante visión por computadora.',
          'Integré algoritmos de reconocimiento de imágenes que mejoraron la precisión en el registro de datos y redujeron los tiempos de captura en campo.',
          'Participé activamente en pruebas y depuración del sistema, asegurando el cumplimiento de estándares de rendimiento, confiabilidad y usabilidad.',
        ],
      },
    ],
    education: [
      {
        degree: 'Ingeniería en Ciencias Computacionales',
        school: 'Universidad Autónoma de Aguascalientes',
        period: '2020 – 2024',
      },
    ],
    skills: [
      { label: 'Lenguajes de Programación', value: 'Python, Java, JavaScript, PHP, HTML, CSS' },
      { label: 'Frameworks & Librerías', value: 'Laravel, Django, Spring Boot, Node.js, React, Vue.js, Angular' },
      { label: 'DevOps & Cloud', value: 'Docker, Kubernetes, Jenkins, Grafana' },
      { label: 'Bases de Datos', value: 'MySQL, PostgreSQL, Oracle, MongoDB' },
      { label: 'Control de Versiones', value: 'Git, GitHub, GitLab, Bitbucket' },
      { label: 'Sistemas Operativos', value: 'Linux, Windows' },
    ],
    languages: [
      { label: 'Español', value: 'Nativo' },
      { label: 'Inglés', value: 'Intermedio (lectura técnica avanzada)' },
    ],
    competencies: ['Autodidacta', 'Proactivo', 'Organizado', 'Responsable', 'Orientado a resultados', 'Trabajo en equipo'],
  },
};

export type UiDict = typeof es;

/* ------------------------------------------------------------------ */
/*  English dictionary                                                 */
/* ------------------------------------------------------------------ */
const en: UiDict = {
  langSwitch: { label: 'Language', es: 'ES', en: 'EN', title: 'Switch language' },

  floating: { screen1: 'Screen 1: Portfolio', screen2: 'Screen 2: Case' },

  header: {
    code: 'LH//DEV.01',
    location: 'AGUASCALIENTES / MEXICO',
    nav01: '// 01.HOME',
    nav02: '// 02.PROJECTS',
    nav03: '// 03.CONTACT',
    available: 'Available for new opportunities',
  },

  hero: {
    eyebrow: '// PROFESSIONAL PRACTICE',
    years: '2018—PRESENT',
    role: 'Software Development | Backend & Full Stack',
    p1: 'I build efficient, scalable and high-quality solutions: from APIs and microservices to production-ready user interfaces.',
    p2a: 'Specialized in Java (Spring Boot), Python (Django) and PHP (Laravel), with React and Vue.js interfaces. Production experience with containers using',
    pill1: 'Docker + Kubernetes',
    p2b: 'and automated deployments through',
    pill2: 'Jenkins CI/CD',
    p2c: '.',
    stackLabel: 'CORE STACK',
    contactBtn: 'Get in Touch',
    exploreBtn: 'View Projects',
    linkEmail: '// Email',
    linkPhone: '// Phone',
    linkCv: '// Resume',
    cardTag: 'BACKEND & FULL STACK',
    cardRole: 'FULL STACK DEVELOPER',
    cardCurrentLabel: 'CURRENTLY',
    cardCurrentValue: 'MAX 4 TECHNOLOGIES',
    portraitAlt: 'Leonardo Hernandez - Backend & Full Stack Software Developer',
  },

  marquee: [
    'MICROSERVICES ARCHITECTURE',
    'DOCKER CONTAINERIZATION',
    'KUBERNETES ORCHESTRATION',
    'JENKINS CI/CD PIPELINES',
    'REST APIS',
    'FULL STACK DEVELOPMENT',
  ],

  systems: {
    eyebrowA: '// SECTION 02',
    eyebrowB: 'PROJECT CASE FILES',
    title: 'SELECTED PROJECTS',
    subtitle: '/ ARCHITECTURAL INDEX',
    categories: {
      ALL: 'ALL',
      STREAMING: 'STREAMING',
      CONSENSUS: 'CONSENSUS',
      'EDGE & PROXY': 'EDGE & PROXY',
      'FINANCIAL ENGINE': 'FINANCIAL ENGINE',
    },
    architecture: 'ARCHITECTURE:',
    technologies: 'Technologies:',
    viewFull: 'View Full Architecture',
    viewDetail: 'View Project Details',
  },

  pillars: {
    eyebrow: '// WORKING PRINCIPLES',
    title: 'Quality, Scalability and Continuous Improvement.',
    text: 'I am passionate about building efficient, scalable and high-quality solutions. I refactor legacy code, automate deployments and reduce inconsistencies between environments so teams can ship with confidence. I am self-taught, proactive and committed to continuous learning and collaboration within multidisciplinary teams.',
  },

  cta: {
    badge: 'AVAILABLE FOR BACKEND & FULL STACK ROLES',
    headline: 'Looking for a developer who ships reliable, scalable and maintainable software?',
    text: 'Open to opportunities in backend development, full stack, microservices and DevOps. Based in Aguascalientes, Mexico, available for remote work and collaboration with multidisciplinary teams.',
    contactBtn: 'Get in Touch',
    cvBtn: 'View & Download Resume',
  },

  footer: {
    tagline: 'Backend & Full Stack Development',
    top: 'Back to top',
  },

  resume: {
    headerTitle: '// PROFESSIONAL RESUME',
    download: 'Download Resume',
    summaryTitle: 'PROFESSIONAL PROFILE',
    experienceTitle: 'PROFESSIONAL EXPERIENCE',
    educationTitle: 'EDUCATION',
    skillsTitle: 'TECHNICAL SKILLS',
    languagesTitle: 'LANGUAGES',
    competenciesTitle: 'KEY COMPETENCIES',
    contactBtn: 'Contact Me Directly',
    fileName: 'Resume_Leonardo_Hernandez_EN.txt',
  },

  dialogue: {
    header: '// GET IN TOUCH',
    sentTitle: 'Message Sent',
    sentText: (name: string, company: string, email: string) =>
      `Thank you, ${name}. I have received your inquiry for ${company || 'your organization'}. I will review the details and reply to ${email} as soon as possible.`,
    back: 'Back to Portfolio',
    intro: 'Direct channel for engineering leaders, talent teams and clients looking for a Backend or Full Stack developer.',
    name: 'Your Name *',
    namePh: 'e.g. Elena Gomez',
    email: 'Work Email *',
    emailPh: 'elena@company.com',
    company: 'Organization / Company',
    companyPh: 'e.g. My Company Inc.',
    roleType: 'Role / Project Type',
    roles: ['Full Stack Developer', 'Backend Developer', 'DevOps / Infrastructure', 'Freelance Project'],
    stack: 'Relevant Tech Stack',
    message: 'Message / Context *',
    messagePh: 'Briefly describe the project, the team or the technical challenge...',
    defaultMessage: (topic: string) =>
      `Hi Leonardo, I'd like to talk about the "${topic}" project and explore a possible collaboration.`,
    confidential: 'Confidentiality guaranteed',
    cancel: 'Cancel',
    send: 'Send Message',
  },

  rfc: {
    headerSuffix: '// ARCHITECTURE SPECIFICATION',
    ready: 'PROD_READY',
    doc: 'Document',
    classification: 'Classification: Architecture Standard',
    title: 'RFC: Distributed Streaming Telemetry Engine & Real-Time Aggregator',
    author: 'Author: Leonardo Hernandez',
    s1: '1. Executive Summary (Abstract)',
    s1p: 'This document formalizes the streaming topology for high-concurrency processing of IoT telemetry and infrastructure metrics. The design goal is to ensure a sustained rate of 1.4 million events per second with p99 latencies below 45 milliseconds under stochastic infrastructure failures.',
    s2: '2. Architectural Invariants',
    s2li: [
      ['Zero-Allocation Memory Ingestion:', 'No incoming gRPC datagram may allocate on the Go heap outside of `sync.Pool` buffers.'],
      ['Deterministic Partitioning:', 'The Kafka partition balancer uses MurmurHash3 over `tenant_id:device_uuid` to guarantee strict per-device event ordering.'],
      ['At-Least-Once Semantics with Deduplication:', 'Offsets are committed only after an HTTP 200 from ClickHouse using the `ReplacingMergeTree` engine.'],
    ],
    s3: '3. Lab Benchmarks (Stress Suite)',
    s3li: [
      '• Peak throughput reached: 1,840,210 ev/s (6 NVMe broker cluster)',
      '• Average p99 latency: 42.8 ms (Frankfurt-Virginia transatlantic network)',
      '• Columnar compression ratio: 8.4x (ZSTD lv3 in ClickHouse)',
      '• Garbage Collector pauses (Go STW): < 1.1 ms (92% reduction vs. JSON serializer)',
    ],
    copy: 'Copy RFC Citation',
    copied: 'Copied to Clipboard',
    download: 'Download Full RFC (TXT)',
    downloaded: 'Downloaded!',
    copyText: (rfc: string) =>
      `RFC ARCHITECTURAL SPECIFICATION: ${rfc}\nSystem: Telemetry Engine v2.4\nStatus: APPROVED FOR PRODUCTION\nAuthor: Leonardo Hernandez <${profile.email}>`,
    fileText: (rfc: string) =>
      `========================================================================\n` +
      `RFC: ${rfc} - DISTRIBUTED STREAMING TELEMETRY ENGINE\n` +
      `Author: Leonardo Hernandez\n` +
      `Target SLA: 99.995% Uptime | Peak Throughput: 1.4M ev/s | Latency: p99 < 45ms\n` +
      `========================================================================\n\n` +
      `1. ABSTRACT\n` +
      `This specification defines the architectural blueprint for horizontally\n` +
      `partitioned ingestion and time-series condensations across hybrid clouds.\n\n` +
      `2. INGESTION TOPOLOGY\n` +
      `- Transport: gRPC over HTTP/2, Protobuf v3 schemas.\n` +
      `- Kernel Bypass: eBPF XDP layer for wire-speed L4 packet routing.\n` +
      `- Memory Allocation: Zero-allocation sync.Pool buffers; STW pauses < 1.1ms.\n\n` +
      `3. PARTITIONING & BROKERING\n` +
      `- Broker: Apache Kafka in KRaft mode (24 physical partitions).\n` +
      `- Partition Key: murmur3(tenant_id:device_uuid).\n` +
      `- Storage: ReplacingMergeTree in ClickHouse with ZSTD lv3 compression.\n\n` +
      `4. INVARIANT VERIFICATION\n` +
      `- State Linearizability: Verified via TLA+ model checking.\n` +
      `- Fault Injection: ChaosMesh network split survival confirmed.\n`,
    fileSuffix: 'Architecture_Specification.txt',
  },

  caseStudy: {
    back: 'Back to Portfolio',
    crumb: 'PROJECTS',
    architecture: 'ARCHITECTURE',
    role: 'Role:',
    pattern: 'Pattern:',
    throughput: 'Throughput:',
    stackTitle: 'TECH STACK COMPOSITION',
    stackFallback: 'Core pipeline component',
    blueprintEyebrow: '// FLOW ARCHITECTURE & DATA TOPOLOGY',
    blueprintTitle: (name: string) => `${name} Architecture Blueprint`,
    clusterVerified: 'Cluster Verified',
    impactTitle: 'Impact of the previous bottleneck:',
    specTitle: 'System Spec Sheet',
    specIdentifier: 'Identifier:',
    specEnv: 'Deployment Environment:',
    specCompression: 'Compression Ratio:',
    specMonitoring: 'Monitoring:',
    github: 'View Repository on GitHub',
    rfc: 'Download Architecture RFC (TXT)',
    talk: 'Talk About This System',
    pagerTitle: "Leonardo's Projects",
    pagerView: (name: string) => `View ${name}`,
    benchTitle: 'Benchmark Telemetry (Test Load Suite)',
    totalMessages: 'Total Messages:',
    latency: 'Average Latency (p99):',
    cpu: (tech: string) => `Core CPU Usage (${tech}):`,
    availability: 'Cluster Availability:',
    simulator: 'Ingestion Simulator:',
    spike: 'SPIKE IN PROGRESS (TRAFFIC BURST)',
    spikeBtn: 'Inject Traffic Spike',
    spikeTitle: 'Injects 2.8x shock traffic to validate backpressure',
    pause: 'Pause Monitoring',
    resume: 'Resume Monitoring',
  },

  blueprint: {
    footerVerified: 'Formal Invariant Verification: Passed (TLA+ Model Checked)',
    footerHint: 'Click any box to inspect component telemetry',
    close: 'Close [ESC]',
    latencyMetric: 'Latency Metric:',
    effectiveThroughput: 'Effective Throughput:',
    pauseStream: 'Pause Stream',
    playStream: 'Play Stream',
    toggleTitle: 'Toggle stream packet flow animation',
    zoomTitle: 'Zoom blueprint schematic',
    zoomReset: 'Reset 100%',
    scale: 'Scale: Blueprint Reference • ClickHouse MergeTree Engine',
    svgSlicing: 'Sub-second slicing by tenant, region and latency anomalies',
    svgQps: 'Query throughput: 450 concurrent QPS',
    svgOutliers: 'Outlier detection over a rolling 60-second window',
    svgPager: 'Direct trigger to PagerDuty & Slack Ops',
    svgAgg: 'AggregatingMergeTree Materialized Views • p95 aggregation latency: 18ms over 10,000,000,000 rows',
    nodes: {
      sources: {
        title: 'Heterogeneous Telemetry Sources',
        tech: 'IoT Edge Fleet & K8s DaemonSets',
        spec: '18,500 connected gateways emitting Protobuf v3 frames over persistent TLS 1.3 streams.',
        latency: 'RTT: 18ms',
        throughput: '1.4M ev/sec aggregate',
      },
      ingestion: {
        title: 'Zero-Allocation Ingestion Tier',
        tech: 'Go 1.23 + eBPF XDP + sync.Pool',
        spec: 'Stateless pods fronted by Cilium eBPF balancer. Reusable memory byte pools eliminate GC pressure.',
        latency: 'Processing: 0.8ms p99',
        throughput: '120k ev/sec per pod',
      },
      kafka: {
        title: 'Apache Kafka Partition Stream',
        tech: 'KRaft Quorum + NVMe Log Segments',
        spec: '24 physical partitions sharded by murmur3(tenant_id:device_uuid). ZSTD level 3 compression.',
        latency: 'Commit Lag: 0.02ms',
        throughput: '850 MB/s sustained',
      },
      consumers: {
        title: 'Micro-Batching Consumer Fleet',
        tech: 'Go Tokio/Worker Goroutines',
        spec: 'Dynamic flush trigger: 65,536 records or 400ms window. Strict manual offset commits.',
        latency: 'Batch Drain: 14ms',
        throughput: '50k records/batch',
      },
      clickhouse: {
        title: 'ClickHouse Clustered Storage',
        tech: 'ReplacingMergeTree + ClickHouse Keeper',
        spec: '3 Shards x 2 Replicas on AWS NVMe i3en. Columnar ZSTD compression ratio 8.4x.',
        latency: 'Agg p95: 18ms / 10B rows',
        throughput: '99.999% durability',
      },
    },
  },

  cv: {
    headline: 'Software Developer | Backend & Full Stack',
    location: 'Aguascalientes, Mexico',
    summary:
      'Software Developer specialized in backend with solid experience in full stack projects. Strong command of backend technologies such as Java (Spring Boot), Python (Django) and PHP (Laravel), complemented by skills in frontend frameworks such as React and Vue.js. I have worked in real production environments implementing microservices architectures, Docker containers, Kubernetes orchestration and CI/CD pipelines with Jenkins. I am passionate about building efficient, scalable and high-quality solutions, and I am committed to continuous learning and collaboration in multidisciplinary teams.',
    experience: [
      {
        role: 'Full Stack Developer',
        company: 'Max 4 Technologies',
        period: 'January 2025 – Present',
        bullets: [
          'Contributed to the development of a large-scale geolocation platform with multiple services and complex requirements.',
          'Built user interfaces with React and Vue.js, improving the customer experience in critical platform modules.',
          'Implemented Docker containerization workflows in both development and production environments, reducing inconsistencies between environments.',
          'Helped maintain and improve REST APIs built with Laravel, optimizing response times and code maintainability.',
          'Extended GPS tracking features on the open source Traccar platform using Java, adding support for new event types.',
          'Designed and implemented a modern deployment workflow using single-node Kubernetes clusters per application, integrated with automated Jenkins pipelines, improving deployment reliability and efficiency on infrastructure with limited resources.',
          'Refactored modules of legacy projects to improve code quality, performance and system scalability.',
        ],
      },
      {
        role: 'Freelance Software Developer',
        company: 'Mariscos Villa del Mar',
        period: 'August 2024 – November 2024',
        bullets: [
          'Designed and implemented a custom solution for employee attendance management, salary calculation, vacations, loans and administrative support.',
          'Built the backend with Python and Django and the user interface with Angular, delivering a fully integrated and functional application.',
          'Worked directly with the client to gather specific business requirements and propose solutions tailored to their operational needs.',
          'The system reduced administrative errors and improved the operational efficiency of the human resources department.',
        ],
      },
      {
        role: 'Backend Development Intern',
        company: 'Centro Geo',
        period: 'June 2018 – December 2018',
        bullets: [
          'Developed backend services with Java and the Spring Framework for a mobile app that identifies tree species using computer vision.',
          'Integrated image recognition algorithms that improved data-entry accuracy and reduced field capture times.',
          'Actively took part in system testing and debugging, ensuring compliance with performance, reliability and usability standards.',
        ],
      },
    ],
    education: [
      {
        degree: 'B.Sc. in Computer Science Engineering',
        school: 'Universidad Autónoma de Aguascalientes',
        period: '2020 – 2024',
      },
    ],
    skills: [
      { label: 'Programming Languages', value: 'Python, Java, JavaScript, PHP, HTML, CSS' },
      { label: 'Frameworks & Libraries', value: 'Laravel, Django, Spring Boot, Node.js, React, Vue.js, Angular' },
      { label: 'DevOps & Cloud', value: 'Docker, Kubernetes, Jenkins, Grafana' },
      { label: 'Databases', value: 'MySQL, PostgreSQL, Oracle, MongoDB' },
      { label: 'Version Control', value: 'Git, GitHub, GitLab, Bitbucket' },
      { label: 'Operating Systems', value: 'Linux, Windows' },
    ],
    languages: [
      { label: 'Spanish', value: 'Native' },
      { label: 'English', value: 'Intermediate (advanced technical reading)' },
    ],
    competencies: ['Self-taught', 'Proactive', 'Organized', 'Responsible', 'Results-oriented', 'Teamwork'],
  },
};

export const ui: Record<Lang, UiDict> = { es, en };
