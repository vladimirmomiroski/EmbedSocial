let dataPosts = [];
let cutPosts = 4;


let postsContainer = document.querySelector(".posts-container");

function fetchData() {
setTimeout(() => {
    fetch("data.json")
    .then(res => res.json())
    .then(data => {
        dataPosts = [...data]
        printPost(dataPosts)
    })
}, 1000)
}






function printPost(arr) {
    postsContainer.innerHTML = ""
    arr.forEach(({ image, caption, date, likes, name, profile_image}) => {
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
     likesNumber.innerText = likes
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
      counter++;
    e.currentTarget.classList.add("redHeart")
    console.log(counter)
  } else {
      counter--
      e.currentTarget.classList.remove("redHeart")
  }
}

fetchData(cutPosts)


const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Okt", "Nov", "Dec"]

// Format post date
function formatPostDate(date) {
  
   const year = new Date(date).getFullYear()
   const monthNumber = new Date(date).getMonth()
   const month = months[monthNumber]
   const day = date.slice(8, 10)

    return `${day} ${month} ${year}`;
}


window.addEventListener("load", () => {
    if(!dataPosts.length) {
        postsContainer.innerText = "LOADING"
    }
})

