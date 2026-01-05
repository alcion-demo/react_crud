import { usePage, router, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

type Todo = {
  id: number;
  title: string;
  detail: string;
  deadline: string;
};

type CalendarDay = {
  day: number | null; // 日付の数字 1〜31
  date?: string;      // YYYY-MM-DD
  todos?: Todo[];
};

type CalendarWeek = CalendarDay[];

type Calendar = {
  weeks: CalendarWeek[];
};

type PageProps = {
  calendar: Calendar;
  year: number;
  month: number;
  weekdays: string[];
  startWeek: number;
  startDayWeekNames: Record<number, string>;
};

export default function Index() {
  const {
    calendar,
    year,
    month,
    weekdays,
    startWeek,
    startDayWeekNames,
  } = usePage<PageProps>().props;

  const WEEKDAYS = weekdays;
  const todayStr = new Date().toISOString().slice(0, 10);

  // 月移動
  const prevMonth = new Date(year, month - 2, 1);
  const nextMonth = new Date(year, month, 1);

  const changeMonth = (y: number, m: number) => {
    router.get("/calendars", { year: y, month: m, startWeek });
  };

  const changeWeekStart = (sw: number) => {
    router.get("/calendars", { year, month, startWeek: sw });
  };

  return (
    <AppLayout>
      <div className="flex justify-center">
        <div className="relative w-[63rem] px-6 pt-6 pb-6 bg-white rounded-2xl shadow">
          {/* 戻るリンク */}
          <div className="mb-2">
            <Link
              href="/dashboard"
              className="text-sm text-gray-600 hover:underline"
            >
              ← Dashboardに戻る
            </Link>
          </div>

          {/* 月移動 */}
          <div className="mb-4 flex items-center justify-center gap-2">
            <button
              onClick={() =>
                changeMonth(prevMonth.getFullYear(), prevMonth.getMonth() + 1)
              }
              className="px-2 py-1 border rounded"
            >
              ◀
            </button>

            <h1 className="text-xl font-bold">
              {year}年 {month}月
            </h1>

            <button
              onClick={() =>
                changeMonth(nextMonth.getFullYear(), nextMonth.getMonth() + 1)
              }
              className="px-2 py-1 border rounded"
            >
              ▶
            </button>
          </div>

          {/* 曜日ヘッダー */}
          <div className="flex">
            {WEEKDAYS.map((weekday, weekdayIndex) => (
              <div
                key={weekdayIndex}
                className="w-36 p-2 text-center font-bold text-gray-700"
              >
                {weekday}
              </div>
            ))}
          </div>

          {/* 日付セル */}
          {calendar.weeks.map((week, weekIndex) => {
            const isFirstWeek = weekIndex === 0;
            const isLastWeek = weekIndex === calendar.weeks.length - 1;

            return (
              <div key={weekIndex} className="flex">
                {week.map((calendarDay, dayIndex) => {
                  const isFirstCol = dayIndex === 0;
                  const isLastCol = dayIndex === 6;

                  const isSunday = dayIndex === WEEKDAYS.length - 1;
                  const isSaturday = dayIndex === WEEKDAYS.length - 2;

                  return (
                    <div
                      key={dayIndex}
                      className={`w-36 min-h-[110px] p-2 border border-gray-200 text-left
                        ${calendarDay.date === todayStr ? "bg-yellow-50" : ""}
                        ${isFirstWeek && isFirstCol ? "rounded-tl-xl" : ""}
                        ${isFirstWeek && isLastCol ? "rounded-tr-xl" : ""}
                        ${isLastWeek && isFirstCol ? "rounded-bl-xl" : ""}
                        ${isLastWeek && isLastCol ? "rounded-br-xl" : ""}
                      `}
                    >
                      {calendarDay.day !== null && (
                        <>
                          <div
                            className={`text-base font-semibold
                              ${isSunday ? "text-red-500" : ""}
                              ${isSaturday ? "text-blue-500" : ""}
                            `}
                          >
                            {calendarDay.day}
                          </div>

                          {calendarDay.todos?.map((todo) => (
                            <Link
                              key={todo.id}
                              href={`/todos/${todo.id}`}
                              className="mt-1 px-2 py-0.5 text-sm rounded bg-gray-100 text-gray-700 truncate"
                            >
                              {todo.title}
                            </Link>
                          ))}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* 曜日始まり切替（カード内・右下） */}
          <div className="mt-4 flex justify-end gap-2">
            {Object.entries(startDayWeekNames).map(([key, label]) => (
              <button
                key={key}
                onClick={() => changeWeekStart(Number(key))}
                className={`px-3 py-1 border rounded ${
                  Number(key) === startWeek ? "bg-blue-500 text-white" : ""
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
