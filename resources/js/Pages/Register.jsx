import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

const Register = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("post.register"));
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div
                className="card p-4"
                style={{ maxWidth: "500px", width: "100%" }}
            >
                <h2 className="mb-4 text-center">ユーザー登録</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            名前
                        </label>
                        <input
                            id="name"
                            type="text"
                            className="form-control"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        {errors.name && (
                            <div className="text-danger mt-1">
                                {errors.name}
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="form-control"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        {errors.email && (
                            <div className="text-danger mt-1">
                                {errors.email}
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            パスワード
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        {errors.password && (
                            <div className="text-danger mt-1">
                                {errors.password}
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="password_confirmation"
                            className="form-label"
                        >
                            パスワード確認
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            className="form-control"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                        />
                        {errors.password_confirmation && (
                            <div className="text-danger mt-1">
                                {errors.password_confirmation}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={processing}
                    >
                        {processing ? "登録中…" : "登録する"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
