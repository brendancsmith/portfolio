export interface ExperienceEntry {
  company: string;
  role: string;
  location: string;
  dates: string;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    company: "Best Egg",
    role: "Lead Data Scientist",
    location: "Remote",
    dates: "09/2024 – 10/2025",
    bullets: [
      "Created a next-gen customer expansion XGBoost model for the Flexible Rent Platform including alternative data, increasing Gini coefficient by 23%.",
      "Designed and implemented a series of Metaflow flows (DAGs) to automatically train challenger models for our primary credit risk / underwriting XGBoost model.",
      "Trained a team of 3 other Data Scientists to contribute flows to the project.",
      "Worked on a RAG-based chat system to generate answers based on our internal documentation. Also integrated with Snowflake to run SQL queries based on questions.",
    ],
  },
  {
    company: "Burns & McDonnell",
    role: "Senior Data Engineer – Contract",
    location: "Kansas City, MO",
    dates: "04/2024 – 07/2024",
    bullets: [
      "Created Airflow DAGs to ingest full-load and incremental data from various SQL databases.",
      "Utilized dbt to transform records between stages in the Databricks Medallion Architecture.",
      "Developed a logging strategy and integration with Azure Monitor / Log Analytics.",
    ],
  },
  {
    company: "University of Texas at Austin",
    role: "Graduate Learning Facilitator – Machine Learning",
    location: "Remote",
    dates: "01/2024 – 04/2024",
    bullets: [
      "Served as a teaching assistant for a graduate-level Machine Learning course, supporting instruction, grading, and administration for a cohort of approximately 465 students.",
    ],
  },
  {
    company: "Propense.ai",
    role: "Data Scientist",
    location: "Remote",
    dates: "05/2023 – 08/2023",
    bullets: [
      "Augmented enterprise knowledge graphs with internal data to facilitate cold-starting a B2B recommendation system and provide market insights for business development.",
      "Identified patterns in sales gaps by analyzing client and sales history data. Presented actionable insights to clients, securing 5 initial contracts for product launch.",
    ],
  },
  {
    company: "Nexus Equities",
    role: "Quantitative Investments & Data Science Intern",
    location: "Remote",
    dates: "02/2023 – 05/2023",
    bullets: [
      "Developed a PyTorch computer vision model to estimate the useable land area on outdoor storage facilities using satellite imagery, accelerating approximately 50 investment decisions.",
    ],
  },
  {
    company: "Amazon Web Services (AWS)",
    role: "Software Development Engineer – EC2 Core Platform",
    location: "Seattle, WA",
    dates: "10/2018 – 01/2021",
    bullets: [
      "Owned and operated two critical services: one to drain customer instances from unhealthy EC2 hosts, and another to proactively recycle older hosts for re-provisioning. Identified and resolved deadlock conditions, resulting in a $300k/month reduction in 'unsellable' rate.",
      "Built a scalable and secure data lake to centralize previously siloed EC2 internal data.",
      "Used PySpark to ingest real-time data from various AWS data stores such as DynamoDB, RDS (MySQL), S3, and Amazon Athena.",
      "Deployed ETL pipelines using AWS Glue Jobs, Crawlers, and VPC Elastic Interfaces to extract cross-regional data from 300+ internal AWS production service accounts.",
      "Created stored procedures and QuickSight analytics dashboards, significantly increasing the velocity of insights and business decisions for the TPM team and stakeholders.",
      "Implemented a repaired capacity forecasting model and integrated it into the proactive re-provisioning workflow, increasing host turnover rate by up to 18% per region.",
    ],
  },
  {
    company: "Microsoft Azure",
    role: "Software Development Engineer – HDInsight",
    location: "Redmond, WA",
    dates: "08/2016 – 10/2018",
    bullets: [
      "Responsible for identifying and root cause analysis (RCA) of regressions in Apache Hadoop ecosystem products (Spark, Kafka, etc.) and liaising with Apache engineers.",
      "Proposed, designed, and implemented time series anomaly detection algorithms, improving alarm triggers and identifying cluster configurations with high customer impact. Reduced average TTD by ~55% and TTR by ~20%.",
      "Joined a small v-team which refactored the control plane of HDInsight to support the creation of flexible cluster shapes. Closed the feature gap with our primary competitors while increasing service reliability KPIs and decreasing COGS.",
    ],
  },
  {
    company: "Hudl",
    role: "Design Studio Software Developer – Decision Science",
    location: "Lincoln, NE",
    dates: "09/2015 – 05/2016",
    bullets: [
      "Collaborated with a team of data scientists to develop a temporal convolutional neural network which automatically detected basketball highlights from user-uploaded video.",
      "Conducted continuous A/B testing to collect user metrics (engagement, bounce rate, stickiness, and view count) to iterate on model effectiveness.",
      "Assessed model launch success through user engagement metrics and presented regular reports to stakeholders. Achieved significant growth in active users (DAU / WAU).",
    ],
  },
];
