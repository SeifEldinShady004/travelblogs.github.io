let searchBtn = document.querySelector("#search-btn");
let searchForm = document.querySelector(".search-form");
let loginForm = document.querySelector(".login-form");
let signupForm = document.querySelector(".signup-form"); // New
let menuBar = document.querySelector("#menu-bar");
let amenu = document.querySelector(".navbar");
let vidBtn = document.querySelectorAll(".video-btn");

// Toggle search bar visibility
function showbar() {
    searchBtn.classList.toggle("fa-times");
    searchForm.classList.toggle("active");
}

// Show and hide login form
function showform() {
    loginForm.classList.add("active");
    signupForm.classList.remove("active"); // Hide signup when login is shown
}

function hideform() {
    loginForm.classList.remove("active");
}

// Show and hide sign-up form (New functions)
function showsignupform() {
    signupForm.classList.add("active");
    loginForm.classList.remove("active"); // Hide login when signup is shown
}

function hidesignupform() {
    signupForm.classList.remove("active");
}

// Toggle menu visibility
function showmenu() {
    menuBar.classList.toggle("fa-times");
    amenu.classList.toggle("active");
}

// Video button functionality
vidBtn.forEach(slide => {
    slide.addEventListener("click", function() {
        document.querySelector(".controls .blue").classList.remove("blue");
        slide.classList.add("blue");
        let src = slide.getAttribute("data-src");
        document.querySelector("#video-slider").src = src;
    });
});

let blog
let homeblogs=document.getElementById("2lby");
if(JSON.parse(localStorage.getItem("blog"))==null){
    blog=[];
    console.log("hello");

    console.log(JSON.parse(localStorage.getItem("blog")));
}
else{
    blog=JSON.parse(localStorage.getItem("blog"));
    printhomeblogs();
    console.log(blog);
}