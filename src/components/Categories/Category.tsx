import React from 'react';

function Category({
                      category,
                      bgColor,
                      callback,
                  }: {
    category: string,
    bgColor: string
    callback: () => void
}) {
    const [selected, setSelected] = React.useState(false);

    const selectedColor = "#ffa600";
    const selectedStyle = {
        backgroundColor: selectedColor,
        boxShadow: `0 0 0 2px #fff, 0 0 0 4px ${selectedColor}`,
        borderColor: selectedColor,
        transition: "all 0.25s ease 0s",
    }
    return (
        <a className={`text-xs p-1 uppercase rounded-md border text-gray cursor-pointer`}
           style={selected ? selectedStyle : {backgroundColor: bgColor}}
           onClick={() => {
               setSelected(!selected);
               callback()
           }}
        >
            {category}
        </a>
    );
}

export default Category;
