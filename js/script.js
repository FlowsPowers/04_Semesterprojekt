async function loadData(url) {
try {
const response = await fetch(url);
return await response.json();
} catch (error) {
console.error(error);
return false;
}
}

function getCharactersFromResponse(response) {
	if (Array.isArray(response)) return response;
	if (response && Array.isArray(response.data)) return response.data;
	if (response && Array.isArray(response.characters)) return response.characters;
	if (response && Array.isArray(response.items)) return response.items;
	return [];
}

const characterUrl = 'https://dragonball-api.com/api/characters?limit=100';
const planetUrl = 'https://dragonball-api.com/api/planets';

const [characterData, planetData] = await Promise.all([
	loadData(characterUrl),
	loadData(planetUrl),
]);


function createTitleDivs() {

	const buttonMute = document.getElementById('buttonMute');
    buttonMute.addEventListener('click', () => toggleSoundOnOff());

	const titleFront = document.getElementById('titleFront');
	const titleBack = document.getElementById('titleBack');
	if (!titleFront || !titleBack) return;

	var offsetX = 0;
    for (let j = 0; j < 2; j++) {
	
			for (let i = 0; i < 16; i++) {
                
				if(i == 6) {offsetX = 50;
				} else if(i == 10) {offsetX = 90;
				} else if(i == 0) {offsetX = 0;}
				var titleImg = document.createElement('div');
				//titleImg.className = 'title-div';
				if(j == 0){var url = 'img/title_' + i + '.png';
				} else {var url = 'img/title_outline_' + i + '.png';}
				titleImg.style.backgroundImage = "url('"+url+"')";
				titleImg.style.width = '160px';
				titleImg.style.height = '160px';
				titleImg.style.position = 'absolute';
				titleImg.style.left = (i * 50) + offsetX + 'px';
				titleImg.style.top = '0px';
				if(j==0){titleFront.appendChild(titleImg);}
				else{titleBack.appendChild(titleImg);}
			}

	}
}

function animateTitleSinus() {
	const titleFront = document.getElementById('titleFront');
	const titleBack = document.getElementById('titleBack');
	if (!titleFront || !titleBack) return;
	const titleDivsFront = titleFront.children;
	const titleDivsBack = titleBack.children;
	const time = Date.now() * 0.005;
	for (let i = 0; i < titleDivsFront.length; i++) {
		const divFront = titleDivsFront[i];
		const divBack = titleDivsBack[i];
		const offset = i * 0.5;
		const y = Math.sin(time + offset) * 15;
		divFront.style.transform = `translateY(${y}px)`;
		divBack.style.transform = `translateY(${y}px)`;
	}

	const infiniteScrollBg = document.getElementById('headerBg');
	const timeBg = Date.now() * 0.00025;
	const x = Math.sin(timeBg) * 100 -200;
	infiniteScrollBg.style.transform = `translateX(${x}px)`;

	const songokuBg = document.getElementById('headerBgRight');
	const x2 = Math.sin(timeBg) * -20 ;
	songokuBg.style.transform = `translateX(${x2}px)`;
	//requestAnimationFrame(animateTitleSinus);
}

const menuDataObject = {
	"menuItems": [
		{
			"name": "Name",
			"url": 'https://dragonball-api.com/api/characters?name='
		},
		{
			"name": "Race",
			"url": 'https://dragonball-api.com/api/characters?race='
		},
		{
			"name": "Gender",
			"url": 'https://dragonball-api.com/api/characters?gender='
		}
	]
};	

const states = new Map();

function createMenuItems(){

     const menuContainer = document.getElementById('menuContainer');
     

     for (let i = 0; i < menuDataObject.menuItems.length ; i++) {
                
                var menuItemContainer = document.createElement('div');
				menuItemContainer.className = 'menuItemContainer';
				menuContainer.appendChild(menuItemContainer);

				var menuItem = document.createElement('div');
				var url = 'img/Icon_' + i + '.png';	
				menuItem.style.backgroundImage = "url('"+url+"')";
				menuItem.style.backgroundSize = 'cover';
				menuItem.style.transformOrigin = 'center';
				menuItem.className = 'menuItem';
				menuItemContainer.appendChild(menuItem);

				createDropdownMenu(menuItemContainer, i);

                const state = { scale: 1, rotationY: 0, x: 0, y: 0, opacity: 1 };
				states.set(menuItem, state);
				
				/*menuItem.addEventListener('click', () => {
				// remove any existing tweens on this state
						createjs.Tween.removeTweens(state);
						createjs.Tween.get(state)
							.to({ scale: 1.45 }, 140, createjs.Ease.backOut)
							.to({ scale: 0.92 }, 120, createjs.Ease.quadIn)
							.to({ scale: 1 }, 240, createjs.Ease.elasticOut)
							.to({ rotationY: 0 }, 150, createjs.Ease.cubicInOut)
					
				});
                */

				menuItem.addEventListener('mouseover', () => {
				// remove any existing tweens on this state
						createjs.Tween.removeTweens(state);
						createjs.Tween.get(state)
						.to({ rotationY: 360 }, 800, createjs.Ease.cubicInOut)
						.call(() => { state.rotationY = 0; }); 
					
				});
}

	createjs.Ticker.framerate = 60;
	createjs.Ticker.addEventListener('tick', () => {
		for (const [el, state] of states.entries()) {
			updateElementFromState(el, state);
		}
		animateTitleSinus();
	});

}

//setInterval(animateTitleSinus, 16);

function updateElementFromState(el, state) {
  const rx = state.rotationX || 0;
  const ry = state.rotationY || 0;
  const rz = state.rotationZ || 0;
  el.style.transform = `translate(${state.x||0}%, ${state.y||0}%)
                        rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)
                        scale(${state.scale||1})`;
  el.style.opacity = (state.opacity == null) ? '1' : String(state.opacity);
}

function createDropdownMenu( buttonDiv , id) {
        
     var dropDownMenu = document.createElement('div');
	 dropDownMenu.className = 'dropDownMenu';
	 var dropDownTitle = document.createElement('div');
	 dropDownTitle.className = 'dropDownMenuTitel';
	 var dropDownTitleText = document.createElement('p');
	 dropDownTitleText.textContent = menuDataObject.menuItems[id].name;

     var dropDownMenuContentWrapper = document.createElement('div');
	 dropDownMenuContentWrapper.className = 'dropDownMenuContentWrapper';

	 
	 dropDownTitle.appendChild(dropDownTitleText);
	 buttonDiv.appendChild(dropDownMenu);
	 dropDownMenu.appendChild(dropDownMenuContentWrapper);
     dropDownMenu.appendChild(dropDownTitle);

	 dropDownMenu.addEventListener('click', () => toggleDropDown(dropDownMenu));


	 var dropDownMenuContent = document.createElement('div');
	 dropDownMenuContent.className = 'dropDownMenuContent';
	 dropDownMenuContentWrapper.appendChild(dropDownMenuContent);
     

     switch(id) {
  case 0:
    charactersDataObject.forEach((character) => {
		const dropDownMenuChild = document.createElement('p');
		dropDownMenuChild.textContent = character.name || character.fullName || 'Unbekannt';

        
        dropDownMenuChild.addEventListener('click', () => clearMainContentAndReplace(dropDownMenuChild.textContent, id));

		dropDownMenuContent.appendChild(dropDownMenuChild);
	});
    break;
  case 1:
		const uniqueRaces= charactersDataObject.filter((obj, index, self) =>
		index === self.findIndex((t) => t.race === obj.race)
		);

    	uniqueRaces.forEach((character) => {
		const dropDownMenuChild = document.createElement('p');
		dropDownMenuChild.textContent = character.race || character.species || '–';
        
		dropDownMenuChild.addEventListener('click', () => clearMainContentAndReplace(dropDownMenuChild.textContent, id));

		dropDownMenuContent.appendChild(dropDownMenuChild);
	});
    break;
  case 2:

  		const uniqueGenders = charactersDataObject.filter((obj, index, self) =>
		index === self.findIndex((t) => t.gender === obj.gender)
		);

		uniqueGenders.forEach((character) => {
		const dropDownMenuChild = document.createElement('p');
		dropDownMenuChild.textContent = character.gender || 'Unbekannt';

        dropDownMenuChild.addEventListener('click', () => clearMainContentAndReplace(dropDownMenuChild.textContent, id));

		dropDownMenuContent.appendChild(dropDownMenuChild);
	});
	break;
  /*case 3:
		const uniqueKi = charactersDataObject.filter((obj, index, self) =>
		index === self.findIndex((t) => t.ki === obj.ki)
		);

		const uniqueKiSorted = JSON.sort(uniqueKi);
		console.log(uniqueKiSorted);
		uniqueKiSorted.forEach((character) => {
		const dropDownMenuChild = document.createElement('p');
		dropDownMenuChild.textContent = character.ki || 'Unbekannt';

       dropDownMenuChild.addEventListener('click', () => clearMainContentAndReplace(dropDownMenuChild.textContent, id));

		dropDownMenuContent.appendChild(dropDownMenuChild);
	});
	break;*/
}	 

}

function isObject(v) {
    return '[object Object]' === Object.prototype.toString.call(v);
};

JSON.sort = function(o) {
if (Array.isArray(o)) {
        return o.sort().map(JSON.sort);
    } else if (isObject(o)) {
        return Object
            .keys(o)
        .sort()
            .reduce(function(a, k) {
                a[k] = JSON.sort(o[k]);

                return a;
            }, {});
    }

    return o;
}


var activeDropDown = null;
function toggleDropDown(dropDownMenu){
     

    
    var dropDownMenuContentWrapper = dropDownMenu.querySelector('.dropDownMenuContentWrapper');
	dropDownMenuContentWrapper.style.height = "auto";


     var dropDownMenuContent = dropDownMenuContentWrapper.querySelector('.dropDownMenuContent');

       if(dropDownMenuContent.style.translateY  === '-100%') {

						const state = { y: -100};
						states.set(dropDownMenuContent, state);
				// remove any existing tweens on this state
						createjs.Tween.removeTweens(state);
						createjs.Tween.get(state)
							.to({ y: 0}, 1000, createjs.Ease.circOut);

							

	}else{

        dropDownMenuContentWrapper.style.height = "auto";

		if(activeDropDown && activeDropDown !== dropDownMenuContent){
			
			
			const state = { y: 0};
			states.set(activeDropDown, state);
			createjs.Tween.removeTweens(state);
			createjs.Tween.get(state)
				.to({ y: -100}, 1000, createjs.Ease.circOut);
		    
			/*const state2 = { scale: 1 };
			states.set(dropDownMenuContentWrapper, state2);
			createjs.Tween.removeTweens(state2);
			createjs.Tween.get(state2)
				.to({ scale:0 }, 1000, createjs.Ease.circOut);
            */
		   var dropDownWrapperActive = activeDropDown.parentNode;
            dropDownWrapperActive.style.height = "0%";

		}else if(activeDropDown === dropDownMenuContent){

			const state = { y: 0};
			states.set(dropDownMenuContent, state);
			createjs.Tween.removeTweens(state);
			createjs.Tween.get(state)
				.to({ y: -100}, 1000, createjs.Ease.circOut);
			
			
           /* const state2 = { scale: 1 };
			states.set(dropDownMenuContentWrapper, state2);
			createjs.Tween.removeTweens(state2);
			createjs.Tween.get(state2)
				.to({ scale:0 }, 1000, createjs.Ease.circOut);
             */
			var dropDownWrapperActive = activeDropDown.parentNode;
            dropDownWrapperActive.style.height = "0%";

			activeDropDown = null;
			return;
		}
		const state = { y: -100};
		states.set(dropDownMenuContent, state);
		createjs.Tween.removeTweens(state);
		createjs.Tween.get(state)
			.to({ y: 0}, 1000, createjs.Ease.circOut);
		activeDropDown = dropDownMenuContent;
		
		/*const state2 = { scale: 0 };
			states.set(dropDownMenuContentWrapper, state2);
			createjs.Tween.removeTweens(state2);
			createjs.Tween.get(state2)
				.to({ scale:1 }, 1000, createjs.Ease.circOut);

		*/
        
		return;
	}
					
				
   
}


var charactersDataObject = {};

function getCharacterList(characters){

	charactersDataObject = characters;
    showCharacters(characters);
}


function showCharacters (characters){

 	const mainContentScroller = document.getElementById('mainContentScroller');

 	characters.forEach((character) => {
	
     var characterContainer = document.createElement('div');
	 characterContainer.className = 'characterContainer';
	 var characterImg = document.createElement('div');
	 characterImg.className = 'characterImg';
	 var url = character.image;
	 characterImg.style.backgroundImage = "url('"+url+"')";
	 var characterName = document.createElement('div');
	 characterName.className = "characterName";
	 characterName.textContent = character.name || character.fullName || 'Unbekannt';
     
	 var characterDescA = document.createElement('p');
     characterDescA.innerText = "Ki:  \nMaxKi:  \nRace:  \nGender:  \nAffiliation:  ";

	 
	 var characterDescB = document.createElement('p');
     characterDescB.innerText = character.ki + "\n" + character.maxKi + "\n" + character.race + "\n" + character.gender + "\n" + character.affiliation ;

	 
	 characterDescA.className = characterDescB.className = 'characterDescriptionA';
     characterDescB.className = 'characterDescriptionB';

    /* name: "Goku"
ki: "60.000.000"
maxKi: "90 Septillion"
race: "Saiyan"
gender: "Male"
description: "El protagonista de la serie, conocido por su gran ..."
image: "https://dragonball-api.com/characters/goku_normal...."
affiliation: "Z Fighter"*/
	 
	 
	 characterContainer.appendChild(characterImg);
	 characterContainer.appendChild(characterName);
     characterContainer.appendChild(characterDescA);
     characterContainer.appendChild(characterDescB);

	 mainContentScroller.appendChild(characterContainer);
	 
	});

}

async function clearMainContentAndReplace(query, id){


     //console.log(query);
     //console.log(id);

     const mainContentScroller = document.getElementById('mainContentScroller');
	 mainContentScroller.innerHTML = "";
     
		var url;
		var res;
		var items;

		var urlString = menuDataObject.menuItems[id].url;
        url = urlString + query + '&limit=100';

		res = await loadData(url);
		items = getCharactersFromResponse(res);

	 showCharacters(items);

}

var isMuted = true;
var firstPlaySound = true;
function toggleSoundOnOff(){

	isMuted = !isMuted;
    const buttonStates = document.getElementById('buttonStates');
    
    if(isMuted){

         buttonStates.style.top = "0px";
		 
	}else{

         buttonStates.style.top = "-64px";

       if(firstPlaySound){

         createjs.Sound.play("theme", { loop: -1 });
         firstPlaySound = false;
	   }
	}

	createjs.Sound.muted = isMuted;

}

createjs.Sound.registerSound({id:"theme", src:"audio/theme.mp3"});

createjs.Sound.on("fileload", handleFileLoad);

function handleFileLoad(event) {
    // A sound has been preloaded.
    console.log("Preloaded:", event.id, event.src);
	var buttonMute = document.getElementById('buttonMute');
    buttonMute.style.pointerEvents = "all";
	const state = { opacity: 0};
			states.set(buttonMute, state);
			createjs.Tween.removeTweens(state);
			createjs.Tween.get(state)
				.to({opacity: 1 }, 1000, createjs.Ease.circOut);

}


var mousePosition;
var offset = [0,0];
var dragAndScroll;
var isDown = false;

function makeContentDragable(){

	dragAndScroll = document.getElementById('mainContentScroller');
	dragAndScroll.addEventListener('mousedown', function(e) {
		isDown = true;
		offset = [
			dragAndScroll.offsetLeft - e.clientX,
			dragAndScroll.offsetTop - e.clientY
		];
	}, true);

	document.addEventListener('mouseup', function() {
		isDown = false;
	}, true);

	document.addEventListener('mousemove', function(event) {
		event.preventDefault();
		if (isDown) {

			mousePosition = {

				x : event.clientX,
				y : event.clientY

			};
			if(mousePosition.x + offset[0] > 0){

				dragAndScroll.style.left = '0px';
			}else{
              dragAndScroll.style.left = (mousePosition.x + offset[0]) + 'px';
			  console.log((mousePosition.x + offset[0]));

			}
			
		/* dragAndScroll.style.top  = (mousePosition.y + offset[1]) + 'px';*/
		}
	}, true);

}


createTitleDivs();
makeContentDragable();

getCharacterList(getCharactersFromResponse(characterData));
createMenuItems();





