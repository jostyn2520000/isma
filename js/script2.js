const button = document.getElementById('surpriseBtn');
const heartsContainer = document.getElementById('hearts');
const transition = document.querySelector('.page-transition');
const heartSVG = `
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path d="M256 448l-30.164-27.211C118.718 322.442 48 258.61 48 179.095 48 114.221 97.918 64 162.4 64c36.399 0 70.717 16.742 93.6 43.947C278.882 80.742 313.199 64 349.6 64 414.082 64 464 114.221 464 179.095c0 79.516-70.719 143.348-177.836 241.694L256 448z"/>
    </svg>
`;

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = heartSVG;
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    heart.style.transform = `scale(${Math.random() * 0.3 + 0.2})`;
    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 4000);
}

function startHeartAnimation() {
    heartsContainer.style.display = 'block';
    for (let i = 0; i < 150; i++) {
        setTimeout(createHeart, i * 100);
    }
}

function autoJump() {
    button.classList.add('jump');
    setTimeout(() => {
        button.classList.remove('jump');
    }, 500);
}

setInterval(autoJump, 3000);

button.addEventListener('click', function() {
    button.classList.add('jump-click');
    setTimeout(() => {
        button.classList.remove('jump-click');
    }, 500);

    startHeartAnimation();

    setTimeout(() => {
        transition.style.display = 'block';
        transition.classList.add('active');

        setTimeout(() => {
            const loader = document.querySelector('.loader');
            loader.classList.add('active');

            setTimeout(() => {
                window.location.href = 'first-page.html';
            }, 1000);
        }, 500);
    }, 4000);
});