import React, {useState} from 'react';
import {Podcast} from "../index";
import {Button, Card, CardBody, CardFooter, CardHeader, Dialog, IconButton} from "@material-tailwind/react";
import {HeartIcon} from "@heroicons/react/24/solid";

// TODO: Work on this tommorow
function PodcastDetails({podcast}: { podcast: Podcast }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);


    return (
        <React.Fragment>
            <Button color="blue-gray" size="sm" onClick={handleOpen}>more</Button>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card
                    className="mx-auto w-full max-w-[24rem]">
                    <div>
                        <CardHeader
                            variant="gradient"
                            color="amber"
                            className="grid p-2 place-items-center"
                        >
                            <span className="text-white text-lg block w-full p-2">
                                {podcast.title}
                            </span>
                        </CardHeader>
                        <CardBody className="flex justify-between flex-wrap">
                            <div className="w-full">
                                <img
                                    src={podcast.image}
                                    alt={podcast.title}
                                    width={116}
                                    height={116}
                                    className="mb-4 rounded-lg"
                                />
                                <div className="flex items-center justify-between mb-4">
                                    <p className={"font-medium"}>
                                        {podcast.description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-1">{
                                podcast.category.map((val, idx) => {
                                    if (idx < 3) {
                                        return (
                                            <span key={idx}
                                                  className="text-xs p-1 uppercase rounded bg-gray-50 mr- border text-gray">
                                {val}
                            </span>)
                                    }
                                })
                            }</div>
                        </CardBody>
                    </div>
                </Card>
            </Dialog>
        </React.Fragment>
    );
}

export default PodcastDetails;