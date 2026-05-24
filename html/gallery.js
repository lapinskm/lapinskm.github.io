document.addEventListener("DOMContentLoaded", function() {
	var viewportScale = 0.7; // fraction of viewport width used for images
	var zoomFactor = window.devicePixelRatio
	var w = Math.round(window.innerWidth * viewportScale * zoomFactor) + "px";
	document.querySelectorAll(".gallery-img").forEach(function(el) {
		el.style.width = w;
		el.style.margin = "0 auto";
	});
});
