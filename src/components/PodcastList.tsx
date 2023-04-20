import React from 'react';
import {useGlobal} from "../state";
import podcast_icon from "../assets/podcast_icon.png";

function PodcastList() {
    const podcasts = useGlobal(state => state.selected.podcasts);
    return (
        <div className="fixed right-4 bottom-4 flex justify-end flex-wrap">
            <div className="rounded bg-white p-3 mb-2 w-full">
                {
                    podcasts.map((val, idx) =>
                        <div key={idx} className="flex flex-wrap items-center">
                            <img className="w-16 h-16 rounded-full" src={val.image}/>
                            <div className="ml-2">
                                <p className="text-sm font-bold">{val.weekday}</p>
                                <p className="text-lg">{val.title}</p>
                            </div>
                        </div>
                    )
                }
            </div>
            <button
                className="p-0 w-16 h-16 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow-lg transition ease-in duration-200 focus:outline-none">
                <img className="p-3" src={podcast_icon}/>
            </button>
            {
                podcasts.length > 0 ?
                    <span
                        className="absolute left-0 bottom-0 flex items-center justify-center bg-white font-bold rounded-full text-sm h-6 w-6 shadow-lg">{podcasts.length}</span> : null
            }
        </div>
    );
}

export default PodcastList;