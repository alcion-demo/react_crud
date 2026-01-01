import { FormEvent } from "react";
import { useForm } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Link } from "@inertiajs/react";

type Option = {
    value: number;
    label: string;
};

type PageProps = {
    todo: {
        id: number;
        title: string;
        detail: string;
        deadline: string;
        status: number;
        priority: number;
    };
    statuses: Option[];
    priorities: Option[];
};

export default function Edit({ todo, statuses, priorities }: PageProps) {
    const { data, setData, put, processing, errors } = useForm({
        title: todo.title,
        detail: todo.detail,
        deadline: todo.deadline,
        status: String(todo.status),
        priority: String(todo.priority),
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(`/todos/${todo.id}`);
    };

    return (
        <AppLayout>
            <div className="border-b bg-gray-50 px-8 py-4 flex justify-between items-center">
                <h1 className="text-lg font-semibold">Todo 編集</h1>
            </div>

            <div className="px-8 py-6 max-w-3xl">
                <form onSubmit={submit} className="space-y-5">
                    {/* タイトル */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            タイトル
                        </label>
                        <input
                            className="border rounded px-3 py-2 w-full"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* 詳細 */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            詳細
                        </label>
                        <textarea
                            className="border rounded px-3 py-2 w-full"
                            rows={4}
                            value={data.detail}
                            onChange={(e) => setData("detail", e.target.value)}
                        />
                        {errors.detail && (
                            <p className="text-red-500 text-sm">
                                {errors.detail}
                            </p>
                        )}
                    </div>

                    {/* 期限 */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            期限日
                        </label>
                        <input
                            type="date"
                            className="border rounded px-3 py-2 w-full"
                            value={data.deadline}
                            onChange={(e) =>
                                setData("deadline", e.target.value)
                            }
                        />
                    </div>

                    {/* ステータス */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            ステータス
                        </label>
                        <select
                            className="border rounded px-3 py-2"
                            value={data.status}
                            onChange={(e) => setData("status", e.target.value)}
                        >
                            {statuses.map((s) => (
                                <option
                                    key={s.value}
                                    value={s.value.toString()}
                                >
                                    {s.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 優先度 */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            優先度
                        </label>
                        <select
                            className="border rounded px-3 py-2"
                            value={data.priority}
                            onChange={(e) =>
                                setData("priority", e.target.value)
                            }
                        >
                            {priorities.map((p) => (
                                <option
                                    key={p.value}
                                    value={p.value.toString()}
                                >
                                    {p.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            更新
                        </button>

                        <Link
                            href="/todos"
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                        >
                            戻る
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
