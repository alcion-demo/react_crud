<?php

namespace App\Enums;

enum TodoStatus: int
{
    /** @var TodoStatus|Pending (未着手)*/
    case Pending = 1;
    /** @var TodoStatus|InProgress (着手中)*/
    case InProgress = 2;
    /** @var TodoStatus|Completed (完了)*/
    case Completed = 3;

    /**
     * label作成
     */
    public function label(): string
    {
        return match $this) {
            self::Pending => '未着手',
            self::InProgress => '処理中',
            self::Completed => '完了',
        };
    }

    /**
     * デフォルト値
     */
    public static function default(): self
    {
        return self::Pending;
    }

    /**
     * Inertia 用の配列を返す
     * @return array
     */
    public static function options(): array
    {
        return array_map(fn($case) => [
            'value' => $case->value,
            'label' => $case->label(),
        ], self::cases());
    }
}
