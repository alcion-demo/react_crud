import { router, usePage, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import type { PageProps } from "@/types/page";

export default function Dashboard() {
    const { auth } = usePage<PageProps>().props;

    const logout = () => {
        router.post("/auth/logout");
    };

    return (
        <AppLayout>
            <div className="p-8 max-w-md">
                <h1 className="text-xl font-bold mb-6">Dashboard</h1>

                {auth.user && (
                    <p className="mb-4 text-gray-600">
                        {auth.user.name}（{auth.user.email}）
                    </p>
                )}

                {/* リンクリスト */}
                <ul className="space-y-3 mb-6">
                    <li>
                        <Link
                            href="/todos"
                            className="block rounded border px-4 py-3 hover:bg-gray-50"
                        >
                            Todo一覧
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/todos/create"
                            className="block rounded border px-4 py-3 hover:bg-gray-50"
                        >
                            仮項目
                        </Link>
                    </li>
                </ul>

                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>
        </AppLayout>
    );
}
