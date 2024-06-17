import { MiniReact } from "../core/MiniReact.js";
import Component from "../core/Component.js";
import {Header, Footer, Carousel} from "../component/ReactComponent.js";

class Home extends Component {
    constructor(props) {
        super(props);

        this.childrenKey = this.generateUniqueKey();
    }

    render() {
        const element = MiniReact.createElement(
            "div", {id:"HomePage"},
            MiniReact.createElement(Header),
            MiniReact.createElement(
                "main",null,
                MiniReact.createElement("section",
                    {
                        id:"carousel"
                    },
                MiniReact.createElement(Carousel, { images: [
                        { src: "./assets/img/carousel01.png", alt: "Paris 2024 Logo" },
                        { src: "./assets/img/carousel01.png", alt: "Paris 2024 Logo" }
                    ]}),
                )
            ),
            MiniReact.createElement(Footer)

        );

        this._dom = element;
        return element;
    }
}

export default Home;
