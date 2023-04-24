import React, {useEffect, useState} from 'react';
import {getCategories} from "../../apiCalls";
import {Typography} from "@material-tailwind/react";
import Category from "./Category";

function Categories() {
    const [categories, setCategories] = useState<{ [key: string]: number }>({});

    function convertRange(value: number, r1: number[], r2: number[]) {
        return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
    }

    function getColor(num: number): string {
        if (Object.keys(categories).length > 0) {
            // higher number = 0, lower number = 255
            const vals = Object.values(categories);
            const lightness = convertRange(num, [Math.min(...vals), Math.max(...vals)], [95, 45]);
            return `hsl(200, 25%, ${lightness}%)`;
        }
        return ""
    }

    useEffect(() => {
        if (Object.keys(categories).length === 0) {
            // @ts-ignore
            getCategories().then(data => setCategories(data.categories));
        }
    });

    return (
        <div className="mb-12">
            <Typography variant="h3" color="gray" className="font-medium mb-6">Categories</Typography>

            <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4 flex-wrap"}>{
                Object.entries(categories).map(([cat, value]) => {
                    return (
                        <Category category={cat} bgColor={getColor(value)}/>
                    )
                })
            }</div>
            <div className="guide">
                <span className="left">least</span>
                <div className="guide-gradient">
                    <span># of podcasts</span>
                </div>
                <span className="right">most</span>
            </div>
        </div>
    );
}

export default Categories;