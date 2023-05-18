// Fetch blogs from JSONPlaceholder API
function fetchBlogs() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((blogs) => displayBlogs(blogs))
    .catch((error) => console.error(error));
}

// Display blogs in the UI
function displayBlogs(blogs) {
  const blogsDiv = document.getElementById("blogs");
  blogsDiv.innerHTML = "";

  blogs.forEach((blog) => {
    const blogDiv = document.createElement("div");
    blogDiv.innerHTML = `<h3>${blog.title}</h3><p>${blog.body}</p>`;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => deleteBlog(blog.id));

    blogDiv.appendChild(deleteButton);
    blogsDiv.appendChild(blogDiv);
  });
}

// Add a new blog
function addBlog(event) {
  event.preventDefault();

  const titleInput = document.getElementById("titleInput");
  const contentInput = document.getElementById("contentInput");

  const newBlog = {
    title: titleInput.value,
    body: contentInput.value,
  };

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBlog),
  })
    .then((response) => response.json())
    .then(() => {
      titleInput.value = "";
      contentInput.value = "";
      fetchBlogs();
    })
    .catch((error) => console.error(error));
}

// Delete a blog
function deleteBlog(blogId) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`, {
    method: "DELETE",
  })
    .then(() => fetchBlogs())
    .catch((error) => console.error(error));
}

// Fetch blogs on page load
fetchBlogs();

// Add event listener for submitting the form
const addBlogForm = document.getElementById("addBlogForm");
addBlogForm.addEventListener("submit", addBlog);
