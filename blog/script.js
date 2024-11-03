document.addEventListener('DOMContentLoaded', function () {
    // Selectors
    const inputBlog = document.querySelectorAll("#newBlog input");
    const blogDescription = document.querySelector("#newBlog textarea");
    const newBlogModal = document.querySelector(".addBlogPage");
    const addBlogBtn = document.getElementById("addBlog");
    const closeAddBlogBtn = document.getElementById("close");
    const saveBlogButton = document.getElementById("saveBlogButton");
    const printDIV = document.querySelector('.blog-section .row');
    const modalTitle = document.getElementById("modalTitle");
    
    let isEditMode = false;
    let editIndex = -1;

    // Toggle modal visibility
    const toggleDisplay = (element) => element.classList.toggle("d-none");

    // Open modal for adding a new blog
    addBlogBtn.onclick = () => {
        isEditMode = false;
        modalTitle.textContent = "New Blog";
        resetForm();
        toggleDisplay(newBlogModal);
    };

    // Close the modal
    closeAddBlogBtn.onclick = () => toggleDisplay(newBlogModal);

    // Initialize the blog array from localStorage or use the default blogs
    let dataArr = JSON.parse(localStorage.getItem("blog")) || defaultBlogs;

    // If localStorage is empty, set the default blogs
    if (!localStorage.getItem("blog")) {
        localStorage.setItem("blog", JSON.stringify(defaultBlogs));
    }

    // Print blogs to the page
    const printBlog = () => {
        let htmlContent = '';
        dataArr.forEach((blog, i) => {
            htmlContent += `
                <div class="col-lg-4 col-md-6 mb-4 blog-post" data-destination="${blog.destination}">
                    <div class="card">
                        <img src="${blog.img}" class="card-img-top" alt="Destination Image">
                        <div class="card-body">
                            <a href="../templete/${blog.title.toLowerCase()}/index.html"><h5 class="card-title">${blog.title}</h5></a>   
                            <p class="card-text">${blog.blogBrief}</p>
                        </div>
                        <div class="editbtns">
                            <i class="fa-solid fa-pen-to-square text-warning" onclick="editBlog(${i})"></i>
                            <i class="fa-regular fa-trash-can text-danger" onclick="deleteBlog(${i})"></i>
                        </div>
                    </div>
                </div>
            `;
        });
        printDIV.innerHTML = htmlContent;
    };

    // Initial rendering of the blogs
    printBlog();

    
    // Save or update a blog
    saveBlogButton.onclick = () => {
        if (isEditMode) {
            updateBlog();
        } else {
            saveBlog();
        }
        printBlog();
        resetForm();
        toggleDisplay(newBlogModal);
    };

    // Save a new blog
    const saveBlog = () => {
        const newBlog = {
            name: inputBlog[0].value,
            destination: inputBlog[1].value,
            title: inputBlog[2].value,
            blogBrief: inputBlog[3].value,
            img: URL.createObjectURL(document.getElementById('blogImage').files[0]),
            
            description: blogDescription.value
        };
        console.log(newBlog);
        dataArr.push(newBlog);
        localStorage.setItem('blog', JSON.stringify(dataArr));
    };

    // Update an existing blog
    const updateBlog = () => {
        let updatedBlog = {
            name: inputBlog[0].value,
            destination: inputBlog[1].value,
            title: inputBlog[2].value,
            blogBrief: inputBlog[3].value,
            img: URL.createObjectURL(document.getElementById('blogImage')?.files[0]),
            description: blogDescription.value
        };
        dataArr[editIndex] = updatedBlog;
        localStorage.setItem('blog', JSON.stringify(dataArr));
        isEditMode = false;
        editIndex = -1;
    };

    // Edit a blog
    window.editBlog = (index) => {
        isEditMode = true;
        editIndex = index;
        modalTitle.textContent = "Edit Blog";
        const blog = dataArr[index];
        inputBlog[0].value = blog.name;
        inputBlog[1].value = blog.destination;
        inputBlog[2].value = blog.title;
        inputBlog[3].value = blog.blogBrief;
        blogDescription.value = blog.description;
        toggleDisplay(newBlogModal);
        localStorage.setItem("blog", JSON.stringify(dataArr));
    };

    // Delete a blog
    window.deleteBlog = (index) => {
        dataArr.splice(index, 1);
        localStorage.setItem("blog", JSON.stringify(dataArr));
        printBlog();
    };

    // Reset form inputs
    const resetForm = () => {
        inputBlog.forEach(input => input.value = '');
        blogDescription.value = '';
        document.getElementById('blogImage').value = '';
    };

    // Search blog posts by destination
    document.getElementById('searchInput').oninput = () => {
        const input = document.getElementById('searchInput').value.toLowerCase();
        const blogPosts = document.querySelectorAll('.blog-post');
        blogPosts.forEach(post => {
            const destination = post.getAttribute('data-destination').toLowerCase();
            post.style.display = destination.startsWith(input) ? "block" : "none";
        });
    };
});


// Selectors
// let searchBtn = document.querySelector("#search-btn");
// let searchForm = document.querySelector(".search-form");
// let loginForm = document.querySelector(".login-form");
// let signupForm = document.querySelector(".signup-form"); // New
// let menuBar = document.querySelector("#menu-bar");
// let amenu = document.querySelector(".navbar");
// let vidBtn = document.querySelectorAll(".video-btn");

// // Toggle search bar visibility
// function showbar() {
//     searchBtn.classList.toggle("fa-times");
//     searchForm.classList.toggle("active");
// }

// // Show and hide login form
// function showform() {
//     loginForm.classList.add("active");
//     signupForm.classList.remove("active"); // Hide signup when login is shown
// }

// function hideform() {
//     loginForm.classList.remove("active");
// }

// // Show and hide sign-up form (New functions)
// function showsignupform() {
//     signupForm.classList.add("active");
//     loginForm.classList.remove("active"); // Hide login when signup is shown
// }

// function hidesignupform() {
//     signupForm.classList.remove("active");
// }

// // Toggle menu visibility
// function showmenu() {
//     menuBar.classList.toggle("fa-times");
//     amenu.classList.toggle("active");
// }

// // Video button functionality
// vidBtn.forEach(slide => {
//     slide.addEventListener("click", function() {
//         document.querySelector(".controls .blue").classList.remove("blue");
//         slide.classList.add("blue");
//         let src = slide.getAttribute("data-src");
//         document.querySelector("#video-slider").src = src;
//     });
// });
