import type { TechId } from "./projects";

/*
 * Centralized case-study content for /work/[slug] pages.
 *
 * Every claim below is grounded in the project's own README or
 * package.json — see the per-project source notes. Anything marked
 * "not in V0 / not implemented" in those READMEs is excluded from
 * highlights and appears only under limitations/future work.
 *
 * - Zolt sources: README (V0 scope, schema, scheduler, worker,
 *   decisions table) + package.json (bullmq, ioredis, zod, pino,
 *   pg, vitest "tests" script).
 * - Ascend sources: README status table (implemented vs explicitly
 *   out of scope), layered architecture, derived aggregation,
 *   transactional sheet creation. Auth mechanism beyond
 *   "password hashing + authenticated routes" is unverified, so
 *   OAuth is not claimed. No automated tests exist (stated).
 * - Cruor sources: README status table, transactional donation
 *   workflow (§13), unit-level inventory (§9/§14),
 *   request/response model + concurrency notes (§15/§16),
 *   limitations (§25), roadmap (§26). Google OAuth and exact
 *   unit statuses are not confirmed — omitted. Testing is
 *   "not fully implemented" — no Testing section for Cruor.
 *
 * `repo` / `live` are verified destinations (GitHub repo URLs and the
 * `homepage` URLs published in each repo's GitHub metadata). Zolt has
 * no live deployment, so no live link renders for it.
 *
 * To edit a project, change its entry here only.
 */

export interface DiagramNode {
  title: string;
  sub: string;
}

export interface ArchitectureImage {
  src: string;
  alt: string;
  caption: string;
  /** Intrinsic pixel size, so next/image reserves the right box. */
  width: number;
  height: number;
}

export interface EngineeringHighlight {
  title: string;
  body: string;
}

export interface CaseStudy {
  slug: "zolt" | "ascend" | "cruor";
  name: string;
  tagline: string;
  tech: TechId[];
  repo?: string;
  live?: string;
  /** e.g. "/images/work/zolt.png" — placeholder renders while unset. */
  heroImage?: string;
  problem: string;
  solution: string;
  diagram: DiagramNode[];
  /** System-design PNGs served from /public/architecture. */
  architectureImages?: ArchitectureImage[];
  flow: string;
  highlights: EngineeringHighlight[];
  testing?: string;
  challenges?: string;
  limitations?: string[];
  next: { slug: CaseStudy["slug"]; name: string };
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "zolt",
    name: "Zolt",
    tagline:
      "Durable background-job scheduling on PostgreSQL, delivered through BullMQ.",
    tech: ["typescript", "nodejs", "express", "postgresql", "redis", "bullmq"],
    repo: "https://github.com/Anishmaniyar/Zolt",
    problem:
      "Background work is easy to lose track of: queues are not durable stores of record, so a crash between the database and the queue loses jobs — and when retry attempts overwrite job state, the history of what actually ran disappears with them.",
    solution:
      "Zolt keeps PostgreSQL as the single source of truth with separate jobs and executions tables. The API writes state, a 15-second scheduler claims due jobs into BullMQ, and a worker pool runs only pre-registered handlers, recording every attempt. V0 runs as one scheduler instance; distribution and recovery are V1 work, not claimed here.",
    diagram: [
      {
        title: "Client → Express API",
        sub: "Zod-validated REST: create, list, cancel jobs",
      },
      {
        title: "PostgreSQL",
        sub: "jobs + executions tables · the source of truth",
      },
      {
        title: "Scheduler · 15s poll",
        sub: "Claims due jobs in batches of 100",
      },
      { title: "Redis + BullMQ", sub: "Delivery queue, not state" },
      {
        title: "Worker pool · concurrency 5",
        sub: "Runs handlers · writes outcomes to Postgres",
      },
    ],
    architectureImages: [
      {
        src: "/architecture/zolt-architecture.webp",
        alt: "Zolt distributed job scheduler architecture diagram",
        caption: "Zolt — distributed job scheduler architecture",
        width: 1536,
        height: 1024,
      },
    ],
    flow: "The API writes job state to PostgreSQL and nothing else. Each tick, the scheduler finds due jobs through a (status, run_at) index, flips them SCHEDULED → QUEUED, and bulk-enqueues into BullMQ. A worker fetches the job row, creates an execution record, runs the registered handler, and writes the outcome back to PostgreSQL.",
    highlights: [
      {
        title: "Jobs ≠ executions",
        body: "Separate tables keep a stable job identity with per-attempt execution rows (number, timestamps, error). History survives retries instead of being overwritten.",
      },
      {
        title: "Claim before queue",
        body: "The scheduler flips SCHEDULED → QUEUED in Postgres — served by a (status, run_at) index — before enqueueing, so the database always reflects reality. Single-instance claiming; SKIP LOCKED is V1.",
      },
      {
        title: "Closed handlers, validated boundary",
        body: "Only pre-registered handlers run (SEND_EMAIL); every write endpoint is Zod-validated behind AppError middleware. No arbitrary code, no malformed payloads past the boundary.",
      },
    ],
    testing:
      "A Vitest suite (run via the repo's vitest script) executes against a dedicated test database, covering execution success, failure handling, and transaction rollback. A recorded checkpoint reported 73 passing tests across 11 files with type-check and build green — historical, not re-verified against the current tree. No load-test or production metrics exist.",
    limitations: [
      "Retries across executions and backoff workflow (V1)",
      "Concurrent-safe claiming and scheduler reconciliation (V1)",
      "Execution leases, crash recovery, multi-instance operation (V1)",
      "Metrics, dashboards, and load tests (V1)",
    ],
    next: { slug: "ascend", name: "Ascend" },
  },
  {
    slug: "ascend",
    name: "Ascend",
    tagline:
      "Backend-first aptitude practice: topics, sessions, attempts, derived performance.",
    tech: ["javascript", "nodejs", "express", "postgresql", "prisma"],
    repo: "https://github.com/Anishmaniyar/Ascend",
    live: "https://ascend-aptitude.vercel.app",
    problem:
      "Most aptitude platforms just display questions: there is no structured practice workflow, attempts live apart from any performance picture, and admin content such as company sheets can end up half-created.",
    solution:
      "Ascend models the real workflow — Topic → Subtopic → Question, Session → Attempt — in PostgreSQL behind a layered Controller → Service → Repository API. Performance is derived by walking the attempt chain so it can never drift, and sheet creation commits atomically. Caching, queues, and containers are deliberately out of scope.",
    diagram: [
      { title: "Client", sub: "REST consumer" },
      {
        title: "Routes + Controllers",
        sub: "Parse requests · contain no business logic",
      },
      {
        title: "Services",
        sub: "Validation · orchestration · transactions",
      },
      {
        title: "Repositories · Prisma",
        sub: "The only layer that touches the database",
      },
      {
        title: "PostgreSQL",
        sub: "Users · topics · sessions · attempts · sheets",
      },
    ],
    architectureImages: [
      {
        src: "/architecture/ascend-architecture.webp",
        alt: "Ascend aptitude platform architecture diagram",
        caption: "Ascend — aptitude platform architecture",
        width: 1518,
        height: 1036,
      },
    ],
    flow: "Requests travel one way down the layers: routes parse, controllers delegate, services validate and orchestrate — wrapping multi-step writes such as sheet creation in a Prisma transaction — and repositories execute the Prisma queries against PostgreSQL.",
    highlights: [
      {
        title: "One job per layer",
        body: "Controllers hold no logic; services own validation and orchestration; repositories are the only Prisma callers. Multi-step operations have exactly one home.",
      },
      {
        title: "Derived performance",
        body: "Accuracy is computed on read by walking Attempt → Question → Subtopic → Topic, so it can never drift from attempts. Tradeoff: compute on read.",
      },
      {
        title: "Atomic sheets",
        body: "Sheet plus question mappings commit in one Prisma transaction; the mapping table lets one question serve many sheets. Content is never half-written.",
      },
    ],
    limitations: [
      "No automated test coverage yet",
      "No caching or rate limiting",
      "Aggregation is computed on read, unoptimized for large volumes",
      "Docker, background jobs, and AI features are out of scope",
    ],
    next: { slug: "cruor", name: "Cruor" },
  },
  {
    slug: "cruor",
    name: "Cruor",
    tagline:
      "Blood-donation lifecycle in one relational system: donor → donation → unit → transfer.",
    tech: ["typescript", "react", "nodejs", "express", "postgresql", "prisma"],
    repo: "https://github.com/Anishmaniyar/Cruor",
    live: "https://cruor-drop.vercel.app/",
    problem:
      "Blood-donation work fragments naturally: scheduling, donation records, unit inventory, and cross-hospital requests drift into disconnected processes, partial writes corrupt the lifecycle, and a single status field cannot represent several hospitals responding to one request.",
    solution:
      "Cruor unifies the lifecycle in one relational system — donor → appointment or campaign → donation → blood unit → inventory → inter-hospital request. Donation writes are transactional, inventory is derived from unit-level rows, and each hospital's offer is its own record. It ships as a modular monolith with a Next.js client; concurrency hardening is queued as future work.",
    diagram: [
      { title: "Web client · Next.js", sub: "Donor + hospital interfaces" },
      {
        title: "Routes + Controllers",
        sub: "Auth · donor/hospital ownership checks",
      },
      {
        title: "Services",
        sub: "Appointment and donation state machines · transactions",
      },
      { title: "Prisma", sub: "Type-safe data access" },
      {
        title: "PostgreSQL",
        sub: "Users · hospitals · donations · units · requests",
      },
    ],
    architectureImages: [
      {
        src: "/architecture/cruor-donor-flow.webp",
        alt: "Cruor donor user flow diagram",
        caption: "Cruor — donor user flow",
        width: 1536,
        height: 1024,
      },
      {
        src: "/architecture/cruor-hospital-flow.webp",
        alt: "Cruor hospital user flow diagram",
        caption: "Cruor — hospital user flow",
        width: 1536,
        height: 1024,
      },
    ],
    flow: "Recording a donation wraps the donation record, its blood unit, and the source appointment or registration update in a single transaction — the workflow can never persist a donation without its unit. A hospital's inventory is derived from its blood units rather than stored as a separate count.",
    highlights: [
      {
        title: "Transactional donations",
        body: "Donation creation, blood-unit creation, and the source-state update commit in one transaction. A failure anywhere rolls everything back — no orphans, no unit-less records.",
      },
      {
        title: "Units, not counters",
        body: "Each physical unit is its own BloodUnit row; inventory views filter and group those rows. Availability reasons over persisted data, and every unit traces to its donation.",
      },
      {
        title: "Independent offers",
        body: "Each hospital's response is its own BloodRequestResponse row; ACCEPT is an offer, the requester selects one, allocation is a request state transition. Row-level locking is future hardening.",
      },
    ],
    challenges:
      "Two hospitals can accept the same request independently, so allocation had to become a state transition on the request instead of a field update. The lesson: model the conflict in the schema first — independent response rows plus request state — before reaching for locks. Reservation at accept-time remains queued as future work.",
    limitations: [
      "Offer-acceptance concurrency hardening",
      "Blood-unit expiry background processing",
      "Caching, workers, and notifications",
      "Observability and fuller automated testing",
    ],
    next: { slug: "zolt", name: "Zolt" },
  },
];

export const CASE_STUDY_SLUGS = CASE_STUDIES.map((c) => c.slug);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
