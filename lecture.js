// Récupère le cours dans l'URL
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


    // Sépare les informations du cours et le contenu
    const parties = markdown.split("---");


    const informations = parties[1];

    const texteCours = parties[2];



    // Fonction pour récupérer une valeur simple
    function recuperer(champ) {

        const ligne = informations.match(
            new RegExp("^" + champ + ":\\s*(.*)$", "m")
        );

        return ligne ? ligne[1] : "";

    }



    // Récupération des données

    const titre = recuperer("title");

    const semestre = recuperer("semestre");

    const matiere = recuperer("matiere");

    const type = recuperer("type");



    // Récupération listes

    function recupererListe(champ){

        const regex = new RegExp(
            champ + ":[\\s\\S]*?(?=\\n\\w|$)"
        );

        const resultat = informations.match(regex);


        if(!resultat) return [];


        return resultat[0]
        .split("\n")
        .slice(1)
        .map(x => x.replace("-", "").trim())
        .filter(x => x);

    }



    const auteurs = recupererListe("auteurs");

    const concepts = recupererListe("concepts");

    const questions = recupererListe("questions_examen");



    const retenir = recuperer("a_retenir");



    contenu.innerHTML = `


<h1>${titre}</h1>


<div class="infos">

<p>📚 ${semestre}</p>

<p>🎓 ${matiere}</p>

<p>📝 ${type}</p>

</div>



<div class="bloc auteur">

<h2>🟨 Auteurs importants</h2>

<ul>

${auteurs.map(a => `<li>${a}</li>`).join("")}

</ul>

</div>




<div class="bloc definition">

<h2>🟦 Concepts clés</h2>

<ul>

${concepts.map(c => `<li>${c}</li>`).join("")}

</ul>

</div>




<div class="bloc cours">

<h2>📖 Résumé du cours</h2>

${marked.parse(texteCours)}

</div>




<div class="bloc retenir">

<h2>🟩 À retenir pour l'examen</h2>

<p>${retenir}</p>

</div>




<div class="bloc examen">

<h2>🟥 Questions possibles</h2>

<ul>

${questions.map(q => `<li>${q}</li>`).join("")}

</ul>

</div>


`;



})


.catch(error => {


contenu.innerHTML = `

<h2>Erreur</h2>

<p>${error}</p>

`;


});


}
