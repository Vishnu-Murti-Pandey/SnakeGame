let direction = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');

let speed = 7;
let lastPaintTime = 0;   // to run/paint teh screen
let snakeArr = [{ x: 13, y: 15 }];

let food = { x: 5, y: 8 };
let score = 0;

// Game function
function main(ctime) {
    window.requestAnimationFrame(main)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime
    // console.log(ctime)
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // If you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;
}

function gameEngine() {
    // Update snake array

    if (isCollide(snakeArr)) {
        moveSound.pause()
        gameOverSound.play();
        direction = { x: 0, y: 0 }
        alert("Game Over!!! Press Ok to Start again!");
        snakeArr = [{ x: 13, y: 15 }];
        // musicSound.play();
        score = 0;
    }

    // If you have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score = score + 1;

        if (score > hiScoreval) {
            hiScoreval = score;
            localStorage.setItem("hiScore", JSON.stringify(hiScoreval));
            hiScoreBox.innerHTML = "HiScore: " + hiScoreval;
        }

        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };

    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;

    // Display snake 
    board.innerHTML = "";
    snakeArr.forEach((ele, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = ele.y;   //appned css with javascript
        snakeElement.style.gridColumnStart = ele.x;   //appned css with javascript

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Display Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Logic starts here
// musicSound.play();

let hiScore = localStorage.getItem("hiScore");
if (hiScore === null) {
    hiScoreVal = 0;
    localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
}
else {
    hiScoreval = JSON.parse(hiScore)
    hiScoreBox.innerHTML = "High score: " + hiScore;
}

window.requestAnimationFrame(main)

window.addEventListener('keydown', e => {
    direction = { x: 0, y: 1 } // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            direction.x = 0;
            direction.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            direction.x = 0;
            direction.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            direction.x = -1;
            direction.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            direction.x = 1;
            direction.y = 0;
            break;

        default:
            break;
    }

})
