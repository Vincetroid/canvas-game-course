////////////////////////////////////////////////////////////////////
//
// QUIZ
// 
// Write the 'bind' function so that we have a proper abstraction
// between the keys that are pressed and the actions we want to
// take.
// 
// Next, rewrite 'onKeyUp' and 'onKeyDown' to take advantage of the
// new 'bindings' and 'actions' dictionaries in kind.
// 
// More detailed instructions are below.
// 
// You can assume that our canvas element has an ID of 'my_canvas'.
//
////////////////////////////////////////////////////////////////////

var inputEngine = {

	// A dictionary mapping ASCII key codes to string values
	// describing the action we want to take when that key is
	// pressed.
	bindings: {},

	// A dictionary mapping actions that might be taken in our
	// game to a boolean value indicating whether that action
	// is currently being performed.
	actions: {},

	mouse: {
		x: 0,
		y: 0
	},

	//-----------------------------
	setup: function () {
		// Example usage of bind, where we're setting up
		// the W, A, S, and D keys in that order.
		this.bind(87, 'move-up');
		this.bind(65, 'move-left');
		this.bind(83, 'move-down');
		this.bind(68, 'move-right');

		// Adding the event listeners for the appropriate DOM events.
        document.getElementById('my_canvas').addEventListener('mousemove', this.onMouseMove.bind(this));
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
		// document.getElementById('my_canvas').addEventListener('keydown', gInputEngine.onKeyDown);
		// document.getElementById('my_canvas').addEventListener('keyup', gInputEngine.onKeyUp);
	},

	//-----------------------------
	onMouseMove: function (event) {
        // console.log(event, this)
		this.mouse.x = event.clientX;
        this.mouse.y = event.clientY;
        
	    // console.log(this.mouse);
	},

	//-----------------------------
	onKeyDown: function (event) {
        console.log('onkeyDown')
        // TASK #2
		// Grab the keyID property of the event object parameter,
		// then set the equivalent element in the 'actions' object
		// to true.
		// 
		// You'll need to use the bindings object you set in 'bind'
		// in order to do this.
		//
        const keyID = event.keyCode;
        const action = this.bindings[keyID];
        if (action) {
            this.actions[action] = true;
        }
        
        // update();
        console.log('this.act');
        console.log(this.actions);
	},
    
	//-----------------------------
	onKeyUp: function (event) {
        console.log('onkeyUp')
		// TASK #3
		// Grab the keyID property of the event object parameter,
		// then set the equivalent element in the 'actions' object
		// to false.
		// 
		// You'll need to use the bindings object you set in 'bind'
		// in order to do this.
		//
        // YOUR CODE HERE
        
        const keyID = event.keyCode;
        const action = this.bindings[keyID];
        if (action) {
            this.actions[action] = false;
        }
        
        // update();
        console.log('this.act');
        console.log(this.actions);
	},

	// TASK #1
	// The bind function takes an ASCII keycode
	// and a string representing the action to
	// take when that key is pressed.
	// 
	// Fill in the bind function so that it
	// sets the element at the 'key'th value
	// of the 'bindings' object to be the
	// provided 'action'.
	bind: function (key, action) {
        this.bindings[key] = action;
        console.log('this.bindings');
        console.log(this.bindings);
        
	}

};

