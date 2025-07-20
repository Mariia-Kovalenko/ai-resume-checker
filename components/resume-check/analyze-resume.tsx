import { useState, useEffect, ChangeEvent } from "react";
import stars from "/assets/stars.png";
import Image from "next/image";

interface AnalyzeResumeProps {
    fullName?: string;
    desiredJob?: string;
    phone?: string;
    email?: string;
    location?: string;
    onReview: (form: FormState) => void;
}

interface FormState {
    fullName: string;
    desiredJob: string;
    phone: string;
    email: string;
    location: string;
}

const AnalyzeResume: React.FC<AnalyzeResumeProps> = ({
    fullName = "",
    desiredJob = "",
    phone = "",
    email = "",
    location = "",
    onReview,
}) => {
    const [form, setForm] = useState<FormState>({
        fullName,
        desiredJob,
        phone,
        email,
        location,
    });

    useEffect(() => {
        setForm({ fullName, desiredJob, phone, email, location });
    }, [fullName, desiredJob, phone, email, location]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const inputClass =
        "w-full bg-[var(--background)] rounded-md border-1 border-gray-200 px-3 py-2 text-sm resize-none transition-all duration-200 outline-[transparent] outline-2 focus:outline-[var(--color-purple)] h-[40px]";
    const labelClass = "block font-semibold text-sm mb-2";
    const fadedPlaceholder = "text-gray-300";
    const errorIcon = (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 text-lg select-none">
            !
        </span>
    );

    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <h2 className="text-xl md:text-2xl font-bold text-center flex items-center justify-center gap-2">
                <Image
                    src={stars}
                    alt="upload file"
                    className="w-8 h-8 md:w-10 md:h-10"
                />
                <span>Review you applicant info</span>
            </h2>
            <div className="bg-white rounded-2xl shadow-sm p-4 md:p-8 w-[90%] md:w-[600px] max-w-full mx-auto mb-8">
                <h2 className="text-base md:text-lg font-bold text-left mb-1">
                    Your resume details
                </h2>
                <p className="text-gray-500 text-left mb-6 text-sm">
                    Please check your application details before proceeding
                </p>
                <form className="flex flex-col gap-4">
                    {/* Full Name */}
                    <div>
                        <label className={labelClass} htmlFor="fullName">
                            Full Name
                        </label>
                        <div className="relative">
                            <input
                                id="fullName"
                                name="fullName"
                                className={
                                    inputClass +
                                    (form.fullName
                                        ? ""
                                        : " " + fadedPlaceholder)
                                }
                                value={form.fullName}
                                placeholder={
                                    form.fullName ? "" : "Enter your full name"
                                }
                                onChange={handleChange}
                            />
                            {!form.fullName && errorIcon}
                        </div>
                    </div>
                    {/* Desired Job */}
                    <div>
                        <label className={labelClass} htmlFor="desiredJob">
                            Desired Job
                        </label>
                        <div className="relative">
                            <input
                                id="desiredJob"
                                name="desiredJob"
                                className={
                                    inputClass +
                                    (form.desiredJob
                                        ? ""
                                        : " " + fadedPlaceholder)
                                }
                                value={form.desiredJob}
                                placeholder={
                                    form.desiredJob ? "" : "Enter desired job"
                                }
                                onChange={handleChange}
                            />
                            {!form.desiredJob && errorIcon}
                        </div>
                    </div>
                    {/* Phone number */}
                    <div>
                        <label className={labelClass} htmlFor="phone">
                            Phone number
                        </label>
                        <div className="relative">
                            <input
                                id="phone"
                                name="phone"
                                className={
                                    inputClass +
                                    (form.phone ? "" : " " + fadedPlaceholder)
                                }
                                value={form.phone}
                                placeholder={form.phone ? "" : "+1234567890"}
                                onChange={handleChange}
                            />
                            {!form.phone && errorIcon}
                        </div>
                    </div>
                    {/* Email */}
                    <div>
                        <label className={labelClass} htmlFor="email">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                name="email"
                                className={
                                    inputClass +
                                    (form.email ? "" : " " + fadedPlaceholder)
                                }
                                value={form.email}
                                placeholder={
                                    form.email ? "" : "email@email.com"
                                }
                                onChange={handleChange}
                            />
                            {!form.email && errorIcon}
                        </div>
                    </div>
                    {/* Location/City */}
                    <div>
                        <label className={labelClass} htmlFor="location">
                            Location/City
                        </label>
                        <div className="relative">
                            <input
                                id="location"
                                name="location"
                                className={
                                    inputClass +
                                    (form.location
                                        ? ""
                                        : " " + fadedPlaceholder)
                                }
                                value={form.location}
                                placeholder={
                                    form.location ? "" : "Enter your city"
                                }
                                onChange={handleChange}
                            />
                            {!form.location && errorIcon}
                        </div>
                    </div>
                    <button
                        type="button"
                        className="uppercase flex items-center justify-center gap-2 mt-4 w-full bg-[var(--color-purple)] text-white font-semibold rounded-md py-3 text-[14px] cursor-pointer transition-colors duration-200 hover:opacity-80"
                        onClick={() => onReview(form)}
                    >
                        <svg
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16.5292 5.9434L17.4725 9L15.0016 7.10978L12.5275 9L13.4741 5.9434L11 4.0566H14.0551L15.0016 1L15.9449 4.0566H19L16.5292 5.9434Z"
                                fill="white"
                            />
                            <path
                                d="M11.804 7.56L8.776 9.76L9.932 13.324L6.904 11.124L3.872 13.324L5.028 9.76L2 7.56H5.744L6.904 4L8.06 7.56H11.804Z"
                                fill="white"
                            />
                            <path
                                d="M16 14.6757L13.8352 16.3273L14.6634 19L12.4986 17.3483L10.3366 19L11.162 16.3273L9 14.6757H11.6732L12.4986 12L13.3268 14.6757H16Z"
                                fill="white"
                            />
                        </svg>
                        REVIEW MY RESUME
                    </button>
                    <button
                        className="underline text-sm cursor-pointer"
                        onClick={() => onReview(form)}
                    >
                        Back to upload
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AnalyzeResume;
