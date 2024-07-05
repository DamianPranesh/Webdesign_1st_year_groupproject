/*Navigation bar JavaScript*/

document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('.toggle-button');
    const navLinksContainer = document.querySelector('.nav_links_container');

    // Add event listener to toggle button
    toggleButton.addEventListener('click', function() {
        navLinksContainer.classList.toggle('show-links');
    });
});

/*Gallery JavaScript*/

function showPhotos(category) {
    const allImages = document.querySelectorAll('.image-container .image');
    allImages.forEach(image => {
        if (category === 'all') {
            image.style.display = 'block';
        } else if (image.classList.contains(category)) {
            image.style.display = 'block';
        } else {
            image.style.display = 'none';
        }
    });
}

function enlargeImage(element) {
    var imageSrc = element.querySelector('img').src;
    var description = element.querySelector('.description').innerHTML;
    var popupImage = document.querySelector('.popup-image img');
    var popupDescription = document.querySelector('.popup-image .description');

    popupImage.src = imageSrc;
    popupDescription.innerHTML = description;

    document.querySelector('.popup-container').style.display = 'flex';
}

function changeBackgroundColor(color) {
    var popupContainer = document.querySelector('.popup-container');
    popupContainer.style.backgroundColor = color;
}

function changeFontFamily(fontFamily){
    var description = document.querySelector('.popup-image .description p');
    description.style.fontFamily = fontFamily;
}

function closePopup() {
    document.querySelector('.popup-container').style.display = 'none';
}
