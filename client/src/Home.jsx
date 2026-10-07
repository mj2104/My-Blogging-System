import { useEffect, useState } from "react";
import EditPost from "./EditPost";


function Home() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingPostId, setEditingPostId] = useState(null);

    // Get logged-in user
    const user = JSON.parse(
        localStorage.getItem("user")
    );


    // =========================================
    // FETCH POSTS
    // =========================================

    const fetchPosts = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/posts"
            );

            const data = await response.json();


            if (response.ok) {

                setPosts(data);

            } else {

                console.log(data.message);

            }

        } catch (error) {

            console.log(
                "Error fetching posts:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================================
    // DELETE POST
    // =========================================

    const handleDelete = async (postId) => {

        const token =
            localStorage.getItem("token");


        if (!token) {

            alert("Please login first.");

            return;

        }


        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this post?"
            );


        if (!confirmDelete) {

            return;

        }


        try {

            const response = await fetch(
                `http://localhost:5000/api/posts/${postId}`,
                {
                    method: "DELETE",

                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


            const data =
                await response.json();


            if (response.ok) {

                alert(
                    "Post deleted successfully!"
                );

                fetchPosts();

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.log(
                "Delete error:",
                error
            );

            alert(
                "Unable to connect to server."
            );

        }

    };


    // =========================================
    // LOAD POSTS
    // =========================================

    useEffect(() => {

        fetchPosts();

    }, []);


    // =========================================
    // LOADING
    // =========================================

    if (loading) {

        return (
            <div className="empty-state">

                <h3>Loading stories...</h3>

                <p>
                    Please wait while we fetch
                    the latest posts.
                </p>

            </div>
        );

    }


    return (

        <div>


            {/* =================================
                SECTION HEADING
            ================================== */}

            <div className="section-heading">

                <h2>
                    Latest Stories
                </h2>

                <p>
                    Discover thoughts, ideas and
                    experiences from our community.
                </p>

            </div>


            {/* =================================
                NO POSTS
            ================================== */}

            {posts.length === 0 ? (

                <div className="empty-state">

                    <h3>
                        ✨ No stories yet
                    </h3>

                    <p>
                        Be the first person to
                        share something with the
                        community!
                    </p>

                </div>

            ) : (


                /* =================================
                   POSTS GRID
                ================================== */

                <div className="posts-grid">


                    {posts.map((post) => {


                        // Check post ownership

                        const isOwner =
                            user &&
                            post.author &&
                            post.author._id === user.id;


                        return (

                            <article
                                className="blog-card"
                                key={post._id}
                            >


                                {/* =====================
                                    EDIT MODE
                                ====================== */}

                                {editingPostId ===
                                post._id ? (

                                    <EditPost
                                        postId={post._id}

                                        onUpdated={() => {

                                            setEditingPostId(
                                                null
                                            );

                                            fetchPosts();

                                        }}
                                    />

                                ) : (

                                    <>


                                        {/* =====================
                                            CATEGORY
                                        ====================== */}

                                        <span className="blog-category">

                                            ✦ BLOG

                                        </span>


                                        {/* =====================
                                            TITLE
                                        ====================== */}

                                        <h3>
                                            {post.title}
                                        </h3>


                                        {/* =====================
                                            CONTENT
                                        ====================== */}

                                        <p className="blog-content">

                                            {post.content}

                                        </p>


                                        {/* =====================
                                            AUTHOR
                                        ====================== */}

                                        {post.author && (

                                            <p className="blog-author">

                                                ✍️ By{" "}
                                                {
                                                    post
                                                        .author
                                                        .name
                                                }

                                            </p>

                                        )}


                                        {/* =====================
                                            ACTION BUTTONS
                                        ====================== */}

                                        {isOwner && (

                                            <div className="card-actions">


                                                <button
                                                    className="edit-button"

                                                    onClick={() =>
                                                        setEditingPostId(
                                                            post._id
                                                        )
                                                    }
                                                >

                                                    ✏️ Edit

                                                </button>


                                                <button
                                                    className="delete-button"

                                                    onClick={() =>
                                                        handleDelete(
                                                            post._id
                                                        )
                                                    }
                                                >

                                                    🗑️ Delete

                                                </button>


                                            </div>

                                        )}

                                    </>

                                )}

                            </article>

                        );

                    })}

                </div>

            )}

        </div>

    );

}


export default Home;