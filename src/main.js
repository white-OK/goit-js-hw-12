import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { cleanGallery, markupGallery } from "./js/render-functions";
import { getImages } from "./js/pixabay-api";

const form = document.querySelector(".form");
const loader = document.querySelector(".loader");

form.addEventListener("submit", formSubmit);
function formSubmit(event) {
    event.preventDefault();
    const requestData = event.currentTarget.elements.searchText.value.trim();
    if (!requestData) {
        return;
    }
    cleanGallery();
    onLoader();
    getImages(requestData).then(({ hits }) => {
        if (hits.length === 0) {
            iziToast.show({
                message: "Sorry, there are no images matching your search query. Please try again!", position: "topRight",backgroundColor: '#ef4040',messageColor: '#fff',
            });
            return;
        }
        markupGallery(hits);
    })
        .catch(error => {
            console.log(error);
            iziToast.error({ message: "Sorry, there are no images matching your search query. Please try again!", position: "topRight",backgroundColor: '#ef4040',messageColor: '#fff', });
        })
        .finally(() => {
            form.reset();
            offLoader();
        });
}
function onLoader() {
    loader.style.display = "flex";
}
function offLoader() {
    loader.style.display = "none";
}