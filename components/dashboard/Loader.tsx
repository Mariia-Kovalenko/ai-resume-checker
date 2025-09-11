import React from "react";
import { Spinner } from "../icons";

export default function Loader() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
            <Spinner />
        </div>
    );
}
