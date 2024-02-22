import { drawCards, getRelatedProjectsData, orderAndShuffleProjects, responsiveMenu } from "./utils.js";

window.addEventListener("load", (event) => {
    responsiveMenu()
    getRelatedProjectsData()
        .then(projects => {
            const projectsShuffled = orderAndShuffleProjects(projects)
            drawCards(projectsShuffled)
        })
        .catch(err => console.error(err))

    // Obtenemos los proyectos
    // Ordenamos al reves y aleatorizamos los proyectos
    // Pintamos las tarjetas con la info de cada uno de los proyectos
});
