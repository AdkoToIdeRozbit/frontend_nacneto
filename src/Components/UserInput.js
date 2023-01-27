import React from 'react'
import Sketch from "react-p5";

var img, i;
var imgW, canvasW
var imgH, canvasH
var w, h, tow, toh;
var x, y, tox, toy;
var zoom = .002; //zoom step per mouse tick 
var base64URI
var pg

var img_data

var polygons = [[]]

function UserInput(props) {

  function preload(p5){

    i = new Image()
    i.src = props.image

    i.onload = function(){
      imgW = i.naturalWidth
      imgH = i.naturalHeight
      console.log('SIZE: ', imgW, imgH)
      var c = document.createElement('canvas')
      var ctx = c.getContext('2d');
      ctx.canvas.width = imgW
      ctx.canvas.height = imgH
      ctx.drawImage(i, 0, 0);
      img_data = ctx.getImageData(0,0, c.width, c.height).data
    }

    img = p5.loadImage(props.image, () => {})
  
  } 

  function setup(p5, canvasParentRef){
    canvasW = p5.windowWidth*0.8
    canvasH = canvasW * (imgH/imgW)

		p5.createCanvas(canvasW, canvasH).parent(canvasParentRef); 
    pg = p5.createGraphics(canvasW, canvasH).parent(canvasParentRef); 

    document.getElementById( "defaultCanvas0" ).onwheel = function(event){
      event.preventDefault();
    };

    w = tow = canvasW;
    h = toh = canvasH;
    x = tox = w / 2;
    y = toy = h / 2;

    p5.background(255);

    p5.cursor(p5.CROSS);
    p5.noFill();
    p5.stroke(p5.color(255,140,0));
    p5.strokeWeight(2);
	};

	const draw = (p5) => {

    x = p5.lerp(x, tox, .1);
    y = p5.lerp(y, toy, .1);
    w = p5.lerp(w, tow, .1); 
    h = p5.lerp(h, toh, .1);

    p5.image(img, x-w/2, y-h/2, w, h);
    p5.image(pg, x-w/2, y-h/2, w, h);
    
    
    let rect_pos = get_rect_pos(p5.mouseX, p5.mouseY)
    p5.rect(rect_pos[0], rect_pos[1], 10, 10);
	};

  function get_rect_pos(mousex, mousey){
    
    return [mousex, mousey]
  }

  function world_pos(mousex, mousey){
    let dx = mousex / tow 
    let dy = mousey / toh

    let bias = tow / canvasW
    let dif_x = x-w/2
    let dif_y = y-h/2
    return [Math.round(canvasW * dx - (dif_x/bias)), Math.round(canvasH * dy - (dif_y/bias))]
  }

  function point_in_polygon_count(polygons, point){
    let count = 0

    var x = point[0], y = point[1];
    polygons.forEach(vs => {
      var inside = false;
      for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
          var xi = vs[i][0], yi = vs[i][1];
          var xj = vs[j][0], yj = vs[j][1];
          
          var intersect = ((yi > y) !== (yj > y))
              && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
          if (intersect) inside = !inside;
      }
      if(inside) count++
    })

    return count
    
  }

  function draw_polygon(){
    pg.fill(pg.color(255,140,0, 128))
    //polygons = [[[100,100],[300,300],[500,100]], [[600,600],[700,600],[700,700],[600,700]]];

    polygons.forEach(polygon => {
      // let num_of_polygons_inside = 0
      // if(polygon.length > 0 && polygons.length > 1) num_of_polygons_inside = point_in_polygon_count(polygons, polygon[0])

      // if(num_of_polygons_inside % 2 == 0) pg.fill(pg.color(255,140,0, 128))
      // else pg.fill(pg.color(255,255,255, 255))

      pg.beginShape();
      polygon.forEach(p => {
        pg.vertex(p[0], p[1])
      });
      pg.endShape();
    })

    pg.fill(pg.color(255,255,255, 255))
  }

  function draw_points(){
    pg.stroke(pg.color(255,140,0));
    pg.strokeWeight(2);
    pg.fill(pg.color(255,255,255, 255))

    polygons.forEach(polygon => {
      polygon.forEach(p => {
        pg.circle(p[0], p[1], 10);
      })
      
    });
  }

  function points_close(p1,p2){
    return Math.abs(p1[0]-p2[0]) < 10 && Math.abs(p1[1]-p2[1]) < 10
  }

  function add_point(pos){
    if(polygons[polygons.length-1].length > 0){
      let last_point = polygons[polygons.length-1][0]
      if(points_close(last_point, pos)){
        polygons[polygons.length-1].push(polygons[polygons.length-1][0])
        polygons.push([])
      }
        
      else 
        polygons[polygons.length-1].push(pos)         
    } 
    else polygons[polygons.length-1].push(pos) 
  }

  function onMouseClicked(p5){
    if(p5.mouseButton === 'center'){
      let pos = world_pos(p5.mouseX, p5.mouseY)
      add_point(pos)

      pg.clear()
      draw_polygon()
      draw_points()
      
      let dw = imgW / canvasW
      let dh = imgH / canvasH

      let x_real = Math.round(pos[0]*dw)
      let y_real = Math.round(pos[1]*dh)
      
      let d = 10
      let c = 0
      for(let x=x_real-d; x<=x_real+d; x++){
        for(let y=y_real-d; y<=y_real+d; y++){
          //console.log(x,y)
          c++;
        } 
      }

      let pxl = (y_real * imgW + x_real) * 4;
      let color = [
        img_data[pxl],
        img_data[pxl + 1],
        img_data[pxl + 2],
        img_data[pxl + 3]
      ];

    }
    
  }

  function onMouseDragged(p5) {
    let maxX = tow / 2;
    let minX = canvasW - maxX;
    let maxY = toh / 2;
    let minY = canvasH - maxY;
    tox = p5.constrain(tox + (p5.mouseX - p5.pmouseX), minX, maxX);
    toy = p5.constrain(toy + (p5.mouseY - p5.pmouseY), minY, maxY);
  }
  
  function onMouseWheel(p5, event) {
    var e = event.wheelDeltaY;
    if(p5.mouseX > canvasW || p5.mouseX < 0 ||p5.mouseY > canvasH || p5.mouseX < 0) return false

    if (e>0) { //zoom in
      for (let i=0; i<e; i++) {
        if (tow>30*canvasW) return; //max zoom
        tox -= zoom * (p5.mouseX - tox);
        toy -= zoom * (p5.mouseY - toy);
        tow *= zoom+1;
        toh *= zoom+1;
      }
    }
    
    if (e<0) { //zoom out
      for (let i=0; i<-e; i++) {
        // let pos = world_pos(p5)
        // console.log(pos)

        if (tow <= canvasW) { //min zoom
          tow = canvasW;
          toh = canvasH;
          return
        }

        tox += zoom/(zoom+1) * (p5.mouseX - tox); 
        toy += zoom/(zoom+1) * (p5.mouseY - toy);
        toh /= zoom+1;
        tow /= zoom+1;
      }
      onMouseDragged(p5)
    }
    
  }

	return(
    <Sketch preload={preload} setup={setup} draw={draw}  
    mouseWheel={onMouseWheel} mouseDragged={onMouseDragged}
    // windowResized={onWindowResized}
    mousePressed={onMouseClicked}
    />
  ) 
}

export default UserInput
