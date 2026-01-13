<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\CreateCalendarService;
use Carbon\Carbon;
use App\Enums\Weekday;
use App\Http\Requests\Todo\StoreTodo;
use App\Http\Requests\Todo\UpdateTodo;
use App\Models\Todo;
use Inertia\Inertia;

class CalendarController extends Controller
{
    /**
     * __construct
     */
    public function __construct(protected Todo $todo, protected CreateCalendarService $CreateCalendarService)
    {
    }

    /**
     * カレンダー画面表示
     * @param request $request
     * @return view
     */
    public function index(Request $request)
    {
        $year = $request->input('year', Carbon::today()->year);
        $month = $request->input('month', Carbon::today()->month);
        $startWeek = (int)$request->input('startWeek', Weekday::SUN->value);
        $calendar = $this->CreateCalendarService->buildMonthlyCalendar($year, $month, $startWeek);

        return Inertia::render('Calendar/Index', [
            'calendar' => $calendar,
            'weekdays' => $calendar['weekdays'],
            'startDayWeekNames' => [0 => '日曜', 1 => '月曜'],
            'year' => $year,
            'month' => $month,
            'startWeek' => $startWeek,
        ]);
    }

    /**
     * 指定月の Todo を日付単位で取得
     * @param int $year, $month
     * @return App\Models\Todo
     */
    private function getMonthlyTodos(int $year, int $month)
    {
        return $this->todo
            ->monthly($year, $month)
            ->get()
            ->groupBy(fn ($todo) => $todo->deadline->format('Y-m-d'));
    }
}
