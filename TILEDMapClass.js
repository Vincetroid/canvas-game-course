var gMap = {

    currMapData: null,

    numXTiles: 26,
    numYTiles: 19,

    tileSets: [],

    tileSize: {
        "x": 32,
        "y": 32
    },

    pixelSize: {
        "x": 32,
        "y": 32
    },
    
    imgLoadCount: 0,

    fullyLoaded: false,

    load: function (map) {

        this.xhrGet(map, (data) => {
            // debugger
            console.log('data')
            console.log(data)
            // Once the XMLHttpRequest loads, call the
            // parseMapJSON method.
            gMap.parseMapJSON(data.currentTarget.responseText); 
        });
        
    },

    xhrGet: function (reqUri, callback) {
        var xhr = new XMLHttpRequest();
    
        xhr.open("GET", reqUri, true);
        xhr.onload = callback;
    
        xhr.send();
    },

    parseMapJSON: function (mapJSON) {
        console.log('mapJSON');
        console.log(mapJSON);
        
        // debugger;
        
        gMap.currMapData = JSON.parse(mapJSON);

        const map = gMap.currMapData;
        this.numXTiles = map.height;
        this.numYTiles = map.width;
        this.tileSize.x = map.tilewidth;
        this.tileSize.y = map.tileheight;
        this.pixelSize.x = this.numXTiles * this.tilewidth;
        this.pixelSize.y = this.numYTiles * this.tileheight;
        
        map.tilesets.forEach((element, i) => {
            let img = new Image();

            img.onload = function() {
                this.imgLoadCount++;
                if (this.imgLoadCount === map.tilesets.length) {
                    this.fullyLoaded = true;              
                }
            };

            img.src = './map/' + map.tilesets[i].source;
            
            var ts = {
                
                "firstgid":  map.tilesets[i].firstgid,

                "image": img,
                "imageheight": 304,
                "imagewidth": 416,
                "name": "TiledSheet",

                "numXTiles": Math.floor( 416 / this.tileSize.x ),
                "numYTiles": Math.floor( 304 / this.tileSize.y )
            };

            this.tileSets.push(ts);

        });
 
    },

    getTilePacket: function (tileIndex) {

        var pkt = {
            "img": null,
            "px": 0,
            "py": 0
        };

        // The first thing we need to do is find the
        // appropriate tileset that we want to draw
        // from.
        //
        // Remember, if the tileset's 'firstgid'
        // parameter is less than the 'tileIndex'
        // of the tile we want to draw, then we know
        // that tile is not in the given tileset and
        // we can skip to the next one.
        //
        // YOUR CODE HERE

        

        // Next, we need to set the 'img' parameter
        // in our 'pkt' object to the Image object
        // of the appropriate 'tileset' that we found
        // above.
        //
        // YOUR CODE HERE


        // Finally, we need to calculate the position to
        // draw to based on:
        //
        // 1) The local id of the tile, calculated from the
        //    'tileIndex' of the tile we want to draw and
        //    the 'firstgid' of the tileset we found earlier.
        //
        // YOUR CODE HERE


        // 2) The (x,y) position of the tile in terms of the
        //    number of tiles in our tileset. This is based on
        //    the 'numXTiles' of the given tileset. Note that
        //    'numYTiles' isn't actually needed here. Think about
        //    how the tiles are arranged if you don't see this,
        //    It's a little tricky. You might want to use the 
        //    modulo and division operators here.
        //
        // YOUR CODE HERE

        // 3) the (x,y) pixel position in our tileset image of the
        //    tile we want to draw. This is based on the tile
        //    position we just calculated and the (x,y) size of
        //    each tile in pixels.
        //
        // YOUR CODE HERE


        return pkt;
    }

};
