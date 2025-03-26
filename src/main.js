import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { cleanGallery, markupGallery } from "./js/render-functions";
import { getImages } from "./js/pixabay-api";

const form = document.querySelector(".form");
const loader = document.querySelector(".loader");
const moreBtn = document.querySelector(".btn-more");
const per_page = 15;
let page = 1;
let requestData = "";

form.addEventListener("submit", formSubmit);
moreBtn.addEventListener("click", nextGroup);

async function formSubmit(event) {
    event.preventDefault();
    requestData = event.currentTarget.elements.searchText.value.trim();
    offMoreBtn();
    if (!requestData) {
        return;
    }
    page = 1;
    cleanGallery();
    onLoader();
    try {
        const { hits, totalHits } = await getImages(requestData, page, per_page);
        if (hits.length === 0) {
            iziToast.show({
                message: "Sorry, there are no images matching your search query. Please try again!", position: "topRight",backgroundColor: "#ef4040",messageColor: "#fff",
            });
            return;
        }
        markupGallery(hits);
        onMoreBtn();
        if (page * per_page >= totalHits) {
            iziToast.show({
                message: "We're sorry, but you've reached the end of search results.",
                messageColor: "#fff",
                position: "topRight",

            });
            offMoreBtn();
        }
    } catch (error) {
        iziToast.error({ message: "Sorry, there are no images matching your search query. Please try again!", position: "topRight",backgroundColor: "#ef4040",messageColor: "#fff", });
    } finally {
        form.reset();
        offLoader();
    }     
}
async function nextGroup() {
    onLoader();
    page += 1;
    try {
        const { hits, totalHits } = await getImages(requestData, page, per_page) ;
        markupGallery(hits);
        const { height } = document.querySelector(".gallery-item").getBoundingClientRect();
        window.scrollBy({ top: height * 2, behavior: "smooth" });
        if (page * per_page >= totalHits) {
            offMoreBtn();
               iziToast.show({
                message: "We're sorry, but you've reached the end of search results.",
                messageColor: "#fff",
                position: "topRight",
                backgroundColor: "#2ABB7C",
            });
        }

    } catch {
        iziToast.error({ message: "Sorry, there are no images matching your search query. Please try again!", position: "topRight",backgroundColor: "#ef4040",messageColor: "#fff", });

    } finally {
        offLoader();
    }
}
function onLoader() {
    loader.style.display = "flex";
};
function offLoader() {
    loader.style.display = "none";
};
function onMoreBtn() {
    moreBtn.style.display = "block";
};
function offMoreBtn() {
   moreBtn.style.display = "none";
};