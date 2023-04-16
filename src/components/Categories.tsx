import React, {useEffect, useState} from 'react';
import {getCategories} from "../apiCalls";
import {Typography} from "@material-tailwind/react";

function Categories(props) {
    const [categories, setCategories] = useState({});

    function convertRange(value: number, r1: number[], r2: number[]) {
        return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
    }

    // function with a int parameter, the higher the number the darker the color. returns hex
    function getColor(num: number) {
        if (Object.keys(categories).length > 0) {
            // higher number = 0, lower number = 255
            const vals = Object.values(categories);
            const lightness = convertRange(num, [Math.min(...vals), Math.max(...vals)], [95, 45]);
            return `hsl(39, 100%, ${lightness}%)`;
        }
    }

    useEffect(() => {
        if (Object.keys(categories).length === 0) {
            getCategories().then(data => setCategories(data.categories));
        }
    });

    return (
        <div className="mb-12">
            <Typography variant="h3" color="gray" className="font-medium mb-6">Categories</Typography>

            <div className={"flex gap-4 flex-wrap"}>{
                Object.entries(categories).map(([key, value]) => {
                    return (<span className={`text-xs p-1 uppercase rounded border text-gray`}
                                  style={{backgroundColor: getColor(value)}}>
                        {key}
                    </span>)
                })
            }</div>
        </div>
    );
}

export default Categories;