var n, ro, d, sides, cloud, zSources, PI2 = Math.PI * 2, color;
function init(){
	var t = document.location.search;
	if(t){
		t = t.substring(1);
		t = parseInt(t);
		if(t == NaN)
			t = 200;
	}else{
		t = 200;
	}
	n = t > 10000 ? 10000 : t;
	color = "RGBA(255,255,255,0.10)";
	ro = Math.sqrt(5 * h * w / Math.PI / n);
	d = {
		v: 50,
		vm: 10,
		t: 1.02,
		x: w / 2,
		y: h / 2
	};
	sides = {
		l: ro,
		u: ro,
		d: h - ro,
		r: w - ro
	};
	cloud = new Array(n);
    document.title = n;
    for (var i = 0; i < n; i++)
        cloud[i] = new Cloud();
}
function Cloud() {
	this.x = normder(0, w);
	this.y = normder(0, h);
    this.vx = 0;
    this.vy = 0;
}
function normder(min, max){
	var res = 0;
	var q = 3;
	for(var i = 0; i < q; i++)
		res += Math.random();
	res /= q;
	return res * (max - min) + min;
}
function action(){
	var l = zSources.length;
    for (var i = 0; i < n; i++)
    	for (var j = 0; j < l; j++){
    		var dx = cloud[i].x - zSources[j].x;
    		var dy = cloud[i].y - zSources[j].y;
            var r = dx * dx + dy * dy;
			if (r < d.vm) r = d.vm;
            var ax = d.v / r;
            var ay = ax * dy;
            ax = ax * dx;
            cloud[i].vx += ax;
            cloud[i].vy += ay;
        }
}
function step() {
	if(zSources) action();
    for (var i = 0; i < n; i++) {
        cloud[i].x += cloud[i].vx;
        cloud[i].y += cloud[i].vy;
        cloud[i].vx /= d.t;
        cloud[i].vy /= d.t;
        if((cloud[i].vx < 0.001 && cloud[i].vx > -0.001)) cloud[i].vx = 0;
        if((cloud[i].vy < 0.001 && cloud[i].vy > -0.001)) cloud[i].vy = 0;
        if (cloud[i].x < sides.l){
        	cloud[i].vx = Math.abs(cloud[i].vx);
        	cloud[i].x = sides.l;
        }
        if (cloud[i].x > sides.r){
        	cloud[i].vx = -Math.abs(cloud[i].vx);
        	cloud[i].x = sides.r;
        }
        if (cloud[i].y < sides.u){
        	cloud[i].vy = Math.abs(cloud[i].vy);
        	cloud[i].y = sides.u;
        }
        if (cloud[i].y > sides.d){
        	cloud[i].vy = -Math.abs(cloud[i].vy);
        	cloud[i].y = sides.d;
        }
    }
}