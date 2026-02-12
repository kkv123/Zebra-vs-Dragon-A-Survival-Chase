high = localStorage.getItem("mx-score") || 0;

document.querySelector(".mx-score").innerHTML = `High Score : ${high}`;
let gameAudio;
dra1 = document.querySelector(".dragon");
console.log(parseFloat(window.getComputedStyle(dra1, null).getPropertyValue('animation-duration')));

function startAgain() {

  gameAudio = new Audio("music/background-sound.mp3");
  gameAudio.loop = true;
  console.log(gameAudio)
  gameAudio.volume = 0.1;
  gameAudio.play();
  const dra2 = document.querySelector(".dragon");
  dra2.style.animationDuration = "3.5s";
  document.querySelector('.dragon').classList.add('dragonAnimate');
  let gameq = document.querySelector(".gameOver");
  if (gameq.style.visibility != 'hidden') {
    gameq.style.visibility = 'hidden';
  }

  const newscore1 = document.querySelector(".start-end");
  newscore1.style.visibility = (newscore1.style.visibility === "visible") ? "hidden" : "hidden";
  const freshScore = document.querySelector(".score");
  freshScore.style.visibility = freshScore.style.visibility === "hidden" ? "visible" : "visible";
}
let con = 1;
document.querySelector("button").addEventListener("click", () => {

  if (con) {
    startAgain();
    con = 0;
    let sc = 0;

    let intr = setInterval(() => {
      const obj = document.querySelector(".obj");
      dra = document.querySelector(".dragon");
      game = document.querySelector(".gameOver");
      dx1 = parseInt(window.getComputedStyle(obj, null).getPropertyValue('left'));
      dy1 = parseInt(window.getComputedStyle(obj, null).getPropertyValue('top'));
      dx2 = parseInt(window.getComputedStyle(dra, null).getPropertyValue('left'));
      dy2 = parseInt(window.getComputedStyle(dra, null).getPropertyValue('top'));

      dx = Math.abs(dx1 - dx2);
      dy = Math.abs(dy1 - dy2);

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

        gameq.innerHTML = srq.innerHTML;
        gameq.style.cssText = srq.style.cssText;
        srq.style.visibility = 'hidden';
        gameq.style.visibility = 'visible';

        con = true;
      }
      const func2 = () => {
        high = Math.max(high, sc);
        setTimeout(() => {
          let dur = parseFloat(window.getComputedStyle(dra, null).getPropertyValue('animation-duration'));
          dur = dur - 0.01;
          dra.style.animationDuration = dur + 's';
        }, 800)
      }

      const dragon = document.querySelector(".dragon");
      let dragonWidth = parseFloat(window.getComputedStyle(dragon).getPropertyValue("width"));
      console.log(dragonWidth)
      if (dragonWidth >= 149.5) {
        if (dx < 125 && dy < 125) {
          func1();
        }
        if (dx < 150) {
          func2();
        }

      } else {
        dragon.style.animationDuration = "2.0s";
        if (dx < 55 && dy < 55) {
          func1();
        }
        if (dx < 90) {
          func2();
        }
      }
      sc++;
      high = Math.max(high, sc);
    }, 100)
  }
})

const obj1 = document.querySelector(".obj");
 
// Helper functions
function jumpObj() {
  obj1.classList.add("animate");
  setTimeout(() => obj1.classList.remove("animate"), 700);
}

function moveObj(delta) {
  let left = parseInt(window.getComputedStyle(obj1).getPropertyValue("left"));
  obj1.style.left = left + delta + "px";
}

// ---------------- KEYBOARD CONTROLS ----------------
document.onkeyup = (e) => {
  if (e.keyCode === 38) {        // Up Arrow
    jumpObj();
  } else if (e.keyCode === 37) { // Left Arrow
    moveObj(-100);
  } else if (e.keyCode === 39) { // Right Arrow
    moveObj(100);
  }
};

// ---------------- MOBILE CONTROLS ----------------
document.getElementById("jump")?.addEventListener("touchstart", jumpObj);
document.getElementById("left")?.addEventListener("touchstart", () => moveObj(-70));
document.getElementById("right")?.addEventListener("touchstart", () => moveObj(70));

// ---------------- CLICK CONTROLS ----------------
document.getElementById("jump")?.addEventListener("click", jumpObj);
document.getElementById("left")?.addEventListener("click", () => moveObj(-100));
document.getElementById("right")?.addEventListener("click", () => moveObj(100));

// ---------------- SWIPE GESTURES ----------------
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
    moveObj(dx > 0 ? 100 : -100);
  } else {
    // Vertical swipe (up)
    if (dy < 0) jumpObj();
  }
});
