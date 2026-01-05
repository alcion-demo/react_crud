import { FormEvent } from "react";
import { useForm, usePage, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

type Option = {
    value: number;
    label: string;
};

type PageProps = {
    statuses: Option[];
    priorities: Option[];
    defaults: {
        status: number;
        priority: number;
    };
};

export default function Create({ statuses, priorities, defaults }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        detail: "",
        deadline: "",
        status: String(defaults.status ?? ""), // ← 初期値は文字列で state にセット
        priority: String(defaults.priority ?? ""),
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post("/todos");
    };

    return (
        <AppLayout>
            {/* ヘッダー帯 */}
            <div className="border-b bg-gray-50 px-8 py-4 flex justify-between items-center">
                <h1 className="text-lg font-semibold">Todo 作成</h1>
            </div>

            {/* フォーム */}
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
                        {errors.deadline && (
                            <div className="text-red-500 text-sm">
                                {errors.deadline}
                            </div>
                        )}
                    </div>

                    {/* ステータス */}

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            ステータス
                        </label>
                        <select
                            className="border rounded px-3 py-2"
                            value={data.status} // ← ここで state を value に指定
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
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            登録
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
