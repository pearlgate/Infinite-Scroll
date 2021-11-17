
const image_container = document.getElementById("image-container");
const loader = document.getElementById("loader");
let photosArray = [];

let ready = false;
let imageLoaded = 0;
let totalImages = 0;

// Unsplash API
const count = 30;
const apiKey = 'sibnM6cf56wKaR8iASqvlaxPjvc7l_cTAUoJ_nD2-CI';
//const orientation = 'landscape';
const apiUrl  = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

// Helper function to Set Attributes On Dom Elements.
function setAttributes(element, attributes){
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Check if all images were loaded
function imageLoad() {
    console.log('image loaded');
    imageLoaded++;

    if(imageLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log('ready = ', ready);
    }
}

// Create Elements for links and photos, Add to dom.
function displayPhotos() {
    imageLoaded = 0;
    totalImages = photosArray.length;
    console.log('totalImages : ', totalImages);
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
       // item.setAttribute('href', photo.links.html);
       // item.setAttribute('target','_blank');
        setAttributes(item, {
            href : photo.links.html,
            target : '_blank',
        })
        const img = document.createElement('img');
       // img.setAttribute('src',photo.urls.regular);
       // img.setAttribute('alt',photo.alt_description);
       // img.setAttribute('title',photo.alt_description);
       setAttributes(img, {
           src : photo.urls.regular,
           alt : photo.alt_description,
           title : photo.alt_description,
       })

       // Event Listener, check when each is finished loading
       img.addEventListener('load',imageLoad);
        // Put <img> inside <a>, then put together inside the image_container Element
        item.appendChild(img);
        image_container.appendChild(item);
    })
}
//Get photos from Unsplash API
async function getPhotos(){
    try{

        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    }catch(error){
        //Catch Error Here
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
   // console.log('scrolled');
   if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready){
       //console.log('window.scrollY : ',window.scrollY);
    //    console.log('window.innerHeight : ',window.innerHeight);
    //    console.log('document.body.offsetHeight - 1000 : ',document.body.offsetHeight - 1000);
       ready = false;
       getPhotos();
       console.log('load more');
   }
} )
//On Load
getPhotos();