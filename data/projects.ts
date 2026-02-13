export interface ProjectEntry {
  title: string;
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
      "Implemented automatic retraining and bet placing using the Kalshi API using the portfolio constraints.",
    ],
  },
];
