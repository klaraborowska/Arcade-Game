// Variables for DOM manipulation
const DOMstrings = {
    welcomeBanner: document.querySelector(".popup-welcome"),
    endBanner: document.querySelector(".end-banner"),
    endImg: document.querySelector(".final-img"),
    endTitle: document.querySelector(".final-title"),
    startBtn: document.querySelector("#start"),
    playAgainBtn: document.querySelector("#play-again"),
    players: document.getElementsByName("players"),
    soundBtn: document.querySelector(".sound-btn"),
    soundOn: document.querySelector(".sound-on"),
    soundOff: document.querySelector(".sound-off")
};


// GAME

// Function constructor for the game
const Game = function() {
    this.width = 700;
    this.colWidth = 70;
    this.colHeight = 70;
    this.playerStartX = 358;
    this.playerStartY = 560;
};

const game = new Game();

// Reset all the settings to the initial state
Game.prototype.reset = function() {
    player.x = this.playerStartX;
    player.y = this.playerStartY;
    doorKey.y = this.colHeight * (Math.floor(Math.random() * 4) + 4) + 25;
    player.end = false;
    player.collectedGems = 0;
    player.live = 3;
    allEnemies = [];
    allExtras = [];
    createEnemies();
    createExtras();
};


// ENEMIES

// Function constructor for enemy
const Enemy = function(x, y, speed, sprite) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/ghost' + sprite + '.png';
}; 

// Create enemies and push them to array
let allEnemies = [];
function createEnemies() {
    const ghost1 = new Enemy(10, 500, 200, 2),
          ghost2 = new Enemy(200, 500, 40, 3),
          ghost3 = new Enemy(630, 500, 100, 1),
          ghost4 = new Enemy(220, 430, -100, 11),
          ghost5 = new Enemy(420, 430, -250, 22),
          ghost6 = new Enemy(100, 370, 35, 3),
          ghost7 = new Enemy(250, 370, 205, 2),
          ghost8 = new Enemy(580, 300, -45, 33),
          ghost9 = new Enemy(320, 300, -80, 11),
          ghost10 = new Enemy(20, 300, -225, 22);

    allEnemies.push(ghost1, ghost2, ghost3, ghost4, ghost5, ghost6, ghost7, ghost8, ghost9, ghost10);
}
createEnemies();

// Update the enemy position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    // When enemy goes off the canvas, bring it back on the other side
    if (this.x <= - 50) {
        this.x = game.width + 50;
    } else if (this.x >= game.width + 50) {
        this.x = -50;
    }
};

// Draw the enemy on the canvas
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// PLAYER

// Function constructor for player
const Player = function() {
    this.x = game.playerStartX;
    this.y = game.playerStartY;
    this.move = [0, 0];
    this.live = 3;
    this.collectedGems = 0;
    this.end = false;
    this.sprite = 'images/player1.png';
}; 

const player = new Player();

// Render player method
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Change image of the player
Player.prototype.choosePlayer = function() {
    const players = DOMstrings.players;
    for (let i = 0; i < players.length; i++) {
        if (players[i].checked) {
            this.sprite = 'images/' + players[i].id + '.png';
        }
    }  
};

// Move the player after listening to keyboar event
Player.prototype.handleInput = function(dir) {
    if (dir == "left") {
        this.move[0] = game.colWidth;
    } else if (dir == "right") {
        this.move[0] = -game.colWidth;
    } else if (dir == "up") {
        this.move[1] = game.colHeight;
    } else if (dir == "down") {
        this.move[1] = -game.colHeight;
    } 
};

// Update players move and reset moves after
Player.prototype.checkMoves = function() {
    this.x -= this.move[0];
    this.y -= this.move[1];
    this.move = [0, 0];
};

// Doesn't allow the player to go off canvas
// Player is allowed to jump down to the ground and enter the door again
Player.prototype.blockOffCanvas = function() {
     if (this.x <= 0) {
        this.x = 0;
    } else if (this.x >= 10 * game.colWidth) {
        this.x = 10 * game.colWidth;
    } 
    if (this.y <= 3 * game.colHeight && this.y > 1) {
        this.y = 3 * game.colHeight;
    } else if (this.y >= 8 * game.colHeight  && this.y < 1000) {
        this.y = 8 * game.colHeight ;
    }
    // When the player reach the top door
    if (this.y < 70 && this.x > 210) {
        this.y = 0;
        this.x = 210;
    }
    if (this.y < 0) {
        this.y = 0;
    }
};

// Update players position
Player.prototype.update = function() {
    this.checkMoves();
    this.blockOffCanvas();
};

// Render the key, when player collect 5 gems
Player.prototype.showKeydoor = function() {
    if (player.collectedGems > 4) {
        allExtras.push(doorKey);
    }
};

// When player enter the door, move him to to the top
Player.prototype.enterDoor = function() {
    if (this.x > 690 && this.y == 210) {
        if (audioOn){
            new Audio('audio/door.wav').play();
        }
        this.x = 210;
        this.y = 0;
    }  
};

Player.prototype.lose = function() {
    if (this.live === 0) {
        if (audioOn){
            new Audio('audio/lose.wav').play();
        }
        this.y = 2000;
        this.endGame();
    }
};

Player.prototype.win = function() {
    if (this.x < 70 && this.y < 70) {
        this.end = true;
        this.endGame();
        if (audioOn) {
            new Audio('audio/win.wav').play();
        }
        this.x = 71;
    }
};

Player.prototype.endGame = function() {
    this.end = true;
    DOMstrings.endBanner.classList.add("show");
    DOMstrings.endImg.src = this.sprite;
    if (this.y > 1000) {
        DOMstrings.endTitle.textContent = "I'm sorry! You lost!";
        DOMstrings.playAgainBtn.focus();
    } else {
        DOMstrings.endTitle.textContent = "Congratulations! You won!";
        DOMstrings.playAgainBtn.focus();
    }
};


// EXTRA ITEMS

// Function constructor for extra items
const ExtraItem = function () {
    this.x = game.colWidth * Math.floor(Math.random() * 10) + 10;
    this.y = game.colHeight * (Math.floor(Math.random() * 4) + 4) + 25;
    this.sprite = 'images/gem.png';
};

// Setting inheritance chain to inherit the render method from Enemy
ExtraItem.prototype = Object.create(Enemy.prototype);

// Create extra items and push them to array
let allExtras = [];
function createExtras() {
    const gem1 = new ExtraItem(),
          gem2 = new ExtraItem(),
          gem3 = new ExtraItem(),
          gem4 = new ExtraItem(),
          gem5 = new ExtraItem(),
          gem6 = new ExtraItem(),
          gem7 = new ExtraItem();

    allExtras.push(gem1, gem2, gem3, gem4, gem5, gem6, gem7);
}
createExtras();

// Method to remove extra items
ExtraItem.prototype.remove = function() {
    this.y = 1000;
};

// New door Key object, outside of createExtras - must be rendered later
const doorKey = new ExtraItem();
doorKey.sprite = 'images/key.png';

// Method to open and enter the door
doorKey.renderDoor = function() {
    ctx.drawImage(Resources.get('images/doorOpenTop.png'), 690, 140);
    ctx.drawImage(Resources.get('images/doorOpenBottom.png'), 690, 210);
    player.enterDoor();
};

// Function constructor for lives
const Lives = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/heartFull.png';
};

// Setting inheritance chain to inherit the render method from Enemy
Lives.prototype = Object.create(Enemy.prototype);

// Create lives and push them to array
let allLives = [];
function createLives() {
    const heart1 = new Lives(520, 25),
          heart2 = new Lives(550, 25),
          heart3 = new Lives(580, 25);

    allLives.push(heart1, heart2, heart3);
}
createLives();


// CHECK COLLISIONS enemy-player, player-extraItem

// Check collision between player and enemies 
function checkCollision() {
    allEnemies.forEach(function(enemy) {
        let yDiff = enemy.y - player.y;
        let xDiff = player.x - enemy.x;
        
        if (yDiff > 0 && yDiff < 50) {

            if (player.x > enemy.x && xDiff < 35 || player.x < enemy.x && Math.abs(xDiff) < 52) {
                if (audioOn){
                    new Audio('audio/ghost.wav').play();
                }
                player.x = game.playerStartX;
                player.y = game.playerStartY;
                player.live -= 1;
            } 
            player.lose();
        }
    });
}

// Function to collect extra items
function collectExtras() {
    allExtras.forEach(function(item) {
        if (Math.abs(player.y - item.y) < 30 && Math.abs(player.x - item.x) < 30) {
            if (audioOn) {
                new Audio('audio/gem.wav').play();
            }
            item.remove();
            player.collectedGems += 1;
        }
    });
}


// EVENT LISTENERS

// Event listener to choose a player and start a game
DOMstrings.startBtn.addEventListener("submit", function(e) {
    player.choosePlayer();
    DOMstrings.welcomeBanner.classList.add("hide");
    e.preventDefault();
});

// Event listener to turn on/off audio
DOMstrings.soundBtn.addEventListener('click', function() {
    DOMstrings.soundOn.classList.toggle("hide");
    DOMstrings.soundOff.classList.toggle("hide");
    if (audioOn === true) {
        audioOn = false;
    } else {
        audioOn = true;
    }
});

// Event listener to play again and reset the game
DOMstrings.playAgainBtn.addEventListener('click', function() {
    game.reset();
    DOMstrings.endBanner.classList.remove("show");
});

// Listen for key presses and sends the keys to handleInput function 
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (player.live > 0 && player.end === false && DOMstrings.welcomeBanner.classList.contains("hide")) {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});