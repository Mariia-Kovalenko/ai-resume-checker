import { getResumeById } from "../../../lib/resumes";
import ResumeFeedback from "../../../components/resume-check/resume-feedback";
import Link from "next/link";

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
                className="text-[var(--color-purple)] flex items-center gap-2 w-[90%] max-w-[90%] md:w-[600px] mx-auto my-8 hover:underline transition-all duration-200"
                href="/dashboard"
            >
                <svg
                    width="5"
                    height="9"
                    viewBox="0 0 5 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M3.43443 0.244081C3.75987 -0.0813604 4.28751 -0.0813604 4.61295 0.244081C4.93838 0.569515 4.93838 1.09716 4.61295 1.42259L1.66669 4.36885L4.61295 7.31518C4.93838 7.6406 4.93838 8.16818 4.61295 8.49368C4.28751 8.8191 3.75987 8.8191 3.43443 8.49368L0.488192 5.54735C-0.162724 4.89651 -0.162724 3.84126 0.488192 3.19035L3.43443 0.244081Z"
                        fill="#716CE9"
                    />
                </svg>
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
