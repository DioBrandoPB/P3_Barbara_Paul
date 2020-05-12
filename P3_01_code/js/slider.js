class Slider {
    constructor() {
            this.boutonsFonction();
        }
        //--- Slide suivant ---//
    slideSuivant() {
            if (lecture) {
                if (imgActuelle > imgSuivante) {
                    imgActuelle = imgActuelle - 100;
                    clearTimeout(delai);
                } else {
                    imgActuelle = 0;
                }

                for (let i = 0; i < diapo.length; i++) {
                    diapo.item(i).style.left = imgActuelle + '%';
                }
            }
        }
        //--- Slide précedent ---//
    slidePrecedent() {
            if (lecture) {
                if (imgActuelle < 0) {
                    imgActuelle = imgActuelle + 100;
                    clearTimeout(delai);
                } else {
                    imgActuelle = -300;
                }
                for (let i = 0; i < diapo.length; i++) {
                    diapo.item(i).style.left = imgActuelle + '%';
                }
            }
        }
        //--- Boucle ---//
    boucle() {

            diapoObject.slideSuivant();
            delai = setTimeout(diapoObject.boucle, 5000);
        }
        //--- Play/pause ---//
    lectureSlide() {
            lecture = !lecture
        }
        //--- Keycode pour fleches gauche et droite ---//
    clavier(e) {
        const code = e.keyCode;
        switch (code) {
            case 39:
                this.slideSuivant();
                break;
            case 37:
                this.slidePrecedent();
                break;
        }
    }
    reinitialiser() {
            clearTimeout(delai);
            delai = setTimeout(diapoObject.boucle, 5000);
        }
        //--- Boutton et évènements ---//
    boutonsFonction() {
        boutonSuivant.addEventListener('click', function() {
            diapoObject.slideSuivant()
            diapoObject.reinitialiser()
            delai
        });
        boutonPrecedent.addEventListener('click', function() {
            diapoObject.slidePrecedent()
            diapoObject.reinitialiser()
            delai
        });
        boutonLecture.addEventListener('click', function() {
            diapoObject.lectureSlide()
            diapoObject.reinitialiser()
            if (iconeBoutonLecture.classList.contains('fa-play')) {
                iconeBoutonLecture.classList.remove('fa-play');
                iconeBoutonLecture.classList.add('fa-pause');
            } else {
                iconeBoutonLecture.classList.remove('fa-pause');
                iconeBoutonLecture.classList.add('fa-play');
            }
        });
        document.addEventListener("keydown", (e) => {
            this.clavier(e);
        });
    }
}