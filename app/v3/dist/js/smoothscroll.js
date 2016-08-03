/**
    Smoothly scroll element to the given target (element.scrollTop)
    for the given duration

    Returns a promise that's fulfilled when done, or rejected if
    interrupted

 	https://coderwall.com/p/hujlhg/smooth-scrolling-without-jquery
 */
var SmoothScrollTo = function(element, start, end, duration){
	start = Math.round(start);
	end = Math.round(end);
	duration = Math.round(duration);

	if (duration < 0) {
		return Promise.reject("bad duration");
	}
	if (duration === 0) {
		element.style.transform = "translateX(" + destination + "px)";
		return Promise.resolve();
	}

	var start_time = Date.now();
	var end_time = start_time + duration;

	var distance = end - start;

	// based on http://en.wikipedia.org/wiki/Smoothstep
	var smooth_step = function(start, end, point) {
		if(point <= start) { return 0; }
		if(point >= end) { return 1; }
		var x = (point - start) / (end - start); // interpolation
		return x*x*(3 - 2*x);
	}

	return new Promise(function(resolve, reject){
		var scrollFrame = function(){
			var now = Date.now();
			var point = smooth_step(start_time, end_time, now);
			var translation = Math.round(start + (distance * point));
			element.style.transform = "translateX(" + translation + "px)";

			if(now >= end_time) {
				resolve();
				return;
			}

			setTimeout(scrollFrame, 0);
		}
		setTimeout(scrollFrame, 0);
	});
}
