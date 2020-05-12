// declaration variables //

// slider //
let iconeBoutonLecture = document.getElementById('iconeLecture')
let delai;
let lecture = true;
let boutonSuivant = document.getElementById('suivant');
let boutonPrecedent = document.getElementById('precedent');
let boutonLecture = document.getElementById('lecture');
let diapo = document.getElementsByClassName('diapo');
let imgSuivante = -100 * (diapo.length - 1);
let imgActuelle = 0;

// map // 
let iconeMarker = this.greenIcon;
let lati = 43.600000;
let long = 1.433333;
let zoom = 15;
let reservMap = document.getElementById("reservMap");
let veloDispo = document.getElementById("stationVeloDispo");
let blocResa = document.getElementById("containerResa");
let stationNom = document.getElementById("stationNom");
let stationStatut = document.getElementById("statusStation");
let stationPlace = document.getElementById("stationPlaceVelo");
let stationAdresse = document.getElementById("stationAdresse");

// booking //
let boutonSoumettre = document.getElementById('soumettre');
let nomStocker = localStorage.getItem('Nom');
let prenomStocker = localStorage.getItem('Prenom');
let stationSession = localStorage.getItem("stationStorage");
let nom = document.getElementById('nom').value;
let prénom = document.getElementById('prenom').value;

// canvas //
let canvas = document.getElementById("canvas");
let containerCanvas = document.getElementById("containerCanvas");
let ctx = canvas.getContext('2d');
let boutonGomme = document.getElementById("gomme");
let boutonAnnulerResa = document.getElementById("annulerResa");
let boutonValider = document.getElementById("valider");
let boutonFermer = document.getElementById("fermer");
let blocDecompte = document.getElementById("blocDecompte");

// timer //
let minuteDefaut = 19; // permet de reset la valeur des secondeDecompte et minuteDecompte sous certaines conditions //
let secondeDefaut = 60;
let minuteDecompte = minuteDefaut; // on decremente minuteDecompte et secondeDecompte sans toucher aux valeurs de bases : 19 et 60 //
let secondeDecompte = secondeDefaut;
let minutes = sessionStorage.getItem('Minutes');
let secondes = sessionStorage.getItem('Secondes');
let boutonTimer = document.getElementById("valider");
let affichageDecompte = document.getElementById("decompte");

// Appel Ajax //
function ajax(url, callback) {
    let requete = new XMLHttpRequest()
    requete.open("GET", url)
    requete.addEventListener("load", function() {
        if (requete.status >= 200 && requete.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(requete.responseText)
        } else {
            console.error(requete.status + " " + requete.statusText + " " + url)
        }
    })
    requete.addEventListener("error", function() {
        console.error("Erreur réseau avec l'URL " + url)
    })
    requete.send(null)
}

// Instantiation //

let diapoObject = new Slider();
window.setTimeout(diapoObject.boucle, 5000);
let markers = L.markerClusterGroup();
let map = new Map("https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=ddaf955496241ed6e6f7aa8e998b982be31b0064");
let bookingObject = new Booking();
let canvasObject = new CanvasObjet();
let timerObject = new Timer();