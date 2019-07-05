var gSpriteSheets = {};

// SpriteSheetClass = Class.extend({
var spriteSheet = {
    img: null,
    url: "",
    sprites: [],

    init: function() { console.log('init')},

    load: function(imgName) {
        
        var img = new Image();
        img.src = imgName;
        this.img = img;
        this.url = imgName;
        gSpriteSheets[imgName] = this;
        // console.log('gSpriteSheets');
        // console.log(gSpriteSheets);
    },

    defSprite: function (name, x, y, w, h, cx, cy) {
        // debugger
        var spt = {
            "id": name,
            "x": x,
            "y": y,
            "w": w,
            "h": h,
            "cx": cx === null ? 0 : cx,
            "cy": cy === null ? 0 : cy,
        };
        this.sprites.push(spt);
    },

    parseAtlasDefinition: function(atlasJSON) {
        
        // var parsed = JSON.parse(atlasJSON);
        // debugger;
        var parsed = atlasJSON;

        for(var key in parsed.frames) {
            var sprite = parsed.frames[key];
            //Definir el centro del sprite como un offset
            var cx = -sprite.frame.w * 0.5;
            var cy = -sprite.frame.h * 0.5;

            //si el atlas tiene objetos con atributo trimmed
            if (sprite.trimmed) {
                cx = sprite.spriteSourceSize.x - (sprite.sourceSize.w * 0.5);
                cy = sprite.spriteSourceSize.y - (sprite.sourceSize.h * 0.5);
            }

            // console.log('filename');
            // console.log(sprite.filename);
            //Definir el sprite para esta hoja
            this.defSprite(sprite.filename, sprite.frame.x, sprite.frame.y, sprite.frame.w, sprite.frame.h, cx, cy)
            // this.defSprite(key, sprite.frame.x, sprite.frame.y, sprite.frame.w, sprite.frame.h, cx, cy)
        }
    },

    //-----------------------------------------
	// Walk through all the sprite definitions for this
    // atlas, and find which one matches the name.
	getStats: function (name) {
        // For each sprite in the 'sprites' Array...
        // debugger
		for(var i = 0; i < this.sprites.length; i++) {
            
            // Check if the sprite's 'id' parameter
            // equals the passed in name...
            // debugger;
            if(this.sprites[i].id === name) {
                // debugger;
                // and return that sprite if it does.
                return this.sprites[i];
            }

		}

        // If we don't find the sprite, return null.
		return null;
    },
    

}
// });

function drawSprite(spriteName, posX, posY){
    //Iterar por todos los spritesheets para encontrar el que queremos
    // debugger;
    for (const sheetName in gSpriteSheets) {
        // debugger;
        const sheet = gSpriteSheets[sheetName];
        const sprite = sheet.getStats(spriteName);
        if (sprite == null) continue;

        __drawSpriteInternal(sprite, sheet, posX, posY);

        return;
    }
}

function __drawSpriteInternal(spt, sheet, posX, posY) {
    if (spt == null || sheet == null) return;
    
    var hlf = {
        x: spt.cx,
        y: spt.cy
    };
    
    // debugger;
    context.drawImage(sheet.img, spt.x, spt.y, spt.w, spt.h, posX + hlf.x, posY + hlf.y, spt.w, spt.h);
}

function test() {
    console.log('I am test');
}