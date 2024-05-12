import { tss, keyframes } from "tss-react";

export type ItemData = {
    img: string;
    name: string;
    des: string;
};

export function Item(props: {
    className?: string;
    itemData: ItemData;
    position: number;
}) {
    const { className, itemData, position } = props;

    const { classes, cx } = useStyles({ position });

    return (
        <div
            className={cx(classes.item, className)}
            style={{ "backgroundImage": `url(${itemData.img})` }}
        >
            <div className={classes.content}>
                <div className={classes.name}>{itemData.name}</div>
                <div className={classes.des}>{itemData.des}</div>
                <button>See More</button>
            </div>
        </div>
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
    .withName({ Item })
    .withParams<{ position: number }>()
    .withNestedSelectors<"content">()
    .create(({ classes, position }) => ({
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
            "transition": "0.4s",
            ...(() => {

                const oneAndTwo = {
                    "top": 0,
                    "left": 0,
                    "transform": "translate(0, 0)",
                    "borderRadius": 0,
                    "width": "100%",
                    "height": "100%",
                } as const;

                switch (position) {
                    case 1: return oneAndTwo;
                    case 2: return {
                        ...oneAndTwo,
                        [`& .${classes.content}`]: {
                            "display": "block"
                        }
                    };
                    case 3: return {
                        "left": "50%",
                    };
                    case 4: return {
                        "left": "calc(50% + 220px)",
                    };
                    case 5: return {
                        "left": "calc(50% + 440px)",
                    };
                    default: return {
                        "left": "calc(50% + 660px)",
                        "opacity": 0,
                    };
                }

            })(),
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

        }
    }));

