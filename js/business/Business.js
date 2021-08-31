import Dao from '../dao/Dao.js'
import Store from '../models/state.js'
const store = new Store()

export default class Business {

    static async getCharactersByFilter(filter) {
        return await Dao.search(filter)
    }

    static async nextPage() {
        if (store.next !== null) {
            const response = await Dao.getCharactersByPage(store.next)
            return response
        }
    }

    static async getCharacters() {
        const characters = await Dao.getCharacters()
        if (characters.info) {
            const { next, prev, pages } = characters.info
            store.next = next
            store.prev = prev
            store.pages = pages
        }
        return characters
    }

    static async getCharacter(id) {
        const character = await Dao.getCharacter(id)
        return character
    }

    static async getEpisodes(endPoint) {
        const episodes = await Dao.getEpisodes(endPoint)
        return episodes
    }

    static getFavorites() {
        return Dao.getFavorites()
    }

    static removeFatorite(index, favorites) {
        return Dao.removeFatorite(index, favorites)
    }

    static addFavorite(characterID, favorites) {
        Dao.addFavorite(characterID, favorites)
    }

}