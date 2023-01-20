import React from 'react'
import Sketch from "react-p5";

var img, i;
var inputW, canvasW
var inputH, canvasH
var w, h, currentImageWidth, currentImageHeight;
var x, y, tox, toy;
var zoom = 0.001; //zoom step per mouse tick
var base64URI
var pg

function UserInput(props) {
  function editPixels(imgData) {
    for (var i=0; i < imgData.length; i += 4) {
        imgData[i] = imgData[i] - 100;
        imgData[i+1] = imgData[i+1] - 100;
        imgData[i+2] = imgData[i+2] - 100;
    }
  }

  function preload(p5){
    i = new Image()
    i.src = props.image

    i.onload = function(){
      inputW = i.naturalWidth
      inputH = i.naturalHeight
    }

    img = p5.loadImage(props.image, () => {})

    //   var c = document.createElement('canvas')
    //   var ce = document.createElement('canvas')

    //   var ctx = c.getContext('2d');
    //   ctx.canvas.width = inputW 
    //   ctx.canvas.height = inputH

    //   ctx.drawImage(i, 0, 0);
    //   var imageData = ctx.getImageData(0,0, c.width, c.height)

    //   editPixels(imageData.data);

    //   var ctxEdited = ce.getContext('2d');
    //   ctxEdited.canvas.width = inputW 
    //   ctxEdited.canvas.height = inputH
    //   ctxEdited.putImageData(imageData, 0, 0);
      
    //   base64URI = ce.toDataURL();
    //   //console.log(base64URI)
    // }  

    

  } 

  function setup(p5, canvasParentRef){
    canvasW = p5.windowWidth*0.8
    canvasH = canvasW * (inputH/inputW)
    console.log(img)
		p5.createCanvas(canvasW, canvasH).parent(canvasParentRef); 
    pg = p5.createGraphics(canvasW, canvasH).parent(canvasParentRef); 

    w = currentImageWidth = canvasW;
    h = currentImageHeight = canvasH;
    x = tox = w / 2;
    y = toy = h / 2;


    p5.cursor(p5.CROSS);
    p5.noFill();
    p5.stroke(p5.color(255,140,0));
    p5.strokeWeight(2);
	};

	const draw = (p5) => {
    p5.background(0);

    x = p5.lerp(x, tox, 0.1);
    y = p5.lerp(y, toy, 0.1);
    w = p5.lerp(w, currentImageWidth, 0.1);
    h = p5.lerp(h, currentImageHeight, 0.1);
    
    p5.image(img, x - w / 2, y - h / 2, w, h)
    p5.image(pg, x - w / 2, y - h / 2, w, h);
  
    p5.rect(Math.round(p5.mouseX)-7, Math.round(p5.mouseY)-7, 10, 10);
	};

  function onMouseClicked(p5){
    if(p5.mouseButton === 'center'){
      let dx = p5.mouseX / currentImageWidth 
      let dy = p5.mouseY / currentImageHeight 
      console.log(canvasW-w, canvasH-h)
      let posx = canvasW * dx
      let posy = canvasH * dy 
      pg.rect(Math.round(posx)-7, Math.round(posy)-7, 15, 15);
    }
    
  }

  function onMouseDragged(p5) {
    let maxX = currentImageWidth / 2;
    let minX = canvasW - maxX;
    let maxY = currentImageHeight / 2;
    let minY = canvasH - maxY;
    
    tox = p5.constrain(tox + ((p5.mouseX - p5.pmouseX) /5), minX, maxX);
    toy = p5.constrain(toy + ((p5.mouseY - p5.pmouseY) / 5), minY, maxY);
  }
  
  function onMouseWheel(p5, event) {
    var delta = event.wheelDeltaY;
    if(p5.mouseX > canvasW || p5.mouseX < 0 ||p5.mouseY > canvasH || p5.mouseX < 0) return false

    currentImageWidth *= delta * zoom + 1;
    currentImageHeight *= delta * zoom + 1;
    
    // Check constraints
    if (delta > 0) {
      //zoom in
      if (currentImageWidth > 10 * canvasW) {
        currentImageWidth = 10 * canvasW;
        currentImageHeight = 10 * canvasH;
        //max zoom
      }
    } else if (delta < 0) {
      //zoom out
      if (currentImageWidth < canvasW) {
        //min zoom
        currentImageWidth = canvasW;
        currentImageHeight = canvasH;
      }
    }
    
    //adjust x and y if out of bounds
    let maxX = currentImageWidth / 2;
    let minX = canvasW - maxX;
    let maxY = currentImageHeight / 2;
    let minY = canvasH - maxY;
    
    tox = p5.constrain(tox, minX, maxX);
    toy = p5.constrain(toy, minY, maxY);
  
    return false;
  }

  // function onWindowResized(p5) {
  //   canvasW = p5.windowWidth*0.8
  //   canvasH = canvasW * (inputH/inputW)
  //   w = currentImageWidth = canvasW;
  //   h = currentImageHeight = canvasH;
  //   x = tox = w / 2;
  //   y = toy = h / 2;
  //   p5.resizeCanvas(canvasW, canvasH);
  // }

	return(
    <Sketch preload={preload} setup={setup} draw={draw}  
    mouseWheel={onMouseWheel} mouseDragged={onMouseDragged}
    // windowResized={onWindowResized}
    mousePressed={onMouseClicked}
    />
  ) 
}

export default UserInput

