const scrollChecker = () => {
    if (document.body.scrollTop > 128) {
        document.getElementById('profile-card').style.opacity = 0
    } else {
        document.getElementById('profile-card').style.opacity = 1
    }
}

document.addEventListener('scroll', scrollChecker)

scrollChecker()

document.querySelectorAll('.secondary-card').forEach(element => {
    element.addEventListener('mouseover', () => {
        document.documentElement.style.setProperty('--background-color', element.getAttribute("hoverColor"))
    })
    element.addEventListener('mouseout', () => {
        document.documentElement.style.removeProperty('--background-color')
    })
}) 
