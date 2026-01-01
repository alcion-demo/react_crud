// resources/js/utils/todo.ts

// Todo の状態 Enum
export enum TodoStatus {
    Pending = 1,
    InProgress = 2,
    Completed = 3,
}

export enum TodoPriority {
    Critical = 1,
    Major = 2,
    Minor = 3,
    other = 4,
}

// 状態に応じた Tailwind クラス
export function getStatusClass(status: TodoStatus): string {
    switch (status) {
        case TodoStatus.Pending:
            return "bg-red-500 text-white";
        case TodoStatus.InProgress:
            return "bg-blue-500 text-white";
        case TodoStatus.Completed:
            return "bg-gray-400 text-white";
        default:
            return "bg-black text-white";
    }
}

// 状態ラベル
export function getStatusLabel(status: TodoStatus): string {
    switch (status) {
        case TodoStatus.Pending:
            return "未着手";
        case TodoStatus.InProgress:
            return "処理中";
        case TodoStatus.Completed:
            return "完了";
        default:
            return "不明";
    }
}

// 優先度ラベル
export function getPriorityLabel(priority: number): string {
    switch (priority) {
        case 1:
            return "Critical";
        case 2:
            return "Majar";
        case 3:
            return "Miner";
        case 4:
            return "other";
        default:
            return "不明";
    }
}
