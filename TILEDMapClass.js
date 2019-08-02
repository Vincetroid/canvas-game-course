var gMap = {

    currMapData: null,

    // numXTiles: 100,
    // numYTiles: 100,
    numXTiles: 26,
    numYTiles: 19,

    tileSets: [],

    tileSize: {
        "x": 16,
        "y": 16
    },

    pixelSize: {
        "x": 16,
        "y": 16
    },
    
    imgLoadCount: 0,

    fullyLoaded: false,

    load: function (map, context) {

        this.xhrGet(map, (data) => {
            // debugger
            // console.log('data')
            // console.log(data)
            // Once the XMLHttpRequest loads, call the
            // parseMapJSON method.
            gMap.parseMapJSON(data.currentTarget.responseText); 
            gMap.draw(context);
        });
        
    },

    xhrGet: function (reqUri, callback) {
        var xhr = new XMLHttpRequest();
    
        xhr.open("GET", reqUri, true);
        xhr.onload = callback;
    
        xhr.send();
    },

    parseMapJSON: function (mapJSON) {
        // console.log('mapJSON');
        // console.log(mapJSON);
        
        // debugger;
        
        gMap.currMapData = JSON.parse(mapJSON);

        const map = gMap.currMapData;
        this.numXTiles = map.width;
        this.numYTiles = map.height;
        this.tileSize.x = map.tilewidth;
        this.tileSize.y = map.tileheight;
        this.pixelSize.x = this.numXTiles * this.tilewidth;
        this.pixelSize.y = this.numYTiles * this.tileheight;


        // console.log('map.tilesets.length');
        // console.log(map.tilesets.length);

        // debugger
        // let img = new Image();
        //     img.onload = () => {
        //         console.log('within onload');
        //         this.imgLoadCount++;
        //         if (this.imgLoadCount === map.tilesets.length) {
        //             this.fullyLoaded = true;              
        //         }
        //     };

        map.tilesets.forEach((element, i) => {
            let img = new Image();
            // let img = await new Image().decode();
            // console.log('new image')
            // console.log(img)
            // let img = document.createElement("img");

            // debugger

            //se omitió onload porque no se disparaba
            this.imgLoadCount++;
            if (this.imgLoadCount === map.tilesets.length) {
                this.fullyLoaded = true;
                // debugger;
            }

            //opcion 1 sin funcionar
            // img.onload = function() {
            //     console.log('within onload');
            //     this.imgLoadCount++;
            //     if (this.imgLoadCount === map.tilesets.length) {
            //         this.fullyLoaded = true;              
            //     }
            // };

            //opcion 2 sin fun
            // img.addEventListener("load", 
            //     function() {
            //         console.log('within onload');
            //         this.imgLoadCount++;
            //         if (this.imgLoadCount === map.tilesets.length) {
            //             this.fullyLoaded = true;              
            //         }
            //     }, 
            // false);

            img.src = './map/' + map.tilesets[i].image;

            var ts = {
                
                "firstgid":  map.tilesets[i].firstgid,

                "image": img,
                "imageheight": 304,
                "imagewidth": 416,
                "name": "TiledSheet",

                "numXTiles": Math.floor( 416 / this.tileSize.x ),
                "numYTiles": Math.floor( 304 / this.tileSize.y )
            };
            console.log('ts')
            console.log(ts)

            this.tileSets.push(ts);

        });
 
    },

    getTilePacket: function (tileIndex, counter) {


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
        
        // if (firstgid < tileIndex) {
        //     return;
        // }

        var i = 0;
        for (i = this.tileSets.length - 1; i >= 0; i--) {
            if(this.tileSets[i].firstgid <= tileIndex) break;
        }

        // Next, we need to set the 'img' parameter
        // in our 'pkt' object to the Image object
        // of the appropriate 'tileset' that we found
        // above.
        //
        
        pkt.img = this.tileSets[i].image;
        
        // Finally, we need to calculate the position to
        // draw to based on:
        //
        // 1) The local id of the tile, calculated from the
        //    'tileIndex' of the tile we want to draw and
        //    the 'firstgid' of the tileset we found earlier.
        //
        
        // var localIdx = tileIndex;
        // var localIdx = tileIndex - this.tileSets[i].firstgid;
        
        // debugger

        // 2) The (x,y) position of the tile in terms of the
        //    number of tiles in our tileset. This is based on
        //    the 'numXTiles' of the given tileset. Note that
        //    'numYTiles' isn't actually needed here. Think about
        //    how the tiles are arranged if you don't see this,
        //    It's a little tricky. You might want to use the 
        //    modulo and division operators here.
        //
        
        var lTileX = Math.floor(counter % this.tileSets[i].numXTiles);
        var lTileY = Math.floor(counter / this.tileSets[i].numXTiles);

        //console.log('lTileX' + lTileX);
        // console.log('lTileY' + lTileY + '\n');

        // 3) the (x,y) pixel position in our tileset image of the
        //    tile we want to draw. This is based on the tile
        //    position we just calculated and the (x,y) size of
        //    each tile in pixels.
        //
        
        pkt.px = (lTileX * this.tileSize.x);
        pkt.py = (lTileY * this.tileSize.y);

        return pkt;
    },
        //-----------------------------------------
    // Draws all of the map data to the passed-in
    // canvas context, 'ctx'.
    draw: function (ctx) {
        // debugger;
        // First, we need to check if the map data has
        // already finished loading.
        if(!gMap.fullyLoaded) return;

        // Now, for every single layer in the 'layers' Array
        // of 'currMapData', we need to:
        for(var layerIdx = 0; layerIdx < this.currMapData.layers.length; layerIdx++) {

            // 1) Check if the 'type' of the layer is "tilelayer".
            //    If it isn't, we don't care about drawing it.
            if (this.currMapData.layers[layerIdx].type != "tilelayer") continue;
    
            // 2) If it is a "tilelayer", we grab the 'data' Array
            //    of the given layer.
            var dat = this.currMapData.layers[layerIdx].data;

            // 3) For each tile id in the 'data' Array, we need
            //    to:
            for(var tileIDX = 0; tileIDX < dat.length; tileIDX++) {

                //    a) Check if the tile id is 0. An id of 0 means that
                //       we don't need to worry about drawing it, so we
                //       don't need to do anything further with it.
                var tID = dat[tileIDX];
                if(tID === 0) continue;

                //
                //    b) If the tile id is not 0, then we need to grab
                //       the packet data using 'getTilePacket' called
                //       on that tile id.
                var tPKT = this.getTilePacket(tID, tileIDX);

                // Now we need to calculate the (x,y) position we want to draw
                // to in our game world.
                //
                // We've performed a similar calculation in 'getTilePacket',
                // think about how to calculate this based on the tile id and
                // various tile properties that our TILEDMapClass has.
                //
                
                var worldX = Math.floor(tileIDX % this.numXTiles) * this.tileSize.x;
                var worldY = Math.floor(tileIDX / this.numXTiles) * this.tileSize.y;
                debugger;
                
                //worldX = 0; 
                //worldY = 0; 
                

                // Now, we're finally drawing the map to our canvas! The 'drawImage'
                // method of our 'ctx' object takes nine arguments:
                //
                // 1) The Image object to draw,
                // 2) The source x coordinate in our Image,
                // 3) The source y coordinate in our Image,
                // 4) The source width of our tile,
                // 5) The source height of our tile,
                // 6) The canvas x coordinate to draw to,
                // 7) The canvas y coordinate to draw to,
                // 8) The destination width,
                // 9) The destination height
                //
                // Note that we don't want to stretch our tiles at all, so the
                // source height and width should be the same as the destination!
                //
                console.log(tPKT.px, tPKT.py,
                worldX, worldY);

                ctx.drawImage(tPKT.img, tPKT.px, tPKT.py,
                            this.tileSize.x, this.tileSize.y,
                            worldX, worldY,
                            this.tileSize.x, this.tileSize.y);


            }

            
        }
        
        
    }

};
