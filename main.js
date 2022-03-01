let dataPosts = [];
let cutPosts = 4;

const loadBtn = document.querySelector(".load-btn");
const loading = document.querySelector(".loading-img")
const loadingWrapper = document.querySelector(".loading-wrapper")
const mainWrapper = document.querySelector(".main-wrapper")
const postsContainer = document.querySelector(".posts-container");
const modalWrapper = document.querySelector(".modalWrapper")
const overlay = document.querySelector(".darkOverlay")

loadBtn.addEventListener("click", () => {
    cutPosts += 4;
    printPost(dataPosts, cutPosts)
    if(dataPosts.length === cutPosts) {
        loadBtn.style.visibility = "hidden"
    }
})


function fetchData() {
// little simulation if we need to wait more for the data
setTimeout(() => {
    fetch("data.json")
    .then(res => res.json())
    .then(data => {
        const dataFromStorage = localStorage.getItem("dataPosts")
        if(dataFromStorage) {
            dataPosts = JSON.parse(dataFromStorage)
        } else {
            dataPosts = data.map((el, idx) => {
                el.id = idx + 1;
                el.counter = 0;
                return el
            })
        }
      
        loadingWrapper.style.display = "none"
        mainWrapper.style.display = "block"
        printPost(dataPosts, cutPosts)
    })
}, 500)
}

fetchData()


function likePostFn(e) {
    const id = +e.currentTarget.parentNode.parentNode.parentNode.id
    const post = findIndex(dataPosts, id)
    if(!post.counter) {
        post.counter++
        post.likes = parseInt(post.likes) + post.counter
    } else {
        post.counter--
        post.likes = parseInt(post.likes) - 1;
    }
    printPost(dataPosts, cutPosts)
    localStorage.setItem("dataPosts", JSON.stringify(dataPosts));
}

// loading
window.addEventListener("load", () => {
    if(!dataPosts.length) {
     mainWrapper.style.display = "none"
        let deg = 5;
      const interval = setInterval(() => {
           loading.style.transform = `rotate(${deg}deg)`;
           deg += 5;
           dataPosts.length && clearInterval(interval)
         }, 100)
     }
})

// to prevent cancel the modal
modalWrapper.addEventListener("click", (e) => {
    e.stopPropagation()
})

window.addEventListener("click", (e) => {
   modalWrapper.style.display = "none"
   overlay.style.display = "none"
})

// go top
const goTop = document.querySelector(".arrow-up")
document.addEventListener("scroll", () => {
    const y = window.scrollY;
    y > 300 ? goTop.style.display = "block" : goTop.style.display = "none";
})

goTop.addEventListener("click", () => {
    window.scrollTo(0, 0)
})



