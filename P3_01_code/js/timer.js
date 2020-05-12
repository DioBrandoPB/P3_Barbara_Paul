class Timer {
    constructor() {
        this.boutonsFonction();
        this.recupTimer(); // recup les valeurs du timer au chargement de la page et si elles existent, fixe la valeur de minuteDecompte et secondeDecompte et demarre le timer
    }

    recupTimer() {
        if (sessionStorage.getItem('Minutes') && sessionStorage.getItem('Secondes')) {
            minuteDecompte = sessionStorage.getItem('Minutes');
            secondeDecompte = sessionStorage.getItem('Secondes');
            boutonAnnulerResa.setAttribute("style", "display : initial !important"); // affichage du bouton annuler
            this.lancementTimer();
            alert("Reservation en cours");
        } else {
            clearInterval(this.intervalId);
        }
    }
    lancementTimer() {

        affichageDecompte.innerHTML = localStorage.getItem('Prenom') + "&nbsp;, Reservation en cours à la station n° " + // message reservation 
            sessionStorage.getItem('Station') + " au " + sessionStorage.getItem('Adresse') + " pour encore : <br/>";

        this.intervalId = setInterval(function() {
            if (secondeDecompte >= 0) { // si valeur supérieur ou egale à 0, on commence la décrémentation des secondes et on set les objets minutes et secondes toutes les 1s
                secondeDecompte--;
                sessionStorage.setItem('Minutes', minuteDecompte)
                sessionStorage.setItem('Secondes', secondeDecompte)
                seconde.innerHTML = secondeDecompte + "s";
                minute.innerHTML = minuteDecompte + "m:";
            }

            if (secondeDecompte < 10) { // ajout du 0 devant les secondes en dessous de 10
                seconde.innerHTML = "0" + secondeDecompte + "s";
            }

            if (secondeDecompte <= 0) { // si les secondes passent en dessous de 0, les minutes baissent de 1 et les secondes recupères leurs valeur initial
                minuteDecompte = minuteDecompte - 1;
                secondeDecompte = secondeDefaut;
            }

            if (minuteDecompte < 0) { // si les minutes passent en dessous de 0, on stop le timer, le message de resa est caché et la map s'affiche à nouveau 
                timerObject.arretTimer();
                sessionStorage.clear();
                msgTexte.setAttribute("style", "display : none ");
                reservMap.setAttribute("style", "display : initial !important")
                alert("Reservation expirée");
            }
        }, 1000);
    }
    arretTimer() { // fonction qui stop le timer
        clearInterval(this.intervalId);
        minuteDecompte = minuteDefaut;
        secondeDecompte = secondeDefaut;
    }

    boutonsFonction() { // fonction qui gère les evenements boutton
        boutonTimer.addEventListener('click', function() { // quand on démarre le timer, on clear l'interval via arretTimer(), on set les minutes et secondes dans le sessionStorage
            timerObject.arretTimer(); // puis on lance le timer et on affiche le texte du timer
            timerObject.lancementTimer();
            affichageDecompte.setAttribute("style", "display : initial !important");
        });
        boutonAnnulerResa.addEventListener('click', function() { // quand on stop le timer via le boutton, on stop via arretTimer() et le texte du timer est caché, pop up résa annulé
            timerObject.arretTimer();
            affichageDecompte.setAttribute("style", "display : none ");
            alert("Reservation annulé");
            sessionStorage.clear();

        });
    }
}