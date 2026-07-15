const fs = require("fs");
const path = require("path");

const dossier = "./content/cours";

const fichiers = fs.readdirSync(dossier)
.filter(file => file.endsWith(".md"));

const cours = fichiers.map(file => {

    const contenu = fs.readFileSync(
        path.join(dossier, file),
        "utf8"
    );

    const titre =
    contenu.match(/title:\s*(.*)/)?.[1]
    || file.replace(".md","");


    const categorie =
    contenu.match(/category:\s*(.*)/)?.[1]
    || "Autre";


    return {
        titre: titre,
        categorie: categorie,
        fichier: `content/cours/${file}`
    };

});


fs.writeFileSync(
    "courses.json",
    JSON.stringify(cours, null, 2)
);


console.log("courses.json généré !");
