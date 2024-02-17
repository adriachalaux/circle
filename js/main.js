document.addEventListener("DOMContentLoaded", function() {
    getRelatedProjectData()
    responsiveMenu()
});

/* API CALL */
function getProjects() {
    return fetch('https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects')
}

/* RELATED PROJECTS */
function getRelatedProjectData(number) {
    const recentProjects = document.querySelector('.recent')
    let usedIndices = [];

    if (recentProjects) {
        const recentCards = recentProjects.querySelectorAll('.project-card')
        getProjects()
            .then(res => res.json())
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
                    } while (usedIndices.includes(randomIndex) || randomIndex === parseInt(number, 10) - 1);

                    usedIndices.push(randomIndex); 

                    console.log(randomIndex)

                    const project = data[randomIndex]

                    console.log(project)
                    if(project) {
                        recentProject.querySelector('.project-card__title').innerHTML = project.name
                        recentProject.querySelector('.project-card__text').innerHTML = project.description
                        recentProject.querySelector('.project-card__image img').src = project.image
                        recentProject.querySelector('.project-card__image img').alt = `${project.name}`
                        if (number) {
                            recentProject.querySelector('.project-card__cta').href = `${project.uuid}.html`
                            recentProject.querySelector('.project__link').href = `${project.uuid}.html`
                        } else {
                            recentProject.querySelector('.project-card__cta').href = `projects/${project.uuid}.html`
                            recentProject.querySelector('.project__link').href = `projects/${project.uuid}.html`
                        }
                    } else {
                        alert("No project found.");
                    }
                })
                
            })
            .catch(err => console.log(err));
    }
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



