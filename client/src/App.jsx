import { useState } from "react";

import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import CreatePost from "./CreatePost";


function App() {

    // =========================================
    // CURRENT PAGE
    // =========================================

    const [page, setPage] = useState("home");


    // =========================================
    // GET SAVED USER
    // =========================================

    const getSavedUser = () => {

        const savedUser =
            localStorage.getItem("user");


        if (!savedUser) {

            return null;

        }


        try {

            return JSON.parse(savedUser);

        } catch (error) {

            console.log(
                "Unable to read saved user:",
                error
            );

            return null;

        }

    };


    const [user, setUser] =
        useState(getSavedUser());


    // =========================================
    // GO TO HOME
    // =========================================

    const handleHome = () => {

        setPage("home");

    };


    // =========================================
    // GO TO LOGIN
    // =========================================

    const handleLogin = () => {

        setPage("login");

    };


    // =========================================
    // GO TO REGISTER
    // =========================================

    const handleRegister = () => {

        setPage("register");

    };


    // =========================================
    // LOGIN SUCCESS
    // =========================================

    const handleLoginSuccess = () => {

        const savedUser =
            localStorage.getItem("user");


        if (savedUser) {

            try {

                setUser(
                    JSON.parse(savedUser)
                );

            } catch (error) {

                console.log(
                    "Unable to read logged-in user:",
                    error
                );

            }

        }


        setPage("home");

    };


    // =========================================
    // LOGOUT
    // =========================================

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setUser(null);

        setPage("home");

    };


    return (

        <div className="app">


            {/* =================================
                NAVIGATION
            ================================== */}

            <nav className="navbar">


                {/* LOGO */}

                <button
                    className="logo"
                    onClick={handleHome}
                >

                    ✦ MyBlog

                </button>


                {/* NAVIGATION LINKS */}

                <div className="nav-links">


                    {/* HOME */}

                    <button
                        className="nav-button"
                        onClick={handleHome}
                    >

                        Home

                    </button>


                    {/* WHEN USER IS NOT LOGGED IN */}

                    {!user && (

                        <>

                            <button
                                className="nav-button"
                                onClick={handleRegister}
                            >

                                Register

                            </button>


                            <button
                                className="nav-button"
                                onClick={handleLogin}
                            >

                                Login

                            </button>

                        </>

                    )}


                    {/* WHEN USER IS LOGGED IN */}

                    {user && (

                        <button
                            className="nav-button create-nav-button"
                            onClick={() =>
                                setPage("create")
                            }
                        >

                            + Create Post

                        </button>

                    )}

                </div>


                {/* =================================
                    USER AREA
                ================================== */}

                {user && (

                    <div className="user-area">


                        <span className="user-name">

                            Welcome, {user.name}

                        </span>


                        <button
                            className="logout-button"
                            onClick={handleLogout}
                        >

                            Logout

                        </button>


                    </div>

                )}

            </nav>


            {/* =================================
                HERO
            ================================== */}

            {page === "home" && (

                <section className="hero">


                    <div className="hero-content">


                        <div className="hero-small">

                            A place for ideas & stories

                        </div>


                        <h1>

                            Write something
                            <br />
                            worth remembering.

                        </h1>


                        <p>

                            Share your thoughts,
                            experiences and ideas
                            with the world. Discover
                            stories written by people
                            like you.

                        </p>


                        {user && (

                            <button
                                className="hero-button"
                                onClick={() =>
                                    setPage("create")
                                }
                            >

                                ✍️ Write a Post

                            </button>

                        )}


                        {!user && (

                            <button
                                className="hero-button"
                                onClick={handleRegister}
                            >

                                ✨ Start Writing

                            </button>

                        )}

                    </div>

                </section>

            )}


            {/* =================================
                PAGE CONTENT
            ================================== */}

            <main className="content">


                {/* HOME */}

                {page === "home" && (

                    <Home />

                )}


                {/* REGISTER */}

                {page === "register" && (

                    <Register
                        onLogin={handleLogin}
                    />

                )}


                {/* LOGIN */}

                {page === "login" && (

                    <Login
                        onLoginSuccess={
                            handleLoginSuccess
                        }

                        onRegister={
                            handleRegister
                        }

                    />

                )}


                {/* CREATE POST */}

                {page === "create" && (

                    <CreatePost />

                )}

            </main>


            {/* =================================
                FOOTER
            ================================== */}

            <footer className="footer">

                <p>

                    ✦ MyBlog — Share your story,
                    inspire someone.

                </p>

            </footer>

        </div>

    );

}


export default App;