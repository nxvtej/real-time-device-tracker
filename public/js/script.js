/** @format */

const socket = io();
// sends the first request to backend server

// console.log("hey");

// Step 1 - watch position
// window mei hota hai prebuilt
if (navigator.geolocation) {
	navigator.geolocation.watchPosition(
		(position) => {
			// extract x, y cordinates
			const { latitude, longitude } = position.coords;
			console.log("position: ", latitude, longitude);
			// send from frontend
			socket.emit("send-location", { latitude, longitude });
		},
		(error) => {
			console.log("geolocation error", error);
		},
		{
			// custom config for watchpositiion
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0, //avoiding caching
		}
	);
} else {
	console.log("geolocation is not supported by this browser");
}

// step 2: used leaflet so use location

// earth center, then zoom
const map = L.map("map").setView([0, 0], 10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	attribution: "Navi",
}).addTo(map);

// step 3: create empty object marker
const marker = {};
// this code gets me to the center of where im
// now adding marker
socket.on("receive-location", (data) => {
	const { id, latitude, longitude } = data;
	console.log("receive-location", data);

	map.setView([latitude, longitude], 16);
	// if marker is not created

	if (!marker[id]) {
		marker[id] = L.marker([latitude, longitude]).addTo(map);
	} else {
		marker[id].setLatLng([latitude, longitude]);
	}
});

socket.on("user-disconnected", (id) => {
	if (marker[id]) {
		map.removeLayer(marker[id]);
		delete marker[id];
	}
});
