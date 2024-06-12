import { MiniReact } from "../core/MiniReact.js";
import Component from "../core/Component.js";
import {Header, Footer, Carousel} from "../component/ReactComponent.js";

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            places: []
        };

        this.childrenKey = this.generateUniqueKey();
        this.getAllPlaces();
    }

    getAllPlaces() {
        fetch('http://localhost:8080/assets/data/places.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({ places: data });
            })
            .catch(error => {
                console.error('Error fetching places:', error);
            });
    }

    render() {
        // Extract places from state
        const { places } = this.state;

        // Create an array of <p> elements based on places data
        const placeElements = places.map(place => (
            MiniReact.createElement(
                "p",
                { id: place.id },
                place.name
            )
        ));

        // Create a wrapping <div> to contain all <p> elements
        const element = MiniReact.createElement(
            "div",
            null,
            ...placeElements
        );

        this._dom = element;
        return element;
    }
}

export default Map;
