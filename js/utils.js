async function getProjects() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects')
        const data = await response.json()
        return data
    } catch (err) {
        throw err
    }
}

function getProjectIdFromURL() {
    const searchParam = window.location.search
    const regexp = /id=(.*)/;
    const [, projectId] = regexp.exec(searchParam)
    return projectId
}

/* RESPONSIVE MENU */
function responsiveMenu() {
    const btnMenuMobile = document.querySelector('.header__mobile-btn')
    const menuMobile = document.querySelector('.header__navigation')
    
    btnMenuMobile.addEventListener('click', () => {
        menuMobile.style.display = 'flex'
        setTimeout(() => {
            menuMobile.classList.toggle('open');
            const menuMobileLinks = document.querySelectorAll('.header__navigation.open a')
            menuMobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    menuMobile.classList.remove('open')
                })
            })
        }, 10);
    })
}

/* RELATED PROJECTS */
function getRelatedProjectData(projectId) {
    const recentProjects = document.querySelector('.recent')
    let usedIndices = [];

    if (recentProjects) {
        const urlOrigin = window.location.origin
        const recentCards = recentProjects.querySelectorAll('.project-card')
        getProjects()
            .then(data => {
                // Reordenar los proyectos por su identificador de forma ascendente
                const orderedData = data.sort((a, b) => parseInt(a.uuid) - parseInt(b.uuid));

                if (data.length < recentCards.length) {
                    console.error('No hay suficientes proyectos para mostrar');
                    return;
                }

                recentCards.forEach((recentProject) => {
                    let randomIndex;

                    // Buscar un índice que no esté utilizado
                    do { randomIndex = Math.floor(Math.random() * orderedData.length);
                    } while (usedIndices.includes(randomIndex) || randomIndex === parseInt(projectId, 10) - 1);

                    usedIndices.push(randomIndex); 
                    const project = data[randomIndex]

                    if(project) {
                        recentProject.querySelector('.project-card__title').innerHTML = project.name
                        recentProject.querySelector('.project-card__text').innerHTML = project.description
                        recentProject.querySelector('.project-card__image img').src = project.image
                        recentProject.querySelector('.project-card__image img').alt = `${project.name}`
                        recentProject.querySelector('.project-card__cta').href = `${urlOrigin}/pages/project.html?id=${project.uuid}`
                        recentProject.querySelector('.project__link').href = `${urlOrigin}/pages/project.html?id=${project.uuid}`
                    } else {
                        alert("No project found.");
                    }
                })
                
            })
            .catch(err => console.log(err));
    }
}

export {
    getProjects,
    getProjectIdFromURL,
    getRelatedProjectData,
    responsiveMenu
}