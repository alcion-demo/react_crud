import { ReactNode } from "react";
import { usePage } from "@inertiajs/react";
import Header from "@/Components/Header";
import type { PageProps } from "@/types/page";

export default function AppLayout({ children }: { children: ReactNode }) {
    const { flash } = usePage<PageProps>().props;
    return (
        <div>
            <Header />
            {flash?.success && (
                <div className="bg-green-100 text-green-800 p-2">
                    {flash.success}
                </div>
            )}

            {flash?.error && (
                <div className="bg-red-100 text-red-800 p-2">{flash.error}</div>
            )}
            <main>{children}</main>
        </div>
    );
}
