export function getPodcasts() {
    return fetch('http://localhost:8000/random-week').then(res => res.json())
}

export function getCategories() {
    return fetch('http://localhost:8000/categories').then(res => res.json())
}