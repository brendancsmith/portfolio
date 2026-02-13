export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Languages & Frameworks",
    skills: [
      "Python",
      "R",
      "SQL",
      "PySpark",
      "Java",
      "JavaScript / TypeScript",
      "C#",
      "PyTorch",
      "NumPy",
      "Pandas",
      "Polars",
      "Scikit-learn",
      "Matplotlib",
      "Plotly",
      "Seaborn",
    ],
  },
  {
    category: "Machine Learning & AI",
    skills: [
      "Computer Vision",
      "Deep Learning",
      "Forecasting",
      "Metaflow",
      "Recommendation Systems",
    ],
  },
  {
    category: "Data Analysis",
    skills: [
      "Statistical Modeling",
      "Causal Inference",
      "Time Series Analysis",
      "Data Visualization",
    ],
  },
  {
    category: "Data Engineering",
    skills: [
      "ETL Pipelines",
      "Data Warehousing",
      "Spark",
      "Kafka",
      "Hive",
      "Hadoop Stack",
      "Databricks",
    ],
  },
  {
    category: "Cloud Infrastructure",
    skills: [
      "Docker",
      "Microservices",
      "REST APIs",
      "FastAPI",
      "SQL & NoSQL Databases",
      "Highly Available Fault Tolerant Design",
    ],
  },
  {
    category: "Generative AI",
    skills: [
      "LLMs",
      "Prompt Engineering",
      "Embeddings",
      "Retrieval Augmented Generation (RAG)",
    ],
  },
];
