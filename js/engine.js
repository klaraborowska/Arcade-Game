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

    canvas.width = 700;
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
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        // //checkCollisions();
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
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
            numCols = 10,
            row, col;
        
        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height)

        //Loop through the number of rows and columns and draw the correct image for that portion of the "grid"
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {

                // For all the rows except last one
                if (row != numRows - 1) {
                    ctx.drawImage(Resources.get(rowImages[row]), col * 70, row * 70);

                // For the last row (for layout improvment)    
                } else {
                    ctx.drawImage(Resources.get(rowImages[row]), col * 70, (row - 1) * 70);
                }
            }
        }

        // Draw the layout, additional elements
        ctx.drawImage(Resources.get('images/doorOpenSmall.png'), 210, 12);
        ctx.drawImage(Resources.get('images/boxBlock.png'), 0, 70);
        ctx.drawImage(Resources.get('images/boxBlock.png'), 70, 70);
        ctx.drawImage(Resources.get('images/boxBlock.png'), 140, 70);
        ctx.drawImage(Resources.get('images/boxBlock.png'), 210, 70);
        ctx.drawImage(Resources.get('images/doorLockedTop.png'), 630, 140);
        ctx.drawImage(Resources.get('images/doorLockedBottom.png'), 630, 210);
        ctx.drawImage(Resources.get('images/cloud1.png'), 540, 20);
        ctx.drawImage(Resources.get('images/cloud2.png'), 350, 100);
        ctx.drawImage(Resources.get('images/bush.png'), 100, 210);
        ctx.drawImage(Resources.get('images/bush.png'), 450, 210);
        ctx.drawImage(Resources.get('images/signRight.png'), 520, 210);
        ctx.drawImage(Resources.get('images/star.png'), 0, 0);

        renderEntities();
    }

    // Render enemies and player
    function renderEntities() {

        //Loop through all of the objects within the allEnemies array render enemies
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        // noop
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
        'images/cloud1.png',
        'images/cloud2.png',
        'images/bush.png',
        'images/signRight.png',
        'images/star.png',
        'images/ghost.png',
        'images/player1.png',
        'images/player2.png',
        'images/player3.png',
        'images/player4.png',
        'images/player5.png',
    ]);
    Resources.onReady(init);

    //Assign the canvas context object to the global variable (the window object when run in a browser), so it's easier to use it in app.js file
    global.ctx = ctx;

})(this);