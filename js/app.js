var allEnemies, player, move;
move = [0, 0];
// Enemies

// Function constructor for enemy
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/ghost.png';
}; 

// Array to store enemies
allEnemies = [];

// Function to create all enemies and push them to array with entites, which will be rendered
var createEnemies = function() {
    var ghost1, ghost2, ghost3, ghost4, ghost5, ghost6, ghost7, ghost8, ghost9, ghost10;

    ghost1 = new Enemy(10, 500, 200);
    ghost2 = new Enemy(200, 500, 80);
    ghost3 = new Enemy(630, 500, 40);
    ghost4 = new Enemy(220, 430, -100);
    ghost5 = new Enemy(420, 430, -200);
    ghost6 = new Enemy(100, 370, 85);
    ghost7 = new Enemy(250, 370, 165);
    ghost8 = new Enemy(580, 300, -85);
    ghost9 = new Enemy(320, 300, -40);
    ghost10 = new Enemy(420, 300, -95);

    allEnemies.push(ghost1, ghost2, ghost3, ghost4, ghost5, ghost6, ghost7, ghost8, ghost9, ghost10);
}
createEnemies();

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.speed) {
        this.x += this.speed * dt;
        if (this.x <= - 50) {
            this.x = 750;
        } else if (this.x >= 750) {
            this.x = -50;
        }
    } else {
        this.x -= move[0];
        this.y -= move[1];
        if (this.x <= 0) {
            this.x = 0;
        } else if (this.x >= 630) {
            this.x = 630;
        }
        if (this.y > 70 && this.y <= 198) {
            this.y = 198;
        } else if (this.y >= 540) {
            this.y = 540;
        }
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update() and
// a handleInput() method.

// Player

// Function constructor for player
var Player = function(sprite) {
    this.x = 317;
    this.y = 540;
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


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
