export interface ExperienceEntry {
  company: string;
  role: string;
  location: string;
  dates: string;
  description?: string;
  bullets: string[];
  resumeBullets?: string[];
}

export const experience: ExperienceEntry[] = [
  {
    company: "Best Egg",
    role: "Lead Data Scientist",
    location: "Remote",
    dates: "09/2024 – 10/2025",
    description:
      "Led data science and MLOps initiatives for a consumer fintech lending platform, owning credit risk modeling, ML pipeline infrastructure, and model deployment for the Flexible Rent product line and the core personal loan underwriting model.",
    bullets: [
      "Built a next-generation customer expansion XGBoost model for the Flexible Rent Platform, enabling Best Egg to extend credit to applicants with thin or subprime bureau profiles by verifying healthy cash flows directly from bank account data — unlocking a segment traditional credit scoring would have declined.",
      "Integrated alternative data sources — bank transaction records, third-party payment histories, and bureau tradeline data — and engineered features across rolling windows (30-day, 90-day, 6-month) capturing spending volatility, income stability, deposit frequency, and debt-to-income trends.",
      "Constructed lagged and differenced features to surface momentum signals such as improving payment behavior or deteriorating cash reserves. Improved discriminative power by 23% (Gini coefficient) through iterative model tuning and feature selection.",
      "Designed end-to-end MLOps pipelines in Metaflow to automate the challenger model lifecycle — feature engineering, hyperparameter tuning, validation, and deployment — for the primary credit risk underwriting model, accelerating experiment-to-production velocity.",
      "Trained a team of 3 other Data Scientists to contribute flows to the project.",
      "Built an agentic RAG system with tool-use orchestration over internal documentation, including a Snowflake SQL integration for natural-language data queries, reducing time-to-insight for non-technical stakeholders.",
    ],
    resumeBullets: [
      "Created a next-gen customer expansion XGBoost model for the Flexible Rent Platform including alternative data, increasing Gini coefficient by 23%.",
      "Designed and implemented Metaflow flows (DAGs) to automatically train challenger models for our primary credit risk and underwriting XGBoost model.",
      "Trained a team of 3 other Data Scientists to contribute flows to the project.",
      "Worked on a RAG-based chat system to generate answers based on our internal documentation. Also integrated with Snowflake to run SQL queries based on questions.",
    ],
  },
  {
    company: "Burns & McDonnell",
    role: "Senior Data Engineer – Contract",
    location: "Kansas City, MO",
    dates: "04/2024 – 07/2024",
    description:
      "Contracted to build the ingestion and transformation layer of a Databricks lakehouse for a major engineering consultancy's enterprise data platform.",
    bullets: [
      "Built Airflow DAGs to ingest full-load and incremental data from various SQL databases.",
      "Transformed records between medallion stages using dbt within the Databricks Medallion Architecture.",
      "Designed a logging strategy integrated with Azure Monitor / Log Analytics.",
    ],
  },
  {
    company: "University of Texas at Austin",
    role: "Graduate Learning Facilitator – Machine Learning",
    location: "Remote",
    dates: "01/2024 – 04/2024",
    description:
      "Supported graduate-level ML instruction for UT Austin's MS in AI program while completing the same degree.",
    bullets: [
      "Served as a teaching assistant for a graduate-level Machine Learning course, supporting instruction, grading, and administration for a cohort of approximately 465 students.",
    ],
  },
  {
    company: "Propense.ai",
    role: "Data Scientist",
    location: "Remote",
    dates: "05/2023 – 08/2023",
    description:
      "Built data enrichment and recommendation capabilities for an early-stage B2B sales intelligence startup, turning third-party knowledge graphs into actionable prospecting signals.",
    bullets: [
      "Augmented enterprise knowledge graphs with internal data to cold-start a B2B recommendation system, solving the new-platform data sparsity problem for market insights.",
      "Identified patterns in sales gaps by analyzing client and sales history data. Presented actionable insights to clients, securing 5 initial contracts at launch.",
    ],
  },
  {
    company: "Nexus Equities",
    role: "Quantitative Investments & Data Science Intern",
    location: "Remote",
    dates: "02/2023 – 05/2023",
    description:
      "Applied computer vision to commercial real estate underwriting, automating a manual site assessment step in the investment pipeline.",
    bullets: [
      "Developed a PyTorch computer vision model to estimate the useable land area on outdoor storage facilities using satellite imagery, accelerating approximately 50 investment decisions.",
    ],
  },
  {
    company: "Amazon Web Services (AWS)",
    role: "Software Development Engineer – EC2 Core Platform",
    location: "Seattle, WA",
    dates: "10/2018 – 01/2021",
    description:
      "Owned critical EC2 host lifecycle services and built internal data infrastructure for one of AWS's largest and most operationally complex services.",
    bullets: [
      "Owned and operated two critical services: one to drain customer instances from unhealthy EC2 hosts, and another to proactively recycle older hosts for re-provisioning. Identified and resolved deadlock conditions, resulting in a $300k/month reduction in 'unsellable' rate.",
      "Built a centralized data lake on AWS using Python and PySpark, ingesting real-time data from DynamoDB, RDS, S3, and Athena — replacing previously siloed EC2 internal datasets with a unified analytics platform.",
      "Deployed AWS Glue ETL pipelines to extract cross-regional data from 300+ internal production accounts and surfaced insights through QuickSight dashboards for TPM stakeholders.",
      "Implemented and deployed a capacity forecasting ML model integrated into the proactive host re-provisioning workflow, increasing turnover rate by up to 18% per region.",
    ],
    resumeBullets: [
      "Owned and operated two critical services: one to drain customer instances from unhealthy EC2 hosts, and another to proactively recycle older hosts for re-provisioning. Identified and resolved deadlock conditions, resulting in a $300k/month reduction in 'unsellable' rate.",
      "Built a scalable data lake to centralize previously siloed EC2 internal data sources.",
      "Used PySpark to ingest real-time data from various AWS data stores such as AWS DynamoDB, RDS (MySQL), S3, and Amazon Athena.",
      "Deployed ETL pipelines using AWS Glue Jobs, Crawlers, and VPC Elastic Interfaces to extract cross-regional data from 300+ internal AWS production service accounts.",
      "Created stored procedures and QuickSight dashboards, increasing the velocity of insights and business decisions for TPM stakeholders.",
      "Implemented a capacity forecasting model and integrated it into the proactive re-provisioning workflow, increasing host turnover rate by up to 18% per region.",
    ],
  },
  {
    company: "Microsoft Azure",
    role: "Software Development Engineer – HDInsight",
    location: "Redmond, WA",
    dates: "08/2016 – 10/2018",
    description:
      "Shipped anomaly detection and platform reliability improvements for Azure's managed Hadoop service, collaborating directly with Apache open-source communities.",
    bullets: [
      "Served as cross-org liaison for root cause analysis of regressions in Apache Hadoop ecosystem products (Spark, Kafka, etc.), coordinating fixes with upstream Apache engineers.",
      "Proposed, designed, and deployed time series anomaly detection ML models on Azure, improving alarm triggers and identifying cluster configurations with high customer impact. Reduced average TTD by ~55% and TTR by ~20%.",
      "Joined a small v-team to refactor the HDInsight control plane, enabling flexible cluster shapes. Closed the feature gap with competitors while increasing service reliability KPIs and reducing COGS.",
    ],
  },
  {
    company: "Hudl",
    role: "Design Studio Software Developer – Decision Science",
    location: "Lincoln, NE",
    dates: "09/2015 – 05/2016",
    description:
      "Built A/B testing and model shipping workflows for ML-powered video highlight detection for a sports technology platform used by high school basketball teams and athletes.",
    bullets: [
      "Developed a temporal convolutional neural network to automatically detect basketball highlights from user-uploaded video.",
      "Ran continuous A/B experiments measuring engagement, bounce rate, and stickiness to iterate on model effectiveness, achieving significant growth in active users (DAU/WAU).",
    ],
    resumeBullets: [
      "Collaborated with a team of data scientists to develop a temporal convolutional neural network which automatically detected basketball highlights from user-uploaded video.",
      "Conducted continuous A/B testing to collect user metrics (engagement, bounce rate, stickiness, and view count) to iterate on model effectiveness.",
      "Assessed model launch success through user engagement metrics and presented regular reports to stakeholders. Achieved significant growth in active users (DAU / WAU).",
    ],
  },
];
