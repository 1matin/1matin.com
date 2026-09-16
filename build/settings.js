const MIN_TEXT_SCALE = 0.1;
const MAX_TEXT_SCALE = 2;
const TEXT_STEP = 0.1;
const MIN_ARTICLE_WIDTH = 34;
const MAX_ARTICLE_WIDTH = 66;
const WIDTH_STEP = 2;

function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
}

function applyTextScale(scale) {
    var roundedScale = Math.round(scale * 10) / 10;
    document.documentElement.style.setProperty("--blog-text-scale", roundedScale);
    document.getElementById("text-size-value").textContent = Math.round(roundedScale * 100) + "%";
    localStorage.setItem("blogTextScale", roundedScale);
    document.dispatchEvent(new CustomEvent("blogsettingschange"));
}

function applyArticleWidth(widthRem) {
    document.documentElement.style.setProperty("--blog-max-width", widthRem + "rem");
    document.getElementById("article-width-value").textContent = widthRem + "rem";
    localStorage.setItem("blogArticleWidth", widthRem);
    document.dispatchEvent(new CustomEvent("blogsettingschange"));
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("blogTheme", theme);

    document.querySelectorAll("[data-theme]").forEach(function (button) {
        button.classList.toggle("active", button.dataset.theme === theme);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    var storedScale = parseFloat(localStorage.getItem("blogTextScale"));
    var scale = clamp(isNaN(storedScale) ? 1 : storedScale, MIN_TEXT_SCALE, MAX_TEXT_SCALE);

    var storedWidth = parseFloat(localStorage.getItem("blogArticleWidth"));
    var width = clamp(isNaN(storedWidth) ? 42 : storedWidth, MIN_ARTICLE_WIDTH, MAX_ARTICLE_WIDTH);
    var theme = localStorage.getItem("blogTheme") || "black";

    applyTextScale(scale);
    applyArticleWidth(width);
    applyTheme(theme);

    document.querySelectorAll("[data-text-step]").forEach(function (button) {
        button.addEventListener("click", function () {
            scale = Math.max(MIN_TEXT_SCALE, scale + Number(button.dataset.textStep) * TEXT_STEP);
            applyTextScale(scale);
        });
    });

    document.querySelectorAll("[data-width-step]").forEach(function (button) {
        button.addEventListener("click", function () {
            width = clamp(width + Number(button.dataset.widthStep) * WIDTH_STEP, MIN_ARTICLE_WIDTH, MAX_ARTICLE_WIDTH);
            applyArticleWidth(width);
        });
    });

    document.querySelectorAll("[data-theme]").forEach(function (button) {
        button.addEventListener("click", function () {
            applyTheme(button.dataset.theme);
        });
    });
});
