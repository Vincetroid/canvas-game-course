gameEngine.update();
if (gInputEngine.state('move-up')) {
    move_dir.y -= 1;
}

//client/Scripts/core/clientGameEngine.js
gameEngine.init = function() {
    gInputEngine.bind(gInputEngine.KEY.W, 'move-up');
    gInputEngine.bind(gInputEngine.KEY.S, 'move-down');
}

//client/scripts/core/InputManager.js
inputManager = Class.extend(
{
    keys: {},
    bindings: {},

    bind: function (key, action) {

    },

    onKeyDownEvent: function (keyCode, event) {

    }
});