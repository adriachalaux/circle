import { getProjects, getProjectIdFromURL, getRelatedProjectData, responsiveMenu } from "./utils.js";

function setProjectData() {
    const projectId = getProjectIdFromURL()

    getProjectData(projectId)
    getRelatedProjectData(projectId)
}

/* GENERAL PROJECT DATA */
function getProjectData(projectId) {
    getProjects()
        .then(data => {
            const project = data.find(project => project.uuid === projectId)
            if(project) {
                document.querySelector('.project__title').innerHTML = project.name
                document.querySelector('.project__subtitle').innerHTML = project.description
                document.querySelector('.project__date span').innerHTML = project.completed_on
                document.querySelector('.project__image--show img').src = project.image
                document.querySelector('.project__image--show img').alt = `${project.name}`
                document.querySelector('.project__image--effect img').src = project.image
                document.querySelector('.project__image--effect img').alt = `${project.name}`
                document.querySelector('.project__description p').innerHTML = project.content
            } else {
                // alert("No project found.");
            }
        })
        .catch(err => console.log(err));
}

window.addEventListener("load", (event) => {
    responsiveMenu();
    setProjectData();
});