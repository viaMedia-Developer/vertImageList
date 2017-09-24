// Set Important and Necessary Variables
var nav = document.getElementsByTagName('nav')[0],
	listImages = document.querySelectorAll('#thumbnail li'),
	photoTitle = document.getElementsByClassName('title'),
	photographer = document.getElementsByClassName('photographer'),
	photoLocation = document.getElementsByClassName('location')[0],
	modalLauncher = document.getElementById('launchModal'),
	modalCloser = document.getElementById('closeModal'),
	modal = document.getElementById('modalWrapper');
	imageInfo = document.querySelectorAll('#bottomInfo .info');

//Initial Set Up
//sets first image in array as project background image
var main = document.getElementById('main'),
	bgImage = images[0].url;
main.style.backgroundImage = "url("+bgImage+")";

//sets info from first object in necessary places (imcomplete)
photoTitle[0].innerText = images[0].name;
photoTitle[1].innerText = images[0].name;
photographer[0].innerText = images[0].photographer;
photographer[1].innerText = images[0].photographer;
photoLocation.innerText = images[0].location;
imageInfo[0].innerText = images[0].iso;
imageInfo[1].innerText = images[0].apeture;
imageInfo[2].innerText = images[0].focal;
imageInfo[3].innerText = images[0].shutter;

//Sets background images for thumbnail links w/ data from images array
for (var i = 0; i < listImages.length; i++) {
	bgImage = images[i].url;
	listImages[i].style.backgroundImage = "url("+bgImage+")";
}


//function for getting siblings of an element
var getSiblings = (elem) => {
	var siblings = [];
	var sibling = elem.parentNode.firstChild;
	for (; sibling; sibling = sibling.nextSibling) {
		if(sibling.nodeType !== 1 || sibling == elem) continue;
		siblings.push(sibling);
	}
	return siblings;
}

//Functions that allow elements to fade in and out
var fade = (element) => {	
	(element.classList.contains('appear') === true) ? element.classList.remove('appear') & element.classList.add('fade') : element.classList.add('fade');
}
var appear = (element) => {
	(element.classList.contains('fade') === true) ? element.classList.remove('fade') & element.classList.add('appear') : element.classList.add('appear');
}


//Functionality to set change background image and set info from selected image object
// curr = the element itself
// index = element's index in the array
// array = the array itself 
listImages.forEach((curr,index,arr) => {
	var current = index,
		bgImage = images[current].url,
		phName = images[current].name,
		phTaker = images[current].photographer,
		phLocation = images[current].location,
		phIso = images[current].iso,
		phApeture = images[current].apeture,
		phFocal = images[current].focal,
		phShutter = images[current].shutter;

	curr.addEventListener('click', function(e) {
		e.preventDefault();

		// fade out first,
		fade(main); fade(photoTitle[0]); fade(photographer[0]);
		// insert new content
		setTimeout(function(){
			main.style.backgroundImage = "url("+bgImage+")";
			photoTitle[0].innerText = phName;
			photographer[0].innerText = phTaker;
		},510)
		// then fade back in
		setTimeout(function(){
			appear(main); appear(photoTitle[0]); appear(photographer[0]);
		},500);
		
		


		//Not timing sensitive 
		photoTitle[1].innerText = phName;
		photographer[1].innerText = phTaker;
		photoLocation.innerText = phLocation;
		imageInfo[0].innerText = phIso;
		imageInfo[1].innerText = phApeture;
		imageInfo[2].innerText = phFocal;
		imageInfo[3].innerText = phShutter;

		var siblings = getSiblings(curr);
		(curr.classList.contains('active') === true) ? curr.classList.remove('active') : curr.classList.add('active');
		siblings.forEach(function(elem){
			elem.classList.remove('active');
		})
	});
});



//modal buttons functionality 
modalLauncher.addEventListener('click', function() {
	modal.style.display = "block";
	modal.classList.add('modalOpen');
	nav.style.opacity = 0;
});

modalCloser.addEventListener('click', function() {
	modal.classList.add('modalClose');
	setTimeout(function() {
		modal.style.display = "none";
	}, 300)
	modal.classList.remove('modalOpen');
	setTimeout(function() {
		modal.classList.remove('modalClose');
	}, 400)
	nav.style.opacity = 1;
});



var list = document.getElementById('thumbnail'),
	arrowUp = document.getElementById('up'),
	arrowDown = document.getElementById('down');

list.addEventListener('scroll', function(){
	var scrollAmount = this.scrollTop,
		max = 357;	

	console.log(scrollAmount);
	if (scrollAmount == 0) {
		arrowUp.style.fill = 'rgba(255, 255, 255, 0.4)';
	}
	if (scrollAmount > 0) {
		arrowUp.style.fill = 'rgba(255, 255, 255, 1)';
	}
	if (scrollAmount >= max) {
		arrowDown.style.fill = 'rgba(255, 255, 255, 0.4)';
	}
	if (scrollAmount > 0 && scrollAmount < max){
		arrowUp.style.fill = 'rgba(255, 255, 255, 1)';
		arrowDown.style.fill = 'rgba(255, 255, 255, 1)';
	}
})