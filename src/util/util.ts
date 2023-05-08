export const createSpotifyLink = (title: string): string => {
    return `https://open.spotify.com/search/${encodeURIComponent(title)}/podcastAndEpisodes`
}
