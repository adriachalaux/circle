import { drawCards, getRelatedProjectsData, orderAndShuffleProjects, responsiveMenu } from "./utils.js";

window.addEventListener("load", (event) => {
    responsiveMenu()
    getRelatedProjectsData()
        .then(projects => {
            const projectsShuffled = orderAndShuffleProjects(projects)
            drawCards(projectsShuffled)
        })
        .catch(err => console.error(err))
});
