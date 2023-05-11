import React, {useState} from 'react';
import {Podcast} from "../index";
import {Button, Card, CardBody, CardFooter, CardHeader, Dialog, IconButton} from "@material-tailwind/react";
import {HeartIcon} from "@heroicons/react/24/solid";
import {useGlobal} from "../util/state";
import parse from "html-react-parser";
import {getImageUrl} from "../util/apiCalls";
import {createSpotifyLink} from "../util/util";
import spotify from "../assets/spotify.png";
import apple from "../assets/apple_podcasts.png";

function PodcastDetails({podcast}: { podcast: Podcast }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const togglePodcast = useGlobal(state => state.togglePodcast)

    const toggleAndClose = () => {
        togglePodcast(podcast)
        handleOpen()
    }

    const removeXSS = (str: string) => {
        return str.replace(/<[^>]*>?/gm, '');
    }

    const convertURLtoLinks = (str: string) => {
        return str.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1">$1</a>');
    }

    const description = parse(convertURLtoLinks(removeXSS(podcast.description)));

    return (
        <React.Fragment>
            <Button color="blue-gray" size="sm" className="px-0" onClick={handleOpen}>more</Button>
            <Dialog
                size="lg"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card
                    className="mx-auto w-full max-w-[44rem]">
                    <div>
                        <CardHeader
                            variant="gradient"
                            color="blue-gray"
                            className="grid p-2 place-items-center"
                        >
                            <span className="text-white text-xl font-medium block w-full p-2">
                                {podcast.title}
                            </span>
                        </CardHeader>
                        <CardBody className="pod-detail">
                            <div className="w-full pr-8"><img
                                src={getImageUrl(podcast.podcast_id)}
                                alt={podcast.title}
                                className="mb-4 rounded-lg"
                            /></div>
                            <div className="mb-4">
                                <p className={"font-medium"}>
                                    {description}
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">{
                                    podcast.category.map((val, idx) => {
                                        return (
                                            <span key={idx}
                                                  className="text-xs p-1 uppercase rounded bg-gray-50 mr- border text-gray">
                                {val}
                            </span>)
                                    })
                                }</div>
                            </div>
                        </CardBody>
                        <div className="flex justify-between items-center p-4 pt-0 gap-2">
                            <div>
                                <button
                                    className="w-8 h-8 mr-4"
                                    onClick={() => window.open(createSpotifyLink(podcast.title), "_blank")}>
                                    <img src={spotify}/>
                                </button>
                                <button
                                    className="w-8 h-8"
                                    onClick={() => window.open(podcast.itunes_url, "_blank")}>
                                    <img src={apple}/>
                                </button>
                            </div>
                            <div><IconButton color="amber" className="px-8 mr-2"
                                             onClick={() => window.open(podcast.url, "_blank")}>Feed</IconButton>
                                <IconButton color="red" className=""><HeartIcon
                                    className="h-5 w-5" onClick={() => toggleAndClose()}/></IconButton></div>

                        </div>
                    </div>
                </Card>
            </Dialog>
        </React.Fragment>
    );
}

export default PodcastDetails;