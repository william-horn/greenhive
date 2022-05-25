
// Category selection elements
const categoryBackgroundDiv = document.getElementById('category-selection-background');
const categoryContainerDiv = document.getElementById('category-container');
const changeCategoryBtn = document.getElementById('change-category-btn');

// Create new post elements
const newPostBackgroundDiv = document.getElementById('new-post-background');
const newPostContainerDiv = document.getElementById('new-post-container');
const newPostBtn = document.getElementById('new-post-btn');

// Get post form INPUT elements
const submitPostBtn = document.getElementById('post-submit-btn');
const postTitleEl = document.getElementById('post-title');
const postContentEl = document.getElementById('post-content');
const postSubmitBtn = document.getElementById('post-submit-btn');

// content container elements
const contentContainerDiv = document.getElementById('content-container');


// generate category buttons
([
    'Oceans',
    'Forests',
    'Air',
    'Wildlife'
]).forEach(name => {
    const categoryBtn = document.createElement('button');
    categoryBtn.classList = "category-btn button is-medium mb-3";
    categoryBtn.textContent = name;

    categoryContainerDiv.append(categoryBtn);
});


const createNewPost = async () => {
    const postTitle = postTitleEl.value;
    const postContent = postContentEl.value;

    const postResponse = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: postTitle,
            content: postContent,
            type: 'Ocean'
        })
    });

    if (postResponse.ok) {
        console.log('request passed successfully');
    } else {
        console.log('bad request');
    }
}

const getAllPosts = async () => {
    const response = await fetch('/api/posts', {
        headers: { 'Content-Type': 'application/json' }
    });
    const allPosts = await response.json();
    console.log(allPosts);
}

getAllPosts();

const showPostForm = () => newPostBackgroundDiv.style.display = 'block';
const showCategoryForm = () => categoryBackgroundDiv.style.display = 'block';
const closeCategoryForm = () => categoryBackgroundDiv.style.display = 'none';
const closePostForm = () => newPostBackgroundDiv.style.display = 'none';

postSubmitBtn.addEventListener('click', () => {
    createNewPost();
    closePostForm();
})

changeCategoryBtn.addEventListener('click', showCategoryForm);

document
    .getElementById('category-close-btn')
    .addEventListener('click', closeCategoryForm);

newPostBtn.addEventListener('click', showPostForm);

document
    .getElementById('post-close-btn')
    .addEventListener('click', closePostForm);