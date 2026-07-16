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


    function getValue(champ){

        return contenu.match(
            new RegExp(`${champ}:\\s*(.*)`)
        )?.[1]?.trim() || "";

    }



    return {


        titre: getValue("title") || file.replace(".md",""),


        semestre: getValue("semestre") || "S5",


        matiere: getValue("matiere") || "Autre",


        type: getValue("type") || "Cours",


        fichier:
        `content/cours/${file}`


    };


});



fs.writeFileSync(

    "courses.json",

    JSON.stringify(cours, null, 2)

);



console.log("courses.json généré !");
