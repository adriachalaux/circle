import { responsiveMenu, drawCards, getProjects, getProjectIdFromURL, getRelatedProjectsData, orderAndShuffleProjects } from "./utils.js";

function setProjectData() {
    // Buscamos la ID del proyecto según la URL
    const projectId = getProjectIdFromURL()

    // Pintamos la info del proyecto y de los relacionados
    getProjectData(projectId)
    getRelatedProjectsData(projectId)
        .then(projects => {
            const projectsShuffled = orderAndShuffleProjects(projects, projectId)
            drawCards(projectsShuffled)
        })
        .catch(err => console.err(err))
}

/* GENERAL PROJECT DATA */
function getProjectData(projectId) {
    getProjects()
        .then(data => {
            const project = data.find(project => project.uuid === projectId)
            if(project) {
                fillProjectData(project)
            } else {
                alert("No project found.");
            }
        })
        .catch(err => console.log(err));
}

/* PROJECT DOM MANIPULATION */
function fillProjectData(project) {
    document.querySelector('.project__title').innerHTML = project.name
    document.querySelector('.project__subtitle').innerHTML = project.description
    document.querySelector('.project__date span').innerHTML = project.completed_on
    document.querySelector('.project__image--show img').src = project.image
    document.querySelector('.project__image--show img').alt = `${project.name}`
    document.querySelector('.project__image--effect img').src = project.image
    document.querySelector('.project__image--effect img').alt = `${project.name}`
    document.querySelector('.project__description p').innerHTML = project.content
}

window.addEventListener("load", (event) => {
    responsiveMenu();
    setProjectData();
});