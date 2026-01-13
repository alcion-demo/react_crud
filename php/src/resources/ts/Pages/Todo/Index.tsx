import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import {
    TodoStatus,
    TodoPriority,
    getStatusClass,
    getStatusLabel,
} from "@/utils/todo";
import { router } from "@inertiajs/react";

type Todo = {
    id: number;
    title: string;
    detail: string;
    status: TodoStatus;
    status_label: string;
    priority: TodoPriority;
    priority_label: string;
    deadline: string; // JSON では Date は string になる
};

type PageProps = {
    todos: Todo[];
};

const handleDelete = (id: number) => {
    if (!confirm("本当に削除しますか？")) return;

    router.delete(`/todos/${id}`);
};

export default function Index() {
    const { todos } = usePage<PageProps>().props;
    return (
        <AppLayout>
            <div className="max-w-5xl px-8 mt-6">
                <div className="mb-2">
                    <Link
                        href="/dashboard"
                        className="text-sm text-gray-600 hover:underline"
                    >
                        ← Dashboardに戻る
                    </Link>
                </div>
                {/* タイトル + ボタン */}
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-xl font-bold">Todo一覧</h1>
                    <Link
                        href="/todos/create"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        登録
                    </Link>
                </div>

                {/* テーブル */}
                <div className="bg-white shadow rounded-lg">
                    {/* ヘッダー */}
                    <div className="grid grid-cols-6 gap-4 bg-gray-200 p-2 font-bold">
                        <div>タイトル</div>
                        <div>詳細</div>
                        <div>期限</div>
                        <div>ステータス</div>
                        <div>優先度</div>
                        <div className="text-center">操作</div>
                    </div>

                    {/* 行 */}
                    {todos.map((todo) => (
                        <div
                            key={todo.id}
                            className="grid grid-cols-6 gap-4 p-2 border-b"
                        >
                            <div>{todo.title}</div>
                            <div>{todo.detail}</div>
                            <div>
                                {new Date(todo.deadline).toLocaleDateString()}
                            </div>
                            <div>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(todo.status)}`}
>                                    {getStatusLabel(todo.status)}
                                </span>
                            </div>
                            <div>{todo.priority_label}</div>
                            <div className="flex items-center gap-2 whitespace-nowrap">
                                <Link
                                    href={`/todos/${todo.id}`} // ← 個別 Todo の edit へ
                                    className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                                >
                                    詳細
                                </Link>

                                <Link
                                    href={`/todos/${todo.id}/edit`} // ← 個別 Todo の edit へ
                                    className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                                >
                                    編集
                                </Link>

                                <button
                                    onClick={() => handleDelete(todo.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                                >
                                    削除
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
