import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./styles.css"
import { BrowserRouter } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

/*
import React from 'react'
import Sketch from "react-p5";

var img;
var w, h, tow, toh;
var x, y, tox, toy;
var zoom = .005; //zoom step per mouse tick 
var canvasWidth = 500
var canvasHeight = 500
let offset;

function UserInput(props) {
  // const preload = (p5) =>  img = p5.loadImage(`data:image/jpeg;base64,${props.image}`, () => {})
  const preload = (p5) =>  img = p5.loadImage(props.image, () => {})

  const setup = (p5, canvasParentRef) => {
		let canvas = p5.createCanvas(500, 500).parent(canvasParentRef);
    p5.pixelDensity(1);
    p5.noSmooth()
    offset = p5.createVector(0, 0);

    w = tow = img.width;
    h = toh = img.height;
    x = tox = w / 2;
    y = toy = h / 2;

    const mouse = p5.createVector(p5.mouseX, p5.mouseY);
    offset
      .sub(mouse)
      .add(mouse)

    canvas.mouseWheel(event => {
      var e = -event.deltaY;
      if (e>0) { //zoom in
        for (let i=0; i<e; i++) {
          if (tow>30*p5.width) return; //max zoom
          tox -= zoom * (p5.mouseX - tox);
          toy -= zoom * (p5.mouseY - toy);
          tow *= zoom+1;
          toh *= zoom+1;
        }
      }
      
      if (e<0) { //zoom out
        for (let i=0; i<-e; i++) {
          if (tow<p5.width) return; //min zoom
          tox += zoom/(zoom+1) * (p5.mouseX - tox); 
          toy += zoom/(zoom+1) * (p5.mouseY - toy);
          toh /= zoom+1;
          tow /= zoom+1;
        }
      }
    })

    canvas.mousePressed(event => {
      if(p5.mouseButton === 'center'){ 
        //floodFill(p5.createVector(p5.mouseX,p5.mouseY),[255,0,0,255])
        console.log('a')
        p5.square(30, 20, 300);
      }
    })

    function arrayEquals(a, b) {
      return (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
      );
    }
    
    function expandToNeighbours(queue,current){
      x = current.x
      y = current.y
      
      if(x-1>0) queue.push(p5.createVector(x-1,y))
      if(x+1<canvasWidth) queue.push(p5.createVector(x+1,y))
      if(y-1>0) queue.push(p5.createVector(x,y-1))
      if(y+1<canvasHeight)queue.push(p5.createVector(x,y+1))
      
      return queue
      
    }
    
    function floodFill(seed, fillColor) {
      p5.loadPixels();
    
      let index = 4 * (canvasWidth * seed.y + seed.x);
      let seedColor = [
        p5.pixels[index],
        p5.pixels[index + 1],
        p5.pixels[index + 2],
        p5.pixels[index + 3],
      ];
    
      let queue = [];
      queue.push(seed);
    
      while (queue.length) {
        let current = queue.shift();
        index = 4 * (canvasWidth * current.y + current.x);
        let color = [
          p5.pixels[index],
          p5.pixels[index + 1],
          p5.pixels[index + 2],
          p5.pixels[index + 3],
        ];
    
        if (!arrayEquals(color, seedColor)) continue;
        
        for (let i = 0; i < 4; i++) p5.pixels[index+i] = fillColor[0 + i];
        
        queue = expandToNeighbours(queue, current)  
      }
      
      p5.updatePixels()
      
    }


	};

	const draw = (p5) => {
    p5.background(255);
    p5.noFill()
    p5.noSmooth()

    x = p5.lerp(x, tox, .1);
    y = p5.lerp(y, toy, .1);
    w = p5.lerp(w, tow, .1); 
    h = p5.lerp(h, toh, .1);
    
    p5.translate(offset.x, offset.y);
    if (p5.mouseIsPressed) {
      if(p5.mouseButton === 'center'){
        p5.loadPixels();
        for (let y = 0; y < canvasHeight; y++) {
          for (let x = 0; x < canvasWidth; x++) {

            let index = (y * canvasWidth + x) * 4;
            
            // Pixel for rgb
            let r = p5.pixels[index + 0];
            let g = p5.pixels[index + 1];
            let b = p5.pixels[index + 2];

            // Set new pixel data
            p5.pixels[index + 0] = 255 - r;
            p5.pixels[index + 1] = 255 - g;
            p5.pixels[index + 2] = 255 - b;
          }
        }
        p5.updatePixels();
      }
      offset.x -= p5.pmouseX - p5.mouseX;
      offset.y -= p5.pmouseY - p5.mouseY;
    }

    p5.image(img,  x-w/2, y-h/2, w, h);
    p5.square(30, 20, 300);
	};

  
	return(
    <>
      <Sketch setup={setup} draw={draw} preload={preload}/>
    </>
  ) 
}

export default UserInput


// import React, { useRef, useMemo, useEffect, useState } from 'react'

// const SCROLL_SENSITIVITY = 0.001;
// const MAX_ZOOM = 5;
// const MIN_ZOOM = 0.1;
// const WIDTH = 500
// const HEIGHT = 500

// function UserInput(props) {
//   const [offset, setOffset] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [draggind, setDragging] = useState(false);

//   const touch = useRef({ x: 0, y: 0 });
//   const canvasRef = useRef(null);
//   const containerRef = useRef(null);
//   const observer = useRef(null);
//   const background = useMemo(() => new Image(), [`data:image/jpeg;base64,${props.image}`]);

//   const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

//   const handleWheel = (event) => {
//     const { deltaY } = event;
//     if (!draggind) {
//       setZoom((zoom) =>
//         clamp(zoom + deltaY * SCROLL_SENSITIVITY * -1, MIN_ZOOM, MAX_ZOOM)
//       );
//     }
//   };

//   const handleMouseMove = (event) => {
//     if (draggind) {
//       const { x, y } = touch.current;
//       const { clientX, clientY } = event;
//       setOffset({
//         x: offset.x + (x - clientX),
//         y: offset.y + (y - clientY),
//       });
//       touch.current = { x: clientX, y: clientY };
//     }
//   };

//   const handleMouseDown = (event) => {
//     const { clientX, clientY } = event;

//     if( event.button === 1 ) {
//       let canvas = document.getElementsByClassName('USER_INPUT')[0]

//       let startX = event.pageX - canvas.offsetLeft
//       let startY = event.pageY - canvas.offsetTop

//       let context = canvas.getContext("2d"); // Grab the 2d canvas context
//       var pixel = context.getImageData(startX, startY, 1, 1);
//       var colorLayerData = context.getImageData(0, 0, canvas.width, canvas.height);
//       console.log(colorLayerData)

      
//       // var pixelPos = (startY * canvas.width + startX) * 4,
//       // r = colorLayerData.data[pixelPos],
//       // g = colorLayerData.data[pixelPos + 1],
//       // b = colorLayerData.data[pixelPos + 2],
//       // a = colorLayerData.data[pixelPos + 3];
//       console.log(pixel)
//     }
//     else setDragging(true);
//     touch.current = { x: clientX, y: clientY };
    
//   };

//   const handleMouseUp = () => setDragging(false);

//   const draw = () => {
//     if (canvasRef.current) {
//       const { width, height } = canvasRef.current;
//       const context = canvasRef.current.getContext("2d");

//       // Set canvas dimensions
//       canvasRef.current.width = WIDTH;
//       canvasRef.current.height = HEIGHT;

//       // Clear canvas and scale it
//       context.translate(-offset.x, -offset.y);
//       context.scale(zoom, zoom);
//       context.clearRect(0, 0, width, height);

//       // Make sure we're zooming to the center
//       const x = (context.canvas.width / zoom - background.width) / 2;
//       const y = (context.canvas.height / zoom - background.height) / 2;

//       // Draw image
//       context.drawImage(background, x, y);
//     }
//   };

//   useEffect(() => {
//     observer.current = new ResizeObserver((entries) => {
//       entries.forEach(({ target }) => {
//         const { width, height } = background;
//         // If width of the container is smaller than image, scale image down
//         if (target.clientWidth < width) {
//           // Calculate scale
//           const scale = target.clientWidth / width;

//           // Redraw image
//           canvasRef.current.width = width * scale;
//           canvasRef.current.height = height * scale;
//           canvasRef.current
//             .getContext("2d")
//             .drawImage(background, 0, 0, width * scale, height * scale);
//         }
//       });
//     });
//     observer.current.observe(containerRef.current);

//     return () => observer.current.unobserve(containerRef.current);
//   }, []);

//   useEffect(() => {
//     background.src =  `data:image/jpeg;base64,${props.image}`;

//     if (canvasRef.current) {
//       background.onload = () => {
//         // Get the image dimensions
//         const { width, height } = background;
//         canvasRef.current.width = WIDTH;
//         canvasRef.current.height = HEIGHT;

//         // Set image as background
//         canvasRef.current.getContext("2d").drawImage(background, 0, 0);
//       };
//     }
//   }, [background]);

//   useEffect(() => {
//     draw();
//   }, [zoom, offset]);

//   return (
//     <div className='EDIT_PANEL' ref={containerRef}>
//       <canvas className='USER_INPUT'
//         onMouseDown={handleMouseDown}
//         onMouseUp={handleMouseUp}
//         onWheel={handleWheel}
//         onMouseMove={handleMouseMove}
//         ref={canvasRef}
//       />
//     </div>
//   );
// };

// export default UserInput;


*/
