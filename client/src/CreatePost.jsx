import { useState } from "react";


function CreatePost() {

    const [title, setTitle] = useState("");

    const [content, setContent] = useState("");

    const [isPublishing, setIsPublishing] =
        useState(false);


    // =========================================
    // PUBLISH POST
    // =========================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        if (!title.trim() || !content.trim()) {

            alert(
                "Please enter both a title and content."
            );

            return;

        }


        const token =
            localStorage.getItem("token");


        if (!token) {

            alert(
                "Please login before creating a post."
            );

            return;

        }


        setIsPublishing(true);


        try {

            const response = await fetch(
                "http://localhost:5000/api/posts",
                {
                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`

                    },

                    body: JSON.stringify({

                        title: title.trim(),

                        content: content.trim()

                    })

                }
            );


            const data =
                await response.json();


            if (response.ok) {

                alert(
                    "🎉 Your post has been published!"
                );


                // Clear the form

                setTitle("");

                setContent("");


            } else {

                alert(
                    data.message ||
                    "Unable to publish post."
                );

            }


        } catch (error) {

            console.log(
                "Create post error:",
                error
            );


            alert(
                "Unable to connect to the server."
            );

        } finally {

            setIsPublishing(false);

        }

    };


    return (

        <div className="create-page">


            {/* =================================
                PAGE HEADER
            ================================== */}

            <div className="create-header">

                <div>

                    <span className="create-label">

                        ✦ WRITE YOUR STORY

                    </span>


                    <h2>

                        Create a New Blog Post

                    </h2>


                    <p>

                        Turn your ideas into something
                        worth sharing with the world.

                    </p>

                </div>

            </div>


            {/* =================================
                EDITOR CARD
            ================================== */}

            <div className="create-card">


                <form
                    onSubmit={handleSubmit}
                >


                    {/* =================================
                        TITLE
                    ================================== */}

                    <div className="editor-section">

                        <label
                            htmlFor="title"
                            className="editor-label"
                        >

                            Post Title

                        </label>


                        <input
                            id="title"

                            type="text"

                            value={title}

                            onChange={(event) =>
                                setTitle(
                                    event.target.value
                                )
                            }

                            placeholder="Give your story a beautiful title..."

                            maxLength="120"

                            required

                            className="title-input"
                        />


                        <div className="input-info">

                            <span>

                                Make it clear and
                                interesting.

                            </span>


                            <span>

                                {title.length}/120

                            </span>

                        </div>

                    </div>


                    {/* =================================
                        CONTENT
                    ================================== */}

                    <div className="editor-section">

                        <label
                            htmlFor="content"
                            className="editor-label"
                        >

                            Your Story

                        </label>


                        <textarea
                            id="content"

                            value={content}

                            onChange={(event) =>
                                setContent(
                                    event.target.value
                                )
                            }

                            placeholder="Start writing your story here...

Share your thoughts, experiences, ideas or anything you want the world to read."

                            rows="14"

                            required

                            className="content-input"
                        />


                        <div className="input-info">

                            <span>

                                ✍️ Write freely.
                                Your story matters.

                            </span>


                            <span>

                                {content.length} characters

                            </span>

                        </div>

                    </div>


                    {/* =================================
                        WRITING TIP
                    ================================== */}

                    <div className="writing-tip">

                        <div className="tip-icon">

                            💡

                        </div>


                        <div>

                            <strong>

                                Writing tip

                            </strong>


                            <p>

                                A good title grabs
                                attention, while a
                                personal story keeps
                                readers interested.

                            </p>

                        </div>

                    </div>


                    {/* =================================
                        ACTIONS
                    ================================== */}

                    <div className="create-actions">


                        <button
                            type="button"
                            className="cancel-button"

                            onClick={() => {

                                setTitle("");

                                setContent("");

                            }}
                        >

                            Clear

                        </button>


                        <button
                            type="submit"

                            className="publish-button"

                            disabled={isPublishing}
                        >

                            {isPublishing
                                ? "Publishing..."
                                : "🚀 Publish Post"
                            }

                        </button>


                    </div>


                </form>

            </div>


            {/* =================================
                BOTTOM MESSAGE
            ================================== */}

            <div className="create-footer">

                <span>
                    ✦
                </span>

                <p>

                    Your words could inspire
                    someone's next idea.

                </p>

            </div>


        </div>

    );

}


export default CreatePost;