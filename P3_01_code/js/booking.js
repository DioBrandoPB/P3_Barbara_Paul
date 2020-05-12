class Booking {
    constructor() {
        this.sauvegarderClick();
        this.chargerFormulaire();
        this.verificationVide();

    }
    sauvegarderClick() {
        boutonSoumettre.addEventListener("click", function(e) {
            nom = document.getElementById('nom').value;
            prénom = document.getElementById('prenom').value;
            localStorage.setItem('Nom', nom);
            localStorage.setItem('Prenom', prénom);
            canvas.style.display = "block";
        });
        boutonTimer.addEventListener("click", function(e) {
            sessionStorage.setItem('Station', stationNom.innerHTML)
            sessionStorage.setItem('Adresse', stationAdresse.innerHTML)
        });
    }

    chargerFormulaire() {
        if (nomStocker != null) {
            document.getElementById('nom').value = nomStocker;
            document.getElementById('prenom').value = prenomStocker;

        }
    }
    verificationVide() {
        if (document.getElementById('prenom').value != "" && document.getElementById('nom').value != "") {
            boutonSoumettre.style.cssText = "background: #EB6841; cursor: pointer; ";
            boutonSoumettre.disabled = "";
        } else {
            boutonSoumettre.style.cssText = "background: grey; cursor: auto;";
            boutonSoumettre.disabled = "disabled";
        }
    }

}