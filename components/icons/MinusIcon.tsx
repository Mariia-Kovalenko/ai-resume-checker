import React from "react";

const MinusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={props.className}
        {...props}
    >
        <path
            d="M14.7826 10.9783H5.2174C4.67392 10.9783 4.23914 10.5435 4.23914 9.99999C4.23914 9.45651 4.67392 9.02173 5.2174 9.02173H14.7826C15.3261 9.02173 15.7609 9.45651 15.7609 9.99999C15.7609 10.5435 15.3261 10.9783 14.7826 10.9783Z"
            fill="#C80A0A"
        />
    </svg>
);

export default MinusIcon;
