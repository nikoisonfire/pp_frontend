import React, {useEffect, useState} from 'react'
import logo from './assets/logo.png'
import './App.sass'
import Footer from "./components/Footer";
import PodcastCard from "./components/PodcastCard";
import {defaultPodcasts} from "./defaultPodcasts";
import Loader from "./components/Loader";
import {getPodcasts} from "./apiCalls";
import Index from "./components/Categories";
import {useErrorBoundary} from "react-error-boundary";
import {Typography} from "@material-tailwind/react";
import PodcastList from "./components/PodcastList";
import {useGlobal} from "./state";
import {Podcast} from "./index";
import Categories from "./components/Categories";

function App() {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    const [loading, setLoading] = useState(true)
    const [podcasts, setPodcasts] = useState<Podcast[]>(defaultPodcasts);

    const categories = useGlobal(state => state.selected.categories);

    const {showBoundary} = useErrorBoundary()

    const loadItems = (showLoader: boolean) => {
        if (showLoader) {
            setLoading(true);
        }
        getPodcasts(categories).then(data => {
            setPodcasts(data)
            setLoading(false)
        }).catch(err => showBoundary(err))
    }

    useEffect(() => {
        if (podcasts === defaultPodcasts) {
            loadItems(true);
        }
    });


    return (
        <div className="App">
            <PodcastList/>
            <div className="px-8 max-w-[100rem] m-auto">
                <header className="h-24 mt-8 mb-12">
                    <div className="logo h-full">
                        <img src={logo} alt="logo" className="h-full"/>
                    </div>
                </header>
                <main className="relative py-5 mb-6">
                    {loading ? <Loader/> : null}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-10 lg:gap-4 w-full">
                        {
                            podcasts ? podcasts.map((val, idx) =>
                                <PodcastCard podcast={val}/>) : null
                        }
                    </div>
                </main>
                <div className="flex justify-center items-center">
                    <button className="bg-red-500 text-white text-lg px-4 py-2 rounded-lg mb-4" type="button"
                            onClick={() => loadItems(true)}>Generate new podcasts
                    </button>
                </div>
                <div className="">
                    <Categories/>
                </div>
                <div className="text-center py-8 w-1/2 m-auto">
                    <Typography variant="h3" color="gray" className="font-medium mb-6">Info</Typography>
                    <Typography className="pb-6">
                        If you're like me, you listen to podcasts as a way to doze off into the night. Sometimes, it
                        takes a bit longer, so the once-a-week episode is over and you've got nothing to listen to for
                        tommorow.
                    </Typography>
                    <Typography>
                        That's where this website comes in. You can search for podcasts by the weekday, where new
                        episodes are released (and category, to find something you actually might like...). This way you
                        have a new podcast episode to listen to every day.
                    </Typography>
                </div>
                <Footer/>
            </div>
        </div>
    )
}

export default App
