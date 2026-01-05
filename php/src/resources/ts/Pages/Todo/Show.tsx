import { usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

type Todo = {
    id: number;
    title: string;
    detail: string;
    deadline: string;
    status: number;
    status_label: string;
    priority_label: string;
};

type PageProps = {
    todo: Todo;
};

export default function Show() {
    const { todo } = usePage<PageProps>().props;

    return (
        <AppLayout>
            <div className="p-8 max-w-3xl">
                <div className="bg-white shadow rounded-lg">
                    {/* ヘッダー */}
                    <div className="border-b px-6 py-4">
                        <h1 className="text-lg font-semibold">Todo 詳細</h1>
                    </div>

                    {/* 内容 */}
                    <div className="px-6 py-6 space-y-5">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-gray-500">タイトル</div>
                            <div className="col-span-2 font-medium">
                                {todo.title}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-gray-500">詳細</div>
                            <div className="col-span-2">{todo.detail}</div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-gray-500">期限</div>
                            <div className="col-span-2">{todo.deadline}</div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 items-center">
                            <div className="text-gray-500">ステータス</div>
                            <div className="col-span-2">
                                <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                                    {todo.status_label}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-gray-500">優先度</div>
                            <div className="col-span-2">
                                {todo.priority_label}
                            </div>
                        </div>
                    </div>

                    {/* フッター */}
                    <div className="border-t px-6 py-4 flex justify-end">
                        <button
                            onClick={() => history.back()} 
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            戻る
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
