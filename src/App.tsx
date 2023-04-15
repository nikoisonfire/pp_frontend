import {useEffect, useState} from 'react'
import logo from './assets/logo.png'
import './App.sass'
import Footer from "./components/Footer";
import PodcastCard from "./components/PodcastCard";
import {defaultPodcasts} from "./defaultPodcasts";

function App() {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    const [podcasts, setPodcasts] = useState(defaultPodcasts);
    useEffect(() => {
        if (podcasts === defaultPodcasts) {
            fetch('http://localhost:8000/random-week').then(res => res.json())
                .then(data => setPodcasts(data))
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
                <main className="my-8 flex gap-4">
                    {podcasts ? podcasts.map((val, idx) =>
                        <PodcastCard weekday={weekdays[idx]} description={val.description} id={val.podcast_id}
                                     image={val.image} url={""} title={val.title} category={val.category}/>) : null}
                </main>
                <Footer/>
            </div>
        </div>
    )
}

export default App
