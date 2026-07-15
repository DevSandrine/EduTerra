const cours = [
    {
        titre: "Introduction aux Sciences de l'Éducation",
        categorie: "sociologie",
        fichier: "content/cours/introduction-aux-sciences-de-leducation.md"
    }
];


const liste = document.getElementById("liste-cours");


cours.forEach(c => {

    let bloc = document.createElement("article");

    bloc.innerHTML = `

        <h3>${c.titre}</h3>

        <p>
        Catégorie : ${c.categorie}
        </p>

        <a href="lecture.html?cours=${encodeURIComponent(c.fichier)}">
        Lire le cours
        </a>

    `;

    liste.appendChild(bloc);

});
