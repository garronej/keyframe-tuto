
import { tss, GlobalStyles, keyframes } from "tss-react";
import { useState } from "react";

export function App() {

    const { classes } = useStyles();

    const [items, setItems] = useState<{
        img: string;
        name: string;
        des: string;
    }[]>([
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

    ]);

    return (
        <>
            <GlobalStyles
                styles={{
                    "*": {
                        "margin": 0,
                        "padding": 0,
                        "boxSizing": "border-box"
                    },
                    "body": {
                        "background": "#eaeaea",
                        "overflow": "hidden"
                    }
                }}
            />
            <div className={classes.container}>

                <div className={classes.slide}>
                    {items.map(({ img, des, name }) => (
                        <div
                            key={name}
                            className={classes.item}
                            style={{ "backgroundImage": `url(${img})` }}
                        >
                            <div className={classes.content}>
                                <div className={classes.name}>{name}</div>
                                <div className={classes.des}>{des}</div>
                                <button>See More</button>
                            </div>
                        </div>
                    ))
                    }
                </div>

                <div className={classes.button}>
                    <button
                        onClick={() => {
                            const lastItem = items[items.length - 1];
                            const otherItems = items.slice(0, items.length - 1);
                            setItems([lastItem, ...otherItems]);
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
        </>
    );

}

const animate = keyframes({
    "from": {
        "opacity": 0,
        "transform": "translate(0, 100px)",
        "filter": "blur(33px)"
    },
    "to": {
        "opacity": 1,
        "transform": "translate(0)",
        "filter": "blur(0)"
    }
});

const useStyles = tss
    .withName({ App })
    .withNestedSelectors<"content">()
    .create(({ classes }) => ({
        "container": {
            "position": "absolute",
            "top": "50%",
            "left": "50%",
            "transform": "translate(-50%, -50%)",
            "width": "1000px",
            "height": "600px",
            "background": "#f5f5f5",
            "boxShadow": "0 30px 50px #dbdbdb",
        },
        "slide": {},
        "item": {
            "width": "200px",
            "height": "300px",
            "position": "absolute",
            "top": "50%",
            "transform": "translate(0, -50%)",
            "borderRadius": "20px",
            "boxShadow": "0 30px 50px #505050",
            "backgroundPosition": "50% 50%",
            "backgroundSize": "cover",
            "display": "inline-block",
            "transition": "0.5s",
            "&:nth-child(1), &:nth-child(2)": {
                "top": 0,
                "left": 0,
                "transform": "translate(0, 0)",
                "borderRadius": 0,
                "width": "100%",
                "height": "100%",
            },
            "&:nth-child(3)": {
                "left": "50%",
            },
            "&:nth-child(4)": {
                "left": "calc(50% + 220px)",
            },
            "&:nth-child(5)": {
                "left": "calc(50% + 440px)",
            },
            "&:nth-child(n + 6)": {
                "left": "calc(50% + 660px)",
                "opacity": 0,
            },

            [`&:nth-child(2) .${classes.content}`]: {
                "display": "block"
            }

        },
        "content": {
            "position": "absolute",
            "top": "50%",
            "left": "100px",
            "width": "300px",
            "textAlign": "left",
            "color": "#eee",
            "transform": "translate(0, -50%)",
            "display": "none",
            "& button": {
                "padding": "10px 20px",
                "border": "none",
                "cursor": "pointer",
                "opacity": 0,
                "animation": `${animate} 1s ease-in-out 0.6s 1 forwards`,
            }
        },
        "name": {
            "fontSize": "40px",
            "textTransform": "uppercase",
            "fontWeight": "bold",
            "opacity": 0,
            "animation": `${animate} 1s ease-in-out 1 forwards`,
        },
        "des": {
            "marginTop": "10px",
            "marginBottom": "20px",
            "opacity": 0,
            "animation": `${animate} 1s ease-in-out 0.3s 1 forwards`,

        },
        "button": {
            "width": "100%",
            "textAlign": "center",
            "position": "absolute",
            "bottom": "20px",
            "& button": {
                "width": "40px",
                "height": "35px",
                "borderRadius": "8px",
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
    }));

