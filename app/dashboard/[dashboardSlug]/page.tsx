import { getResumeById } from "../../../lib/resumes";
import ResumeFeedback from "../../../components/resume-check/resume-feedback";
import Link from "next/link";
import { ChevronLeft } from "../../../components/icons";

export default async function ResumePage({
    params,
}: {
    params: Promise<{ dashboardSlug: string }>;
}) {
    // Get the resume id from the URL
    const resumeId = (await params).dashboardSlug;
    // Fetch the resume from your DB (this can be an async call)
    const resume = await getResumeById(resumeId);

    if (!resume) {
        return <div>Resume not found</div>;
    }

    // transfer strengths and diffs to array
    const strengths = resume.strengths ? JSON.parse(resume.strengths) : [];
    const diffs = resume.diffs ? JSON.parse(resume.diffs) : [];
    const formattedDate = resume.createdAt
        ? new Date(resume.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
          })
        : "";

    return (
        <div>
            <Link
                className="text-[var(--color-purple)] flex items-center gap-2 w-[90%] max-w-[90%] ml-10 md:ml-0 md:w-[600px] mt-8 mb-4 hover:underline transition-all duration-200"
                href="/dashboard"
            >
               <ChevronLeft className="w-3 h-3" />
                Back to dashboard
            </Link>
            <ResumeFeedback
                fullName={resume.fullName}
                score={resume.score}
                strengths={strengths}
                diffs={diffs}
                date={formattedDate}
            />
        </div>
    );
}
