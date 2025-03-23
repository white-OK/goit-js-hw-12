import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const galleryImg = new SimpleLightbox(".gallery-link", {
    captionsData: 'alt',
    aptionDelay: 250,
});
const gallery = document.querySelector(".gallery");
export function markupGallery(images) {
    const markup = images.map(
        ({ largeImageURL,
            webformatURL,
            tags,
            likes,
            views,
            comments,
            downloads, }) => `<li class="gallery-item">
  <a class="gallery-link" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" width="360" height="200" /></a>
  <div class="info">
        <p class="info-elem">Likes<br> ${likes}</p>
        <p class="info-elem">Views<br> ${views}</p>
        <p class="info-elem">Comments<br> ${comments}</p>
        <p class="info-elem">Downloads<br> ${downloads}</p>
  </div>
</li>`).join("");
     gallery.insertAdjacentHTML(`beforeend`, markup);
  galleryImg.refresh();
}
export function cleanGallery() {
  gallery.innerHTML = ``;
}
