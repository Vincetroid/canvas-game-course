var gSpriteSheets = {};

SpriteSheetClass = Class.extend({
    img: null,
    url: "",
    sprites: new Array(),

    init: function() {},
    load: function(imgName) {
        this.url = imgName;

        var img = new Image();
        img.src = imgName;

        this.img = img;

        gSpriteSheets[imgName] = this;
    },

    defSprite = function (name, x, y, w, h, cx, cy) {
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

    parseAtlasDefinition = function(atlasJSON) {
        var parsed = JSON.parse(atlasJSON);

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

            //Definir el sprite para esta hoja
            this.defSprite(key, sprite.frame.x, sprite.frame.y, sprite.frame.w, sprite.frame.h, cx, cy)
        }
    },

    //-----------------------------------------
	// Walk through all the sprite definitions for this
    // atlas, and find which one matches the name.
	getStats: function (name) {
        // For each sprite in the 'sprites' Array...
		for(var i = 0; i < this.sprites.length; i++) {
            
            // Check if the sprite's 'id' parameter
            // equals the passed in name...
            if(this.sprites[i].id === name) {
                // and return that sprite if it does.
                return this.sprites[i];
            }

		}

        // If we don't find the sprite, return null.
		return null;
	}

});

function drawSprite(spriteName, posX, posY){
    //Iterar por todos los spritesheets para encontrar el que queremos
    for (const sheetName in gSpriteSheets) {
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

    ctx.drawImage(sheet.img, spt.x, spt.y, spt.w, spt.h, posX + hlf.x, posY + hlf.y, spt.w, spt.h);
}