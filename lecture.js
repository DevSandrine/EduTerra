const params = new URLSearchParams(window.location.search);

const cours = params.get("cours");

const contenu = document.getElementById("contenu-cours");


if (!cours) {

    contenu.innerHTML = "<h2>Aucun cours sélectionné</h2>";

}

else {

fetch(cours)

.then(response => response.text())

.then(markdown => {


    let parties = markdown.split("---");


    let infos = parties[1];

    let texteCours = parties[2];


    function extraire(champ){

        let regex = new RegExp(
            champ + ":\\s*([\\s\\S]*?)(?=\\n[a-z_]+:|$)"
        );

        let resultat = infos.match(regex);

        if(resultat){

            return resultat[1]
            .replace(/\|-/g,"")
            .replace(/-/g,"")
            .trim();

        }

        return "";

    }


    let titre = extraire("title");
    let semestre = extraire("semestre");
    let matiere = extraire("matiere");
    let type = extraire("type");
    let resume = extraire("resume");
    let retenir = extraire("a_retenir");
    let image = extraire("image");


    let auteurs = extraire("auteurs");

    let concepts = extraire("concepts");

    let questions = extraire("questions_examen");



    contenu.innerHTML = `


<div class="fiche">


<h1>📚 ${titre}</h1>


<div class="infos">

<p><b>Semestre :</b> ${semestre}</p>

<p><b>Matière :</b> ${matiere}</p>

<p><b>Type :</b> ${type}</p>


</div>



<div class="bloc auteurs">

<h3>👤 Auteur(s) important(s)</h3>

<p>${auteurs.replace(/\n/g,"<br>")}</p>

</div>



<div class="bloc concepts">

<h3>🔑 Concepts clés</h3>

<p>${concepts.replace(/\n/g,"<br>")}</p>

</div>

${image ? `

<div class="bloc image-cours">

<h3>🖼️ Image du cours</h3>

<img src="${image}" alt="${titre}">

</div>

` : ""}



<div class="bloc resume">

<h3>📘 Résumé du cours</h3>

<p>${resume.replace(/\n/g,"<br>")}</p>

</div>



<div class="bloc retenir">

<h3>⭐ À retenir pour l'examen</h3>

<p>${retenir.replace(/\n/g,"<br>")}</p>

</div>



<div class="bloc examen">

<h3>❓ Questions possibles d'examen</h3>

<p>${questions.replace(/\n/g,"<br>")}</p>

</div>






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
