import { MiniReact } from "../core/MiniReact.js";
import Component from "../core/Component.js";
import {Button, Header, Footer, Image} from "../component/ReactComponent.js";

class Map extends Component {
    constructor(props) {
        super(props);

        this.mylatitude = 0;
        this.mylongitude = 0;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    this.mylatitude = latitude;
                    this.mylongitude = longitude;
                },
                error => {
                    console.error('Error getting current position:', error);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }

        this.state = {
            places: [],
            placeTitle: "",
            placeDescription: "",
            placeSportList: "",
            placeImage: "",
            placeLocation: "",
            placeDistance: ""
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
                    this.AddPoint(place.location.latitude, place.location.longitude, place.name, place.description, "../assets/img/pointer_default.png", [100, 100], 13);
                    const latlngs = [
                        [this.mylatitude, this.mylongitude],
                        [place.location.latitude, place.location.longitude]
                    ];

                    const polyline = L.polyline(latlngs, { color: 'red' }).addTo(this.map);
                    this.marqueurs.push(polyline);
                });
                const name = "Votre Location";
                const description = "Votre emplacement actuel.";
                this.AddPoint(this.mylatitude, this.mylongitude, name, description, "../assets/img/pointer_current_location.png", [100, 100], 11);
    };


    AddCurrentPointInMap = (latitude, longitude, name, description, image, location, sports) => {
        this.CalculeTheCurrentDistance(latitude, longitude, distance => {
            this.setState({
                placeTitle: name,
                placeDescription: description,
                placeImage: image,
                placeLocation: location,
                placeDistance: distance,
                placeSportList: sports.join(', '),
            });

            this.componentDidMount();
            setTimeout(() => {
                this.deleteAllPoints();
                this.AddPoint(latitude, longitude, name, description, "../assets/img/pointer_default.png", [100, 100], 13);
            }, 300);
        });
    };



    CalculeTheCurrentDistance(lat, lon, callback)
    {
                const R = 6371;
                const dLat = (lat - this.mylatitude) * Math.PI / 180;
                const dLon = (lon - this.mylongitude) * Math.PI / 180;
                const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(this.mylatitude * Math.PI / 180) * Math.cos(lat * Math.PI / 180) *
                    Math.sin(dLon/2) * Math.sin(dLon/2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                const distance = R * c;
                const distanceString = distance.toFixed(2);
                callback(distanceString + " km");
    }




    AddCurrentLocationPointInMap = () => {
                const name = "Votre Location";
                const description = "Votre emplacement actuel.";
                this.AddPoint(this.mylatitude, this.mylongitude, name, description, "../assets/img/pointer_current_location.png", [100, 100], 11);
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
                                style: {overflow: "auto", height: "602px", width: "18rem"}
                            },
                            ...this.state.places.map(place => (
                                MiniReact.createElement(
                                    "div",
                                    {
                                        class: "card"
                                    },
                                    MiniReact.createElement(
                                        "div",
                                        {class: "card-body"},
                                        MiniReact.createElement(
                                            "h5",
                                            {class: "card-title"},
                                            place.name
                                        ),
                                        MiniReact.createElement(Button, {
                                            type: "button",
                                            title: "Afficher sur la carte",
                                            class: "btn btn-primary w-100",
                                            onClick: () => this.AddCurrentPointInMap(place.location.latitude, place.location.longitude, place.name, place.description, place.image, place.location, place.sports)
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
                        title: "Afficher tous les points les plus proches de ma géolocalisation",
                        class: "btn btn-info w-100 mt-1",
                        onClick: this.AddAllPointsClosestToYou
                    }),

                    MiniReact.createElement(
                        "section",
                        {
                            id: "places_info",
                            style: {background: "mintcream", padding: "5%"}
                        },
                        MiniReact.createElement(Image, {
                            src: this.state.placeImage,
                            alt: "Paris 2024 Logo",
                            style: {
                                width: "-webkit-fill-available"
                            }
                        }),
                        MiniReact.createElement(
                            "h2",
                            {
                                id: "place_title",
                                style: {"text-align": "center"}
                            },
                            this.state.placeTitle
                        ),
                        MiniReact.createElement(
                            "a",
                            {
                                href: "https://www.google.com/maps/dir/" + this.mylatitude + "," + this.mylongitude + "/" + this.state.placeLocation.latitude + "," + this.state.placeLocation.longitude,
                                target:"_blank",
                                style: {"justify-content": "center", "display": "flex"}
                            },
                            "Afficher les itinéraires (Voiture, Transports, Pied, Vélo, Avion)"
                        ),
                        MiniReact.createElement(
                            "ul",
                            {
                                id: "place_location",
                            },
                            MiniReact.createElement(
                                "li",
                                {
                                },
                                "Adresse : ", this.state.placeLocation.address
                            ),
                            MiniReact.createElement(
                                "li",
                                {
                                },
                                "Ville : ", this.state.placeLocation.city
                            ),
                            MiniReact.createElement(
                                "li",
                                {
                                },
                                "Code postal : ", this.state.placeLocation.postal_code
                            ),
                            MiniReact.createElement(
                                "li",
                                {
                                },
                                "Distance entre votre position et le lieu  ", this.state.placeDistance
                            ),
                            MiniReact.createElement(
                                "li",
                                {
                                },
                                "Liste des sports : ", this.state.placeSportList
                            )
                        ),
                        MiniReact.createElement(
                            "p",
                            {
                                id: "place_description",
                            },
                            this.state.placeDescription
                        )
                    ),
                    MiniReact.createElement(Footer),
                )
            );

        this._dom = element;
        return element;
    }
}

export default Map;