const ACCESS_KEY = 'KHjK6c0RN7QH6oBc1bkQAcqifiL4NE89Dsp_nSv_vJw';
let currentPage = 1; // Track current page of image results

function searchImages() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    const imageContainer = document.getElementById('imageContainer');
    currentPage = 1; // Reset current page when performing a new search

    // Clear previous images (if any)
    imageContainer.innerHTML = '';

    if (searchTerm) {
        fetchImages(searchTerm, currentPage);
    } else {
        imageContainer.textContent = 'Please enter a keyword';
    }
}

function fetchImages(searchTerm, page) {
    const imageContainer = document.getElementById('imageContainer');

    fetch(`https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=${ACCESS_KEY}&per_page=10&page=${page}`)
        .then(response => response.json())
        .then(data => {
            const results = data.results;

            if (results.length > 0) {
                results.forEach(photo => {
                    const imageUrl = photo.urls.regular;
                    const imgElement = createImageElement(imageUrl);
                    imageContainer.appendChild(imgElement);
                });
            } else {
                imageContainer.textContent = 'No images found';
            }
        })
        .catch(error => {
            console.error('Error fetching images:', error);
            imageContainer.textContent = 'Failed to fetch images';
        });
}

function createImageElement(url) {
    const imgElement = document.createElement('img');
    imgElement.src = url;
    imgElement.alt = 'Image';
    imgElement.classList.add('result-image');

    imgElement.addEventListener('click', () => {
        downloadImage(url);
    });

    return imgElement;
}

function downloadImage(url) {
    const link = document.createElement('a');
    link.download = 'image.jpg';
    link.href = url;
    link.target = '_blank';
    link.click();
}

function loadMoreImages() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    currentPage++; // Increment current page to load more images

    if (searchTerm && currentPage > 1) {
        fetchImages(searchTerm, currentPage);
    }
}
