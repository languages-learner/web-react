import React from "react";

import { LandingHeader } from "./LandingHeader";
import { LandingPreferencesControls } from "./LandingPreferencesControls";

export type LandingLayoutProps = React.PropsWithChildren;

export const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
    return (
        <div
            className={
                "bg-linear-[135deg,var(--color-private-green-50),var(--color-private-green-350)] flex min-h-svh w-svw flex-col"
            }
        >
            <LandingHeader />
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
                <div className="flex min-h-full flex-col">
                    <div
                        className={
                            "lg:px-30 flex-1 px-4 pb-6 pt-8 sm:px-10 sm:pt-16 md:px-20 md:pt-20"
                        }
                    >
                        {children}
                    </div>
                    <div className="border-t border-white/25 px-4 py-5 sm:px-10 md:hidden">
                        <LandingPreferencesControls />
                    </div>
                </div>
            </div>
        </div>
    );
};
