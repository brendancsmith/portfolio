import type { Metadata } from "next";
import ResumeLayout from "@/components/resume/ResumeLayout";

export const metadata: Metadata = {
  title: "Brendan C. Smith | Resume",
  robots: { index: false, follow: false },
};

export default function ResumePage() {
  return <ResumeLayout variant="standard" />;
}
