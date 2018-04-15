// Array to store elements that needs to be rendered (enemies, player and additional layout elements)

var entities = [];

// Additional layout elements

var LayoutElement = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}

var createElements = (function() {
    
    var doorSmall, boxFirst, boxSecond, boxThird, boxFourth, doorLockedT, doorLockedB, cloud1, cloud2, bush1, bush2, signRight, star;
    
    doorSmall = new LayoutElement(210, 12, 'images/doorOpenSmall.png');
    boxFirst = new LayoutElement(0, 70, 'images/boxBlock.png');
    boxSecond = new LayoutElement(70, 70, 'images/boxBlock.png');
    boxThird = new LayoutElement(140, 70, 'images/boxBlock.png');
    boxFourth = new LayoutElement(210, 70, 'images/boxBlock.png');
    doorLockedT = new LayoutElement(630, 140, 'images/doorLockedTop.png');
    doorLockedB = new LayoutElement(630, 210, 'images/doorLockedBottom.png');
    cloud1 = new LayoutElement(540, 20, 'images/cloud1.png');
    cloud2 = new LayoutElement(350, 100, 'images/cloud2.png');
    bush1 = new LayoutElement(100, 210, 'images/bush.png');
    bush2 = new LayoutElement(450, 210, 'images/bush.png');
    signRight = new LayoutElement(520, 210, 'images/signRight.png');
    star = new LayoutElement(0, 0, 'images/star.png');

    entities.push(doorSmall, boxFirst, boxSecond, boxThird, boxFourth, doorLockedT, doorLockedB, cloud1, cloud2, bush1, bush2, signRight, star);
})();

LayoutElement.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid

var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/ghost.png';
}; 

// Setting inheritance chain to inherit the render method

Enemy.prototype = Object.create(LayoutElement.prototype);

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

    entities.push(ghost1, ghost2, ghost3, ghost4, ghost5, ghost6, ghost7, ghost8, ghost9, ghost10);
}

createEnemies();

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game

//Enemy.prototype.render = function() {
    
    //ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
//};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


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
