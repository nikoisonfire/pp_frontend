import React, {useCallback, useEffect} from 'react';
import {useGlobal} from "../util/state";
import podcast_icon from "../assets/podcast_icon.png";
import {Podcast} from "../index";

import spotify from "../assets/spotify.png";
import apple from "../assets/apple_podcasts.png";
import {createSpotifyLink} from "../util/util";

function PodcastList() {
    const podcasts = useGlobal(state => state.selected.podcasts);
    const togglePodcast = useGlobal(state => state.togglePodcast);

    const [overflow, setOverflow] = React.useState(false);

    useEffect(() => {
        const subtoStore = useGlobal.subscribe((state, prevState) => {
            if (prevState.selected.podcasts.length === 0 && state.selected.podcasts.length === 1) {
                setHide(false)
            }
        });
        return () => subtoStore();
    })

    const scrollCB = useCallback(
        (node: HTMLDivElement) => {
            if (node !== null) {
                if (node.scrollHeight > node.clientHeight) {
                    setOverflow(true)
                } else {
                    setOverflow(false)
                }
            }
        },
        [podcasts],
    );


    function comparePodcasts(a: Podcast, b: Podcast) {
        const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        const aIndex = weekdays.indexOf(a.weekday);
        const bIndex = weekdays.indexOf(b.weekday);
        if (aIndex < bIndex) {
            return -1;
        }
        if (aIndex > bIndex) {
            return 1;
        }
        return 0;
    }

    // write a function that replaces everything after a certain text length with ...
    function truncate(str: string, n: number) {
        return (str.length > n) ? str.substr(0, n - 1) + ' [...] ' : str;
    }

    const [hide, setHide] = React.useState(true);

    return (
        <div className="fixed right-4 z-50 bottom-4 flex justify-end flex-wrap">
            {podcasts.length > 0 ?
                <div
                    className={"max-w-[22rem] sm:max-w-[32rem] sm:min-w-[18rem] md:min-w-[20rem] rounded bg-white mb-2 w-full rounded-lg shadow-lg overflow-hidden popup relative" + (hide ? " hide" : "")}>
                    <div
                        className={"absolute top-0 right-0 text-xs text-gray-500 p-1 " + (overflow ? "" : " hidden")}>Hover
                        over with mouse to scroll
                    </div>
                    <div className={"scrollList max-h-[60vh] mt-2"} ref={scrollCB}>
                        {
                            podcasts.sort(comparePodcasts).map((val, idx) =>
                                <div key={idx}
                                     className={"flex items-center relative py-4 sm:py-4 " + (idx > 0 ? "border-t-2 border-gray-200" : "")}>
                                    <img className="w-8 h-8 sm:w-12 sm:h-12 rounded-full" src={val.image}/>
                                    <div className="ml-3">
                                        <p className="text-xs sm:text-sm font-bold text-red-600">{val.weekday}</p>
                                        <p
                                            className="pr-8 sm:pr-0 text-sm sm:text-base font-light">{truncate(val.title, 35)}</p>
                                    </div>
                                    <button
                                        type="button"
                                        className="absolute right-0 top-0 pt-2 pr-3 text-xs text-gray-500 hover:text-gray-600"
                                        onClick={() => togglePodcast(val)}>X
                                    </button>
                                    <div className="absolute right-1 bottom-1">
                                        <button
                                            className="w-6 h-6 mr-2"
                                            onClick={() => window.open(createSpotifyLink(val.title), "_blank")}>
                                            <img src={spotify}/>
                                        </button>
                                        <button
                                            className="w-6 h-6"
                                            onClick={() => window.open(val.itunes_url, "_blank")}>
                                            <img src={apple}/>
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div> : null}
            <div className="relative flex justify-end w-full">
                <button
                    onClick={() => setHide(!hide)}
                    className="p-0 w-16 h-16 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow-lg transition ease-in duration-200 focus:outline-none">
                    <img className="p-3" src={podcast_icon}/>
                </button>
                {
                    podcasts.length > 0 ?
                        <span
                            className="absolute right-12 bottom-0 flex items-center justify-center bg-white font-bold rounded-full text-sm h-6 w-6 shadow-lg">{podcasts.length}</span> : null
                }</div>
        </div>
    );
}

export default PodcastList;