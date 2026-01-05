<?php

namespace App\Services;

use App\Models\Todo;
use Carbon\Carbon;
use App\Enums\Weekday;

class CreateCalendarService
{
    /**
     * __construct
     */
    public function __construct(protected Todo $todo)
    {
    }

    /**
     * 月カレンダー表示用(日付だけ)データを作る
     * @param int $year $month
     * @param int $startWeek
     * @return array
     */
    private function buildCalendarFrame(int $year, int $month, int $startWeek = Weekday::SUN->value): array
    {
        $firstDay = Carbon::create($year, $month, 1);
        $daysInMonth = $firstDay->daysInMonth;
        $firstWeekday = $firstDay->dayOfWeek; // 0=日曜 … 6=土曜

        // offset 計算（Enum 定数使用）
        if ($startWeek === Weekday::SUN->value) {
            $offset = $firstWeekday;
        } else {
            // 月曜始まり：日曜は末尾に回す
            $offset = $firstWeekday === Weekday::SUN->value
                ? Weekday::ISO_OFFSET
                : $firstWeekday - 1;
        }

        // 先頭 null 埋め
        $daysArray = [];

        // 先頭の空白
        for ($i = 0; $i < $offset; $i++) {
            $daysArray[] = [
                'day'  => null,
                'date' => null,
            ];
        }

        // 月内日付
        for ($day = 1; $day <= $daysInMonth; $day++) {
            $date = Carbon::create($year, $month, $day);

            $daysArray[] = [
                'day'  => $day,
                'date' => $date->format('Y-m-d'),
            ];
        }


        // 7日ごとに分割
        $weeks = array_chunk($daysArray, Weekday::WEEKDAYS);

        // 最後の週を 7 日に揃える
        $lastWeek = &$weeks[count($weeks) - 1];
        $lastWeekCount = count($lastWeek);
        if ($lastWeekCount < Weekday::WEEKDAYS) {
            for ($i = 0; $i < Weekday::WEEKDAYS - $lastWeekCount; $i++) {
                $lastWeek[] = [
                    'day' => null,
                    'date' => null,
                ];
            }
        }

        return $weeks;
    }

    /**
     * 曜日見出し作成
     * @param App\Enums\Weekday
     * @return array
     */
    private function getWeekdayHeaders(int $startWeek = Weekday::SUN->value): array
    {
        return $startWeek === Weekday::SUN->value
            ? Weekday::DAY_WEEK_LIST
            : array_values(Weekday::DAY_WEEK_ISO_LIST);
    }

    /**
     * 指定年月のカレンダー配列（週×日）を生成する
     * @param Carbon $year $month
     * @return $todo
     */
    private function getMonthlyTodos(int $year, int $month)
    {
        // カレンダー表示用に deadline を日付単位（Y-m-d）でまとめる
        return $this->todo
            ->monthly($year, $month)
            ->get()
            ->groupBy(fn ($todo) => $todo->deadline->format('Y-m-d'));
    }

    /**
     * 日付フレーム + Todo を振り分けて返す
     * @param Carbon $year $month
     * @param App\Enums\Weekday
     * @return array
     */
    public function buildMonthlyCalendar(int $year, int $month, int $startWeek = Weekday::SUN->value): array
    {
        $weeks = $this->buildCalendarFrame($year, $month, $startWeek);
        $weekdays = $this->getWeekdayHeaders($startWeek);
        $monthlyTodos = $this->getMonthlyTodos($year, $month);

        // 各日付に Todo をセット
        $calendarWeeks = [];
        foreach ($weeks as $week) {
            $calendarWeeks[] = array_map(function ($day) use ($monthlyTodos) {
                // 空白セル
                if ($day['day'] === null) {
                    return [
                        'day'   => null,
                        'date'  => null,
                        'todos' => [],
                    ];
                }

                return [
                    'day'   => $day['day'],
                    'date'  => $day['date'],
                    'todos' => $monthlyTodos[$day['date']] ?? [],
                ];
            }, $week);
        }

        return [
            'weeks' => $calendarWeeks,
            'weekdays' => $weekdays,
        ];
    }

}