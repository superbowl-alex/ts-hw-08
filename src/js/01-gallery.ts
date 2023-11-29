import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Items, galleryItems } from './gallery-items';
const galleryRef: HTMLUListElement | null = document.querySelector('.gallery');
galleryRef?.insertAdjacentHTML('beforeend', createGalleryMarkup(galleryItems));

const lightbox: any = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

lightbox.on('show.lightbox');

function createGalleryMarkup(images: Items[]): string {
  return images
    .map(
      ({
        preview,
        original,
        description,
      }) => `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>`
    )
    .join('');
}