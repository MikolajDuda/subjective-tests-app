const BlogList = ({ blogs, title, handleDelete }) => {
    return (
        <div className="blog-list">
            <h2>{title}</h2>
            <ul>
                {blogs.map((blog) => (
                    <li className="blog-preview" key={blog.id}>
                        <h2>{blog.title}</h2>
                        <p>Written by: {blog.author}</p>
                        <button onClick={() => handleDelete(blog.id)}>delete blog</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BlogList;