export interface ProjectEntry {
  title: string;
  url?: string;
  description?: string;
  bullets: string[];
}

export const projects: ProjectEntry[] = [
  {
    title: "Sports Bets Recommendation Platform",
    url: "https://b2-sports.com",
    description:
      "An end-to-end quantitative trading system that treats sports betting as a financial portfolio problem — applying risk management and optimization techniques from quantitative finance to identify and size value bets across over a dozen sports.",
    bullets: [
      "Built a plugin-based platform in Python using protocol-driven architecture with command factories and a sport registry, enabling rapid onboarding of new sports and market types.",
      "Engineered an XGBoost/LightGBM ensemble pipeline with Optuna HPO, isotonic calibration, and walk-forward backtesting to produce calibrated probability estimates that feed the portfolio optimizer.",
      "Implemented mean-variance portfolio optimization with fractional Kelly criterion sizing and correlation-aware multi-market calibration across moneyline, spread, totals, and player prop markets.",
      "Integrated ESPN, Kalshi (RSA-authenticated), and The Odds API with Parquet caching, TTL expiration, and parallel async fetching to maintain a continuously updated view of available odds.",
      "Automated the full retraining-to-execution loop via the Kalshi API, enforcing position limits, bankroll allocation targets, and cross-sport correlation caps.",
    ],
  },
  {
    title: "Portfolio Website",
    url: "https://github.com/brendancsmith/portfolio",
    description:
      "A performant, zero-dependency portfolio site built to present work history and projects with fast load times, clean design, and a maintainable content architecture.",
    bullets: [
      "Built with Next.js 16, React 19, and TypeScript, styled with Tailwind CSS 4 — statically exported for minimal bundle size and instant page loads.",
      "Separated all content into typed TypeScript data files, keeping UI components free of copy and enabling quick updates without touching JSX.",
      "Hosted on Vercel with automatic deploys from GitHub, including scroll-aware navigation, fade-in animations, and inline SVG icons with zero additional runtime dependencies.",
    ],
  },
  {
    title: "Panel of Experts",
    url: "https://github.com/brendancsmith/panel-of-experts",
    description:
      "A chatbot that improves LLM answer quality by querying OpenAI multiple times in parallel and synthesizing a consensus response — a simple implementation of self-consistency sampling (Wang et al. 2022).",
    bullets: [
      "Queries OpenAI in parallel using LangChain's RunnableParallel and abatch, then feeds all expert responses into a consensus chain that reasons across them to produce a more reliable final answer.",
      "Demonstrates emergent problem-solving: the consensus moderator can solve reasoning puzzles that none of the individual expert responses answer correctly, by evaluating and combining multiple approaches.",
      "Built with LangChain, Chainlit, and OpenAI, with conversation memory, prompt templating, and streaming output.",
    ],
  },
  {
    title: "RAG Chat Application",
    url: "https://github.com/brendancsmith/simple-rag-chat",
    description:
      "A proof-of-concept for document-grounded conversational AI, This standalone version with Chainlit user interface lets users upload PDFs and get accurate, sourced answers.",
    bullets: [
      "Built with LangChain, Chainlit, ChromaDB, and OpenAI, demonstrating the core retrieval-augmented generation pattern used in enterprise document Q&A systems.",
      "Implemented document ingestion with PDFPlumber and recursive text splitting tuned for retrieval quality, indexed into an ephemeral ChromaDB vector store with OpenAI embeddings.",
      "Containerized with Docker and a devcontainer configuration, with pre-commit hooks and GitHub Actions CI.",
    ],
  },
  {
    title: "Video Subtitling Tool",
    url: "https://github.com/brendancsmith/subtitler",
    description:
      "A practical automation tool that eliminates the manual workflow of video subtitling — extracting audio, transcribing with AI, and burning subtitles back in, all in a single command.",
    bullets: [
      "Automates the full subtitling pipeline in a single CLI invocation: ffmpeg audio extraction, OpenAI Whisper transcription, SRT generation, and subtitle burn-in.",
      "Processes entire directories of video files idempotently, skipping already-subtitled outputs for safe re-runs against growing media libraries.",
    ],
  },
  {
    title: "Diffbot Knowledge Graph Client",
    url: "https://github.com/brendancsmith/diffbot-kg",
    description:
      "An open-source Python client for the Diffbot Knowledge Graph API, built to support enterprise knowledge graph augmentation work at Propense.ai and published on PyPI for the broader developer community.",
    bullets: [
      "Developed an async Python client for B2B data enrichment via the Diffbot Knowledge Graph API, installable as pip install diffbot-kg.",
      "Implemented production-grade resilience patterns including token bucket rate limiting with aiolimiter and exponential backoff retries via tenacity, with Pydantic response models for type-safe API interaction.",
      "Tested with pytest using VCR cassettes for deterministic API replay, with CI via GitHub Actions.",
    ],
  },
  {
    title: "Flocking Simulation",
    url: "https://github.com/brendancsmith/flocking",
    description:
      "An interactive boids simulation that demonstrates how complex, lifelike flocking behavior emerges from simple local rules applied to individual agents with no central coordination.",
    bullets: [
      "Implemented the classic boids algorithm in Python with pygame — separation, alignment, and cohesion rules produce emergent flocking behavior in real time at 60 FPS.",
      "Added interactive mouse forces (attract/repel), runtime-adjustable speed and perception radius, and spawning controls for hands-on exploration of parameter effects.",
      "Architected with clean dataclass models and strict mypy typing, managed with uv and linted with ruff.",
    ],
  },
];
