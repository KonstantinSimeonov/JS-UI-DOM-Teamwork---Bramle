var layer = new Kinetic.Layer(),
    stage = new Kinetic.Stage({
        container: 'container',
        width: 1700,
        height: 1100
    });

function animateFiledBlock(imageName, offsetX, offsetY) {
    var img = new Image(),
        hexagon,
        period,
        anim;


    img.src = 'images/' + imageName;
    hexagon = new Kinetic.RegularPolygon({
        x: offsetX,
        y: offsetY,
        sides: 6,
        radius: 105,
        fillPatternImage: img,
        fillPatternOffset: {x: 110, y: 120},
        stroke: 'nome'
    });
    period = 6000;

    layer.add(hexagon);
    stage.add(layer);

    anim = new Kinetic.Animation(function (frame) {
        var scale = Math.sin(frame.time * 2 * Math.PI / period) + 0.001;

        if (scale > 0.999999999) {
            anim.stop();
        }

        hexagon.scale({x: scale, y: scale});
    }, layer);

    anim.start();
}
