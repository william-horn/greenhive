
const categoryBackgroundDiv = document.getElementById('category-selection-background');
const categorySelectionDiv = document.getElementById('category-selection-container');
const categoryContainerDiv = document.getElementById('category-container');
const changeCategoryBtn = document.getElementById('change-category-btn');
const categoryCloseBtn = document.getElementById('category-close-btn');

const genCategoryButtons = list => {
    list.forEach(name => {
        const categoryBtn = document.createElement('button');
        categoryBtn.classList = "category-btn button is-medium mb-3";
        categoryBtn.textContent = name;

        categoryContainerDiv.append(categoryBtn);
    });
}

genCategoryButtons([
    'Oceans',
    'Forests',
    'Air Pollution',
]);

changeCategoryBtn.addEventListener('click', event => {
    categoryBackgroundDiv.style.display = 'block';
});

categoryCloseBtn.addEventListener('click', event => {
    categoryBackgroundDiv.style.display = 'none';
});