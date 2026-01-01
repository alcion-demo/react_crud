<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Todo;
use Illuminate\Http\Request;
use App\Enums\TodoPriority;
use App\Enums\TodoStatus;

class Todo extends Model
{
    /**
     * 配列を使ってモデルを生成・更新
     *
     * @var array
     */
    protected $fillable = ['id', 'user_id', 'title', 'detail', 'status', 'deadline', 'priority'];

    /**
     * 優先度、状態を日本語化
     */
    protected $casts = [
        'status' => TodoStatus::class,
        'priority' => TodoPriority::class,
        'deadline' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
    /**
     * ログインユーザーのidを取得する
     *
     * @return \Illuminate\Database\Eloquent\Model ログインユーザーのid
     */
    public function findUserId()
    {
        return $this->where('user_id', auth()->user()->id)->get();
    }

    /**
     * Todo作成
     * @param $request
     * @return array
     */
    public function storeTodoList($request){
        $todo = $this->create([
        'title' => $request->title,
        'detail' => $request->detail,
        'status' => $request['status'],
        'priority' => $request['priority'],
        'deadline' => $request['deadline'],
        'user_id' => auth()->id(),
    ]);

        return $todo;
    }

    public function findEditId(string $id)
    {
        $loginId = $this->find($id);
        return $loginId;
    }

    /**
     * Todo更新
     * @param $request
     * @return array
     */
    public function updateTodoList($request){
        $this->update([
            'title' => $request['title'],
            'detail' => $request['detail'],
            'status' => $request['status'],
            'priority' => $request['priority'],
            'deadline' => $request['deadline'],
            'user_id' => auth()->id(),
        ]);
    }
}
