<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTodoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|max:20',
            'detail' => 'required|max:300',
            'status' => 'required|integer',
            'priority' => 'required|integer',
            'deadline' => 'required|date',
        ];
    }

    /**
     * リクエストのnameなどの値を再定義するメソッド
     *
     * @return array
     */
    public function attributes()
    {
        return [
            'title' => 'タイトル',
            'detail' => '内容',
            'deadline' => '期限日',
            'tag_name' => 'タグ',
        ];
    }

    /**
     * ルールに違反した場合にエラーメッセージを出力する
     *
     * @return array
     */
    public function messages()
    {
        return [
        ];
    }
}
