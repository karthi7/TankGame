function draw() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    canvas.height = 1000;
    canvas.width = 1000;
    let image = new Image();
    image.src = 'assets/images/decor_tiles/Roof_A_02.png';

   // context.drawImage(image, 0, 10, 10, 100, 0, 0, 100, 100);
    context.fillRect(0,0,50,50);
}

setTimeout(_ => {
    draw();
},100);