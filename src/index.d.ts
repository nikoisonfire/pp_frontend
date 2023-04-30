export interface Podcast {
    podcast_id: number;
    title: string;
    description: string;
    image: string;
    weekday: string;
    url: string;
    itunes_url: string;
    category: string[];
}

export interface GlobalState {
    selected: {
        categories: string[],
        podcasts: Podcast[],
    },
    toggleCategory: (cat: string) => void,
    togglePodcast: (pod: Podcast) => void,
}