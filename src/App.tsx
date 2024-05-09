
import { tss, keyframes } from "tss-react";
import { useReducer, useState, useEffect } from "react";

type State = {
  isFirst: boolean;
  isExpanded: boolean;
  lastAnimationTime: number;

};

const initialState: State = {
  "isFirst": true,
  "isExpanded": false,
  "lastAnimationTime": 0
};

type Action = {
  action: "expand"
} | {
  action: "collapse"
}

const animationDurationMs = 500;

export default function App() {

  const [state, dispatch] = useReducer(
    (state: State, action: Action) => {

      console.log(action);

      if (state.isExpanded === (action.action === "expand")) {
        return state;
      }

      const now = Date.now();

      if (now - state.lastAnimationTime < animationDurationMs) {
        return state;
      }

      const lastAnimationTime = now;

      switch (action.action) {
        case "expand":
          return { "isFirst": false, "isExpanded": true, lastAnimationTime };
        case "collapse":
          return { "isFirst": false, "isExpanded": false, lastAnimationTime };
      }
    },
    initialState
  );

  const [element, setElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {

    if (element === null) {
      return;
    }

    let timer: ReturnType<typeof setTimeout> | undefined = undefined;

    const scheduleUpdate = () => {

      if( timer !== undefined ){
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        timer = undefined;
        update();
      }, animationDurationMs);

    };

    const onMouseEnter = () => { 
      dispatch({ "action": "expand" })
      scheduleUpdate();
    };
    const onMouseLeave = () => {
      dispatch({ "action": "collapse" })
      scheduleUpdate();
    };

    element.addEventListener("mouseenter", onMouseEnter);
    element.addEventListener("mouseleave", onMouseLeave);

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const update = () => {

      const rect = element.getBoundingClientRect();

      //Check if current mouse position is inside the element
      const isInside = mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom;

      if (isInside) {
        dispatch({ "action": "expand" });
      } else {
        dispatch({ "action": "collapse" });
      }

    };

    update();

    return () => {
      element.removeEventListener("mouseenter", onMouseEnter);
      element.removeEventListener("mouseleave", onMouseLeave);
      if( timer !== undefined ){
        clearTimeout(timer);
      }
    };

  }, [element]);

  const { classes } = useStyles({
    "isExpanded": state.isExpanded,
    "isFirst": state.isFirst
  });

  return (
    <div
      ref={setElement}
      className={classes.root}
    />
  );
}

const useStyles = tss
  .withParams<{
    isFirst: boolean;
    isExpanded: boolean;
  }>()
  .create(({ isExpanded, isFirst }) => {

    const smallState = {
      "width": 400,
      "height": 400,
      "backgroundColor": "pink",
    };

    const bigState = {
      "width": 800,
      "height": 800,
      "backgroundColor": "lightblue",
    };

    const animate = keyframes({
      "from": {
        ...(isExpanded ? smallState : bigState),
      },
      "to": {
        ...(isExpanded ? bigState : smallState),
      },
    });

    return {
      "root": {
        ...(isExpanded ? bigState : smallState),
        "animation": isFirst ? undefined : `${animate} ${animationDurationMs}ms ease`
      }
    };

  });


