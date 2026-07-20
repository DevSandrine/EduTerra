fetch("courses.json")

.then(response => response.json())

.then(cours => {


const niveauPage = document.body.dataset.niveau;


cours = cours.filter(c => c.niveau === niveauPage);


const zoneMatieres = document.getElementById("liste-matieres");
const zoneCours = document.getElementById("liste-cours");
const titreCours = document.getElementById("titre-cours");


// récupérer automatiquement toutes les matières

const matieres = [...new Set(
    cours.map(c => c.matiere)
)];


// créer les blocs matières

matieres.forEach(matiere => {


    const bloc = document.createElement("div");

    bloc.className = "bloc-matiere";


    bloc.innerHTML = `
        <h3>${matiere}</h3>
    `;



    // quand on clique sur une matière

    bloc.onclick = function(){


        titreCours.textContent = "📘 " + matiere;


        zoneCours.innerHTML = "";


        cours

        .filter(c => c.matiere === matiere)

        .forEach(c => {


            zoneCours.innerHTML += `

            <article>

                <h3>${c.titre}</h3>

                <p>
                Semestre : ${c.semestre}
                </p>

                <p>
                Type : ${c.type}
                </p>


                <a href="lecture.html?cours=${encodeURIComponent(c.fichier)}">
                Voir le cours
                </a>

            </article>

            `;


        });


    };


    zoneMatieres.appendChild(bloc);


});


})

.catch(error => {

console.error("Erreur chargement cours :", error);

});
