import {useEffect, useState} from 'react'
import logo from './assets/logo.png'
import './App.sass'
import Footer from "./components/Footer";
import PodcastCard from "./components/PodcastCard";
import {defaultPodcasts} from "./defaultPodcasts";
import Loader from "./components/Loader";
import {getPodcasts} from "./apiCalls";
import Categories from "./components/Categories";

function App() {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    const [loading, setLoading] = useState(true)
    const [podcasts, setPodcasts] = useState(defaultPodcasts);

    const loadItems = (showLoader: boolean) => {
        if (showLoader) {
            setLoading(true);
        }
        getPodcasts().then(data => {
            setPodcasts(data)
            setLoading(false)
        })
    }

    useEffect(() => {
        if (podcasts === defaultPodcasts) {
            loadItems(true);
        }
    });


    return (
        <div className="App">
            <div className="px-8 max-w-[100rem] m-auto">
                <header className="flex justify-between items-center h-24 mt-8 mb-24">
                    <div className="logo h-full">
                        <img src={logo} alt="logo" className="h-full"/>
                    </div>
                    <nav className="flex items-center gap-2 flex-wrap">
                        <a href="#">Random</a>
                        <a href="#">Browse</a>
                        <a href="#">GitHub</a>
                    </nav>
                </header>
                <main className="my-8 grid grid-cols-7 gap-4 w-full">
                    {loading ?
                        <Loader/> :
                        <>
                            {
                                podcasts ? podcasts.map((val, idx) =>
                                    <PodcastCard weekday={weekdays[idx]} description={val.description}
                                                 id={val.podcast_id}
                                                 image={val.image} url={""} title={val.title}
                                                 category={val.category}/>) : null}
                        </>}
                </main>
                <div className="flex justify-center items-center">
                    <button className="bg-red-500 text-white text-lg px-4 py-2 rounded-lg mb-4" type="button"
                            onClick={() => loadItems(false)}>Load More
                    </button>
                </div>
                <div className="">
                    <Categories/>
                </div>
                <Footer/>
            </div>
        </div>
    )
}

export default App
