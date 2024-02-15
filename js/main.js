const btnMenuMobile = document.querySelector('.header__mobile-btn')
const menuMobile = document.querySelector('.header__navigation')

btnMenuMobile.addEventListener('click', () => {
    menuMobile.classList.toggle('open')
})