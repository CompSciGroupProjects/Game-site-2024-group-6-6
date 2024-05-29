const playerX = "X";
const playerO = "O";
let turn = playerX;
let curplayermode = 2;
const spaces = document.querySelectorAll(".spaces");

const winconditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

const boardstate = Array(spaces.length).fill(null);
const gamedone = document.getElementById("gamedone");
const gamedonetext = document.getElementById("gamedonetext");

spaces.forEach(space => space.addEventListener("click", spaceclick));

function hover() {
    spaces.forEach((space) => {
        space.classList.remove("xhover");
        space.classList.remove("ohover");
    });

    const hoverclass = `${turn.toLowerCase()}hover`;

    spaces.forEach((space) => {
        if (space.innerText === "") {
            space.classList.add(hoverclass);
        }
    });
}

hover();

function updateTurnMessage() {
    const turnmessage = document.getElementById("turnmessage");
    turnmessage.innerText = `Turn: Player ${turn}`;
}

function spaceclick(event) {
    if (gamedone.classList.contains("see")) {
        return;
    }

    const space = event.target;
    const spaceIndex = space.dataset.index;

    if (space.innerText !== "") {
        return;
    }

    if (turn === playerX) {
        space.innerText = playerX;
        boardstate[spaceIndex - 1] = playerX;
        turn = playerO;
    } else {
        space.innerText = playerO;
        boardstate[spaceIndex - 1] = playerO;
        turn = playerX;
    }
    hover();
    checkwinner();
    updateTurnMessage();

    if (curplayermode === 1 && turn === playerO && !gamedone.classList.contains("see")) {
        setTimeout(computermove, 500);
    }
}

function computermove() {
    const winningmove = findwinningmove(playerO);
    if(winningmove !== null) {
        makemove(winningmove, playerO);
        return;
    }

    const blocking = findwinningmove(playerX);
    if(blocking !== null) {
        makemove(blocking, playerO);
        return;
    }

    const okspaces = boardstate
        .map((val, index) => (val === null ? index : null))
        .filter(val => val !== null);

    if (okspaces.includes(4)) {
        makemove(4, playerO);
        return;
    }

    const corners = [0, 2, 6, 8];
    const availableCorners = okspaces.filter(index => corners.includes(index));
    if (availableCorners.length > 0) {
        const randomCorner = Math.floor(Math.random() * availableCorners.length);
        makemove(availableCorners[randomCorner], playerO);
        return;
    }

    const randomindex = Math.floor(Math.random() * okspaces.length);
    const spacesindex = okspaces[randomindex];
    makemove(spacesindex, playerO);
}

function findwinningmove(player) {
    for (const combo of winconditions) {
        const [a, b, c] = combo.map(index => boardstate[index - 1]);
        const indexes = combo.map(index => index -1);
        if (a === player && b === player && c == null) return indexes[2];
        if (a === player && c === player && b == null) return indexes[1];
        if (b === player && c === player && a == null) return indexes[0];
    }
    return null;
}

function makemove(index, player) {
    const space = spaces[index];
    space.innerText = player;
    boardstate[index] = player;
    turn = player === playerX ? playerO : playerX;
    hover();
    checkwinner();
    updateTurnMessage();
}

function checkwinner() {
    for (const combo of winconditions) {
        const space1 = boardstate[combo[0] - 1];
        const space2 = boardstate[combo[1] - 1];
        const space3 = boardstate[combo[2] - 1];

        if (space1 !== null && space1 === space2 && space1 === space3) {
            gameover(space1);
            return;
        }
    }

    const allSpacesFilled = boardstate.every((space) => space !== null);
    if (allSpacesFilled) {
        gameover(null);
    }
}

function gameover(winnerText) {
    let text = "Tie!";
    if (winnerText !== null) {
        text = `The winner is ${winnerText}!`;
    }
    gamedone.className = "see";
    gamedonetext.innerText = text;
}

function restart() {
    gamedone.className = "hide";
    boardstate.fill(null);
    spaces.forEach((space) => (space.innerText = ""));
    turn = playerX;
    hover();
    updateTurnMessage();
}

function game(mode) {
    curplayermode = mode;
    restart();
    const gamemessage = document.getElementById("gamemessage");
    if (mode=== 1) {
        gamemessage.innerText = "You are playing against the computer.";
    }
    else {
        gamemessage.innerText = "You are playing against another person.";
    }
}
