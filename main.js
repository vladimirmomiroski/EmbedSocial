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
        dataPosts = [...data]
        loadingWrapper.style.display = "none"
        printPost(dataPosts, cutPosts)
    })
}, 500)
}


function printPost(arr, cut) {
    postsContainer.innerHTML = ""
    arr.slice(0, cut).forEach(({ image, caption, date, likes, name, profile_image}) => {
    let likeCounter = 0;
    //  returns date format of each post
     const formatedDate = formatPostDate(date)

    //  Post Card
     let postBox = document.createElement("div");
     postsContainer.append(postBox)
     postBox.classList.add("postBox")

    //  Post profile part
     let profilePartBox = document.createElement("div");
     profilePartBox.classList.add("profilePartBox")
     let profileImagePart = document.createElement("div");
     profileImagePart.classList.add("profileImgPart")
     let profileImage = document.createElement("img");

     profileImage.setAttribute("src", profile_image)
     profileImage.classList.add("profileImg")
     profileNameAndDate = document.createElement("div")
     profileNameAndDate.classList.add("profileNameAndDate")
     profileName = document.createElement("span");
     profileName.classList.add("profileName")
     profileDate = document.createElement("small");
     profileDate.classList.add("profileDate")
     profileNameAndDate.append(profileName, profileDate)
     profileName.innerText = name;
     profileDate.innerText = formatedDate;
     profileImagePart.append(profileImage, profileNameAndDate)
     let profileLogoPart = document.createElement("img");
     profileLogoPart.setAttribute("src", "logos/instagram-logo.svg")
     profileLogoPart.classList.add("instagramLogo")
     profilePartBox.append(profileImagePart, profileLogoPart);
    
    //  Post image part
    let imageBox = document.createElement("div")
    imageBox.classList.add("imgBox")
    let img = document.createElement("img")
    img.setAttribute("src", image)
    img.classList.add("image")
    imageBox.append(img)

    // Post description part
     let descriptionBox = document.createElement("div");
     let descriptionText = document.createElement("p")
     descriptionText.classList.add("descriptionText")
     let likesBox = document.createElement("div")
     likesBox.classList.add("likesBox")
     let heartImg = document.createElement("img")
     heartImg.classList.add("heartImg")
     let likesNumber = document.createElement("span")
     likesNumber.classList.add("likesNumber")
     likesNumber.innerText = parseInt(likes) + likeCounter
     heartImg.setAttribute("src", "logos/heart.svg")
     likesBox.append(heartImg, likesNumber)
     descriptionBox.append(descriptionText, likesBox)
     descriptionText.innerText = "#" + caption.slice(0,100)

    heartImg.addEventListener("click", (e) => {
        likePostFn(e, likeCounter)
    })
     postBox.append(profilePartBox, imageBox, descriptionBox)
    })
   
}

function likePostFn(e, counter) {
  if(!counter) {
      counter++
    e.currentTarget.classList.add("redHeart")
    console.log(counter)
  } else {
      counter--
      e.currentTarget.classList.remove("redHeart")
  }
}

fetchData()
// Format post date
const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Okt", "Nov", "Dec"]


function formatPostDate(date) {
   const year = new Date(date).getFullYear()
   const monthNumber = new Date(date).getMonth()
   const month = months[monthNumber]
   const day = date.slice(8, 10)

   return `${day} ${month} ${year}`;
}


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



