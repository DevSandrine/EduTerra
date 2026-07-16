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


    let a_retenir = "";

    let resume = "";


    let matchRetenir = infos.match(/a_retenir:\s*\|-\s*([\s\S]*?)\n[a-z_]+:/);

    if(matchRetenir){
        a_retenir = matchRetenir[1];
    }


    let matchResume = infos.match(/resume:\s*\|-\s*([\s\S]*)/);

    if(matchResume){
        resume = matchResume[1];
    }



    contenu.innerHTML = `

    <div class="fiche">


        <div class="bloc resume">

            <h3>📘 Résumé du cours</h3>

            <p>${resume.replace(/\n/g,"<br>")}</p>

        </div>



        <div class="bloc retenir">

            <h3>⭐ À retenir pour l'examen</h3>

            <p>${a_retenir.replace(/\n/g,"<br>")}</p>

        </div>



        <div class="cours-complet">

            ${marked.parse(texteCours)}

        </div>


    </div>

    `;


})


.catch(error => {

contenu.innerHTML = error;

});


}
