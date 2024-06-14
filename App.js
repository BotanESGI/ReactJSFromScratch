// Initialiser la carte et la centrer sur une position par défaut (par exemple, Paris)
var app = L.map('map').setView([48.8566, 2.3522], 13);

// Ajouter une couche de tuiles OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(app);

// Tableau pour stocker les marqueurs
var marqueurs = [];

// Fonction pour ajouter un marqueur sur la carte et zoomer sur le point ajouté
function ajouterPoint(latitude, longitude, description) {
    var marker = L.marker([latitude, longitude]).addTo(app);
    marker.bindPopup(description);
    marqueurs.push(marker);
    app.setView([latitude, longitude], 13);  // Zoomer sur le point ajouté
}

// Fonction pour supprimer un marqueur spécifique
function supprimerPoint(index) {
    if (index >= 0 && index < marqueurs.length) {
        app.removeLayer(marqueurs[index]);
        marqueurs.splice(index, 1);
    } else {
        console.log("Index de marqueur invalide");
    }
}

// Fonction pour supprimer tous les marqueurs
function supprimerTousLesPoints() {
    for (var i = 0; i < marqueurs.length; i++) {
        app.removeLayer(marqueurs[i]);
    }
    marqueurs = [];
}

// Exemple d'ajout de points
ajouterPoint(48.8566, 2.3522, "Paris, France");
ajouterPoint(48.8584, 2.2945, "Tour Eiffel");
ajouterPoint(48.8530, 2.3499, "Cathédrale Notre-Dame de Paris");

// Exemple de suppression de tous les points
supprimerTousLesPoints();

ajouterPoint(48.8584, 2.2945, "Tour Eiffel");
