 // Reasons database
 // Reasons database
const reasons = [
    { text: "You laugh so much that you don't even need a reason... total crazy vibes 😂💛", emoji: "😂", gif: "gif1.gif" },
    { text: "You make every moment unforgettable... ✨ Your friendship is one that I really cherish. 🫶💛", emoji: "✨", gif: "gif2.gif" },
    { text: "You're a brilliant artist, you know. 👩‍🎨 Even when you’re being all mysterious and keeping your work to yourself, I’m still your #1 fan! 🌟💖", emoji: "🎬", gif: "gif1.gif" },
    { text: "As an Engineer, you should know that the best things come in small packages... it’s called 'optimized design!' 🏗️📐 You might be short on height, but you're definitely tall on drama. 😂💛", emoji: "😂", gif: "gif2.gif" },
    { text: "You aren't just a best friend... you're the bestest friend ever 😌💖", emoji: "💖", gif: "gif1.gif" },
   
];

// State
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Create card
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    
    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;
    
    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Best Friend Memory">`;
    
    card.appendChild(text);
    card.appendChild(gifOverlay);
    
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// Show reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);
        
        reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${reasons.length}`;
        currentReasonIndex++;

        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "Go to Final Surprise 🎁💛";
                    shuffleButton.classList.add('story-mode');
                    shuffleButton.addEventListener('click', () => {
                        gsap.to('body', {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                window.location.href = 'last.html';
                            }
                        });
                    });
                }
            });
        }

        // 👉 Only 1 emoji per click (NO SPAM)
        createFloatingElement();

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    } else {
        window.location.href = "last.html";
    }
}

// Button click
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

// ✅ FIXED Floating emoji (NO WHITE DOTS)
function createFloatingElement() {
    const elements = ['😂', '💛', '✨', '🫶', '🎉'];
    const element = document.createElement('div');
    element.className = 'floating';

    element.textContent = elements[Math.floor(Math.random() * elements.length)];

    // 🔥 IMPORTANT FIX
    element.style.background = "transparent";
    element.style.border = "none";
    element.style.boxShadow = "none";
    element.style.lineHeight = "1";

    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 25) + 'px';
    element.style.opacity = 0.9;

    document.body.appendChild(element);

    gsap.to(element, {
        y: -window.innerHeight - 100,
        duration: 6,
        ease: "power1.out",
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// ❌ REMOVE interval completely (main culprit)
// setInterval(createFloatingElement, 4000);

// Custom cursor
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});
