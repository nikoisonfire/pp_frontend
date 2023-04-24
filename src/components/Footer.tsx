import {Typography} from "@material-tailwind/react";
import ghlogo from "../assets/github-mark.png";

export default function Footer() {
    return (
        <footer
            className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
            <Typography color="blue-gray" className="font-normal">
                &copy; 2023 made with ❤️&nbsp;&nbsp;by <a href="https://github.com/nikoisonfire/">@nikoisonfire</a>
            </Typography>
            <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                <li>
                    <Typography
                        as="a"
                        href="https://github.com/nikoisonfire/pp_frontend"
                        color="blue-gray"
                        className="font-normal flex gap-2 transition-colors hover:text-blue-500 focus:text-blue-500"
                    >
                        <img src={ghlogo} className={"w-6 h-6"} alt="GitHub Logo"/> GitHub
                    </Typography>
                </li>
                <li>
                    <Typography
                        as="a"
                        href="https://github.com/nikoisonfire/pp_frontend/LICENSE"
                        color="blue-gray"
                        className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                    >
                        License
                    </Typography>
                </li>
            </ul>
        </footer>
    );
}