import type { Metadata } from "next";
import AtsResumeLayout from "@/components/resume/AtsResumeLayout";

export const metadata: Metadata = {
  title: "Brendan C. Smith | Resume (ATS)",
  robots: { index: false, follow: false },
};

export default function ResumeAtsPage() {
  return <AtsResumeLayout />;
}
