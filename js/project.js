window.addEventListener("load", (event) => {
    const url = window.location.href; // Get URL
    const fileNameWithExtension = url.split('/').pop(); // Just get the page file name 
    const fileName = fileNameWithExtension.split('.').shift(); // Remove the extension
    
    getProjectData(fileName)
    getRelatedProjectData(fileName)
});

/* GENERAL PROJECT DATA */
function getProjectData(number) {
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


