const ENDPOINT = 'https://rickandmortyapi.com/api/character/'
const header = {
    method: 'GET',
    headers: {
        "Content-type": "application/json"
    }
}

export default class Dao {

    static async getCharacters() {
        let characters
        try {
            const response = await fetch(ENDPOINT, header)
            characters = await response.json()
        } catch (error) {
            console.log(error)
        }
        return characters
    }

    static async getCharacter(characterID) {
        let character
        try {
            const response = await fetch(`${ENDPOINT}${characterID}`, header)
            character = await response.json()
        } catch (error) {
            console.log({
                message: 'Err',
                error: error
            })
        }
        return character
    }

    static async search(params) {
        let characters
        try {
            const response = await fetch(`${ENDPOINT}?${new URLSearchParams(params)}`, header)
            characters = await response.json()
        } catch (error) {
            console.log(error)
        }
        return characters
    }

    static async getCharactersByPage(endPoint) {
        let characters
        try {
            const response = await fetch(endPoint, header)
            characters = await response.json()
        } catch (error) {
            console.log(error)
        }
        return characters
    }

    static async getEpisodes(endPoint) {
        let episodes
        try {
            const response = await fetch(endPoint, header)
            episodes = await response.json()
        } catch (error) {
            console.log(error)
        }
        return episodes
    }

    static async getRandomCharacters(range) {
        let characters
        try {
            const response = await fetch(`${ENDPOINT}${range}`, header)
            characters = await response.json()
        } catch (error) {
            console.log(error)
        }
        return characters
    }

    static async addFavorite(characterID, favorites) {
        Dao.getCharacter(characterID)
            .then(character => {
                character.favorite = true
                favorites.push(character)
                localStorage.setItem('favorites', JSON.stringify(favorites))
            })
            .catch(err => {
                console.log(err)
            })
    }

    static async removeFatorite(index, favorites) {
        favorites.splice(index, 1)
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }

    static getFavorites() {
        let favorites
        if (localStorage.getItem('favorites') === null) {
            favorites = new Array()
        } else {
            favorites = JSON.parse(localStorage.getItem('favorites'))
        }
        return favorites
    }

}