let dataPosts = [];
let cutPosts = 4;

const loadBtn = document.querySelector(".load-btn");
const loading = document.querySelector(".loading-img")
const loadingWrapper = document.querySelector(".loading-wrapper")

loadBtn.addEventListener("click", () => {
    cutPosts += 4;
    printPost(dataPosts, cutPosts)
    if(dataPosts.length === cutPosts) {
        loadBtn.style.visibility = "hidden"
    }
})


let postsContainer = document.querySelector(".posts-container");

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
            dataPosts = data.map(el => {
                let randomId = Date.now() + Math.random()
                el.id = randomId;
                el.counter = 0;
                return el
            })
        }
      
        loadingWrapper.style.display = "none"
        printPost(dataPosts, cutPosts)
    })
}, 500)
}



function likePostFn(e) {
    const id = +e.currentTarget.parentNode.parentNode.parentNode.id
    let post = dataPosts.find(post => post.id === id);
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

fetchData()
// Format post date



window.addEventListener("load", () => {
    if(!dataPosts.length) {
        let deg = 5;
      const interval = setInterval(() => {
           loading.style.transform = `rotate(${deg}deg)`;
           deg += 5;
           dataPosts.length && clearInterval(interval)
         }, 100)
     }
})



