<template>
  <div id="map" />
</template>

<script>
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { onMounted } from 'vue';

export default {
	name: 'BaseMap',
	setup() {
		onMounted(() => {
			mapboxgl.accessToken =
				'pk.eyJ1IjoiZnVubW9iaWxlIiwiYSI6ImNrcXZ0ZDhpcDBobXMydm1memRseDg1djIifQ.hCfKV4wTSPmJ57fBHAhqaw';
			var map = new mapboxgl.Map({
				container: 'map',
				style: 'mapbox://styles/mapbox/streets-v11',
				center: [98.71, 3.6],
				zoom: 11.15,
			});

			map.on('load', function () {
				map.addSource('places', {
					type: 'geojson',
					data: {
						type: 'FeatureCollection',
						features: [
							{
								id: 1,
								type: 'Feature',
								properties: {
									description:
										'<strong>Make it Mount Pleasant</strong><p>Make it Mount Pleasant is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
								},
								geometry: {
									type: 'Point',
									coordinates: [98.71, 3.6],
								},
							},
							{
								id: 2,
								type: 'Feature',
								properties: {
									description:
										'<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a Mad Men Season Five Finale Watch Party, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>',
								},
								geometry: {
									type: 'Point',
									coordinates: [98.7, 3.6],
								},
							},
						],
					},
				});

				// Add a layer showing the places.
				map.addLayer({
					id: 'places',
					type: 'circle',
					source: 'places',
					paint: {
						'circle-color': '#4264fb',
						'circle-radius': 6,
						'circle-stroke-width': 2,
						'circle-stroke-color': '#ffffff',
					},
				});

				// Create a popup, but don't add it to the map yet.
				var popup = new mapboxgl.Popup({
					closeButton: false,
					closeOnClick: false,
				});

				map.on('mouseenter', 'places', function (e) {
					// Change the cursor style as a UI indicator.
					map.getCanvas().style.cursor = 'pointer';

					var coordinates = e.features[0].geometry.coordinates.slice();
					var description = e.features[0].properties.description;

					// Ensure that if the map is zoomed out such that multiple
					// copies of the feature are visible, the popup appears
					// over the copy being pointed to.
					while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
						coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
					}

					// Populate the popup and set its coordinates
					// based on the feature found.
					popup.setLngLat(coordinates).setHTML(description).addTo(map);
				});

				map.on('mouseleave', 'places', function () {
					map.getCanvas().style.cursor = '';
					popup.remove();
				});
			});
		});
		return {};
	},
};
</script>

<style>
#map {
	height: 50vh;
}
</style>
