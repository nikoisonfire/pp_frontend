import React, {useEffect} from 'react';
import {useGlobal} from "../state";
import podcast_icon from "../assets/podcast_icon.png";
import {Podcast} from "../index";

function PodcastList() {
    const podcasts = useGlobal(state => state.selected.podcasts);
    const togglePodcast = useGlobal(state => state.togglePodcast);

    useEffect(() => {
        const subtoStore = useGlobal.subscribe((state, prevState) => {
            if (prevState.selected.podcasts.length === 0 && state.selected.podcasts.length === 1) {
                setHide(false)
            }
        });
        return () => subtoStore();
    })

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
        <div className="fixed right-4 z-50 bottom-4 flex justify-end flex-wrap ">
            {podcasts.length > 0 ?
                <div
                    className={"rounded bg-white mb-2 w-full rounded-lg shadow-lg popup" + (hide ? " hide" : "")}>
                    {
                        podcasts.sort(comparePodcasts).map((val, idx) =>
                            <div key={idx}
                                 className={"flex flex-wrap items-center relative py-2 " + (idx > 0 ? "border-t-2 border-gray-200" : "")}>
                                <img className="w-12 h-12 rounded-full" src={val.image}/>
                                <div className="ml-3">
                                    <p className="text-sm font-bold text-red-600">{val.weekday}</p>
                                    <p className="text-md font-light">{truncate(val.title, 45)}</p>
                                </div>
                                <button
                                    type="button"
                                    className="absolute right-0 top-0 p-3 text-xs text-gray-500 hover:text-gray-600"
                                    onClick={() => togglePodcast(val)}>X
                                </button>
                            </div>
                        )
                    }
                </div> : null}
            <div className="relative">
                <button
                    onClick={() => setHide(!hide)}
                    className="p-0 w-16 h-16 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow-lg transition ease-in duration-200 focus:outline-none">
                    <img className="p-3" src={podcast_icon}/>
                </button>
                {
                    podcasts.length > 0 ?
                        <span
                            className="absolute left-0 bottom-0 flex items-center justify-center bg-white font-bold rounded-full text-sm h-6 w-6 shadow-lg">{podcasts.length}</span> : null
                }</div>
        </div>
    );
}

export default PodcastList;