document.addEventListener("DOMContentLoaded", function() {
	fetch("/data/produkter.json")
		.then(response => response.json())
		.then(function(data) {
			data.forEach(function(product) {
				const sku = new URL(window.location).searchParams.get("sku");
				if (product.sku != sku) return;
				const container = document.getElementsByClassName("page")[0];
				container.querySelector("h1").innerText = product.navn;
				container.querySelectorAll("p")[0].innerText = product.beskrivelse[0];
				container.querySelectorAll("p")[1].innerText = product.beskrivelse[1];
				container.querySelector(".gallery__large").src = `/assets/images/${product.billeder[0]}`;
				container.querySelectorAll(".gallery__small")[0].src = `/assets/images/${product.billeder[0]}`;
				container.querySelectorAll(".gallery__small")[1].src = `/assets/images/${product.billeder[1]}`;
				container.querySelectorAll(".gallery__small")[2].src = `/assets/images/${product.billeder[2]}`;
				container.querySelector(".price").innerText = product.pris;
				container.querySelector(".weight").innerText = product.vægt;
				container.querySelector(".country").innerText = product.land;

				container.querySelectorAll(".gallery__small").forEach(function(img) {
					img.addEventListener("click", function() {
						container.querySelector(".gallery__large").src = this.src;
					})
				})
			});
		});
});