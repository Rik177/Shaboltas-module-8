const galleryButton = document.querySelector(".header__button")

async function getPhotos() {
    const loader = document.querySelector(".gallery__loader")
    loader.style.display = "block";
    try {
        const photos = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
        if (!photos.ok) {
            throw new Error("Что-то пошло не так!")
        }
        let data = await photos.json();
        if (data) {
            addPhotos(data);
        }
    } catch (error) {
        console.error(error.message);
    } finally { 
        loader.style.display = "none";
    }
}
function addPhotos(photosArray) {
    const gallery = document.querySelector(".gallery")
    photosArray.forEach(obj => {
        const imageElement = document.createElement("img");
        imageElement.src = obj.url;
        gallery.appendChild(imageElement);
    });

}

galleryButton.addEventListener("click", () => { 
    getPhotos();
    setTimeout(() => {
        galleryButton.blur();
    }, 100);
})
