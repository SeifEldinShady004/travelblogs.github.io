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

let yearlyTargetSpans = document.querySelectorAll(".prog > span");
let yearlyTargetProgSpans = document.querySelectorAll(".prog span span");

window.onload = () => {
  // Progress Fill
  yearlyTargetSpans.forEach(e => {
    e.style.transition = 'width 2s ease-out'
    e.style.width = `${e.dataset.progress}%`;
  })

  // Progress Counter
  yearlyTargetProgSpans.forEach(e => {
    // e.style.transition = '0.5s'
    let n = 1
    let int = setInterval(() => {
      e.innerHTML = `${n}%`
      if (n < e.parentElement.dataset.progress) {
        n++;
      } else {
        clearInterval(int);
      }
    }, 30)
  })

}

// Backup Manager Boxes
let divs = document.querySelectorAll(".settings-page .plans .plan");

divs.forEach(e => {
  e.addEventListener("click", (ele) => {
    divs.forEach(e => {
      e.classList.remove("active");
    })
    ele.currentTarget.classList.toggle("active");
  })
})