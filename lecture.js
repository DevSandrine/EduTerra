// Récupère le paramètre dans l'URL
const params = new URLSearchParams(window.location.search);

const cours = params.get("cours");


// Zone d'affichage
const contenu = document.getElementById("contenu-cours");


// Vérification
if (!cours) {

    contenu.innerHTML = "<h2>Aucun cours sélectionné</h2>";

}

else {


fetch(cours)

.then(response => {

    if (!response.ok) {

        throw new Error("Cours introuvable");

    }

    return response.text();

})


.then(markdown => {


    contenu.innerHTML = marked.parse(markdown);


})


.catch(error => {


    contenu.innerHTML = `

    <h2>Erreur</h2>

    <p>${error}</p>

    `;


});


}
