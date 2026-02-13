export interface EducationEntry {
  degree: string;
  institution: string;
  dates: string;
  gpa: string;
  highlights: string[];
}

export const education: EducationEntry[] = [
  {
    degree: "M.S. in Data Science",
    institution: "University of Texas at Austin",
    dates: "01/2022 – 12/2024",
    gpa: "3.89 / 4.00",
    highlights: [
      "Created DNNs using PyTorch for the vision system of a racing simulator. Implemented networks for object detection, keypoint estimation, semantic segmentation, multi-action networks, and reinforcement learning for autonomous driving.",
      "Created neural networks for Natural Language Processing (NLP) applications such as Semantic Parsing & Labelling, Sentiment Analysis, and Language Generation.",
    ],
  },
  {
    degree: "B.S. in Computer Science",
    institution: "University of Nebraska – Lincoln",
    dates: "08/2012 – 05/2016",
    gpa: "3.90 / 4.00",
    highlights: [
      "Student in the honors program, Jeffrey S. Raikes School of Computer Science and Business Management.",
      "Minor in Business Management and Mathematics.",
      "Capstone project involved working with local businesses to implement software solutions.",
    ],
  },
];
