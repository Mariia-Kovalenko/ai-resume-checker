// utils/fileUtils.js

export function getFileIcon(type) {
    if (type === "application/pdf") {
        // PDF icon (red)
        return (
            <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clipPath="url(#clip0_15_56)">
                    <path
                        d="M21.75 0.850769H4.25C2.17893 0.850769 0.5 2.5297 0.5 4.60077V22.1008C0.5 24.1718 2.17893 25.8508 4.25 25.8508H21.75C23.8211 25.8508 25.5 24.1718 25.5 22.1008V4.60077C25.5 2.5297 23.8211 0.850769 21.75 0.850769Z"
                        fill="#C80A0A"
                    />
                    <path
                        d="M20.666 15.5969C20.2266 15.1086 19.25 14.8644 17.9316 14.8644C17.1504 14.8644 16.3203 14.9621 15.3437 15.1086C14.3097 14.1401 13.4508 13.0003 12.8047 11.7394C13.293 10.2746 13.6348 8.85858 13.6348 7.78436C13.6348 6.95428 13.3418 5.63593 12.1699 5.63593C11.8281 5.63593 11.5351 5.83124 11.3398 6.12421C10.8516 7.00311 11.0469 8.95624 11.9746 11.007C11.2969 12.9666 10.4811 14.8757 9.5332 16.7199C6.9453 17.7941 5.23632 18.966 5.08984 19.8937C4.99218 20.3332 5.28515 21.0656 6.31054 21.0656C7.82421 21.0656 9.48437 18.8683 10.7539 16.6223C12.2194 16.1183 13.7211 15.7266 15.2461 15.4504C17.1016 17.0617 18.7129 17.3058 19.4941 17.3058C21.0566 17.3058 21.2031 16.1828 20.666 15.5969ZM11.584 6.27069C11.9746 5.68475 12.8535 5.88007 12.8535 7.05194C12.8535 7.83319 12.6094 9.10272 12.1211 10.5676C11.2422 8.51678 11.2422 6.90546 11.584 6.27069ZM5.3828 19.9426C5.52929 19.1613 6.99413 18.0871 9.28905 17.1594C8.01952 19.3078 6.74999 20.675 5.96874 20.675C5.48046 20.675 5.33398 20.2355 5.3828 19.9426ZM15.0019 15.1574C13.6261 15.4138 12.2714 15.7729 10.9492 16.2316C11.6719 14.9272 12.2608 13.553 12.707 12.1301C13.3488 13.2269 14.1192 14.2432 15.0019 15.1574ZM15.6367 15.3527C17.1992 15.1086 18.5176 15.1574 19.1035 15.2551C20.5195 15.548 20.0312 17.257 18.4687 16.8664C17.3457 16.6223 16.418 15.9875 15.6367 15.3527Z"
                        fill="white"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_15_56">
                        <rect
                            width="25"
                            height="25"
                            fill="white"
                            transform="translate(0.5 0.850769)"
                        />
                    </clipPath>
                </defs>
            </svg>
        );
    }
    // DOCX icon (blue)
    return (
        <svg
            width="29"
            height="25"
            viewBox="0 0 29 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_9_130)">
                <path
                    d="M27.7789 0H8.54735C7.87298 0 7.32629 0.539416 7.32629 1.20482V23.7952C7.32629 24.4606 7.87298 25 8.54735 25H27.7789C28.4533 25 29 24.4606 29 23.7952V1.20482C29 0.539416 28.4533 0 27.7789 0Z"
                    fill="url(#paint0_linear_9_130)"
                />
                <mask
                    id="mask0_9_130"
                    style={{ maskType: "luminance" }}
                    maskUnits="userSpaceOnUse"
                    x="7"
                    y="0"
                    width="22"
                    height="25"
                >
                    <path
                        d="M27.7789 0H8.54735C7.87298 0 7.32629 0.539416 7.32629 1.20482V23.7952C7.32629 24.4606 7.87298 25 8.54735 25H27.7789C28.4533 25 29 24.4606 29 23.7952V1.20482C29 0.539416 28.4533 0 27.7789 0Z"
                        fill="white"
                    />
                </mask>
                <g mask="url(#mask0_9_130)">
                    <path
                        d="M29 6.17471H7.32629V12.5H29V6.17471Z"
                        fill="url(#paint1_linear_9_130)"
                    />
                </g>
                <mask
                    id="mask1_9_130"
                    style={{ maskType: "luminance" }}
                    maskUnits="userSpaceOnUse"
                    x="7"
                    y="0"
                    width="22"
                    height="25"
                >
                    <path
                        d="M27.7789 0H8.54735C7.87298 0 7.32629 0.539416 7.32629 1.20482V23.7952C7.32629 24.4606 7.87298 25 8.54735 25H27.7789C28.4533 25 29 24.4606 29 23.7952V1.20482C29 0.539416 28.4533 0 27.7789 0Z"
                        fill="white"
                    />
                </mask>
                <g mask="url(#mask1_9_130)">
                    <path
                        d="M29 -0.150604H7.32629V6.1747H29V-0.150604Z"
                        fill="url(#paint2_linear_9_130)"
                    />
                </g>
                <mask
                    id="mask2_9_130"
                    style={{ maskType: "luminance" }}
                    maskUnits="userSpaceOnUse"
                    x="7"
                    y="0"
                    width="22"
                    height="25"
                >
                    <path
                        d="M27.7789 0H8.54735C7.87298 0 7.32629 0.539416 7.32629 1.20482V23.7952C7.32629 24.4606 7.87298 25 8.54735 25H27.7789C28.4533 25 29 24.4606 29 23.7952V1.20482C29 0.539416 28.4533 0 27.7789 0Z"
                        fill="white"
                    />
                </mask>
                <g mask="url(#mask2_9_130)">
                    <path
                        d="M29 12.5H7.32629V18.8253H29V12.5Z"
                        fill="url(#paint3_linear_9_130)"
                    />
                </g>
                <mask
                    id="mask3_9_130"
                    style={{ maskType: "luminance" }}
                    maskUnits="userSpaceOnUse"
                    x="7"
                    y="0"
                    width="22"
                    height="25"
                >
                    <path
                        d="M27.7789 0H8.54735C7.87298 0 7.32629 0.539416 7.32629 1.20482V23.7952C7.32629 24.4606 7.87298 25 8.54735 25H27.7789C28.4533 25 29 24.4606 29 23.7952V1.20482C29 0.539416 28.4533 0 27.7789 0Z"
                        fill="white"
                    />
                </mask>
                <g mask="url(#mask3_9_130)">
                    <path
                        d="M29 18.8253H7.32629V25.1506H29V18.8253Z"
                        fill="url(#paint4_linear_9_130)"
                    />
                </g>
                <mask
                    id="mask4_9_130"
                    style={{ maskType: "luminance" }}
                    maskUnits="userSpaceOnUse"
                    x="7"
                    y="0"
                    width="22"
                    height="25"
                >
                    <path
                        d="M27.7789 0H8.54735C7.87298 0 7.32629 0.539416 7.32629 1.20482V23.7952C7.32629 24.4606 7.87298 25 8.54735 25H27.7789C28.4533 25 29 24.4606 29 23.7952V1.20482C29 0.539416 28.4533 0 27.7789 0Z"
                        fill="white"
                    />
                </mask>
                <g mask="url(#mask4_9_130)">
                    <g filter="url(#filter0_f_9_130)">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.221 5.5723H13.4315C14.1059 5.5723 14.6526 6.11171 14.6526 6.77712V18.8253C14.6526 19.4907 12.5796 21.5362 11.9052 21.5362H-0.305315C-0.979683 21.5362 -1.52637 20.9967 -1.52637 20.3313V8.28314C-1.52637 7.61774 0.546632 5.5723 1.221 5.5723Z"
                            fill="black"
                            fillOpacity="0.1"
                        />
                    </g>
                </g>
                <path
                    d="M13.4316 5.27109H1.22105C0.546684 5.27109 0 5.8105 0 6.47591V18.5241C0 19.1895 0.546684 19.7289 1.22105 19.7289H13.4316C14.1059 19.7289 14.6526 19.1895 14.6526 18.5241V6.47591C14.6526 5.8105 14.1059 5.27109 13.4316 5.27109Z"
                    fill="url(#paint5_linear_9_130)"
                />
                <path
                    d="M13.4316 5.27109H1.22105C0.546684 5.27109 0 5.8105 0 6.47591V18.5241C0 19.1895 0.546684 19.7289 1.22105 19.7289H13.4316C14.1059 19.7289 14.6526 19.1895 14.6526 18.5241V6.47591C14.6526 5.8105 14.1059 5.27109 13.4316 5.27109Z"
                    fill="url(#paint6_radial_9_130)"
                />
                <mask
                    id="mask5_9_130"
                    style={{ maskType: "luminance" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="5"
                    width="15"
                    height="15"
                >
                    <path
                        d="M13.4316 5.27109H1.22105C0.546684 5.27109 0 5.8105 0 6.47591V18.5241C0 19.1895 0.546684 19.7289 1.22105 19.7289H13.4316C14.1059 19.7289 14.6526 19.1895 14.6526 18.5241V6.47591C14.6526 5.8105 14.1059 5.27109 13.4316 5.27109Z"
                        fill="white"
                    />
                </mask>
                <g mask="url(#mask5_9_130)">
                    <path
                        d="M4.39124 16.2384L2.44214 8.73495H3.9973L5.13166 14.4444L6.65996 8.73495H8.1614L9.63307 14.5331L10.788 8.73495H12.3176L10.3376 16.2384H8.72598L7.37992 10.5161L6.0389 16.2384H4.39124Z"
                        fill="url(#paint7_linear_9_130)"
                    />
                </g>
            </g>
            <defs>
                <filter
                    id="filter0_f_9_130"
                    x="-4.52637"
                    y="2.5723"
                    width="22.179"
                    height="21.9639"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur
                        stdDeviation="1.5"
                        result="effect1_foregroundBlur_9_130"
                    />
                </filter>
                <linearGradient
                    id="paint0_linear_9_130"
                    x1="2254.11"
                    y1="242.825"
                    x2="7.32629"
                    y2="242.825"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#009AE3" />
                    <stop offset="1" stopColor="#0076B8" />
                </linearGradient>
                <linearGradient
                    id="paint1_linear_9_130"
                    x1="2200.12"
                    y1="638.705"
                    x2="1910.23"
                    y2="-407.405"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#0099F7" />
                    <stop offset="1" stopColor="#025FAD" />
                </linearGradient>
                <linearGradient
                    id="paint2_linear_9_130"
                    x1="143.74"
                    y1="-0.150604"
                    x2="133.943"
                    y2="634.001"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#0077B9" />
                    <stop offset="1" stopColor="#00A9F8" />
                </linearGradient>
                <linearGradient
                    id="paint3_linear_9_130"
                    x1="2336.51"
                    y1="694.564"
                    x2="2019.55"
                    y2="-462.991"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#0872D3" />
                    <stop offset="1" stopColor="#064C9F" />
                </linearGradient>
                <linearGradient
                    id="paint4_linear_9_130"
                    x1="2253.76"
                    y1="651.355"
                    x2="1914.79"
                    y2="-512.45"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#0D58BF" />
                    <stop offset="1" stopColor="#0A3070" />
                </linearGradient>
                <linearGradient
                    id="paint5_linear_9_130"
                    x1="31.5178"
                    y1="145.7"
                    x2="1639.91"
                    y2="1539.88"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#0A3165" />
                    <stop offset="1" stopColor="#064995" />
                </linearGradient>
                <radialGradient
                    id="paint6_radial_9_130"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(1268.93 1222.77) scale(914.295 902.14)"
                >
                    <stop stopColor="#004F9D" />
                    <stop offset="1" stopColor="#004F9D" stopOpacity="0" />
                </radialGradient>
                <linearGradient
                    id="paint7_linear_9_130"
                    x1="293.451"
                    y1="383.908"
                    x2="969.867"
                    y2="383.908"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#F0F0F0" />
                    <stop offset="1" stopColor="white" />
                </linearGradient>
                <clipPath id="clip0_9_130">
                    <rect width="29" height="25" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}

export function formatSize(size) {
    if (size >= 1024 * 1024) {
      return `${(size / (1024 * 1024)).toFixed(1)}MB`;
    }
    if (size >= 1024) {
      return `${Math.round(size / 1024)}KB`;
    }
    return `${size}B`;
  }