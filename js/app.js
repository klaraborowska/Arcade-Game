// Additional layout characters

var LayoutElement = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}

var elements = [];

function createElements() {
    
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

    elements.push(doorSmall, boxFirst, boxSecond, boxThird, boxFourth, doorLockedT, doorLockedB, cloud1, cloud2, bush1, bush2, signRight, star);

};
createElements();

LayoutElement.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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
