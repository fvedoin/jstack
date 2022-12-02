import React, { useState } from "react";
import Post from "./Post";
import Header from "./Header";
import { ThemeProvider } from "./ThemeContext";

function App() {

    const [posts, setPosts] = useState([
        {
            id: Math.random(),
            title: "Title#01",
            subtitle: "Sub#01",
            likes: 20,
            read: false
        }
    ]);

    function handleRefresh() {
        setPosts((prevState) => [
            ...prevState,
            {
                id: Math.random(),
                title: "Title#01",
                subtitle: "Sub#01",
                likes: 20,
                read: false
            },
        ]);
    }

    function handleRemovePost(postId) {
        setPosts((prevState) => (
            prevState.filter((post) => post.id !== postId)
        ));
    }

    return (
        <ThemeProvider>
            <Header title="JStack's blog" >
                <h2>
                    Posts da semana
                    <button onClick={handleRefresh}>Atualizar</button>
                </h2>
            </Header>
            <hr />

            {posts.map(post => (
                <Post
                    key={post.id}
                    onRemove={handleRemovePost}
                    post={post}
                />
            ))}
        </ThemeProvider>
    );
}

export default App;