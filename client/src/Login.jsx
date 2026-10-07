import { useState } from "react";


function Login({
    onLoginSuccess,
    onRegister
}) {

    const [email, setEmail] = useState("");

    const [password, setPassword] =
        useState("");


    // =========================================
    // LOGIN
    // =========================================

    const handleLogin = async (event) => {

        event.preventDefault();


        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        email: email,

                        password: password

                    })

                }
            );


            const data =
                await response.json();


            // =================================
            // SUCCESS
            // =================================

            if (response.ok) {


                // Save JWT

                localStorage.setItem(
                    "token",
                    data.token
                );


                // Save user

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );


                alert(
                    "Login successful!"
                );


                console.log(
                    "Logged-in user:",
                    data.user
                );


                // Tell App.jsx

                onLoginSuccess();


            } else {


                // Login failed

                alert(
                    data.message ||
                    "Login failed."
                );

            }


        } catch (error) {

            console.log(
                "Login error:",
                error
            );


            alert(
                "Unable to connect to server."
            );

        }

    };


    return (

        <div className="auth-page">


            <div className="auth-card">


                {/* =================================
                    ICON
                ================================== */}

                <div className="auth-icon">

                    🔐

                </div>


                {/* =================================
                    HEADING
                ================================== */}

                <h2>

                    Welcome Back

                </h2>


                <p className="auth-subtitle">

                    Login to continue sharing
                    your stories.

                </p>


                {/* =================================
                    LOGIN FORM
                ================================== */}

                <form
                    onSubmit={handleLogin}
                >


                    {/* EMAIL */}

                    <div className="form-group">

                        <label>
                            Email Address
                        </label>


                        <input
                            type="email"
                            value={email}

                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }

                            placeholder="you@example.com"

                            required
                        />

                    </div>


                    {/* PASSWORD */}

                    <div className="form-group">

                        <label>
                            Password
                        </label>


                        <input
                            type="password"
                            value={password}

                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }

                            placeholder="Enter your password"

                            required
                        />

                    </div>


                    {/* LOGIN BUTTON */}

                    <button
                        type="submit"
                        className="auth-submit"
                    >

                        Login →

                    </button>

                </form>


                {/* =================================
                    REGISTER LINK
                ================================== */}

                <p className="auth-switch">

                    Don't have an account?


                    <button
                        type="button"
                        className="auth-link"
                        onClick={onRegister}
                    >

                        Register to get started.

                    </button>

                </p>


            </div>

        </div>

    );

}


export default Login;