import { useEffect, useState } from "react";

function EditPost({ postId, onUpdated }) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);


    // Get the existing post
    useEffect(() => {

        const fetchPost = async () => {

            try {

                const response = await fetch(
                    `http://localhost:5000/api/posts/${postId}`
                );

                const data = await response.json();

                if (response.ok) {

                    setTitle(data.title);
                    setContent(data.content);

                } else {

                    alert(data.message);

                }

            } catch (error) {

                console.log("Error fetching post:", error);
                alert("Unable to connect to server.");

            } finally {

                setLoading(false);

            }
        };


        fetchPost();

    }, [postId]);


    // Update the post
    const handleUpdate = async (event) => {

        event.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first.");
            return;
        }


        try {

            const response = await fetch(
                `http://localhost:5000/api/posts/${postId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        title: title,
                        content: content
                    })
                }
            );


            const data = await response.json();


            if (response.ok) {

                alert("Post updated successfully!");

                if (onUpdated) {
                    onUpdated();
                }

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.log("Update error:", error);
            alert("Unable to connect to server.");

        }

    };


    if (loading) {
        return <p>Loading post...</p>;
    }


    return (
        <div>

            <h2>Edit Blog Post</h2>

            <form onSubmit={handleUpdate}>

                <div>

                    <label>Title</label>

                    <br />

                    <input
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />

                </div>

                <br />

                <div>

                    <label>Content</label>

                    <br />

                    <textarea
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        rows="8"
                        cols="50"
                    />

                </div>

                <br />

                <button type="submit">
                    Update Post
                </button>

            </form>

        </div>
    );
}

export default EditPost;