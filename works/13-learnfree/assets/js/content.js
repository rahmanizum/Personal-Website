const videoLinks = [
    { link: 'https://www.youtube.com/embed/2fDvAnbTsds' },
    { link: 'https://www.youtube.com/embed/jk-QYXDjkKE' },
    { link: 'https://www.youtube.com/embed/FYqauvcAbX8' },
    { link: 'https://www.youtube.com/embed/gS-k_nUuk0M' },
    { link: 'https://www.youtube.com/embed/w3K-GdgYBqg' },
    { link: 'https://www.youtube.com/embed/td4D5aT5QbI' },
    { link: 'https://www.youtube.com/embed/jU0V-Hiaw8A' },
    { link: 'https://www.youtube.com/embed/7QeyD-nYhlc' },
    { link: 'https://www.youtube.com/embed/RmIEyf_V0s8' },
    { link: 'https://www.youtube.com/embed/1VfF4nQiwdk' },
    { link: 'https://www.youtube.com/embed/WcILuJ-W34g' },
    { link: 'https://www.youtube.com/embed/evTVXsOWyGE' },
    { link: 'https://www.youtube.com/embed/JAk9utaQSRM' },
    { link: 'https://www.youtube.com/embed/AYSApVtj_Cg' },
    { link: 'https://www.youtube.com/embed/1BLKo85G9cQ' },
    { link: 'https://www.youtube.com/embed/sSRoFkT3SnE' },
    { link: 'https://www.youtube.com/embed/ZZm2v437AUw' },
    { link: 'https://www.youtube.com/embed/r87tTUHcF58' },
    { link: 'https://youtube.com/embed/kgiygMg_ObE' },
    { link: 'https://www.youtube.com/embed/BRQn5JJ5wRQ' },
    { link: 'https://www.youtube.com/embed/FdmqI6xqSdc' },
    { link: 'https://www.youtube.com/embed/LtXEjpzxX6I' },
    { link: 'https://www.youtube.com/embed/q5j7s6rq2Pw' },
    { link: 'https://www.youtube.com/embed/jFn11SZNPMQ' },
    { link: 'https://www.youtube.com/embed/-HgwlziFAs0' },
    { link: 'https://www.youtube.com/embed/I2Duy5ZPS1k' },
    { link: 'https://www.youtube.com/embed/sx1cQXhW1Nk' },
    { link: 'https://www.youtube.com/embed/NigdCygHWP0' }
];


const linkPlaceholder = document.querySelector('#linkPlaceholder');
videoLinks.forEach((ele, index) => {
    linkPlaceholder.innerHTML += `
                            <div class="col-4 col-md-3" data-aos="fade-up" data-aos-delay="150">
                            <div class="d-flex" data-aos="fade-up" data-aos-delay="200">
                                <a href=${ele.link} class="glightbox btn rounded-5 p-1 border-2 btn-warning d-flex align-items-center"><i class="bi bi-play-circle p-2"></i><span class="me-2" >video ${index+1}</span></a>
                            </div>
                            </div>
                            `
})