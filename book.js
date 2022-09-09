// VARIABLES
const refBookContainer = document.getElementById("bookContainer");
const refBookSpine = document.getElementById("bookCoverSpine");
const refBookCoverFront = document.getElementById("bookCoverFront");
const refSky = document.getElementById("sky");
const refShootingStar = document.getElementById("shootingStar");

const skyBaseObjects = [...refSky.children];
const bookSpineBaseObjects = [...refBookSpine.children];

// Random words
const species = ["frog", "dog", "cat", "parrot", "panda", "bear", "peacock", "crow", "lion"];
const origins = ["mountain", "sea", "plains", "land", "country", "town", "ocean", "river"];
const jobs = ["warrior", "singer", "mage", "jester", "zeppelin driver"];
const weapons = ["sword", "staff", "bow", "spear"];
const behavior = ["kind", "generous", "courageous", "cunning", "curious"];

// Sorted words (0 = badest, max = goodest)
const quality = ["terrible", "very bad", "bad", "medium", "pretty good", "great", "fantastic"];

// Not yet used
// const actions = ["danced", "played music", "read"];
// const adverbs = ["all day", "all the time", "not very much"];
// const adjectives = ["blue", "happy", "tall", "well behaved"];
// const mischieves = ["tricking people", "stealing stuff", "not nice"];

let currentLine = 0;
let story = ["Once Upon a time..."];

let pages = [];
let currentPage = 0;


// CLASSES
class Character {
    constructor() {
        this.name = randomName();
        this.species = randomFromArray(species);
        this.origin = `${randomFromArray(origins)} of ${randomName()}`;
        this.job = `${randomFromArray(quality)} ${randomFromArray(jobs)}`;
        this.behavior = randomFromArray(behavior);

        this.lifePts = randomInt(2, 6);
        this.maxHitPts = randomInt(3, quality.length);

        this.inventory = {
            gold: randomInt(0, 20),
            weapon: randomFromArray(weapons)
        }
    }

    get presentation() {
        return `${this.name} was a ${this.species} from the ${this.origin}.`;
    }

    get occupation() {
        return `${this.name} was a ${this.job}.`;
    }

    get personality() {
        return `${this.name} was ${this.behavior}.`;
    }

    get lifeCheck() {
        if (this.lifePts <= 0) {
            this.lifePts = 0;
            return false;
        } else return true
    }

    get wealthCheck() {
        if (this.inventory.gold <= 5)
            return `${this.name} was poor.`;
        else if (this.inventory.gold >= 15)
            return `${this.name} was rich.`;
        else
            return `${this.name} gold was balanced.`;
    }

    attack(target) {
        const hitPoints = randomInt(0, this.maxHitPts);
        target.lifePts -= hitPoints;

        let combatPrompt = "";
        if (hitPoints != 0) {
            combatPrompt = `${this.name} strucked ${target.name} 
                with a ${quality[hitPoints]} hit using a ${this.inventory.weapon} !`;
            if (!target.lifeCheck)
                combatPrompt += `\n${target.name} was defeated !`;
                
            return combatPrompt
        } else return `${this.name} missed ${target.name} !`
    }
}


// FUNCTIONS
init();

function init() {
    refSky.replaceChildren(...skyBaseObjects);
    refBookSpine.replaceChildren(...bookSpineBaseObjects);

    currentLine = 0;
    story = ["Once Upon a time..."];

    pages = [];
    currentPage = 0;

    storyCreation();
    pagesCreation();

    starsCreation();
    resetShootingStarAnimation();
    createClouds();
}

function randomInt(min, max) {
    // Random integer inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max, decimals = 1) {
    // Random float inclusive
    return (Math.random() * (max - min) + min).toFixed(decimals);
}

function randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function storyCreation() {
    const mainChar = new Character();
    const badChar = new Character();

    refBookCoverFront.children[0].textContent = `The Story of ${mainChar.name}`;

    story.push(mainChar.presentation);
    story.push(mainChar.occupation);
    story.push(`But ${mainChar.name} had an ennemy :`);
    story.push(badChar.presentation);
    story.push(`And ${badChar.name} was mean.`);
    story.push(`So ${mainChar.name} faced ${badChar.name}.`);
    story.push(`${mainChar.name} was quicker and striked first !`);
    // mainChar attacks
    story.push(mainChar.attack(badChar));
    if (!badChar.lifeCheck) {
        story.push(`${mainChar.name} had won, he could now live in peace.`);
        story.push(`The End.`);
        return
    }
    // badChar attacks
    story.push(`"You're fast.", said ${badChar.name}. "Now take this !"`);
    story.push(badChar.attack(mainChar));
    if (!mainChar.lifeCheck) {
        story.push(`${mainChar.name} was defeated, but he would come back stronger.`);
        story.push(`The End.`);
        return
    }
    // mainChar attacks
    story.push(`${badChar.name} is strong, but not fast enough, though ${mainChar.name}.`);
    story.push(mainChar.attack(badChar));
    if (!badChar.lifeCheck) {
        story.push(`${mainChar.name} had won, he could now live in peace.`);
        story.push(`The End.`);
        return
    }
    // last badChar attack
    story.push(`"You can't beat me !", said ${badChar.name}.`);
    story.push(badChar.attack(mainChar));
    // No one won
    if (mainChar.lifeCheck) {
        story.push(`The two ennemies were exhausted, they both fell on the ground.`);
        story.push(`When they woke up, they didn't want to fight anymore, 
            "Let's make peace at the tavern" said ${mainChar.name}.`);
        story.push(`${badChar.name} nodded and they both headed to more peaceful tomorrows.`);
        story.push(`The End.`);
    }
}

function randomName() {
    // Tottaly random name from random syllables (that sound like fantasy names)
	let name = "";
	let syllables = [];
    // From french sounds usage
	const consonantSounds = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "z", "gn", "nh", "nn", "ph", "ll", "il", "ui", "oi", "mm", "rh", "sc", "ch", "th", "sch", "sh", "ge"];
	const vowelSounds = ["a", "e", "i", "o", "u", "y", "en", "un", "on", "ou", "eu", "oh", "eh", "aï", "ah", "é", "et", "ez", "er", "es", "ai", "è", "œ", "au", "in", "ein", "um", "om", "em", "am", "ê", "û"];

    // Create a syllables array from two parts
	for (let i = 0; i < 100; i++) {
		let syllable = "";
		if (Math.floor(Math.random() * 2) == 1) {
			syllable += randomFromArray(consonantSounds);
			syllable += randomFromArray(vowelSounds);
		} else {
			syllable += randomFromArray(vowelSounds);
			syllable += randomFromArray(consonantSounds);
		}
		syllables.push(syllable);
	}

	// Add a random number of syllables (up to two)
	const syllablesNb = Math.floor(Math.random() * 2);
	for (let i = 0; i <= syllablesNb; i++) {
		name += randomFromArray(syllables);
	}

	// Return the name with a capitalised letter
	return name.charAt(0).toUpperCase() + name.slice(1);
}

function pagesCreation(number = 15) {
    // Create all pages with tags and classes
    let page = 0; // Page numbering

    for (var i = 0; i < number; i++) {
        const newPage = document.createElement("div");
        newPage.classList.add("bookPage");

        page++
        newPage.appendChild(innerPageCreation("frontPage", page));

        page++;
        newPage.appendChild(innerPageCreation("backPage", page));

        newPage.style.left = i * 3 + 2 + "px"; // Set page separation

        // Set a delay longer for the first pages
        newPage.dataset.delay = (number * 25) - ((i + 1) * 25) + 200;

        newPage.addEventListener("mousedown", () => {
            // Turn right page
            if (newPage.children[0].dataset.pageNumber == currentPage * 2 + 1) {
                newPage.style.transform = "rotateY(-179deg)";
                currentPage++;
            // Turn left page
            } else if (newPage.children[1].dataset.pageNumber == currentPage * 2) {
                newPage.style.transform = "rotateY(-1deg)";
                currentPage--;
            }
        });

        pages.push(newPage);
        refBookSpine.appendChild(newPage);
    }
}

function innerPageCreation(type, pageNb) {
    const innerPage = document.createElement("div");
    innerPage.classList.add(type);
    innerPage.dataset.pageNumber = pageNb;
    
    const paragraph = document.createElement("p");
    innerPage.appendChild(paragraph);
    fillPage(paragraph);

    const footnote = document.createElement("span");
    footnote.textContent = pageNb;
    innerPage.appendChild(footnote);

    return innerPage
}

function fillPage(paragraph) {
    // Add text to the page
    const text = story[currentLine];
    paragraph.textContent = text;

    currentLine++;
}

function starsCreation(starsNb = 40) {
    for (var i = 0; i < starsNb; i++) {
        newStar = document.createElement("div");
        newStar.classList.add("star");

        newStar.style.left = randomInt(0, refSky.clientWidth) + "px";
        newStar.style.top = randomInt(0, refSky.clientHeight) + "px";
        const randomSize = randomInt(2, 6) + "px";
        newStar.style.width = randomSize;
        newStar.style.height = randomSize;
        newStar.style.animationDelay = randomInt(2, 10) * 1000 + "ms";

        refSky.appendChild(newStar);
    }
}

function createClouds(number = 4) {
    for (let i = 0; i < number; i++) {
        const cloud = document.createElement("div");
        cloud.classList.add("cloud")

        cloud.style.top = `${randomInt(-30, 80)}px`;
        cloud.style.opacity = randomFloat(0.85, 1, 2);
        const scale = randomFloat(0.7, 1.5);

        refSky.appendChild(cloud);

        cloud.animate([
            { transform: `translateX(${refSky.clientWidth + 50}px) scale(${scale})` },
            { transform: `translateX(-${refSky.clientWidth}px) scale(${scale})` }
        ], {
            duration: randomInt(15, 25) * 1000,
            delay: randomInt(20, 120) * 100,
            iterations: Infinity,
            fill: "both",
            easing: "linear"
        });
    }
}

function resetAnimation(animatedElement) {
    // Using reflow to reset (cf https://thewebdev.info/2022/04/18/how-to-restart-animation-in-css3-and-javascript/)
    animatedElement.style.animation = "none";
    animatedElement.offsetHeight;
    animatedElement.style.animation = null;
}

function resetShootingStarAnimation() {
    refShootingStar.style.top = `${randomInt(15, 80)}px`;

    resetAnimation(refShootingStar);

    refShootingStar.style.animationDelay = `${randomInt(25, 35) * 1000}ms`;
}


// EVENT LISTENERS
refShootingStar.addEventListener("animationend", resetShootingStarAnimation);

refBookContainer.addEventListener("mouseenter", function() {
    // When the cursor enter, set a flip delay for each page
    for (let i = 0; i < pages.length; i++) {
        pages[i].style.transitionDelay = `${pages[i].dataset.delay}ms`;
        pages[i].style.transform = "rotateY(-1deg)";
    }
    // Open the book to the last read page
    for (let i = 0; i < currentPage; i++) {
        pages[i].style.transitionDelay = `0ms`;
        pages[i].style.transform = "rotateY(-179deg)";
    }
});

refBookContainer.addEventListener("mouseleave", function() {
    // When the cursor exit, reset the delay to 0 to close the pages with the book
    for (let i = 0; i < pages.length; i++) {
        pages[i].style.transitionDelay = "0ms";
        pages[i].style.transform = "rotateY(-90deg)";
    }
});
