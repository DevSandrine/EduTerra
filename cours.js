const cours = [
    {
        titre: "Introduction aux Sciences de l'Éducation",
        categorie: "Sciences de l'éducation",
        fichier: "introduction-aux-sciences-de-leducation.md"
    }
];


const liste = document.getElementById("liste-cours");


liste.innerHTML = "";


cours.forEach(c => {

    let bloc = document.createElement("article");


    bloc.innerHTML = `

        <h3>${c.titre}</h3>

        <p>
        Catégorie : ${c.categorie}
        </p>

        <a href="lecture.html?cours=${c.fichier}">
        Lire le cours
        </a>

    `;


    liste.appendChild(bloc);

});
