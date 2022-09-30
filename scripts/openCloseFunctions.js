export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    }
}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
}

export const popupImage = document.querySelector('.popup__image-item');
export const popupCaption = document.querySelector('.popup__image-figcaption');
export const popupThemeImage = document.querySelector('.popup_type_image');