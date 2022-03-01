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
     let heartImg = document.createElement("img")
     heartImg.classList.add("heartImg")
     let likesNumber = document.createElement("span")
     likesNumber.classList.add("likesNumber")
     likesNumber.innerText = likes
     heartImg.setAttribute("src", "logos/heart.svg")
     likesBox.append(heartImg, likesNumber)
     descriptionBox.append(descriptionText, likesBox)
     descriptionText.innerText = "#" + caption.slice(0,100)

    heartImg.addEventListener("click", likePostFn)

     postBox.append(profilePartBox, imageBox, descriptionBox)

     if(counter) {
         heartImg.classList.add("redHeart")
     }
    })
   
}

// profile part of each post card
function profilePart(img, name, date) {
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
    profileDate.innerText = date;
    
    let logoWrapper = document.createElement("div")
    let profileLogoPart = document.createElement("img");
    profileLogoPart.setAttribute("src", "logos/instagram-logo.svg")
    profileLogoPart.classList.add("instagramLogo")
    logoWrapper.append(profileLogoPart)
    profileImgNameDate.append(profileImage, profileNameAndDate)
    profileImagePart.append(profileImgNameDate, logoWrapper)
   
    return profileImagePart;
}

function imagePart(img) {

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
 