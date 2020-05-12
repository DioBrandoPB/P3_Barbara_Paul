class Map {
    constructor(contract) {
        this.maCarte = L.map('map', {
            center: new L.LatLng(lati, long),
            zoom: zoom,
            scrollWheelZoom: false,
        });

        L.tileLayer('http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {
            maxZoom: 20,

        })

            .addTo(this.maCarte);
        this.url = contract
        this.affichage()


        this.greenIcon = L.icon({
            iconUrl: 'img/marker.png',
            iconSize: [41, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
        });

        this.orangeIcon = L.icon({
            iconUrl: 'img/markerorange.png',
            iconSize: [41, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
        });

        this.redIcon = L.icon({
            iconUrl: 'img/markerrouge.png',
            iconSize: [41, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
        });
    }

    affichage() {
        ajax(this.url, (reponse) => {
            let resultats = JSON.parse(reponse);
            for (let i = 0; i < resultats.length; i++) {
                const station = resultats[i];
                const position = station.position;
                const lat = position.lat;
                const lng = position.lng;
                iconeMarker = this.greenIcon;

                // Coloration des markers suivant les vélos restants
                if (station.available_bikes < 10) { // moins de 10 places restantes, il devient orange
                    iconeMarker = this.orangeIcon;
                    if (station.available_bikes === 0) { // à 0, il devient rouge
                        iconeMarker = this.redIcon;
                    }
                }
                const marker = L.marker([position.lat, position.lng], { icon: iconeMarker })
                const stationStorage = station.name
                marker.options.station = station
                markers.addLayer(marker)
                marker.addEventListener('click', () => {
                    //Affichage du panneau latéral
                    if (station.available_bikes < 40) {
                        boutonSoumettre.disabled = "";
                        blocResa.setAttribute("style", "display : initial !important")
                        containerCanvas.setAttribute("style", "display : initial !important");
                    }
                    if (station.available_bikes === 0) { // à 0, il devient rouge
                        boutonSoumettre.disabled = "disabled";
                        containerCanvas.setAttribute("style", "display : none !important");
                        alert("Aucun Vélos disponible");
                        blocResa.setAttribute("style", "display : none !important")
                    }
                    stationVeloDispo.innerHTML = station.available_bikes;
                    stationNom.innerHTML = station.name;
                    stationStatut.innerHTML = station.status;
                    stationPlace.innerHTML = station.available_bike_stands;
                    stationAdresse.innerHTML = station.address;
                    markers.bindPopup((station.name) + "<br>" + (station.status));
                    //Renommage du status de la station en Français
                })
                if (station.status === "OPEN") {
                    station.status = "Ouverte";
                }

                else if (station.status === "CLOSE") {
                    station.status = "Fermée";
                }
            }
            this.maCarte.addLayer(markers);
        })
    }

}
