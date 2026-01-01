import { FormEvent } from "react";
import { useForm, Link } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post("/auth/register");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md">
                {/* タイトル枠（左寄せ） */}
                <div className="bg-gray-200 text-gray-700 font-semibold p-3 rounded-t-lg text-left">
                    Register
                </div>

                {/* カード本体 */}
                <div className="bg-white shadow-lg rounded-b-lg p-6 flex flex-col gap-4">
                    <form onSubmit={submit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">
                                {errors.name}
                            </p>
                        )}

                        <input
                            type="email"
                            placeholder="Email"
                            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email}
                            </p>
                        )}

                        <input
                            type="password"
                            placeholder="Password"
                            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">
                                {errors.password}
                            </p>
                        )}

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                        />
                        {errors.password_confirmation && (
                            <p className="text-red-500 text-sm">
                                {errors.password_confirmation}
                            </p>
                        )}

                        <div className="flex justify-start">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-500 text-white rounded-lg px-3 py-2 font-semibold hover:bg-blue-600 transition"
                            >
                                Register
                            </button>
                        </div>
                    </form>

                    <p className="mt-4 text-center text-sm text-gray-600">
                        すでにアカウントをお持ちの方は{" "}
                        <Link
                            href="/auth/login"
                            className="text-blue-500 hover:underline"
                        >
                            認証
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
