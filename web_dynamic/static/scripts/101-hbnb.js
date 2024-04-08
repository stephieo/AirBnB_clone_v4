document.ready(function () {
	const amenities = {};
	$("li input[data-id=:amenity_id]").change(function () {
		if (this.checked) {
			amenities[this.dataset.name] = this.dataset.id;
		} else {
			delete amenities[this.dataset.name];
		}
		$(".amenities h4").text(Object.keys(amenities).sort().join(", "));
	});

	const states = {};
	$("li input[data-id=:state_id").change(function () {
		if (this.checked){
			states[this.dataset.name] = this.dataset.id;
		} else {
			delete states[this.dataset.name];
		}
		$(".locations h4").text(Object.keys(states).sort().join(", "));
	});
	
	const cities = {};
	$("li input[data-id=:city_id").change(function () {
		if (this.checked){
			cities[this.dataset.name] = this.dataset.id;
		} else {
			delete cities[this.dataset.name];
		}
		$(".locations h4").text(Object.keys(cities).sort().join(", "));
	});
	

	$.getJSON("http://0.0.0.0:5001/api/v1/status/", (data) => {
		if (data.status === "OK") {
			$("div#api_status").addClass("available");
		} else {
			$("div#api_status").removeClass("available");
		}
	});

	$.post({
		url: `${HOST}/api/v1/places_search`,
		data: JSON.stringify({}),
		headers: {
			"Content-Type": "application/json",
		},
		success: (data) => {
			data.forEach((place) =>
				$("section.places").append(
					`<article>
			<div class="title_box">
			<h2>${place.name}</h2>
			<div class="price_by_night">$${place.price_by_night}</div>
			</div>
			<div class="information">
			<div class="max_guest">${place.max_guest} Guest${
						place.max_guest !== 1 ? "s" : ""
					}</div>
			<div class="number_rooms">${place.number_rooms} Bedroom${
						place.number_rooms !== 1 ? "s" : ""
					}</div>
			<div class="number_bathrooms">${place.number_bathrooms} Bathroom${
						place.number_bathrooms !== 1 ? "s" : ""
					}</div>
			</div> 
			<div class="description">
			${place.description}
			</div>
				</article>`
				));
		},
		dataType: "json",
	});

	$('button').on("click", function(){
		$.post({
			url: `${HOST}/api/v1/places_search`,
			data: JSON.stringify(
				{
					'amenities':Object.keys(amenities),
					'states': Object.keys(states),
					'cities': Object.keys(cities),
				}),
			headers: {
				"Content-Type": "application/json",
			},
		});

	});

	$('#reviewsToggle').on("click", function(){
		if $(this).text() ===  'Show'){
			$(this).text('Hide');
			$.getJSON("http://${HOST}:5001/api/v1/places/${this.id}/reviews"), (data, status) => {
				if (status ==='success'){
					for (review in data){
						print(review, )
					}
				}

			};
		};
	});
});
