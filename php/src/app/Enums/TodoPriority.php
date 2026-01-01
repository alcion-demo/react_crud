<?php

namespace App\Enums;

enum TodoPriority: int
{
    case Critical = 1;
    /** @var TodoPriority|A (高)*/
    case Major = 2;
    /** @var TodoPriority|B (中)*/
    case Minor = 3;
    /** @var TodoPminerriority|C (低)*/
    case other = 4;

    public function label(): string
    {
        return match ($this) {
            self::Critical => 'Critical',
            self::Major => 'Major',
            self::Minor => 'Minor',
            self::other => 'other',
        };
    }

    /**
     * デフォルト値
    */
    public static function default(): self
    {
        return self::other;
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