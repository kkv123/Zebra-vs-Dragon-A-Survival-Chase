high = localStorage.getItem("mx-score") || 0;

document.querySelector(".mx-score").innerHTML = `High Score : ${high}`;
let gameAudio;
function startAgain() {
    gameAudio = new Audio("music/background-sound.mp3");
    gameAudio.loop = true;
    console.log(gameAudio)
    gameAudio.volume = 0.1;
    gameAudio.play();

    document.querySelector('.dragon').classList.add('dragonAnimate');
    let gameq = document.querySelector(".gameOver");
    if (gameq.style.visibility != 'hidden') {
        gameq.style.visibility = 'hidden';
    }
    const newscore = document.querySelector(".newscore");
    const vis = window.getComputedStyle(newscore).getPropertyValue("visibility");
    console.log("Computed visibility:", vis);
    const newscore1 = document.querySelector(".start-end");
    newscore1.style.visibility =
        newscore1.style.visibility === "hidden" ? "visible" : "hidden";
    const freshScore = document.querySelector(".score");
    freshScore.style.visibility =
        freshScore.style.visibility === "hidden" ? "visible" : "visible";
}
let con = 1;
document.querySelector("button").addEventListener("click", () => {

    if (con) {
        startAgain();
        con = 0;
        let sc = 0;
        let p = 0;

        document.onkeyup = function (e) {
            console.log("hi", e.keyCode);
            if (p == 0) {
                p = 1;
            }
            if (e.keyCode == 38) {
                let p = document.querySelector(".obj");
                p.classList.add("animate");
                console.log("Working ");
                setTimeout(() => {
                    let p = document.querySelector(".obj");
                    p.classList.remove("animate");
                }, 700);
            } else if (e.keyCode == 37) {
                let obj = document.querySelector(".obj");
                left = parseInt(window.getComputedStyle(obj, null).getPropertyValue('left'));
                obj.style.left = left - 100 + "px";
            } else if (e.keyCode == 39) {
                let obj = document.querySelector(".obj");
                left = parseInt(window.getComputedStyle(obj, null).getPropertyValue('left'));
                obj.style.left = left + 100 + "px";
            }
        }

        dur = parseFloat(window.getComputedStyle(dra = document.querySelector(".dragon"), null).getPropertyValue('animation-duration'));

        let intr = setInterval(() => {

            obj = document.querySelector(".obj");
            dra = document.querySelector(".dragon");
            game = document.querySelector(".gameOver");
            dx1 = parseInt(window.getComputedStyle(obj, null).getPropertyValue('left'));
            dy1 = parseInt(window.getComputedStyle(obj, null).getPropertyValue('top'));
            dx2 = parseInt(window.getComputedStyle(dra, null).getPropertyValue('left'));
            dy2 = parseInt(window.getComputedStyle(dra, null).getPropertyValue('top'));

            dx = Math.abs(dx1 - dx2);
            dy = Math.abs(dy1 - dy2);
            console.log("x axis is " + dx);
            console.log("y axis is " + dy);

            document.querySelector(".score").innerHTML = `Score : ${sc}`;
            document.querySelector(".mx-score").innerHTML = `High Score : ${high}`;
            const func1 = () => {
                dra.classList.remove("dragonAnimate");
                game.style.visibility = "visible";
                clearInterval(intr);
                let collideAudio = new Audio("music/death.mp3");
                collideAudio.volume = 0.1;
                collideAudio.play();
                gameAudio.pause();
                let srq = document.querySelector(".score");
                let gameq = document.querySelector(".start-end")
                localStorage.setItem("mx-score", high);
                console.log(srq);
                gameq.innerHTML = srq.innerHTML;
                gameq.style.cssText = srq.style.cssText;
                srq.style.visibility = 'hidden';
                gameq.style.visibility = 'visible';
                // gameq.style.fontSize = 'bold';
                console.log(gameq)
                con = true;
            }
            const func2 = () => {
                high = Math.max(high, sc);
                setTimeout(() => {
                    let dur = parseFloat(window.getComputedStyle(dra, null).getPropertyValue('animation-duration'));
                    dur = dur - 0.01;
                    console.log("updated animation duration " + dur);
                    dra.style.animationDuration = dur + 's';
                }, 800)
            }
            const dragon = document.querySelector(".dragon");
            const dragonWidth = window.getComputedStyle(dragon).getPropertyValue("width");
            console.log(dragonWidth);
            console.log("Dragon Width is " + dragonWidth)
            if (dragonWidth === "149.5px") {
                if (dx < 125 && dy < 125) {
                    func1();
                }
                if (dx < 150) {
                    func2();
                }
                console.log("yes condition is satified")
            } else {
                if (dx < 78 && dy < 78) {
                    func1();
                }
                if (dx < 100) {
                    func2();
                }
                console.log("No not satisfied")
            }


            sc++;
            high = Math.max(high, sc);
        }, 100)
    }
})

/* ---------------- MOBILE CONTROLS ---------------- */

document.getElementById("jump")?.addEventListener("touchstart", () => {
    let obj = document.querySelector(".obj");
    obj.classList.add("animate");
    setTimeout(() => obj.classList.remove("animate"), 700);
});

document.getElementById("left")?.addEventListener("touchstart", () => {
    let obj = document.querySelector(".obj");
    let left = parseInt(window.getComputedStyle(obj).getPropertyValue('left'));
    obj.style.left = left - 70 + "px";
});

document.getElementById("right")?.addEventListener("touchstart", () => {
    let obj = document.querySelector(".obj");
    let left = parseInt(window.getComputedStyle(obj).getPropertyValue('left'));
    obj.style.left = left + 70 + "px";
});

// --------------------on clicking -------------------------------------------
document.getElementById("jump")?.addEventListener("click", () => {
    let obj = document.querySelector(".obj");
    obj.classList.add("animate");
    setTimeout(() => obj.classList.remove("animate"), 700);
});

document.getElementById("left")?.addEventListener("click", () => {
    let obj = document.querySelector(".obj");
    let left = parseInt(window.getComputedStyle(obj).getPropertyValue('left'));
    obj.style.left = left - 100 + "px";
});

document.getElementById("right")?.addEventListener("click", () => {
    let obj = document.querySelector(".obj");
    let left = parseInt(window.getComputedStyle(obj).getPropertyValue('left'));
    obj.style.left = left + 100 + "px";
});

// Swipe gestures
let startX, startY;
document.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;

    let dx = endX - startX;
    let dy = endY - startY;

    if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe
        let obj = document.querySelector(".obj");
        let left = parseInt(window.getComputedStyle(obj).getPropertyValue('left'));
        if (dx > 0) {
            obj.style.left = left + 100 + "px"; // swipe right
        } else {
            obj.style.left = left - 100 + "px"; // swipe left
        }
    } else {
        // Vertical swipe
        if (dy < 0) {
            let obj = document.querySelector(".obj");
            obj.classList.add("animate");
            setTimeout(() => obj.classList.remove("animate"), 700);
        }
    }
});
