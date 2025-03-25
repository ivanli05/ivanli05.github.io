function shrinkImage() {
    console.log('shrinkImage function triggered');
    const imageElement = document.querySelector('.door');
    if (imageElement) {
        console.log('Image element found:', imageElement);
        imageElement.classList.add('shrink');
        console.log('Class "shrink" added to image element');
    } else {
        console.error('Image element not found');
    }
}
