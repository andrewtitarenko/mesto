export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleCloseWithEscape)
}

function handleCloseWithEscape(e) {
    if (e.key === 'Escape') {
        const popupToClose = document.querySelector('.popup_is-opened');
        closePopup(popupToClose)
    }
}
export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleCloseWithEscape)
}

export const popupImageItem = document.querySelector('.popup__image-item'); 
export const popupImageItemText = document.querySelector('.popup__image-figcaption');
export const popupImage = document.querySelector('.popup_type_image');