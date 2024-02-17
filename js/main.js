document.addEventListener("DOMContentLoaded", function() {
    responsiveMenu()
    getRelatedProjectData()
});

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


/* API CALL */
function getProjects() {
    return fetch('https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects')
}

/* RELATED PROJECTS */
function getRelatedProjectData(number) {
    const recentProjects = document.querySelector('.recent')
    if (recentProjects) {
        getProjects()
            .then(res => res.json())
            .then(data => {
                const project = data.find(project => project.uuid === number)
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
                    alert("No project found.");
                }
            })
            .catch(err => console.log(err));
    }
}


