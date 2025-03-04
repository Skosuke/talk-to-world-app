import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useForm } from "@inertiajs/react";

const Login = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const handleLogin = (e) => {
        e.preventDefault();
        post(route("post.login"));
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <div
                className="card p-4"
                style={{ maxWidth: "400px", width: "100%" }}
            >
                <h2 className="mb-4 text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            id="email"
                            className="form-control"
                            type="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        {errors.email && (
                            <div className="text-danger">{errors.email}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            id="password"
                            className="form-control"
                            type="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        {errors.password && (
                            <div className="text-danger">{errors.password}</div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={processing}
                    >
                        ログイン
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
