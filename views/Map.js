import { MiniReact } from "../core/MiniReact.js";
import Component from "../core/Component.js";
import {Button, Header, Footer} from "../component/ReactComponent.js";

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            places: [],
            placeTitle: "title",
            placeDescription: "description"
        };
        this.map = null;
        this.getAllPlaces();
    }

    componentDidMount() {
        setTimeout(() => {
            this.initializeMap();
        }, 200);
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
                this.setState({places: data});
            })
            .catch(error => {
                console.error('Error fetching places:', error);
            });
    }

    marqueurs = [];

    initializeMap() {
        const mapElement = document.getElementById('map');
        if (!mapElement) {
            console.error("Map container not found.");
            return;
        }

        this.map = L.map(mapElement).setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">Botan</a> JO 2024'
        }).addTo(this.map);
    }


    AddPoint(latitude, longitude, name, description, point_icon, point_size, zoom) {
        if (!this.map) return;

        const customIcon = L.icon({
            iconUrl: point_icon,
            iconSize: point_size,
            iconAnchor: [19, 38],
            popupAnchor: [0, -38]
        });

        var marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(this.map);
        marker.bindPopup(name + "<br>" + description);
        this.marqueurs.push(marker);
        this.map.setView([latitude, longitude], zoom);
    }

    deleteAllPoints() {
        if (!this.map) return;
        for (var i = 0; i < this.marqueurs.length; i++) {
            this.map.removeLayer(this.marqueurs[i]);
        }
        this.marqueurs = [];
    }

    AddAllPointsClosestToYou = () => {
        this.deleteAllPoints();
        this.state.places.forEach(place => {
            this.AddPoint(place.latitude, place.longitude, place.name, place.description, "../assets/img/pointer_default.png", [100, 100], 13);
        });
        this.AddCurrentLocationPointInMap();
    };

    AddCurrentPointInMap = (latitude, longitude, name, description) => {
        this.setState({
            placeTitle: name,
            placeDescription: description
        });
        this.componentDidMount();
        setTimeout(() => {
            this.deleteAllPoints();
            this.AddPoint(latitude, longitude, name, description, "../assets/img/pointer_default.png", [100, 100], 13);
        }, 200);
    };

    AddCurrentLocationPointInMap = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                const name = "Votre Location";
                const description = "Votre emplacement actuel.";
                this.AddPoint(latitude, longitude, name, description, "../assets/img/pointer_current_location.png", [100, 100], 11);
            }, error => {
                console.error('Error getting current position:', error);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    render() {
        const element =
            MiniReact.createElement(
                "div", {id: "MapPage"},
                MiniReact.createElement(Header),
                MiniReact.createElement(
                    "main", null,
                    MiniReact.createElement(
                        "section",
                        {
                            id: "places_map",
                            style: {display: "flex"}
                        },
                        MiniReact.createElement(
                            "div",
                            {
                                id: "places",
                                style: {overflow: "scroll", height: "602px"}
                            },
                            ...this.state.places.map(place => (
                                MiniReact.createElement(
                                    "div",
                                    {
                                        class: "card",
                                        style: {
                                            width: "18rem"
                                        }
                                    },
                                    MiniReact.createElement(
                                        "div",
                                        {class: "card-body"},
                                        MiniReact.createElement(
                                            "h5",
                                            {class: "card-title"},
                                            place.name
                                        ),
                                        MiniReact.createElement(
                                            "p",
                                            {class: "card-text"},
                                            place.description
                                        ),
                                        MiniReact.createElement(Button, {
                                            type: "button",
                                            title: "Afficher sur la carte",
                                            class: "btn btn-primary",
                                            onClick: () => this.AddCurrentPointInMap(place.latitude, place.longitude, place.name, place.description)
                                        }),

                                    )
                                )
                            ))
                        ),
                        MiniReact.createElement(
                            "div",
                            {id: "map"}
                        )
                    ),
                    MiniReact.createElement(Button, {
                        type: "button",
                        title: "Afficher tous les points les plus proches de chez vous",
                        class: "btn btn-secondary",
                        onClick: this.AddAllPointsClosestToYou
                    }),
                    MiniReact.createElement(
                        "section",
                        {
                            id: "places_info"
                        },
                        MiniReact.createElement(
                            "p",
                            {
                                id: "places_title"
                            },
                            this.state.placeTitle
                        ),
                        MiniReact.createElement(
                            "p",
                            {
                                id: ""
                            },
                            this.state.placeDescription
                        ),
                    ),
                    MiniReact.createElement(Footer),
                )
            );

        this._dom = element;
        return element;
    }
}

export default Map;