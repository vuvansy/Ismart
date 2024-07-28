import React from "react";

export default function BlogPostPage({ params }) {
    return (
        <div>
            <h1>Blog Post</h1>
            <p>{params.slug}</p>
        </div>
    );
}
