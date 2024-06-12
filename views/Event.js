import { MiniReact } from "../core/MiniReact.js";
const Event = () => {
    const element = MiniReact.createElement(
        "div",
        { class: "" },
        MiniReact.createElement(
            "span",
            {
                class:
                    "",
            },
            "Event"
        )
    );

    return element;
};

export default Event;
