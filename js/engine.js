// Engine.js

// Make the canvas context (ctx) object globally available to make writing app.js simpler to work with
var Engine = (function(global) {

    //Predefine the variables, create the canvas element, grab the 2D context for that canvas
    //set the canvas elements height/width and add it to the DOM
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 770;
    canvas.height = 630;
    doc.body.appendChild(canvas);
   
    // Startpoint for the game loop, call the update and render methods
    function main() {

        // Get time delta information which is required if the game requires smooth animation
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        // Call update/render functions, pass along the time delta to our update function
        update(dt);
        render();

        // Set  lastTime variable which is used to determine the time delta for the next time this function is called
        lastTime = now;

        // Browser's requestAnimationFrame function to call this function again as soon as the browser is able to draw another frame.
        win.requestAnimationFrame(main);
    }

    // Initial setup at the beginning of the game
    function init() {
        lastTime = Date.now();
        main();
    }

    // Update position of enemies and player and check if they don't touch each other
    function update(dt) {
        updateEntities(dt);
        checkCollisions(allEnemies);
    }

    // When enemy touch the player, the player return to start position
   function checkCollisions(enemies) {
        allEnemies.forEach(function(enemy) {
            yDiff = enemy.y - player.y;
            xDiff = player.x - enemy.x;
            
            if (yDiff > 0 && yDiff < 50) {

                // enemies coming from left side
                if (player.x > enemy.x && xDiff < 35) {
                    player.x = playerStartX
                    player.y = playerStartY; 
                    player.live -= 1;

                // enemies coming from right side
                } else if (player.x < enemy.x && Math.abs(xDiff) < 55) {
                    player.x = playerStartX;
                    player.y = playerStartY;
                    player.live -= 1;
                }
            }
        });
    } 

    // Update the moves of enemies and player
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
        collectExtras();
    }

    // Draw the game elements on the canvas
    function render() {

        // Array with relative URL to the image used for the particular row of the game level
        var rowImages = [
                'images/skyBlock.png',     //row 1 of 4 of sky
                'images/skyBlock.png',     //row 2 of 4 of sky
                'images/skyBlock.png',     //row 3 of 4 of sky
                'images/skyBlock.png',     //row 4 of 4 of sky
                'images/grassBlock.png',   //row of grass 
                'images/groundBlock.png',  //row 1 of 4 of ground
                'images/groundBlock.png',  //row 2 of 4 of ground
                'images/groundBlock.png',  //row 3 of 4 of ground
                'images/groundBlock.png',  //row 4 of 4 of ground
                'images/bottomBlock.png'   //bottom row
            ],
            numRows = 10,
            numCols = 11,
            row, col;
        
        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height)

        //Loop through the number of rows and columns and draw the correct image for that portion of the "grid"
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {

                // For all the rows except last one
                if (row != numRows - 1) {
                    ctx.drawImage(Resources.get(rowImages[row]), col * columnWidth, row * rowHeight);

                // For the last row (for layout improvment)    
                } else {
                    ctx.drawImage(Resources.get(rowImages[row]), col * columnWidth, (row - 1) * rowHeight);
                }
            }
        }

        // Draw the layout, additional elements
        ctx.drawImage(Resources.get('images/doorOpenSmall.png'), 210, 10);
        ctx.drawImage(Resources.get('images/boxBlock.png'), 0, 70);
        ctx.drawImage(Resources.get('images/boxBlock.png'), 70, 70);
        ctx.drawImage(Resources.get('images/boxBlock.png'), 140, 70);
        ctx.drawImage(Resources.get('images/boxBlock.png'), 210, 70);
        ctx.drawImage(Resources.get('images/doorLockedTop.png'), 690, 140);
        ctx.drawImage(Resources.get('images/doorLockedBottom.png'), 690, 210);
        ctx.drawImage(Resources.get('images/cloud1.png'), 540, 20);
        ctx.drawImage(Resources.get('images/cloud2.png'), 350, 100);
        ctx.drawImage(Resources.get('images/bush.png'), 100, 210);
        ctx.drawImage(Resources.get('images/bush.png'), 450, 210);
        ctx.drawImage(Resources.get('images/signRight.png'), 520, 210);
        ctx.drawImage(Resources.get('images/star.png'), 0, 0);
        ctx.drawImage(Resources.get('images/num_' + player.collectedGems + '.png'), 710, 20);
        ctx.drawImage(Resources.get('images/heartEmpty.png'), 630, 25);
        ctx.drawImage(Resources.get('images/heartEmpty.png'), 600, 25);
        ctx.drawImage(Resources.get('images/heartEmpty.png'), 570, 25);
        // Render characters
        renderEntities();
    }

    // Render enemies and player
    function renderEntities() {

        // Loop through all of the objects within the allEnemies array render enemies
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        // Render all gems
        allExtras.forEach(function(gem) {
            gem.render();
        });

        // Render the key, when 5 gems are collected
        if (player.collectedGems > 4) {
            doorKey.render();
            
            // If doorKey is collected, open the doors
            if (doorKey.y >= 1000) {
                doorKey.renderDoor();
            }
        }

        // Render all lives that the player has
        for (var i = 0; i < player.live; i++) {
            liveArr[i].render();
        }

        player.render();
    }

    // Load all of the images needed for the game
    Resources.load([
        'images/bottomBlock.png',
        'images/grassBlock.png',
        'images/boxBlock.png',
        'images/skyBlock.png',
        'images/groundBlock.png',
        'images/doorOpenSmall.png',
        'images/doorLockedTop.png',
        'images/doorLockedBottom.png',
        'images/doorOpenTop.png',
        'images/doorOpenBottom.png',
        'images/cloud1.png',
        'images/cloud2.png',
        'images/bush.png',
        'images/signRight.png',
        'images/star.png',
        'images/ghost1.png',
        'images/ghost2.png',
        'images/ghost3.png',
        'images/ghost11.png',
        'images/ghost22.png',
        'images/ghost33.png',
        'images/player1.png',
        'images/player2.png',
        'images/player3.png',
        'images/player4.png',
        'images/player5.png',
        'images/gem.png',
        'images/key.png', 
        'images/num_0.png',
        'images/num_1.png',
        'images/num_2.png',
        'images/num_3.png',
        'images/num_4.png',
        'images/num_5.png',
        'images/num_6.png',
        'images/num_7.png',
        'images/heartEmpty.png',
        'images/heartFull.png'
    ]);
    Resources.onReady(init);

    //Assign the canvas context object to the global variable (the window object when run in a browser), so it's easier to use it in app.js file
    global.ctx = ctx;

})(this);