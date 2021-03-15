const string = `
.skin * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.skin ::before,
::after {
  box-sizing: border-box;
}

.skin {
  position: relative;
  background: #ffe600;
  min-height:50vh;
}
.nose {
  border: 10px solid;
  border-color: black transparent transparent transparent;
  border-bottom: none;
  position: relative;
  width: 0;
  height: 0;
  left: 50%;
  top: 145px;
  margin-left: -10px;
  z-index: 5;
}
@keyframes wave {
  0% {
    transform: rotate(0deg);
  }
  33% {
    transform: rotate(5deg);
  }
  66% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
.nose:hover {
  transform-origin: 50% 100%;
  animation: wave 500ms infinite linear;
}
.nose::before {
  content: "";
  display: block;
  position: absolute;
  width: 20px;
  height: 5px;
  background: black;
  border-top-left-radius: 10px 5px;
  border-top-right-radius: 10px 5px;
  margin-top: -15px;
  margin-left: -10px;
}
.eye {
  border: 3px solid black;
  width: 64px;
  height: 64px;
  position: absolute;
  left: 50%;
  top: 100px;
  margin-left: -32px;
  background: #2e2e2e;
  border-radius: 50%;
}
.eye::before {
  content: "";
  border: 3px solid black;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: block;
  background: white;
  position: relative;
  left: 5px;
}
.eye.left {
  transform: translateX(-100px);
}
.eye.right {
  transform: translateX(100px);
}

.mouth {
  width: 220px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 170px;
  margin-left: -110px;
}
.mouth .up {
  position: relative;
  top: -20px;
  z-index: 1;
}
.mouth .up .lip {
  border: 4px solid;
  height: 30px;
  width: 100px;
  background-color: #ffe600;
}
.mouth .up .lip.left {
  border-bottom-left-radius: 60px 30px;
  border-color: transparent transparent transparent black;
  position: absolute;
  left: 50%;
  margin-left: -49px;
  transform: rotate(-25deg) translateX(-53px);
}
.mouth .up .lip.left::before {
  content: "";
  display: block;
  width: 10px;
  height: 30px;
  position: absolute;
  right: -7px;
  bottom: 0;
  background: #ffe600;
}
.mouth .up .lip.left::after {
  content: "";
  display: block;
  width: 100px;
  height: 10px;
  position: absolute;
  left: -4px;
  top: -9px;
  background: #ffe600;
}

.mouth .up .lip.right {
  border-bottom-right-radius: 60px 30px;
  border-color: transparent transparent black transparent;
  position: absolute;
  top: 2px;
  left: 50%;
  margin-left: -48px;
  transform: rotate(25deg) translateX(52px);
}
.mouth .up .lip.right::before {
  content: "";
  display: block;
  width: 7px;
  height: 30px;
  position: absolute;
  left: -6px;
  bottom: 0;
  background: #ffe600;
}
.mouth .up .lip.right::after {
  content: "";
  display: block;
  width: 100px;
  height: 10px;
  position: absolute;
  right: -5px;
  top: -9px;
  background: #ffe600;
}

.mouth .down {
  height: 200px;
  position: absolute;
  top: 10px;
  width: 100%;
  overflow: hidden;
}
.mouth .down .yuan1 {
  border: 1px solid black;
  width: 150px;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -75px;
  height: 1000px;
  border-radius: 75px / 300px;
  background: #a81009;
  overflow: hidden;
}
.mouth .down .yuan1 .yuan2 {
  border: 1px solid red;
  width: 200px;
  height: 300px;
  position: absolute;
  bottom: -150px;
  left: 50%;
  margin-left: -100px;
  border-radius: 100px;
  background: #ff485f;
}
.face {
  position: absolute;
  left: 50%;
  border: 3px solid black;
  width: 88px;
  height: 88px;
  top: 200px;
  margin-left: -44px;
  z-index: 3;
}
.face > img {
  position: absolute;
  top: 50%;
  left: 50%;
}
.face.left {
  transform: translateX(-180px);
  background: #ff0000;
  border-radius: 50%;
}
.face.left > img {
  transform-origin: 0 0;
  transform: rotateY(180deg);
}
.face.right {
  transform: translateX(180px);
  background: #ff0000;
  border-radius: 50%;
}

`;

const player = {
  n: 1,
  time: 100,
  id: undefined,
  ui: {
    demo: document.querySelector("#demo"),
    demo2: document.querySelector("#demo2"),
  },
  init: () => {
    player.ui.demo.innerText = string.substr(0, player.n);
    player.ui.demo2.innerHTML = string.substr(0, player.n);
    player.play();
  },
  events: {
    "#btnPause": "pause",
    "#btnPlay": "play",
    "#btnSlow": "slow",
    "#btnNormal": "normal",
    "#btnFast": "fast",
  },
  bindEvents: () => {
    for (let key in player.events) {
      if (player.events.hasOwnProperty(key)) {
        const value = player.events[key];
        document.querySelector(key).onclick = player[value];
      }
    }
  },
  run: () => {
    player.n += 1;
    if (player.n > string.length) {
      window.clearInterval(player.id);
      return;
    }
    player.ui.demo.innerText = string.substr(0, player.n);
    player.ui.demo2.innerHTML = string.substr(0, player.n);
    player.ui.demo.scrollTop = player.ui.demo.scrollHeight;
  },
  play: () => {
    window.clearInterval(player.id);
    player.id = setInterval(player.run, player.time);
  },
  pause: () => {
    window.clearInterval(player.id);
  },
  slow: () => {
    player.pause();
    player.time = 300;
    player.play();
  },
  normal: () => {
    player.pause();
    player.time = 100;
    player.play();
  },
  fast: () => {
    player.pause();
    player.time = 0;
    player.play();
  },
};

player.init();
player.bindEvents();
