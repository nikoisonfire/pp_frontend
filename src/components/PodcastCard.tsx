import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Tooltip,
    IconButton, Chip,
} from "@material-tailwind/react";
import {
    BanknotesIcon,
    StarIcon,
    HeartIcon,
    WifiIcon,
    HomeIcon,
    TvIcon,
    FireIcon, MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import {Podcast} from "../index";
import {useGlobal} from "../state";
import PodcastDetails from "./PodcastDetails";

// TODO: Add URL to podcast
export default function PodcastCard({podcast}: { podcast: Podcast }) {

    const {
        podcast_id,
        title,
        description,
        image,
        weekday,
        category,
    } = podcast;
    const titleClass = title.length > 35 ? "text-md" : "text-lg"

    const togglePodcast = useGlobal(state => state.togglePodcast)

    return (
        <Card className="w-full flex justify-between flex-column max-w-[26rem] sm:h-[34rem] sm:max-h-[34rem] shadow-lg">
            <div>
                <CardHeader
                    variant="gradient"
                    color="amber"
                    className="grid p-2 place-items-center"
                >
                            <span className="text-white text-lg block w-full p-2">
                                {weekday}
                            </span>
                </CardHeader>
                <CardBody className="flex justify-between flex-wrap">
                    <div className="w-full">
                        <img
                            src={image}
                            alt={title}
                            width={116}
                            height={116}
                            className="mb-4 rounded-lg"
                        />
                        <div className="flex items-center justify-between mb-4">
                            <p className={"font-medium " + titleClass}>
                                {title}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-1">{
                        category.map((val, idx) => {
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
            <CardFooter className="pt-3 flex flex-wrap justify-between gap-2 items-center">
                <div className="w-full grid grid-cols-2 gap-2">
                    <IconButton color="red" className="w-full max-w-full"
                                onClick={() => togglePodcast(podcast)}><HeartIcon
                        className="h-5 w-5"/></IconButton>
                    <PodcastDetails podcast={podcast}/>
                </div>
            </CardFooter>
        </Card>
    );
}