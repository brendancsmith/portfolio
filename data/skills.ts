export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Languages & Frameworks",
    skills: [
      "Python",
      "SQL",
      "R",
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
    category: "Machine Learning & MLOps",
    skills: [
      "Deep Learning",
      "Computer Vision",
      "Forecasting",
      "Recommendation Systems",
      "Hyperparameter Tuning",
      "ML Pipelines",
      "Model Monitoring",
      "Metaflow",
    ],
  },
  {
    category: "Generative AI",
    skills: [
      "LLMs",
      "Agentic AI",
      "Tool Use & Function Calling",
      "Fine-tuning",
      "RAG",
      "Prompt Engineering",
      "Embeddings",
      "LangChain",
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
    category: "Cloud & Infrastructure",
    skills: [
      "AWS",
      "Azure",
      "Databricks",
      "Docker",
      "REST APIs",
      "FastAPI",
      "SQL & NoSQL Databases",
      "Microservices",
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
];

export const resumeSkills: SkillCategory[] = [
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
    category: "Data Analysis",
    skills: [
      "Statistical Modeling",
      "Causal Inference",
      "Time Series Analysis",
      "Data Visualization",
    ],
  },
  {
    category: "Machine Learning",
    skills: [
      "Computer Vision",
      "Deep Learning",
      "Forecasting",
      "Metaflow",
      "Recommendation Systems",
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
      "Metaflow",
      "Docker",
      "Microservices",
      "REST APIs",
      "FastAPI",
      "SQL & NoSQL databases",
      "Highly Available Fault Tolerant Design",
    ],
  },
  {
    category: "Generative AI",
    skills: ["LLMs", "Prompt Engineering", "Embeddings", "Retrieval Augmented Generation (RAG)"],
  },
];
