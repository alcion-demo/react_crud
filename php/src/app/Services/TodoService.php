<?php

namespace App\Services;
use App\Models\Todo;

class TodoService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * 表示データ加工用
     * HTML 側で selected 属性が付いてても React 側の state がそれを反映しない
     * HTML 側に <option selected> があっても React の state が持っている値が優先される
     * React では state をちゃんと初期化しないと空のまま送信される
     * label をサーバーで添えて渡す必要がある
     * @param Todo $todo
     * @return array
     */
    public function formatForIndex(Todo $todo): array
    {
        return [
            'id' => $todo->id,
            'title' => $todo->title,
            'detail' => $todo->detail,
            'deadline' => $todo->deadline->format('Y-m-d'),
            'status' => $todo->status->value,
            'status_label' => $todo->status->label(),
            'priority' => $todo->priority->value,
            'priority_label' => $todo->priority->label(),
        ];
    }

    /**
     * 成形済み配列に変換
     * @return array
     */
    public function getAllForIndex(): array
    {
        return Todo::all()->map(fn($todo) => $this->formatForIndex($todo))->toArray();
    }

}
