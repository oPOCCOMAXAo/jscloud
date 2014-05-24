var context, canvas, zx, zy, h = window.innerHeight, w = window.innerWidth, len = h > w ? w : h;
function main() {
	canvas = document.createElement('canvas');
	canvas.height = h;
	canvas.width = w;
	canvas.id = 'hwnd';
	canvas.style.position = 'absolute';
	canvas.style.top = '0';
	canvas.style.left = '0';
	document.body.innerHTML = '';
	document.body.appendChild(canvas);
	document.body.style.background = '#68a';
	context = canvas.getContext('2d');
	document.ontouchstart = touchEvent;
	document.ontouchmove = touchEvent;
	document.ontouchend = touchEnd;
	document.onmousedown = mouseDown;
	document.onmouseup = mouseUp;	
	context.strokeStyle = '#fff';
	init();
	setInterval(auto, 40);
}
function touchEvent(e){
	var l = e.touches.length;
	zSources = new Array(e.touches.length);
	for(var i = 0; i < l; i++)
		zSources[i] = {
			x: e.touches[i].clientX,
			y: e.touches[i].clientY
		};
	return false;
}
function touchEnd(e){
	zSources = null;
	return false;
}
function mouseDown(e){
	zSources = new Array(1);
	zSources[0] = {
		x: e.clientX,
		y: e.clientY
	};
	document.onmousemove = mouseMove;
	return false;
}
function mouseMove(e){
	zSources[0].x = e.clientX;
	zSources[0].y = e.clientY;
	return false;
}
function mouseUp(e){
	zSources = null;
	document.onmousemove = null;
	return false;
}
function test(){
	for(var a in CanvasRenderingContext2D){
		document.write(a.toString());
	}
}
function auto(){
    step();
	clear();
    for (var i = 0; i < n; i++) {
    	context.beginPath();
    	context.arc(cloud[i].x, cloud[i].y, ro, 0, PI2);
    	context.closePath();
        context.fillStyle = color;
    	context.fill();
    }
}
function clear() {
	canvas.height = canvas.height;
}