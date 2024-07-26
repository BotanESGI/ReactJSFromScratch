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
        // try {
           // const response = await fetch('https://olympics.com/fr/paris-2024/calendrier');
            //const htmlString = await response.text();
            //const parser = new DOMParser();
            //const doc = parser.parseFromString(htmlString, 'text/html');

           // const articleElement = doc.querySelector('article#p2024-main-content');
            //if (!articleElement) {
             //   throw new Error('Article element not found');
           // }

            //const footerDiv = articleElement.querySelector('.StaticScheduleGrid-styles__TableFooter-sc-475a97fb-8.kMXSEH');
           // if (footerDiv) {
              //  footerDiv.remove();
            //}

            //const tables = articleElement.querySelectorAll('table');
            //if (tables.length < 2) {
            //    throw new Error('Second table not found');
            //}
            //tables[1].classList.add('table');

            //const firstClassElement = articleElement.querySelector('.renderitemutils__StyledSection-sc-10yg7pe-0.gcmkQJ');

            //if (firstClassElement) {
               // const links = firstClassElement.querySelectorAll('a');
               // links.forEach(link => {
                    //const textNode = document.createTextNode(link.textContent);
                   // link.parentNode.replaceChild(textNode, link);
                //});
                //const classContent = firstClassElement.innerHTML;
                //this.setState({ TableContent: classContent });
            //} else {
            //    this.setState({ TableContent: '<p>Content not found</p>' });
            //}
        //} catch (error) {
           // console.error('Error fetching the page:', error);
           // this.setState({ TableContent: 'Error loading content.' });
        //}

// Site des JO à changer la page du calandrier du coup mon scrapping ne marcher plus :(, je l'ai refait et garder l'ancienne version en haut au cas ou
        try {
            const response = await fetch('https://olympics.com/fr/paris-2024/calendrier/epreuve');
            const htmlString = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, 'text/html');

            const articleElement = doc.querySelector('div#p2024-main-content');
            if (!articleElement) {
                throw new Error('Article element not found');
            }

            const footerDiv = articleElement.querySelector('.StaticScheduleGrid-styles__TableFooter-sc-475a97fb-8.kMXSEH');
            if (footerDiv) {
                footerDiv.remove();
            }

            const scheduleGridDiv = articleElement.querySelector('div[data-testid="scheduleGrid"]');
            if (!scheduleGridDiv) {
                throw new Error('Schedule grid not found');
            }
            scheduleGridDiv.classList.add('table');

            // Directly set the content of the scheduleGridDiv
            const classContent = scheduleGridDiv.innerHTML;
            this.setState({ TableContent: classContent });

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
                "main", {style: {paddingTop: '5rem'}},
                MiniReact.createElement(
                    "section",
                    { id: "carousel" },
                    MiniReact.createElement(Carousel, { images: [
                            { src: "./assets/img/carousel01.jpg", alt: "JO 2024 Home" },
                            { src: "./assets/img/carousel02.jpg", alt: "JO 2024 Football" },
                            { src: "./assets/img/carousel03.jpg", alt: "JO 2024 Escalade" },
                            { src: "./assets/img/carousel04.jpg", alt: "JO 2024 Natation" },
                            { src: "./assets/img/carousel05.jpg", alt: "JO 2024 Natation Seine" },
                            { src: "./assets/img/carousel06.jpg", alt: "JO 2024 Home2" },
                            { src: "./assets/img/carousel07.jpg", alt: "JO 2024 Home3" },
                        ]}),
                ),
                MiniReact.createElement(
                    "section",
                    { id: "TableContent", style: {overflow: "scroll"}},
                     
                    MiniReact.createElement(
                        "h2", { id: "TableLegende", style: {
                                "text-align": "center", "margin":"2% 0%", "text-decoration":"underline"
                            }}, "CALENDRIER OLYMPIQUE (SCRAPING)"),
                    MiniReact.createElement("div", { dangerouslySetInnerHTML: { __html: this.state.TableContent } }),

                )
            ),
            MiniReact.createElement(Footer)
        );

        this._dom = element;
        return element;
    }
}

export default Home;
