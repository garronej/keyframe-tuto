
import { Gallery } from "./Gallery";
import { GlobalStyles, tss } from "tss-react";

export function App() {

    const { classes } = useStyles();

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
            <Gallery className={classes.root} />
        </>
    );
}

const useStyles = tss
    .withName({ App })
    .create({
        "root": {
            "position": "absolute",
            "top": "50%",
            "left": "50%",
            "transform": "translate(-50%, -50%)",
            "width": "1000px",
            "height": "600px",
            "background": "#f5f5f5",
            "boxShadow": "0 30px 50px #dbdbdb",
        }
    });

