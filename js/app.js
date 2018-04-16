var allEnemies, player;

// Enemies

// Function constructor for enemy
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/ghost.png';
}; 

// Array to store enemies
allEnemies = [];

// Function to create all enemies and push them to array with entites, which will be rendered
var createEnemies = function() {
    var ghost1, ghost2, ghost3, ghost4, ghost5, ghost6, ghost7, ghost8, ghost9, ghost10;

    ghost1 = new Enemy(10, 500);
    ghost2 = new Enemy(200, 500);
    ghost3 = new Enemy(630, 500);
    ghost4 = new Enemy(220, 430);
    ghost5 = new Enemy(420, 430);
    ghost6 = new Enemy(100, 370);
    ghost7 = new Enemy(250, 370);
    ghost8 = new Enemy(580, 300);
    ghost9 = new Enemy(320, 300);
    ghost10 = new Enemy(420, 300);

    allEnemies.push(ghost1, ghost2, ghost3, ghost4, ghost5, ghost6, ghost7, ghost8, ghost9, ghost10);
}
createEnemies();

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
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


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
