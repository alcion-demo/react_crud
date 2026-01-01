<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;
use Inertia\Inertia;
use App\Enums\TodoStatus;
use App\Enums\TodoPriority;
use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Services\TodoService;

use Illuminate\Support\Facades\{
    Auth,
    Validator,
};

class TodoController extends Controller
{
    /**
     * __construct
     */
    public function __construct(protected Todo $todo, TodoService $todoService)
    {
        $this->todoService = $todoService;
    }

    /**
     * Todo一覧表示
     * @return view
     */
    public function index()
    {
        $todos = $this->todoService->getAllForIndex();

        return Inertia::render('Todo/Index', [
            'todos' => $todos,
            'statuses' => TodoStatus::options(),
            'priorities' => TodoPriority::options(),
            'defaults' => [
                'status' => TodoStatus::default()->value,
                'priority' => TodoPriority::default()->value,
            ],
        ]);
    }

    /**
     * 新規作成画面表示
     * @return view
     */
    public function create()
    {
        return Inertia::render('Todo/Create', [
            'statuses' => collect(TodoStatus::cases())->map(fn ($s) => [
                'value' => $s->value,
                'label' => $s->label(),
            ]),
            'priorities' => collect(TodoPriority::cases())->map(fn ($p) => [
                'value' => $p->value,
                'label' => $p->label(),
            ]),
            'defaults' => [
                'status' => TodoStatus::default()->value,
                'priority' => TodoPriority::default()->value,
            ],
        ]);
    }

    /**
     * Todoデータ登録
     * @param array $request
     * @return view
     */
    public function store(StoreTodoRequest $request)
    {
        $validated = $request->validated();
        $todo = $this->todo->storeTodoList($request);
        return redirect()
            ->route('todos.index')
            ->with('success', 'Todoを登録しました');
    }

    /**
     * 詳細画面を表示する
     * @returnnview
     */
    public function show(string $id)
    {
        $todo = Todo::findOrFail($id);

        return Inertia::render('Todo/Show', [
            'todo' => $this->todoService->formatForIndex($todo),
        ]);

    }

    /**
     * Todo編集表示
     * @param $id
     * @return view
     */
    public function edit(string $id)
    {
        $todo = $this->todo->find($id); // 編集対象を取得

        return Inertia::render('Todo/Edit', [
            'todo' => $this->todoService->formatForIndex($todo),
            'statuses' => TodoStatus::options(),
            'priorities' => TodoPriority::options(),
        ]);

    }

    /**
     * Todo更新
     * @param array $request
     * @param $id
     * @return view
     */
    public function update(UpdateTodoRequest $request, string $id)
    {
        $validated = $request->validated();
        $todo = $this->todo->findEditId($id);
        $todo->updateTodoList($validated);

        return redirect()
            ->route('todos.index')
            ->with('success', 'Todoを更新しました');
    }

    /**
     * Todo削除
     * @param $id
     * @return view
     */
    public function destroy(string $id)
    {
        $todo = $this->todo->findEditId($id);
        $todo->delete();
        return redirect()
            ->route('todos.index')
            ->with('success', 'Todoを削除しました');
    }
}
