import React, {useState} from 'react';
import {Podcast} from "../index";
import {Button, Card, CardBody, CardFooter, CardHeader, Dialog, IconButton} from "@material-tailwind/react";
import {HeartIcon} from "@heroicons/react/24/solid";
import {useGlobal} from "../state";
import parse from "html-react-parser";

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
                                src={podcast.image}
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
                        <div className="flex justify-end items-center p-4 pt-0 gap-2">
                            <IconButton color="amber" className="px-12"
                                        onClick={() => window.open(podcast.url, "_blank")}>Link</IconButton>
                            <IconButton color="red" className=""><HeartIcon
                                className="h-5 w-5"/></IconButton>

                        </div>
                    </div>
                </Card>
            </Dialog>
        </React.Fragment>
    );
}

export default PodcastDetails;