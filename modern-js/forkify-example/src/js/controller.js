import * as model from './model.js';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';

import { MODEL_CLOSE_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
    module.hot.accept();
}

const controlRecipe = async function () {
    try {
        const recipeId = window.location.hash.slice(1);

        if (!recipeId) return;
        recipeView.renderSpinner();

        // 1. Update results view to mark selected search result
        resultsView.update(model.getSearchResultsPage());

        // 2. Updating bookmarks view
        bookmarksView.update(model.state.bookmarks);

        // 3. Loading recipe
        await model.loadRecipe(recipeId);

        // 4. Rendering recipe
        recipeView.render(model.state.recipe);
    } catch (err) {
        recipeView.renderError();
    }
};

const controlSearchResults = async function () {
    try {
        resultsView.renderSpinner();
        // 1. Get search query
        const query = searchView.getQuery();

        if (!query) return;

        // 2. Load search results
        await model.loadSearchResults(query);

        // 3. Render results
        resultsView.render(model.getSearchResultsPage());

        // 4. Render initial pagination
        paginationView.render(model.state.search);
    } catch (err) {
        console.log(err);
    }
};

const controlPagination = function (goToPage) {
    model.state.search.page = goToPage;

    // 1. Render NEW results
    resultsView.render(model.getSearchResultsPage(goToPage));

    // 2. Render NEW pagination
    paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
    // Update the recipe servings (in state)
    model.updateServings(newServings);

    // Update the recipe view
    recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
    // 1. Add/remove bookmark
    if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
    else model.deleteBookmark(model.state.recipe.id);

    // 2. Update recipe view
    recipeView.update(model.state.recipe);

    // 3. Render bookmarks
    bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
    bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
    try {
        // Show loading spinner
        addRecipeView.renderSpinner();

        // Upload the new recipe data
        await model.uploadRecipe(newRecipe);

        // Render recipe
        recipeView.render(model.state.recipe);

        // Success message
        addRecipeView.renderMessage();

        // Render bookmark view
        bookmarksView.render(model.state.bookmarks);

        // Change ID in URL
        window.history.pushState(null, '', `#${model.state.recipe.id}`);

        // Close form window
        setTimeout(function () {
            addRecipeView.toggleWindow();
        }, MODEL_CLOSE_SEC * 1000);
    } catch (err) {
        addRecipeView.renderError(err.message);
    }
};

const init = function () {
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipe);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
    addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
