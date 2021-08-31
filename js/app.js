import Character from './models/character.js';
import Business from './business/Business.js';


class UI {

    static getFilters() {
        const gender = document.querySelector('.select').value
        const name = document.querySelector('#search').value
        return {
            name: name,
            gender: gender
        }
    }

    static async printInteresantingCharacters() {
        UI.removeAllChilds('.interesting-container')
        let random = new Array()
        for (let i = 0; i < 3; i++) {
            const character = await Business.getCharacter(Math.floor(Math.random() * 671))
            random.push(character)
        }
        random.forEach(el => UI.addCharacter(el, '.interesting-container'))
    }

    static unCheckFavoritesBtn() {
        document.querySelector('.switch').checked = false
    }

    static removeAllChilds(selector) {
        const container = document.querySelector(selector)
        while (container.firstChild) {
            container.removeChild(container.firstChild)
        }
    }

    static showFavoritesCharacters() {
        UI.removeAllChilds('.container')
        let favorites = Business.getFavorites()
        const { name, gender } = UI.getFilters()
        if (name != '') favorites = favorites.filter(el => el.name.toUpperCase().includes(name.toUpperCase()))
        if (gender != '') favorites = favorites.filter(el => el.gender == gender)
        favorites.forEach(el => UI.addCharacter(el, '.container'))
    }

    static async getCharacters() {
        UI.removeAllChilds('.container')
        const characters = await Business.getCharacters()
        UI.printCharacters(characters)
    }

    static printCharacters(characters) {
        const favorites = Business.getFavorites()

        characters.results.forEach(el => {
            const index = favorites.findIndex((e) => e.id === el.id)
            const isFavorite = (index === -1) ? false : true;
            const { created, episode, gender, id, image, name, origin, species, status, type, url } = el
            UI.addCharacter(new Character(created, episode, gender, id, image, name, origin, species, status, type, url, isFavorite), '.container')
        })
    }

    static addCharacter(character, parent) {
        const container = document.querySelector(parent)

        const card = document.createElement('div')
        card.classList.add('card', 'fade-in')
        card.setAttribute('id', `${character.id}`)

        const cardAvatar = document.createElement('div')
        cardAvatar.className = 'card-avatar'

        const img = document.createElement('img')
        img.src = character.image
        img.alt = character.name
        cardAvatar.appendChild(img)

        const cardContent = document.createElement('div')
        cardContent.className = 'card-content'

        const title = document.createElement('h5')
        title.className = 'card-title'
        title.appendChild(document.createTextNode(character.name))

        const subtitle = document.createElement('h6')
        subtitle.className = 'card-subtitle'
        subtitle.appendChild(document.createTextNode(`${character.species} - ${character.status}`))

        const text = document.createElement('p')
        text.className = 'card-text'
        text.appendChild(document.createTextNode(character.origin.name))

        const divIcons = document.createElement('div')

        const fullScreen = document.createElement('i')
        fullScreen.className = 'material-icons'
        fullScreen.title = 'See character'
        fullScreen.appendChild(document.createTextNode('fullscreen'))

        fullScreen.addEventListener('click', async (e) => {
            const character = await Business.getCharacter(e.target.nextElementSibling.id)
            UI.removeAllChilds('#episodes')
            for (let i = 0; i < 8; i++) {
                if (character.episode[i]) {
                    Business.getEpisodes(character.episode[i])
                        .then(episode => {
                            UI.printEpisode(episode)
                        })
                        .catch(err => console.log(err))
                }
            }
            UI.showModalComponent(character)
            UI.printInteresantingCharacters()
        })

        const favorite = document.createElement('i')
        favorite.className = 'material-icons'
        if (character.favorite) favorite.classList.add('favorite')
        favorite.title = (!character.favorite) ? 'Mark as favorite' : 'Remove from favorite'
        favorite.setAttribute('id', character.id)
        favorite.appendChild(document.createTextNode('favorite'))

        favorite.addEventListener('click', async (e) => {
            const characterID = parseInt(e.target.id)
            let favorites = Business.getFavorites()
            const index = favorites.findIndex((el) => el.id === characterID)
            if (index === -1) {
                await Business.addFavorite(characterID, favorites)
                //UI.showAlert('Added to favorite', 'alert-success')
            } else {
                await Business.removeFatorite(index, favorites)
                const checked = document.querySelector('.switch').checked
                if (favorites.length === 0 && checked) {
                    UI.unCheckFavoritesBtn()
                    UI.getCharacters()
                    document.querySelector('#btn-load').style.display = 'initial'
                } else if (checked) {
                    UI.showFavoritesCharacters()
                }
            }
            e.target.classList.toggle('favorite')
        })

        divIcons.appendChild(fullScreen)
        divIcons.appendChild(favorite)

        cardContent.appendChild(title)
        cardContent.appendChild(subtitle)
        cardContent.appendChild(text)
        cardContent.appendChild(divIcons)

        card.appendChild(cardAvatar)
        card.appendChild(cardContent)

        container.appendChild(card)
    }

    static showAlert(message, className) {
        const alert = document.createElement('div')
        alert.className = 'alert'
        alert.classList.add(className)

        const span = document.createElement('span')
        span.className = 'closebtn'
        span.innerHTML = '&times;'

        alert.appendChild(document.createTextNode(message))
        alert.appendChild(span)

        const container = document.querySelector('.container')
        document.body.insertBefore(alert, container)

        setTimeout(() => document.querySelector('.alert').remove(), 3000)
    }

    static showModalComponent(character) {
        UI.removeAllChilds('.avatar')
        UI.printModal(character)
        document.querySelector('.modal').style.display = 'block'
    }


    static printModal(character) {
        const avatar = document.querySelector('.avatar')

        const img = document.createElement('img')
        img.src = character.image
        img.alt = character.name

        const title = document.createElement('h5')
        title.className = 'card-title'
        title.appendChild(document.createTextNode(character.name))

        const subTitle = document.createElement('h5')
        subTitle.className = 'card-title'
        subTitle.appendChild(document.createTextNode(`${character.species} - ${character.status}`))

        avatar.appendChild(img)
        avatar.appendChild(title)
        avatar.appendChild(subTitle)

        document.querySelector('#gender').textContent = character.gender
        document.querySelector('#origin').textContent = character.origin.name
        document.querySelector('#type').textContent = character.type
        document.querySelector('#specie').textContent = character.species

    }

    static printEpisode(episode) {

        const card = document.createElement('div')
        card.className = 'modal-episodes-card'

        const name = document.createElement('h6')
        name.className = 'card-subtitle'
        name.appendChild(document.createTextNode(episode.name))

        const episodecode = document.createElement('h6')
        episodecode.className = 'card-title'
        episodecode.appendChild(document.createTextNode(episode.episode))

        const airDate = document.createElement('h6')
        airDate.className = 'card-subtitle'
        airDate.appendChild(document.createTextNode(episode.air_date))

        card.appendChild(name)
        card.appendChild(episodecode)
        card.appendChild(airDate)

        document.querySelector('#episodes').appendChild(card)
    }

}

// get the characters when the page loads 
document.addEventListener('DOMContentLoaded', () => {
    UI.getCharacters()
})

// add or remove character from favorites
document.querySelector('.switch').addEventListener('click', async (e) => {
    document.querySelector('#btn-load').style.display = 'none'
    if (document.querySelector('.switch').checked) {
        UI.showFavoritesCharacters()
    } else {
        const { name, gender } = UI.getFilters()
        if (name == '' && gender == '') {
            UI.getCharacters()
        } else {
            UI.removeAllChilds('.container')
            const characters = await Business.getCharactersByFilter(UI.getFilters())
            UI.printCharacters(characters)
        }
        document.querySelector('#btn-load').style.display = 'initial'
    }
})

// advance to next page 
document.querySelector('#btn-load').addEventListener('click', async () => {
    const res = await Business.nextPage()
    UI.printCharacters(res)
})

// search characters by name 
document.querySelector('#search').addEventListener('change', async (e) => {
    if (document.querySelector('.switch').checked) {
        UI.showFavoritesCharacters()
    } else {
        UI.removeAllChilds('.container')
        const characters = await Business.getCharactersByFilter(UI.getFilters())
        UI.printCharacters(characters)
    }
})


document.querySelector('.close').addEventListener('click', (e) => {
    document.querySelector('.modal').style.display = 'none'
})


document.querySelector('#share').addEventListener('click', () => {
    navigator.clipboard.writeText(document.URL)
        .then(() => alert('Url Copied!'))
})


document.querySelector('.select').addEventListener('change', async (e) => {
    if (document.querySelector('.switch').checked) {
        UI.showFavoritesCharacters()
    } else {
        UI.removeAllChilds('.container')
        const characters = await Business.getCharactersByFilter(UI.getFilters())
        UI.printCharacters(characters)
    }
})