
import { tss } from "tss-react";
import { useState } from "react";
import { Item, type ItemData } from "./Item";

const initialItems: ItemData[] = [
    {
        "img": "https://i.ibb.co/qCkd9jS/img1.jpg",
        "name": "Switzerland",
        "des": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!",
    }, {
        "img": "https://i.ibb.co/jrRb11q/img2.jpg",
        "name": "Finland",
        "des": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!",
    }, {
        "img": "https://i.ibb.co/NSwVv8D/img3.jpg",
        "name": "Iceland",
        "des": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!",
    }, {
        "img": "https://i.ibb.co/Bq4Q0M8/img4.jpg",
        "name": "Australia",
        "des": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!",
    }, {
        "img": "https://i.ibb.co/jTQfmTq/img5.jpg",
        "name": "Netherland",
        "des": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!",
    }, {
        "img": "https://i.ibb.co/RNkk6L0/img6.jpg",
        "name": "Ireland",
        "des": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!",
    }
];

export function Gallery(props: { className?: string; }) {

    const { className } = props;

    const { classes } = useStyles();

    const [items, setItems] = useState(initialItems);

    return (
        <div className={className}>

            <div>
                {items.map((itemData, i) => (
                    <Item
                        key={itemData.name}
                        position={i + 1}
                        itemData={itemData}
                    />))}
            </div>

            <div className={classes.button}>
                <button
                    onClick={() => {
                        const [lastItem, ...otherItemsReversed] = [...items].reverse();
                        setItems([lastItem, ...otherItemsReversed.reverse()]);
                    }}
                >
                    <i className="fa-solid fa-arrow-left" />
                </button>
                <button
                    onClick={() => {
                        const [firstItem, ...otherItems] = items;
                        setItems([...otherItems, firstItem]);
                    }}
                >
                    <i className="fa-solid fa-arrow-right" />
                </button>
            </div>

        </div>
    );

}

const useStyles = tss
    .withName({ Gallery })
    .create({
        "button": {
            "width": "100%",
            "textAlign": "center",
            "position": "absolute",
            "bottom": 20,
            "& button": {
                "width": 40,
                "height": 35,
                "borderRadius": 8,
                "cursor": "pointer",
                "margin": "0 5px",
                "border": "1px solid #000",
                "transition": "0.3s",
                "&:hover": {
                    "background": "#ababab",
                    "color": "#fff"
                }
            }

        },
    });

