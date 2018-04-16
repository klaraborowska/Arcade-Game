var allEnemies, player, playerStartX, playerStartY;

playerStartX = 350;
playerStartY = 560;

// ENEMIES

// Function constructor for enemy
var Enemy = function(x, y, speed, sprite) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/ghost' + sprite + '.png';
}; 

// Array to store enemies
allEnemies = [];

// Function to create all enemies and push them to array with entites, which will be rendered, it can be invoked right at the begining of the game
var createEnemies = (function() {
    var ghost1, ghost2, ghost3, ghost4, ghost5, ghost6, ghost7, ghost8, ghost9, ghost10;

    ghost1 = new Enemy(10, 500, 200, 2);
    ghost2 = new Enemy(200, 500, 40, 3);
    ghost3 = new Enemy(630, 500, 100, 1);
    ghost4 = new Enemy(220, 430, -100, 11);
    ghost5 = new Enemy(420, 430, -200, 22);
    ghost6 = new Enemy(100, 370, 35, 3);
    ghost7 = new Enemy(250, 370, 165, 2);
    ghost8 = new Enemy(580, 300, -45, 33);
    ghost9 = new Enemy(320, 300, -80, 11);
    ghost10 = new Enemy(20, 300, -175, 22);

    allEnemies.push(ghost1, ghost2, ghost3, ghost4, ghost5, ghost6, ghost7, ghost8, ghost9, ghost10);
})();

// Update the element position, the method will be used also to update player position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // For enemy
    if(this.speed) {
        this.x += this.speed * dt;

        // When enemy goes off the canvas, bring it back on the other side
        if (this.x <= - 50) {
            this.x = 750;
        } else if (this.x >= 750) {
            this.x = -50;
        }

    // For player
    } else {
        this.x -= this.move[0];
        this.y -= this.move[1];
        this.move = [0, 0];

        // Doesn't allow the player to go off canvas
        if (this.x <= 0) {
            this.x = 0;
        } else if (this.x >= 700) {
            this.x = 700;
        } 
        if (this.y <= 198) {
            this.y = 198;
        } else if (this.y >= 560) {
            this.y = 560;
        }
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// PLAYERS

// Function constructor for player
var Player = function(sprite) {
    this.x = playerStartX;
    this.y = playerStartY;
    this.move = [0, 0];
    this.sprite = sprite;
}; 

// Setting inheritance chain to inherit the render and update method from Enemy
Player.prototype = Object.create(Enemy.prototype);

// Function to create all enemies and push them to array with entites, which will be rendered
var createPlayers = function() {
    var player1, player2, player3, player4, player5;

    player1 = new Player('images/player1.png');
    player2 = new Player('images/player2.png');
    player3 = new Player('images/player3.png');
    player4 = new Player('images/player4.png');
    player5 = new Player('images/player5.png');

    player = player1;
};
createPlayers();

// Move the player after listening to keyboar event
Player.prototype.handleInput = function(dir) {
    if (dir == "left") {
        this.move[0] = 70;
    } else if (dir == "right") {
        this.move[0] = -70;
    } else if (dir == "up") {
        this.move[1] = 70;
    } else if (dir == "down") {
        this.move[1] = -70;
    } 
};

// Listen for key presses and sends the keys to handleInput function 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});