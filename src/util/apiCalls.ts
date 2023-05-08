import {Podcast} from "../index";

const api_url = import.meta.env.VITE_API_URL

export function getPodcasts(categories: string[]): Promise<Podcast[]> {


    // build the category string
    let url = api_url + '/random-week'

    if (categories.length > 0) {
        const catString = categories.join('&cat=',);
        url = `${api_url}/random-week?cat=${catString}`
    }

    return fetch(url).then(res => res.json())
}

export function getCategories(): Promise<string[]> {
    return fetch(api_url + '/categories').then(res => res.json())
}

export function getImageUrl(podcast_id: number): string {
    return api_url + '/images/' + podcast_id
}