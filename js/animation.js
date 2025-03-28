// function shrinkAndNavigate() {
//     const imageElement = document.querySelector('.door');
//     if (imageElement) {
//         console.log("shrink and navigate!");
//         imageElement.classList.add('shrink');

//         imageElement.addEventListener('animationend', () => {
//             console.log("Adding fade-out class to body");
//             document.body.classList.add('fade-out');
//             setTimeout(() => {
//                 window.location.href = "/profile";
//             }, 900);
//         }, { once: true }); 
//     }
// }

function Navigate() {
    const imageElement = document.querySelector('.door');
    if (imageElement) {
        console.log("Animate and navigate!");

        // Retrieve the profile image state from sessionStorage
        const profileImageState = JSON.parse(sessionStorage.getItem("profileImageState"));
        if (!profileImageState) {
            console.error("Profile image state not found in sessionStorage");
            window.location.href = "/profile"; // Fallback navigation
            return;
        }

        // Set the image to `position: absolute` to allow movement
        const rect = imageElement.getBoundingClientRect();
        imageElement.style.position = "absolute";
        imageElement.style.top = `${rect.top}px`;
        imageElement.style.left = `${rect.left}px`;
        imageElement.style.width = `${rect.width}px`;
        imageElement.style.height = `${rect.height}px`;
        imageElement.style.transition = "all 0.8s ease-in-out";
        imageElement.style.zIndex = "1000";

        // Animate the image to the position and size of the profile image
        setTimeout(() => {
            imageElement.style.top = `${profileImageState.top}px`;
            imageElement.style.left = `${profileImageState.left}px`;
            imageElement.style.width = `${profileImageState.width}px`;
            imageElement.style.height = `${profileImageState.height}px`;
            imageElement.style.transform = "scale(1)"; // Reset scale if needed
        }, 0);

        // Navigate to the /profile page after the animation
        imageElement.addEventListener("transitionend", () => {
                window.location.href = "/profile";
        }, { once: true });
    } else {
        console.error("Image element not found");
    }
}