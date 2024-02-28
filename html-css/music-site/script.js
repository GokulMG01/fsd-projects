
function toggleNav() {
    var body = document.body;
    var openNav = document.getElementById("open-nav");
    var navText = document.getElementsByClassName("nav-hidden");
    var navVisible = document.getElementsByClassName("nav-visible");
    openNav.style.display = (openNav.style.display === 'none' || openNav.style.display === '') ? 'inline' : 'none';
    for (let i = 0; i < navText.length; i++) {
        navText[i].style.display = (navText[i].style.display === 'block' || navText[i].style.display === '') ? 'none' : 'block';
    }
    for (let i = 0; i < navVisible.length; i++) {
        navVisible[i].style.margin = (openNav.style.display === 'none') ? '0 1vw 0 0' : '2.1vh 0';
        navVisible[i].style.color = (openNav.style.display === 'none') ? '#ffffff' : '#eb9c00';
    }
    body.style.gridTemplateColumns = (openNav.style.display === 'none') ? '12vw 68vw 20vw' : '6vw 74vw 20vw';
}
function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

document.querySelectorAll(".song-card").forEach(element=>{
    console.log("jldjlkjsa")
    element.addEventListener('click',event=>{
        // event.preventDefault()
        let img = element.firstElementChild.firstElementChild.getAttribute("src");
        let songName = element.lastElementChild.firstElementChild.innerHTML;
        let MovieName = element.lastElementChild.lastElementChild.innerHTML;
        document.querySelector(".info-song-img>img").setAttribute("src",img);
        document.querySelector(".add-song-name").innerHTML = songName;
        document.querySelector(".add-movie-name").innerHTML = MovieName;
    })
})

