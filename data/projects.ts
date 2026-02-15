export interface ProjectEntry {
  title: string;
  url?: string;
  bullets: string[];
}

export const projects: ProjectEntry[] = [
  {
    title: "Sports Betting Analysis Platform",
    bullets: [
      "Built a plugin-based predictive modeling and portfolio optimization platform in Python covering 9 sports, using protocol-driven architecture with command factories and a sport registry for extensibility.",
      "Engineered an XGBoost/LightGBM ensemble pipeline with Optuna HPO, isotonic calibration, incremental learning, and walk-forward backtesting using online training.",
      "Implemented mean-variance portfolio optimization with fractional Kelly criterion sizing and correlation-aware multi-market calibration (moneyline, spread, totals, player props).",
      "Integrated ESPN, Kalshi (RSA-authenticated), and The Odds API with Parquet caching, TTL expiration, and parallel async fetching.",
      "Implemented automatic retraining and bet placing using the Kalshi API with the configured portfolio constraints.",
    ],
  },
  {
    title: "Portfolio Website",
    url: "https://github.com/brendancsmith/portfolio",
    bullets: [
      "Built a personal portfolio site with Next.js 16, React 19, and TypeScript, styled with Tailwind CSS 4.",
      "Separated content from UI via a typed data layer, and implemented scroll-aware navigation, fade-in animations, and inline SVG icons with zero additional runtime dependencies.",
      "Statically exported as a single-page application and hosted on Vercel with automatic deploys from GitHub.",
    ],
  },
  {
    title: "Diffbot Knowledge Graph Client",
    url: "https://github.com/brendancsmith/diffbot-kg",
    bullets: [
      "Developed an async Python client for the Diffbot Knowledge Graph API, published on PyPI as diffbot-kg.",
      "Implemented rate limiting with aiolimiter and automatic retries via tenacity, with Pydantic response models for type-safe API interaction.",
      "Tested with pytest using VCR cassettes for deterministic API replay, with CI via GitHub Actions.",
    ],
  },
];
