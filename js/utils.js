/* GET PROJECTS DATA FROM API */
async function getProjects() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects')
        const data = await response.json()
        return data
    } catch (err) {
        throw err
    }
}

/* GET PROJECT ID FROM URL */
function getProjectIdFromURL() {
    const searchParam = window.location.search
    const regexp = /id=(.*)/;
    const [, projectId] = regexp.exec(searchParam)
    return projectId
}

/* RESPONSIVE MENU */
function responsiveMenu() {
    const mobileBtnTag = document.querySelector('.header__mobile-btn')
    const mobileNavTag = document.querySelector('.header__navigation')
    
    mobileBtnTag.addEventListener('click', () => {
        mobileNavTag.style.display = 'flex'
        setTimeout(() => {
            mobileNavTag.classList.toggle('open');
            const mobileNavTagLinks = document.querySelectorAll('.header__navigation.open a')
            mobileNavTagLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileNavTag.classList.remove('open')
                })
            })
        }, 10);
    })
}

/* GET RELATED PROJECTS DATA */
function getRelatedProjectsData(projectId) {
    const recentProjectsTag = document.querySelector('.recent')

    if (recentProjectsTag) {
        const recentCards = recentProjectsTag.querySelectorAll('.project-card')
        getProjects()
            .then(data => {
                // Reordenar los proyectos por su identificador de forma ascendente
                const orderedData = data.sort((a, b) => parseInt(a.uuid) - parseInt(b.uuid))
                
                 // Filtrar el proyecto actual
                const filteredData = orderedData.filter(project => parseInt(project.uuid) !== parseInt(projectId));

                // Mezclar aleatoriamente el array filtrado
                const shuffledData = filteredData.sort(() => 0.5 - Math.random());

                // Seleccionar los primeros elementos según la cantidad de recentCards
                const selectedProjects = shuffledData.slice(0, recentCards.length);

                // Mostrar error si no hay suficientes proyectos para mostrar
                if (data.length < recentCards.length) {
                    console.error('No hay suficientes proyectos para mostrar');
                    return;
                }

                recentCards.forEach((recentProject, index) => {
                    const project = selectedProjects[index];
        
                    // Validamos que existe el proyecto en el índice y editamos el DOM
                    if(project) {
                        fillRecentProjectsData(recentProject, project);
                    } else {
                        alert("No project found.");
                    }
                });
                
            })
            .catch(err => console.log(err));
    }
}

/* RECENT PROJECTS DOM MANIPULATION */
function fillRecentProjectsData(recentProject, project) {
    const urlOrigin = window.location.origin
    recentProject.querySelector('.project-card__title').innerHTML = project.name
    recentProject.querySelector('.project-card__text').innerHTML = project.description
    recentProject.querySelector('.project-card__image img').src = project.image
    recentProject.querySelector('.project-card__image img').alt = `${project.name}`
    recentProject.querySelector('.project-card__cta').href = `${urlOrigin}/pages/project.html?id=${project.uuid}`
    recentProject.querySelector('.project__link').href = `${urlOrigin}/pages/project.html?id=${project.uuid}`
}

export {
    getProjects,
    getProjectIdFromURL,
    getRelatedProjectsData,
    responsiveMenu
}