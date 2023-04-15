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

export default function PodcastCard({
                                        id,
                                        title,
                                        description,
                                        image,
                                        weekday,
                                        url,
                                        category,
                                    }: {
    id: number,
    title: string,
    description: string,
    image: string,
    weekday: string,
    url: string,
    category: string[]
}) {
    return (
        <Card className="w-full flex justify-between flex-column max-w-[26rem] h-[32rem] shadow-lg">
            <div>
                <CardHeader
                    variant="gradient"
                    color="red"
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
                            <Typography variant="h6" color="blue-gray" className="font-medium">
                                {title}
                            </Typography>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-1">{
                        category.map((val, idx) => (
                            <span key={idx}
                                  className="text-xs p-1 uppercase rounded bg-gray-50 mr- border text-gray">
                                {val}
                            </span>
                        ))
                    }</div>
                </CardBody>
            </div>
            <CardFooter className="pt-3 flex flex-wrap justify-between gap-2 items-center">
                <div className="w-full flex gap-2">
                    <IconButton color="red"><HeartIcon className="h-5 w-5"/></IconButton>
                    <Button color="blue-gray" size="sm">more</Button>
                </div>
            </CardFooter>
        </Card>
    );
}