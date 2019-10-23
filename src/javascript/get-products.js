document.addEventListener("DOMContentLoaded", function() {
	fetch("/data/produkter.json")
		.then(response => response.json())
		.then(function(data) {
			console.log(data);
		})
});