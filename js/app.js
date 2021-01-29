//Create a class. This instantiates a tamagotchi when you start a game
class Tamagotchi {
	constructor(name) {
		console.log('Constructor is running!')

		this.hunger = 1
		this.sleepiness = 1
		this.boredom = 1
		this.age = 10
		this.name = name
	}
}

//Create a game object. This is where everything will live besides the class and event listeners
const game = {

	tamagotchi: '', //Holds tamagotchi info
	lightsOff: false,
	intervalID: null,
	timeElapsed: 0,
	secondForm: false,
	thirdForm: false,

	createTamagotchi: function(name) {
		//Instantiate
		this.tamagotchi = new Tamagotchi(name)

		//Show the user something has changed
		this.printTamagotchiInfo()
		this.startTimer()
		this.showFirstTamagotchi()
		this.showButtons()
		this.showNotifications()
	},

	printTamagotchiInfo: function() {
		const ulLocation = document.querySelector('#tamagotchi-status')
		ulLocation.innerText = '' //Prevents array duplication

		const liName = document.createElement('li')
		liName.id = 'list-name'
		liName.innerText = `Name: ${this.tamagotchi.name}`

		const liAge = document.createElement('li')
		liAge.id = 'list-age'
		liAge.innerText = `Age: ${this.tamagotchi.age}`

		const liHunger = document.createElement('li')
		liHunger.id = 'list-hunger'
		liHunger.innerText = `Hunger: ${this.tamagotchi.hunger}`

		const liSleepiness = document.createElement('li')
		liSleepiness.id = 'list-sleepiness'
		liSleepiness.innerText = `Sleepiness: ${this.tamagotchi.sleepiness}`

		const liBoredom = document.createElement('li')
		liBoredom.id = 'list-boredom'
		liBoredom.innerText = `Boredom: ${this.tamagotchi.boredom}`

		ulLocation.appendChild(liName)
		ulLocation.appendChild(liAge)
		ulLocation.appendChild(liHunger)
		ulLocation.appendChild(liSleepiness)
		ulLocation.appendChild(liBoredom)
	},

	startTimer: function() {

		this.intervalID = setInterval(() => {
			this.timeElapsed++
			this.printTime()
		}, 1000)
	},

	stopTimer: function() {
		clearInterval(this.intervalID)
	},

	printTime: function() {
		const seconds = this.timeElapsed

		let mm = Math.floor(seconds/60)

		let ss = seconds - (mm * 60)

		if(ss < 10) {
			ss = '0' + ss
		}

		if(ss % 20 === 0) {
			this.increaseAge()
			this.printTamagotchiInfo()
		}

		if(ss % 10 === 0) {
			this.increaseHunger()
			this.printTamagotchiInfo()
		}

		if(ss % 12 === 0) {
			this.increaseSleepiness()
			this.printTamagotchiInfo()
		}

		if(ss % 15 === 0) {
			this.increaseBoredom()
			this.printTamagotchiInfo()
		}

		if(game.lightsOff == true) {
			if(ss % 1 === 0) { //DO I NEED THIS?? IT DOESN'T SEEM TO WORK
				this.reduceSleepiness()
				this.printTamagotchiInfo()

				if(this.tamagotchi.sleepiness <= 0) {
					console.log('You are well-rested!')
					this.tamagotchi.sleepiness = 0
					this.printTamagotchiInfo()
					this.lightsOff = true

					if(game.lightsOff == true) {
						document.body.style.backgroundColor = '#4A5A73'
						game.lightsOff = false
					}
				}
			}
		}

		console.log(`${mm}:${ss}`)
	},

	//Increase functions
	increaseAge: function() {
		this.tamagotchi.age += 5

		//Create if statement for what happens if age reaches 100

		if(this.tamagotchi.age == 30) {
			this.showSecondTamagotchi()
		} 

		if(this.tamagotchi.age == 60) {
			this.showThirdTamagotchi()
		}

		if(this.tamagotchi.age == 100) {
			console.log(`${this.tamagotchi.name} is dead!`)
			this.stopTimer()

			const ulDeadLocation = document.querySelector('#dead-status')

			const liDead = document.createElement('li')
			liDead.id = 'list-dead-age'
			liDead.innerText = `Nooo! ${this.tamagotchi.name} died of old age! But at least he had a great life!`

			ulDeadLocation.appendChild(liDead)
		}

	},

	increaseHunger: function() {
		this.tamagotchi.hunger++

		//If statement
		if(this.tamagotchi.hunger == 10) {
			console.log(`${this.tamagotchi.name} is dead!`)
			this.stopTimer()

			const ulDeadLocation = document.querySelector('#dead-status')

			const liDead = document.createElement('li')
			liDead.id = 'list-dead-hunger'
			liDead.innerText = `Nooo! ${this.tamagotchi.name} died of hunger! Don't you got any food in your fridge?!`

			ulDeadLocation.appendChild(liDead)
		}
	},

	increaseSleepiness: function() {
		this.tamagotchi.sleepiness++

		//If statement
		if(this.tamagotchi.sleepiness == 10) {
			console.log(`${this.tamagotchi.name} is dead!`)
			this.stopTimer()

			const ulDeadLocation = document.querySelector('#dead-status')

			const liDead = document.createElement('li')
			liDead.id = 'list-dead-sleepiness'
			liDead.innerText = `Nooo! ${this.tamagotchi.name} died of being too tired! That's messed up!`

			ulDeadLocation.appendChild(liDead)
		}
	},

	increaseBoredom: function() {
		this.tamagotchi.boredom++ 

		//If statement
		if(this.tamagotchi.boredom == 10) {
			console.log(`${this.tamagotchi.name} is dead!`)
			this.stopTimer()

			const ulDeadLocation = document.querySelector('#dead-status')

			const liDead = document.createElement('li')
			liDead.id = 'list-dead-boredom'
			liDead.innerText = `Nooo! ${this.tamagotchi.name} died of boredom! If you weren't so boring ${this.tamagotchi.name} would still be alive!`

			ulDeadLocation.appendChild(liDead)
		}
	},

	//Reduce functions
	reduceHunger: function() {
		this.tamagotchi.hunger--
		this.printTamagotchiInfo()

		if(this.tamagotchi.hunger <= 0) {
			console.log(`${this.tamagotchi.name} isn't hungry!`)
			this.tamagotchi.hunger = 0
			this.printTamagotchiInfo()

			const ulNotificationLocation = document.querySelector('#tamagotchi-notifications-container')

			const liNotification = document.createElement('li')
			liNotification.id = 'list-notification-hunger'
			liNotification.innerText = `${this.tamagotchi.name} isn't hungry right now!`

			ulNotificationLocation.appendChild(liNotification)
		}
	},

	reduceSleepiness: function() {
		this.tamagotchi.sleepiness--
		this.printTamagotchiInfo()

		if(this.tamagotchi.sleepiness == 0) {
			const ulNotificationLocation = document.querySelector('#tamagotchi-notifications-container')

			const liNotification = document.createElement('li')
			liNotification.id = 'list-notification-sleepiness'
			liNotification.innerText = `${this.tamagotchi.name} isn't sleepy right now!`

			ulNotificationLocation.appendChild(liNotification)
		}
	},

	reduceBoredom: function() {
		this.tamagotchi.boredom--
		this.printTamagotchiInfo()

		if(this.tamagotchi.boredom <= 0) {
			console.log(`${this.tamagotchi.name} isn't bored!`)
			this.tamagotchi.boredom = 0
			this.printTamagotchiInfo()

			const ulNotificationLocation = document.querySelector('#tamagotchi-notifications-container')

			const liNotification = document.createElement('li')
			liNotification.id = 'list-notification-boredom'
			liNotification.innerText = `${this.tamagotchi.name} isn't bored right now!`

			ulNotificationLocation.appendChild(liNotification)
		}
	},

	showFirstTamagotchi: function() {
		document.querySelector('#first-tamagotchi').style.display = 'block'
	},

	showSecondTamagotchi: function() {
		const firstForm = document.querySelector('#first-tamagotchi')
		firstForm.remove()
		document.querySelector('#second-tamagotchi').style.display = 'block'
		document.getElementById('second-tamagotchi').style.height = 'auto'
	},

	showThirdTamagotchi: function() {
		const secondForm = document.querySelector('#second-tamagotchi')
		secondForm.remove()
		document.querySelector('#third-tamagotchi').style.display = 'block'
		document.getElementById('third-tamagotchi').style.height = 'auto'
	},

	showButtons: function() {
		document.querySelector('#feed').style.display = 'inline-block'
		document.querySelector('#lights').style.display = 'inline-block'
		document.querySelector('#play').style.display = 'inline-block'
	},

	showNotifications: function() {
		document.querySelector('#tamagotchi-notifications-container').style.display = 'block'
	}

}

//Event Listeners/Handlers
const formLocation = document.querySelector('#input-button-form')
formLocation.addEventListener('submit', (event) => {
	event.preventDefault() //This stops the default form submission behavior

const inputLocation = document.querySelector('#input')
game.createTamagotchi(inputLocation.value) //This will pass in the text from the input field

inputLocation.value = '' //Clears the form field
})

const feedButton = document.querySelector('#feed')
feedButton.addEventListener('click', () => {
	game.reduceHunger()
})

const lightsButton = document.querySelector('#lights')
lightsButton.addEventListener('click', () => {

	if(game.lightsOff == true) {
		document.body.style.backgroundColor = '#4A5A73'
		game.lightsOff = false
	} else if(game.lightsOff == false) {
		document.body.style.backgroundColor = '#2C3645'
		game.lightsOff = true
	}
})

const playButton = document.querySelector('#play')
playButton.addEventListener('click', () => {
	game.reduceBoredom()
})







