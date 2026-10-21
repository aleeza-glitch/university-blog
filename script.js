
// ======================================
// 1. BLOG POSTS DATA
// ======================================

const blogPosts = [
    {
        id: 1,
        title: "A Day in University Life",
        category: "Campus Life",
        date: "October 10, 2026",
        icon: "🎓",
        excerpt:
            "Discover the everyday experiences, friendships, and memorable moments of university students.",
        content:
            "University life is a journey filled with learning, friendship, teamwork, and new experiences. Students attend lectures, work on assignments, participate in activities, and spend time with their friends. Every day offers an opportunity to learn something new and develop skills for the future."
    },

    {
        id: 2,
        title: "How to Prepare for University Exams",
        category: "Education",
        date: "October 12, 2026",
        icon: "📚",
        excerpt:
            "Learn practical study techniques to organize your time and prepare effectively for exams.",
        content:
            "Effective exam preparation starts with a realistic timetable. Divide your syllabus into smaller topics, revise regularly, practice previous questions, and take short breaks. Avoid depending entirely on last-minute study sessions. Consistency and understanding are more useful than memorizing everything at once."
    },

    {
        id: 3,
        title: "Making University Events Memorable",
        category: "Events",
        date: "October 14, 2026",
        icon: "🎉",
        excerpt:
            "Explore how student participation and teamwork can make campus events more enjoyable.",
        content:
            "University events provide opportunities for students to express their creativity, develop confidence, and build friendships. Planning an event requires communication, teamwork, time management, and responsibility. Students can contribute through organizing, volunteering, designing, and participating."
    },

    {
        id: 4,
        title: "The Importance of Technology in Education",
        category: "Technology",
        date: "October 15, 2026",
        icon: "💻",
        excerpt:
            "Discover how digital tools can support learning, research, and collaboration.",
        content:
            "Technology has changed the way students access information and learn new skills. Online learning platforms, digital libraries, programming tools, and collaborative applications can make education more flexible. Students should use these resources responsibly and verify the accuracy of online information."
    },

    {
        id: 5,
        title: "Building Friendships on Campus",
        category: "Campus Life",
        date: "October 17, 2026",
        icon: "🤝",
        excerpt:
            "Find out how teamwork, communication, and shared experiences help students build friendships.",
        content:
            "Friendships can make university life more enjoyable and supportive. Joining study groups, participating in campus activities, and helping classmates are useful ways to meet people. Healthy friendships depend on respect, communication, honesty, and understanding different perspectives."
    },

    {
        id: 6,
        title: "Developing Skills Beyond the Classroom",
        category: "Education",
        date: "October 18, 2026",
        icon: "🚀",
        excerpt:
            "Learn why communication, problem-solving, and practical projects matter for students.",
        content:
            "Academic knowledge is important, but practical skills also help students prepare for their careers. Working on projects, practicing presentations, learning programming, and collaborating with others can improve confidence. Students can start with small projects and gradually build a portfolio of their work."
    }
];


// ======================================
// 2. SELECT HTML ELEMENTS
// ======================================

const blogGrid = document.getElementById("blogGrid");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const categoryButtons = document.querySelectorAll(".category-btn");
const noResults = document.getElementById("noResults");

const blogModal = document.getElementById("blogModal");
const modalClose = document.getElementById("modalClose");

let selectedCategory = "All";


// ======================================
// 3. DISPLAY BLOG POSTS
// ======================================

function displayBlogs(posts) {

    blogGrid.innerHTML = "";

    noResults.hidden = posts.length !== 0;

    posts.forEach(function (post) {

        const card = document.createElement("article");

        card.className = "blog-card";

        const imageClass = {
            "Campus Life": "campus",
            "Education": "education",
            "Events": "events",
            "Technology": "technology"
        }[post.category] || "campus";

        const image = document.createElement("div");
        image.className = "blog-image " + imageClass;
        image.textContent = post.icon;
        image.setAttribute("aria-hidden", "true");

        const content = document.createElement("div");
        content.className = "blog-content";

        const category = document.createElement("span");
        category.className = "blog-category";
        category.textContent = post.category;

        const date = document.createElement("div");
        date.className = "blog-date";
        date.textContent = post.date;

        const title = document.createElement("h3");
        title.textContent = post.title;

        const excerpt = document.createElement("p");
        excerpt.textContent = post.excerpt;

        const readMore = document.createElement("button");
        readMore.className = "read-more";
        readMore.textContent = "Read More →";

        readMore.addEventListener("click", function () {
            openBlog(post.id);
        });

        content.appendChild(category);
        content.appendChild(date);
        content.appendChild(title);
        content.appendChild(excerpt);
        content.appendChild(readMore);

        card.appendChild(image);
        card.appendChild(content);

        blogGrid.appendChild(card);

    });

}


// ======================================
// 4. SEARCH BLOG POSTS
// ======================================

function filterBlogs() {

    const searchTerm = searchInput.value
        .trim()
        .toLowerCase();

    const filteredPosts = blogPosts.filter(function (post) {

        const matchesCategory =
            selectedCategory === "All" ||
            post.category === selectedCategory;

        const searchableText = [
            post.title,
            post.category,
            post.excerpt,
            post.content
        ].join(" ").toLowerCase();

        const matchesSearch =
            searchableText.includes(searchTerm);

        return matchesCategory && matchesSearch;

    });

    displayBlogs(filteredPosts);

}


// Search when the user clicks the button.

searchButton.addEventListener("click", filterBlogs);


// Search automatically while the user types.

searchInput.addEventListener("input", filterBlogs);


// ======================================
// 5. CATEGORY FILTERS
// ======================================

categoryButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        selectedCategory = button.dataset.category;

        categoryButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        filterBlogs();

    });

});


// ======================================
// 6. READ MORE MODAL
// ======================================

function openBlog(postId) {

    const post = blogPosts.find(function (item) {
        return item.id === postId;
    });

    if (!post) {
        return;
    }

    document.getElementById("modalCategory").textContent =
        post.category;

    document.getElementById("modalTitle").textContent =
        post.title;

    document.getElementById("modalDate").textContent =
        post.date;

    const modalBody = document.getElementById("modalBody");

    modalBody.replaceChildren();

    const paragraph = document.createElement("p");
    paragraph.textContent = post.content;

    modalBody.appendChild(paragraph);

    blogModal.hidden = false;

    modalClose.focus();

    document.body.style.overflow = "hidden";

}


function closeBlog() {

    blogModal.hidden = true;

    document.body.style.overflow = "";

}


modalClose.addEventListener("click", closeBlog);


// Close modal when the user clicks outside the content.

blogModal.addEventListener("click", function (event) {

    if (event.target === blogModal) {
        closeBlog();
    }

});


// Close modal with Escape key.

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape" && !blogModal.hidden) {
        closeBlog();
    }

});


// ======================================
// 7. MOBILE NAVIGATION
// ======================================

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");


menuToggle.addEventListener("click", function () {

    const isOpen = navbar.classList.toggle("show");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.textContent = isOpen ? "✕" : "☰";

});


// Close the mobile menu after clicking a navigation link.

navbar.querySelectorAll("a").forEach(function (link) {

    link.addEventListener("click", function () {

        navbar.classList.remove("show");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.textContent = "☰";

    });

});


// ======================================
// 8. NEWSLETTER FORM DEMO
// ======================================

const newsletterForm =
    document.getElementById("newsletterForm");

const emailInput =
    document.getElementById("emailInput");

const newsletterMessage =
    document.getElementById("newsletterMessage");


newsletterForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = emailInput.value.trim();

    if (!emailInput.checkValidity() || email === "") {

        newsletterMessage.textContent =
            "Please enter a valid email address.";

        return;
    }

    newsletterMessage.textContent =
        "Thank you! Your newsletter demo subscription was successful.";

    newsletterForm.reset();

});


// ======================================
// 9. CONTACT FORM DEMO
// ======================================

const contactForm =
    document.getElementById("contactForm");

const contactFeedback =
    document.getElementById("contactFeedback");


contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
        document.getElementById("contactName").value.trim();

    const email =
        document.getElementById("contactEmail").value.trim();

    const message =
        document.getElementById("contactMessage").value.trim();


    if (!name || !email || !message) {

        contactFeedback.textContent =
            "Please complete all fields.";

        return;
    }

    contactFeedback.textContent =
        "Thank you, " + name +
        "! Your message passed the demo validation.";

    contactForm.reset();

});


// ======================================
// 10. AUTOMATIC COPYRIGHT YEAR
// ======================================

document.getElementById("currentYear").textContent =
    new Date().getFullYear();


// ======================================
// 11. LOAD BLOG POSTS WHEN PAGE OPENS
// ======================================

displayBlogs(blogPosts);

