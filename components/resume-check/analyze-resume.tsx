import { useState, useEffect, ChangeEvent } from "react";

interface AnalyzeResumeProps {
  fullName?: string;
  desiredJob?: string;
  phone?: string;
  email?: string;
  location?: string;
}

interface FormState {
  fullName: string;
  desiredJob: string;
  phone: string;
  email: string;
  location: string;
}

const AnalyzeResume: React.FC<AnalyzeResumeProps> = ({
  fullName = '',
  desiredJob = '',
  phone = '',
  email = '',
  location = ''
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
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 text-lg select-none">!</span>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 md:p-8 w-[90%] md:w-[500px] max-w-full mx-auto mb-8">
      <h2 className="text-base md:text-lg font-bold text-left mb-1">Your resume details</h2>
      <p className="text-gray-500 text-left mb-6 text-sm">Please check your application details before proceeding</p>
      <form className="flex flex-col gap-4">
        {/* Full Name */}
        <div>
          <label className={labelClass} htmlFor="fullName">Full Name</label>
          <div className="relative">
            <input
              id="fullName"
              name="fullName"
              className={inputClass + (form.fullName ? '' : ' ' + fadedPlaceholder)}
              value={form.fullName}
              placeholder={form.fullName ? '' : 'Enter your full name'}
              onChange={handleChange}
            />
            {!form.fullName && errorIcon}
          </div>
        </div>
        {/* Desired Job */}
        <div>
          <label className={labelClass} htmlFor="desiredJob">Desired Job</label>
          <div className="relative">
            <input
              id="desiredJob"
              name="desiredJob"
              className={inputClass + (form.desiredJob ? '' : ' ' + fadedPlaceholder)}
              value={form.desiredJob}
              placeholder={form.desiredJob ? '' : 'Enter desired job'}
              onChange={handleChange}
            />
            {!form.desiredJob && errorIcon}
          </div>
        </div>
        {/* Phone number */}
        <div>
          <label className={labelClass} htmlFor="phone">Phone number</label>
          <div className="relative">
            <input
              id="phone"
              name="phone"
              className={inputClass + (form.phone ? '' : ' ' + fadedPlaceholder)}
              value={form.phone}
              placeholder={form.phone ? '' : '+1234567890'}
              onChange={handleChange}
            />
            {!form.phone && errorIcon}
          </div>
        </div>
        {/* Email */}
        <div>
          <label className={labelClass} htmlFor="email">Email</label>
          <div className="relative">
            <input
              id="email"
              name="email"
              className={inputClass + (form.email ? '' : ' ' + fadedPlaceholder)}
              value={form.email}
              placeholder={form.email ? '' : 'email@email.com'}
              onChange={handleChange}
            />
            {!form.email && errorIcon}
          </div>
        </div>
        {/* Location/City */}
        <div>
          <label className={labelClass} htmlFor="location">Location/City</label>
          <div className="relative">
            <input
              id="location"
              name="location"
              className={inputClass + (form.location ? '' : ' ' + fadedPlaceholder)}
              value={form.location}
              placeholder={form.location ? '' : 'Enter your city'}
              onChange={handleChange}
            />
            {!form.location && errorIcon}
          </div>
        </div>
        <button
          type="button"
          className="mt-4 w-full bg-[var(--color-purple)] text-white font-semibold rounded-md py-3 text-[14px] cursor-pointer transition-colors duration-200 hover:opacity-80"
        >
          CONTINUE
        </button>
      </form>
    </div>
  );
};

export default AnalyzeResume; 