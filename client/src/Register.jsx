import { useState } from "react";


function Register({ onLogin }) {

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");


    // =========================================
    // REGISTER USER
    // =========================================

    const handleRegister = async (event) => {

        event.preventDefault();


        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        name: name,

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

                alert(
                    "Registration successful! Please login."
                );


                // Clear form

                setName("");

                setEmail("");

                setPassword("");


                // Go to Login page

                onLogin();


            } else {

                alert(
                    data.message ||
                    "Registration failed."
                );

            }


        } catch (error) {

            console.log(
                "Registration error:",
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

                    ✨

                </div>


                {/* =================================
                    HEADING
                ================================== */}

                <h2>

                    Create Your Account

                </h2>


                <p className="auth-subtitle">

                    Join MyBlog and start
                    sharing your stories.

                </p>


                {/* =================================
                    REGISTER FORM
                ================================== */}

                <form
                    onSubmit={handleRegister}
                >


                    {/* NAME */}

                    <div className="form-group">

                        <label>
                            Full Name
                        </label>


                        <input
                            type="text"
                            value={name}

                            onChange={(event) =>
                                setName(
                                    event.target.value
                                )
                            }

                            placeholder="Enter your name"

                            required
                        />

                    </div>


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

                            placeholder="Create a password"

                            required
                        />

                    </div>


                    {/* REGISTER BUTTON */}

                    <button
                        type="submit"
                        className="auth-submit"
                    >

                        Create Account →

                    </button>

                </form>


                {/* =================================
                    LOGIN LINK
                ================================== */}

                <p className="auth-switch">

                    Already have an account?


                    <button
                        type="button"
                        className="auth-link"
                        onClick={onLogin}
                    >

                        Login and continue writing.

                    </button>

                </p>


            </div>

        </div>

    );

}


export default Register;