class CanvasObjet {
    constructor() { //Paramètres du canvas
        canvas.width = 150;
        canvas.height = 150;
        this.evenements();
        this.verifierStorageVide();

    }

    //Gestion des événements 
    evenements() {
        let self = this; //garde une référence de this pour les fonctions extérieurs à evenements() 

        //Souris
        canvas.addEventListener("mousedown", function(e) { // ex :alert('cliqué') // Dessin activer au clic
            self.dessin = true;
            self.dernierePosition = self.positionM(e);
        });

        canvas.addEventListener("mousemove", function(e) { // Position souris
            self.sourisPosition = self.positionM(e);
            self.canvasResultat() // 
        });

        document.addEventListener("mouseup", function(e) { // Arret du dessin au relachement du clic
            self.dessin = false;
        });


        // Arret du defilement (pour le tactile avec le doigt)
        containerCanvas.addEventListener("touchstart", function(e) { // Dessin activer au toucher
            if (e.target == self.canvas) {
                e.preventDefault();
            }
        });

        containerCanvas.addEventListener("touchend", function(e) { // Arret du dessin au relachement du doigt
            if (e.target == self.canvas) {
                e.preventDefault();
            }
        });

        containerCanvas.addEventListener("touchmove", function(e) { // Position doigt
            if (e.target == self.canvas) {
                e.preventDefault();
            }
        });

        // Responsive / Tactile //

        let defaultPrevent = function(e) { e.preventDefault(); }
        canvas.addEventListener("touchstart", defaultPrevent); // Empeche le scrolling sur le canvas au click
        canvas.addEventListener("touchmove", defaultPrevent);

        canvas.addEventListener("touchstart", function(e) {
            self.sourisPosition = self.positionT(e);
            let appui = e.touches[0];
            let mouseEvent = new MouseEvent("mousedown", {
                clientX: appui.clientX,
                clientY: appui.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        });

        canvas.addEventListener("touchmove", function(e) {
            let appui = e.touches[0];
            let mouseEvent = new MouseEvent("mousemove", {
                clientX: appui.clientX,
                clientY: appui.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        });

        canvas.addEventListener("touchend", function(e) {
            let mouseEvent = new MouseEvent("mouseup", {});
            canvas.dispatchEvent(mouseEvent);
        });


        //Bouton Effacer //
        boutonGomme.addEventListener("click", function(e) {
            self.viderCanvas();

        });
        // Bouton Annuler
        boutonAnnulerResa.addEventListener("click", function(e) {
            self.viderResa();
            reservMap.setAttribute("style", "display : initial !important");
            blocDecompte.setAttribute("style", "display : none !important");
        });
        boutonValider.addEventListener("click", function(e) {
            self.validerResa();
            self.viderCanvas();
            boutonAnnulerResa.setAttribute("style", "display : initial !important")
            reservMap.setAttribute("style", "display : none !important");
            blocDecompte.setAttribute("style", "display :  !important");
        });
        boutonFermer.addEventListener("click", function(e) {
            canvas.width = canvas.width;
            boutonFermer.setAttribute("style", "display : none !important");
            boutonValider.setAttribute("style", "display : none !important");
            boutonGomme.setAttribute("style", "display : none !important");
            canvas.setAttribute("style", "display : none !important");
            blocResa.setAttribute("style", "display : none !important");
        });
    }

    // Fonction qui recupere les coordonnées de la souris 
    positionM(mouseEvent) {
        if (this.dessin) { // si dessin true 
            let oRect = canvas.getBoundingClientRect(); // renvoie la taille d'un élément et sa position relative par rapport à la zone d'affichage 
            return {
                x: mouseEvent.clientX - oRect.left,
                y: mouseEvent.clientY - oRect.top // recuperation des coordonnées x et y
            };
        }
    }

    // Fonction qui recupere les coordonnées du pad 
    positionT(touchEvent) {
        let oRect = canvas.getBoundingClientRect(); // renvoie la taille d'un élément et sa position relative par rapport à la zone d'affichage 
        return {
            x: touchEvent.touches[0].clientX - oRect.left,
            y: touchEvent.touches[0].clientY - oRect.top // recuperation des coordonnées x et y
        };
    }


    // Dessin du canvas
    canvasResultat() {
        if (this.dessin) {
            ctx.beginPath();
            ctx.moveTo(this.dernierePosition.x, this.dernierePosition.y);
            ctx.lineTo(this.sourisPosition.x, this.sourisPosition.y);
            ctx.stroke();
            this.dernierePosition = this.sourisPosition;
            boutonValider.setAttribute("style", "display : initial !important")
            boutonGomme.setAttribute("style", "display : initial !important")
            boutonFermer.setAttribute("style", "display : initial !important")
        }
    };

    // Vide le dessin du canvas
    viderCanvas() {
        canvas.width = canvas.width;
        boutonValider.setAttribute("style", "display : none !important")
        boutonGomme.setAttribute("style", "display : none !important")
        boutonFermer.setAttribute("style", "display : none !important")
    }

    viderResa() {
        canvas.width = canvas.width;
        blocResa.setAttribute("style", "display : none !important")
        canvas.setAttribute("style", "display : none !important")
        boutonFermer.setAttribute("style", "display : none !important")
        sessionStorage.clear();
    }
    validerResa() {
        if (minutes) {
            reservMap.setAttribute("style", "display : none !important")
            document.getElementById("canvas").setAttribute("style", "display : none !important")
        } else {
            reservMap.setAttribute("style", "display : initial !important")
        }
    }
    verifierStorageVide() {
        if (sessionStorage.length == 0) {
            reservMap.setAttribute("style", "display : initial")
        } else {
            reservMap.setAttribute("style", "display : none")
        }
    }
}