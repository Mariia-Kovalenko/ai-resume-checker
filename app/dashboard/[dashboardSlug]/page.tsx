import { getResumeById } from "../../../lib/resumes"; 
import ResumeFeedback from "../../../components/resume-check/resume-feedback";
import Link from "next/link";

export default async function ResumePage({ params }: { params: Promise<{ dashboardSlug: string }> }) {
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
    const formattedDate = resume.createdAt ? new Date(resume.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }) : "";

    return (
            <div>
                <Link href="/dashboard">Back to dashboard</Link>
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