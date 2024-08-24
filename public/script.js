document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const imagesContainer = document.getElementById('images');

    // Handle form submission
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(uploadForm);

        fetch('/upload', {
            method: 'POST',
            body: formData
        }).then(response => {
            if (response.ok) {
                uploadForm.reset();
                loadImages();
            }
        });
    });

    // Load images and display
    function loadImages() {
        fetch('/images')
            .then(response => response.json())
            .then(images => {
                imagesContainer.innerHTML = images.map(img => 
                    `<div>
                        <img src="${img}" alt="Uploaded Image">
                        <br>
                        <a href="${img}" target="_blank">${img}</a>
                    </div>`
                ).join('');
            });
    }

    loadImages(); // Load images on page load
});
