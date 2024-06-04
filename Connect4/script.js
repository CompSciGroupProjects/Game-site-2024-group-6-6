let row0 = ["white", "white", "white", "white", "white", "white", "white"]
let row1 = ["white", "white", "white", "white", "white", "white", "white"]
let row2 = ["white", "white", "white", "white", "white", "white", "white"]
let row3 = ["white", "white", "white", "white", "white", "white", "white"]
let row4 = ["white", "white", "white", "white", "white", "white", "white"]
let row5 = ["white", "white", "white", "white", "white", "white", "white"]
let rows = [row0, row1, row2, row3, row4, row5]
let winner = false;
function turn (id) {
    if (winner === false) {
        if (document.getElementById("turnteller").style.border === "3px solid lightgreen" || document.getElementById(id).style.backgroundColor === "white") {
            let box;
            let row;
            for (let x = 0; x < rows.length; x++) {
                if (rows[x][id.substring(1, 2)] === "white") {
                    box = x + "" + id.substring(1, 2);
                    row = x;
                }
            }
            document.getElementById(box).style.backgroundColor = "lightgreen";
            rows[row][id.substring(1, 2)] = "yellow";
            if (checkFor4())
                document.getElementById("turnteller").innerHTML = "Green Wins!"
            else if (checkForTie()) {
                document.getElementById("turnteller").style.border = "3px solid white"
                document.getElementById("turnteller").style.color = "white"
                document.getElementById("turnteller").innerHTML = "Tie!"
            }
            else {
                document.getElementById("turnteller").style.border = "3px solid hotpink"
                document.getElementById("turnteller").style.color = "hotpink"
                document.getElementById("turnteller").innerHTML = "Pink's Turn"
                document.getElementById("turnteller").style.background = "#B0E298"
            }
        } else {
            let box;
            let row;
            for (let x = 0; x < rows.length; x++) {
                if (rows[x][id.substring(1, 2)] === "white") {
                    box = x + "" + id.substring(1, 2);
                    row = x;
                }
            }
            document.getElementById(box).style.backgroundColor = "hotpink";
            rows[row][id.substring(1, 2)] = "red";
            if (checkFor4())
                document.getElementById("turnteller").innerHTML = "Pink Wins!"
            else if (checkForTie()) {
                document.getElementById("turnteller").style.border = "3px solid white"
                document.getElementById("turnteller").style.color = "white"
                document.getElementById("turnteller").innerHTML = "Tie!"
            }
            else {
                document.getElementById("turnteller").style.border = "3px solid lightgreen"
                document.getElementById("turnteller").style.color = "lightgreen"
                document.getElementById("turnteller").innerHTML = "Green's Turn"
                document.getElementById("turnteller").style.background = "#E072A4"
            }
        }
    }
}

function checkFor4 () {
    //Straight across
    let counter = 1;
for (let x = 0; x < rows.length; x++) {
    for (let y = 0; y < 4; y++) {
        counter = 1;
        let firstboxcolor = rows[x][y];
        if (firstboxcolor !== "white") {
            if (rows[x][y + 1] === firstboxcolor)
                counter++;
            if (rows[x][y + 2] === firstboxcolor)
                counter++;
            if (rows[x][y + 3] === firstboxcolor)
                counter++;
            if (counter === 4) {
                winner = true;
                return true;
            }
            }
        }
    }

    //Up and down
    counter = 1;
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 7; y++) {
            counter = 1;
            let firstboxcolor = rows[x][y];
            if (firstboxcolor !== "white") {
                if (rows[x + 1][y] === firstboxcolor)
                    counter++;
                if (rows[x + 2][y] === firstboxcolor)
                    counter++;
                if (rows[x + 3][y] === firstboxcolor)
                    counter++;
                if (counter === 4) {
                    winner = true;
                    return true;
                }
            }
        }
    }

    //Diagonal down right
    counter = 1;
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 4; y++) {
            counter = 1;
            let firstboxcolor = rows[x][y];
            if (firstboxcolor !== "white") {
                if (rows[x + 1][y + 1] === firstboxcolor)
                    counter++;
                if (rows[x + 2][y + 2] === firstboxcolor)
                    counter++;
                if (rows[x + 3][y + 3] === firstboxcolor)
                    counter++;
                if (counter === 4) {
                    winner = true;
                    return true;
                }
            }
        }
    }

    //Diagonal down left
    counter = 1;
    for (let x = 0; x < 3; x++) {
        for (let y = 6; y >= 0; y--) {
            counter = 1;
            let firstboxcolor = rows[x][y];
            if (firstboxcolor !== "white") {
                if (rows[x + 1][y - 1] === firstboxcolor)
                    counter++;
                if (rows[x + 2][y - 2] === firstboxcolor)
                    counter++;
                if (rows[x + 3][y - 3] === firstboxcolor)
                    counter++;
                if (counter === 4) {
                    winner = true;
                    return true;
                }
            }
        }
    }
    return false;
}

function checkForTie() {
    for (let x = 0; x < rows.length; x++) {
        for (let y = 0; y < rows[x].length; y++) {
            if (rows[x][y] === "white")
                return false;
        }
    }
    return true;
}
function reset () {
  location.reload();
}