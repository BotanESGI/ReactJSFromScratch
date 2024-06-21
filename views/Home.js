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
                        { src: "./assets/img/carousel01.png", alt: "JO 2024 Home" },
                        { src: "./assets/img/carousel02.png", alt: "JO 2024 Football" },
                        { src: "./assets/img/carousel03.png", alt: "JO 2024 Escalade" },
                        { src: "./assets/img/carousel04.png", alt: "JO 2024 Natation" },
                        { src: "./assets/img/carousel05.png", alt: "JO 2024 Natation Seine" },
                        { src: "./assets/img/carousel06.png", alt: "JO 2024 Home2" },
                        { src: "./assets/img/carousel07.png", alt: "JO 2024 Home3" },
                        { src: "./assets/img/carousel08.png", alt: "JO 2024 Home4" },
                        { src: "./assets/img/carousel09.png", alt: "JO 2024 Home5" },
                        { src: "./assets/img/carousel10.png", alt: "JO 2024 Home6" },
                        { src: "./assets/img/carousel11.png", alt: "JO 2024 Home7" },
                        { src: "./assets/img/carousel12.png", alt: "JO 2024 Mascotte" },
                        { src: "./assets/img/carousel13.png", alt: "JO 2024 Home8" }
                    ]}),
                ),
            ),
            MiniReact.createElement(Footer)

        );

        this._dom = element;
        return element;
    }
}

export default Home;
