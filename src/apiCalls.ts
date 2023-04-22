import {Podcast} from "./index";

export function getPodcasts(categories: string[]): Promise<Podcast[]> {

    // build the category string
    let url = 'http://localhost:8000/random-week'

    if (categories.length > 0) {
        const catString = categories.join('&cat=',);
        url = `http://localhost:8000/random-week?cat=${catString}`
    }

    return fetch(url).then(res => res.json())
}

export function getCategories(): Promise<string[]> {
    return fetch('http://localhost:8000/categories').then(res => res.json())
}