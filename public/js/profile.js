
// general elements
const mainWindowTitleEl = $('#main-window-title');
const searchbarEl = $('#searchbar');

// Category selection elements
const categoryBackgroundDiv = $('#category-selection-background');
const categoryContainerDiv = $('#category-container');
const changeCategoryBtn = $('#change-category-btn');

// Create new post elements
const newPostBackgroundDiv = $('#new-post-background');
const newPostContainerDiv = $('#new-post-container');
const newPostBtn = $('#new-post-btn');

// Get post form INPUT elements
const submitPostBtn = $('#post-submit-btn');
const postTitleEl = $('#post-title');
const postContentEl = $('#post-content');
const postSubmitBtn = $('#post-submit-btn');

// content container elements
const contentContainerDiv = $('#content-container');
const rootCSS = $(':root');

// globals
let currentView = 'ocean';

const randomInt = max => {
    return ~~(Math.random()*max);
}

// todo: create a separate file for themes
const themes = {
    ocean: {
        properties: {
            themeBackgroundImage: 'url(../images/backgrounds/oceans/ocean-2.jpg)',

            themeForegroundColor: '#23394e',
            themeBackgroundColor: '#395263',
        
            themeTitleColor: 'white',
            themeTextLabelColor: '#6d7a8d',
            themeButtonDarkColor: '#121a23',
            themeButtonLightColor: '#495f78',
            themeTextBackgroundColor: '#0e3652',
        
            themeTextColor: '#99bceb',
            themeButtonTextColor: '#e8f5ff',
            themeSearchbarShadow: '0 0 40px #545715',
            themeContentWindowShadow: '0 0 30px #424218',
            themeCardShadow: '0 0 10px #1c3e62',
            themeMainWindowTitleShadow: '0 0 10px #3abaff',
            themeCardBackground: 'var(--themeBackgroundColor)',
        }
    },
    forest: { 
        properties: {
            themeBackgroundImage: 'url(../images/backgrounds/forests/forest-0.jpg)',

            themeForegroundColor: '#291e08',
            themeBackgroundColor: '#1e251f',
            themeTitleColor: 'white',
            themeTextLabelColor: '#5e411f',
            themeButtonDarkColor: '#1f1109',
            themeButtonLightColor: '#907646',
            themeTextBackgroundColor: '#314228',
            themeTextColor: '#bdf99f',
            themeButtonTextColor: '#e8f5ff',
            themeSearchbarShadow: '0 0 20px #ac832b',
            themeContentWindowShadow: '0 0 30px #193614',
            themeCardShadow: '0 0 10px #3b4b20',
            themeMainWindowTitleShadow: '0 0 10px #152a10',
            themeCardBackground: 'var(--themeBackgroundColor)',
        } 
    },
    air: { 
        properties: {
            themeBackgroundImage: 'url(../images/backgrounds/air/air-0.jpg)',

            themeForegroundColor: '#dcd5c5',
            themeBackgroundColor: '#ffffff',
            themeTitleColor: '#4f4f4f',
            themeTextLabelColor: '#877b6c',
            themeButtonDarkColor: '#67758f',
            themeButtonLightColor: '#ffffff',
            themeTextBackgroundColor: '#363f4f',
            themeTextColor: '#ffffff',
            themeButtonTextColor: '#000000',
            themeSearchbarShadow: '0 0 40px #ffffff',
            themeContentWindowShadow: '0 0 30px #e2e2e2',
            themeCardShadow: '0 0 10px #184862',
            themeMainWindowTitleShadow: '0 0 10px #dadada',
            themeCardBackground: 'none',
        } 
     },
    wildlife: { 
        properties: {
            themeBackgroundImage: 'url(../images/backgrounds/wildlife/wildlife-1.jpg)',

            themeForegroundColor: '#3b3c24',
            themeBackgroundColor: '#665b3d',
            themeTitleColor: '#ffffff',
            themeTextLabelColor: '#fdce93',
            themeButtonDarkColor: '#84854b',
            themeButtonLightColor: '#333921',
            themeTextBackgroundColor: '#6d715c',
            themeTextColor: '#fffdc5',
            themeButtonTextColor: '#ffffff',
            themeSearchbarShadow: '0 0 40px #ded59a',
            themeContentWindowShadow: '0 0 30px #b9a475',
            themeCardShadow: '0 0 10px #c3bd86',
            themeMainWindowTitleShadow: '0 0 10px #c69452',
            themeCardBackground: '#635d43',
        } 
    },
}

const updateView = async info => {
    closeCategoryForm();

    currentView = info.value;
    mainWindowTitleEl.text(info.render);

    const selectedTheme = themes[info.value].properties;
    const root = rootCSS.get(0);

    for (theme in selectedTheme) {
        root.style.setProperty('--' + theme, selectedTheme[theme]);
    }


    if (currentView === 'wildlife') {

        const apiResponse = await fetch('api/posts?' + new URLSearchParams({ type: 'wildlife', isUserPost: false }), {
            headers: { 'Content-Type': 'application/json' }
        });

        const apiData = await apiResponse.json();

        for (let i = 0; i < 20; i++) {
            const randIndex = randomInt(apiData.length);
            const randData = apiData[randIndex];
            apiData.splice(randIndex, 1);

            contentContainerDiv.append(genSearchCard({
                title: 'Endangered Species',
                content: randData.scientific_name,
                author_name: 'IUNC Redlist' 
            }))
        }

        console.log(apiData);

    }


    getAllPosts(searchbarEl.val(), true);
}


// generate category buttons
$([

    { render: 'Oceans', value: 'ocean' },
    { render: 'Forests', value: 'forest' },
    { render: 'Air Pollution', value: 'air' },
    { render: 'Wildlife', value: 'wildlife' },

]).each((_, info) => {

    const categoryBtn = $('<button class="category-btn button is-medium mb-3"></button>');
    categoryBtn.text(info.render);
    categoryBtn.click(() => updateView(info));

    categoryContainerDiv.append(categoryBtn);

});



const genSearchCard = data => {
    const cardEl = $(`<div class="card">
        <div>
            <h3 class="title has-text-centered mb-2">${data.title}</h3>
            <h4 class="title is-size-6 mt-1 mb-5">by: ${data.author_name}</h4>
            <p>${data.content}</p>
        </div>
        <button class="profile-btn read-more-btn button mt-2">Read More</button>
    </div>`);

    return cardEl;
}



// todo: make a template function for json requests
const createNewPost = async () => {
    const title = postTitleEl.val().trim();
    const content = postContentEl.val().trim();

    if (!title || !content) return;

    const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title,
            content,
            type: currentView
        })
    });

    const data = await response.json();
    return { response, data }
}


const getAllPosts = async (searchQuery, keep) => {
    const response = await fetch('/api/posts?' + new URLSearchParams({ type: currentView, isUserPost: true, filter: searchQuery }), {
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    if (!keep) contentContainerDiv.empty();
    data.forEach(post => contentContainerDiv.append(genSearchCard(post)));
}

const showPostForm = () => newPostBackgroundDiv.show();
const showCategoryForm = () => categoryBackgroundDiv.show();
const closeCategoryForm = () => categoryBackgroundDiv.hide();
const closePostForm = () => newPostBackgroundDiv.hide();

searchbarEl.keypress(event => {
    if (event.code === 'Enter') {
        contentContainerDiv.empty();
        getAllPosts(searchbarEl.val());
    }
});

getAllPosts(searchbarEl.val());

changeCategoryBtn.click(showCategoryForm);
$('#category-close-btn').click(closeCategoryForm);

newPostBtn.click(showPostForm);
$('#post-close-btn').click(closePostForm);

// submit post
postSubmitBtn.click(async () => {
    await createNewPost();
    closePostForm();
    await getAllPosts(searchbarEl.val());
});
