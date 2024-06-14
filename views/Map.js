import { MiniReact } from "../core/MiniReact.js";
import Component from "../core/Component.js";
import MapComponent from "../component/MapComponent.js";
import { Button } from "../component/ReactComponent.js";

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

    marqueurs = [];

    AddPoint(latitude, longitude, name, description) {
        if (!this.map) return;
        var marker = L.marker([latitude, longitude]).addTo(this.map);
        marker.bindPopup(name + "<br>" + description);
        this.marqueurs.push(marker);
        this.map.setView([latitude, longitude], 13);  // Zoom on the added point
    }

    deleteAllPoints() {
        if (!this.map) return;
        for (var i = 0; i < this.marqueurs.length; i++) {
            this.map.removeLayer(this.marqueurs[i]);
        }
        this.marqueurs = [];
    }

    ShowPlacePointInMap = (latitude, longitude, name, description) => {
        this.deleteAllPoints();
        this.AddPoint(latitude, longitude, name, description);
    };

    render() {
        const { places } = this.state;

        const placeElements = places.map(place => (
            MiniReact.createElement(
                "div",
                {
                    class: "card",
                    style: {
                        width: "18rem"
                    }
                },
                MiniReact.createElement(
                    "img",
                    {
                        class: "card-img-top",
                        src: "...", // Replace with your actual image source
                        alt: "Card image cap"
                    }
                ),
                MiniReact.createElement(
                    "div",
                    { class: "card-body" },
                    MiniReact.createElement(
                        "h5",
                        { class: "card-title" },
                        place.name
                    ),
                    MiniReact.createElement(
                        "p",
                        { class: "card-text" },
                        place.description
                    ),
                    MiniReact.createElement(Button, {
                        type: "button", // Use type "button" for non-submit buttons
                        title: "Afficher sur la carte",
                        class: "btn btn-primary",
                        onClick: () => this.ShowPlacePointInMap(place.latitude, place.longitude, place.name, place.description)
                    }),
                )
            )
        ));

        const element =
            MiniReact.createElement(
                "div",
                {
                    style: { display: "flex" }
                },
                MiniReact.createElement(
                    "div",
                    {
                        style: { overflow: "scroll", height: "602px" }
                    },
                    ...placeElements
                ),
                MiniReact.createElement(
                    "div",
                    { id: "map" },
                    MiniReact.createElement(MapComponent, {
                        key: this.childrenKey,
                        MapStatus: "Loaded",
                        onMapLoad: (map) => { this.map = map; }
                    })
                )
            );

        this._dom = element;
        return element;
    }
}

export default Map;
