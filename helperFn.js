// Main function to create each post
function printPost(arr, cut) {
    postsContainer.innerHTML = ""
    arr.slice(0, cut).forEach(({ id, image, caption, date, likes, name, profile_image, counter}) => {
    //  returns date format of each post
     const formatedDate = formatPostDate(date)

    //  Post Card
     let postBox = document.createElement("div");
     postsContainer.append(postBox)
     postBox.classList.add("postBox")
     postBox.setAttribute("id", id)

    //  Post profile part
     let profilePartBox = document.createElement("div");
     profilePartBox.classList.add("profilePartBox")
     
     const profileParts = profilePart(profile_image, name, formatedDate)
     profilePartBox.append(profileParts)
    
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
     let heart = document.createElement("span")
     heart.classList.add("heartImg")
     let likesNumber = document.createElement("span")
     likesNumber.classList.add("likesNumber")
     likesNumber.innerText = likes
     heart.innerHTML = `<i class="fa fa-heart"></i>`
     likesBox.append(heart, likesNumber)
     descriptionBox.append(descriptionText, likesBox)
     descriptionText.innerText = returnText(caption)

    heart.addEventListener("click", likePostFn)
    imageBox.addEventListener("click", modalPost)

     postBox.append(profilePartBox, imageBox, descriptionBox)

     if(counter) {
         heart.classList.add("redHeart")
     }
    })
   
}

// profile part of each post card and reusable for the modal
function profilePart(img, name, date) {
    const formatedDate = formatPostDate(date)
    let profileImagePart = document.createElement("div");
    profileImagePart.classList.add("profileImgPart")
    let profileImage = document.createElement("img");
     let profileImgNameDate = document.createElement("div")
     profileImgNameDate.classList.add("profileImgNameDate")
    profileImage.setAttribute("src", img)
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
    
    let logoWrapper = document.createElement("div")
    let profileLogoPart = document.createElement("img");
    profileLogoPart.setAttribute("src", "logos/instagram-logo.svg")
    profileLogoPart.classList.add("instagramLogo")
    logoWrapper.append(profileLogoPart)
    profileImgNameDate.append(profileImage, profileNameAndDate)
    profileImagePart.append(profileImgNameDate, logoWrapper)
   
    return profileImagePart;
}

// format date for each post
const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Okt", "Nov", "Dec"]

function formatPostDate(date) {
    const year = new Date(date).getFullYear()
    const monthNumber = new Date(date).getMonth()
    const month = months[monthNumber]
    const day = date.slice(8, 10)
 
    return `${day} ${month} ${year}`;
 }

 //  modal fn
 function modalPost(e) {
     e.stopPropagation()
   modalWrapper.innerHTML = ""
   const cardId = +e.currentTarget.parentNode.id;
   const {id, image, profile_image, name, date, caption, likes, counter} = findIndex(dataPosts, cardId)
  
   modalWrapper.style.display = "flex";
   modalWrapper.setAttribute("id", id)
   
   const imgBox = document.createElement("div")
   const postInfo = document.createElement("div")
   postInfo.classList.add("postInfoModal")
   imgBox.classList.add("modalImgBox");
   const img = document.createElement("img")
   img.classList.add("imgModal");
   img.setAttribute("src", image)
   imgBox.append(img)
   const profileParts = profilePart(profile_image, name, date)
   const captionText = document.createElement("p");
   captionText.classList.add("modalCaption")
   captionText.innerText = caption;
   const likesInfo = document.createElement("div")
   likesInfo.classList.add("likesInfoModal")
   likesInfo.setAttribute("id", id)
   const heart = document.createElement("span")
   heart.innerHTML = `<i class="fa fa-heart"></i>`;
   heart.classList.add("heartModal")
   const likesText = document.createElement("p")
   likesText.classList.add("likesTextModal")
   likesText.innerText = likes
   likesInfo.append(heart, likesText)
   postInfo.append(profileParts, captionText, likesInfo)
   profileParts.classList.add("profilePartsModal")
   modalWrapper.append(imgBox, postInfo)
   overlay.style.display = "block"

   if(counter) {
       heart.classList.add("redHeart")
}
   heart.addEventListener("click", (e) => {
    likePostFn(e, id),
    modalPost(e)

   })
   
 }

//  find post
 function findIndex(arr, id) {
     const postCard = arr.find(el => el.id === id)
     return postCard
 }

//  caption text
 function returnText(text) {
      if(text.length) {
          return `#${text.slice(0, 100)}...`;
      } else {
          return "No caption"
      }
 }


 