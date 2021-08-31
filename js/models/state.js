export default class Store {
    constructor(next, pages, prev) {
        this.next = next
        this.pages = pages
        this.prev = prev
    }

    get next() {
        return this._next
    }

    set next(value) {
        this._next = value
    }

    get pages() {
        return this.pages
    }

    set pages(value) {
        this._pages = value
    }

    get prev() {
        return this._prev
    }

    set prev(value) {
        this._prev = value
    }
}