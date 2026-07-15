const liste = document.getElementById("liste-cours");

fetch("courses.json")
.then(response => response.json())
.then(cours => {

    liste.innerHTML = "";

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

})
.catch(error => {

    liste.innerHTML = `
        <p>Erreur de chargement des cours</p>
    `;

    console.log(error);

});
