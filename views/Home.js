import { MiniReact } from "../core/MiniReact.js";
import Component from "../core/Component.js";
import {Header, Footer, Carousel, Image} from "../component/ReactComponent.js";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            TableContent: 'Chargement...',
        };

        this.childrenKey = this.generateUniqueKey();
        this.fetchTableContent();
    }

    async fetchTableContent() {
        try {
            const response = await fetch('https://olympics.com/fr/paris-2024/calendrier');
            const htmlString = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, 'text/html');

            const articleElement = doc.querySelector('article#p2024-main-content');
            if (!articleElement) {
                throw new Error('Article element not found');
            }

            const footerDiv = articleElement.querySelector('.StaticScheduleGrid-styles__TableFooter-sc-475a97fb-8.kMXSEH');
            if (footerDiv) {
                footerDiv.remove();
            }

            const tables = articleElement.querySelectorAll('table');
            if (tables.length < 2) {
                throw new Error('Second table not found');
            }
            tables[1].classList.add('table');

            const firstClassElement = articleElement.querySelector('.renderitemutils__StyledSection-sc-10yg7pe-0.gcmkQJ');

            if (firstClassElement) {
                const links = firstClassElement.querySelectorAll('a');
                links.forEach(link => {
                    const textNode = document.createTextNode(link.textContent);
                    link.parentNode.replaceChild(textNode, link);
                });
                const classContent = firstClassElement.innerHTML;
                this.setState({ TableContent: classContent });
            } else {
                this.setState({ TableContent: '<p>Content not found</p>' });
            }
        } catch (error) {
            console.error('Error fetching the page:', error);
            this.setState({ TableContent: 'Error loading content.' });
        }
    }






    render() {
        const element = MiniReact.createElement(
            "div", { id: "HomePage" },
            MiniReact.createElement(Header),
            MiniReact.createElement(
                "main", null,
                MiniReact.createElement(
                    "section",
                    { id: "carousel" },
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
                MiniReact.createElement(
                    "section",
                    { id: "TableContent" },
                    MiniReact.createElement(
                        "h2", { id: "TableLegende", style: {
                                "text-align": "center", "margin":"2% 0%", "text-decoration":"underline"
                            }}, "CALENDRIER OLYMPIQUE (SCRAPING)"),
                    MiniReact.createElement("div", { dangerouslySetInnerHTML: { __html: this.state.TableContent } }),
                    MiniReact.createElement(
                        "section", { id: "TableLegende", style: {
                                "background-color": "rgba(var(--bs-tertiary-bg-rgb))", "text-align":"center"
                            } },
                    MiniReact.createElement(Image, {
                        src: "/assets/img/legende01.png",
                        alt: "Legende 01",
                        style: {
                            width: "3%"
                        }
                    }),
                    MiniReact.createElement("span", {  id:"legende01_span"}, "Événement de médaille"),
                    MiniReact.createElement("span", {  id:"legende02_span"}, "Événement régulier"),
                    MiniReact.createElement(Image, {
                        src: "/assets/img/legende02.png",
                        alt: "Legende 02",
                        style: {
                            width: "3%"
                        }
                    }),
                    MiniReact.createElement("span", {  id:"legende03_span"}, "Date provisoire"),
                    MiniReact.createElement(Image, {
                        src: "/assets/img/legende03.png",
                        alt: "Legende 03",
                        style: {
                            width: "3%"
                        }
                    }),
                )


                )
            ),
            MiniReact.createElement(Footer)
        );

        this._dom = element;
        return element;
    }
}

export default Home;
