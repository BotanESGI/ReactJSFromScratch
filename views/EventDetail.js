import { MiniReact } from "../core/MiniReact.js";
import Component from "../core/Component.js";
import { Header, Footer, Image, Button, backButton } from "../component/ReactComponent.js";

class EventDetail extends Component {
    constructor(props) {
        super(props);
        const event = JSON.parse(sessionStorage.getItem('selectedEvent'));

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
            event: event || {},
            placeDistance: this.CalculeTheCurrentDistance(event.latitude, event.longitude).toFixed(2) + " km",
        };
    }

    CalculeTheCurrentDistance(lat, lon) {
        const R = 6371;
        const dLat = (lat - this.mylatitude) * Math.PI / 180;
        const dLon = (lon - this.mylongitude) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.mylatitude * Math.PI / 180) * Math.cos(lat * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;
        return distance;
    }

    componentDidMount() {
        setTimeout(() => {
            this.initializeMap();
        }, 300);
    }

    formatInstallation(installation) {
        return installation.replace(/-/g, '<br>-');
    }


    formatHeure(heure) {
        let colorMap = ['green', 'orange', 'red'];
        let hourIndex = 0;
        return heure.replace(/(\d{1,2}h)/g, (match) => {
            const color = colorMap[hourIndex % colorMap.length];
            hourIndex++;
            return `<span style='color:${color}'>${match}</span>`;
        });
    }

    initializeMap() {
        const mapElement = document.getElementById('event-map');
        if (!mapElement) {
            console.error("Map container not found.");
            return;
        }

        const map = L.map(mapElement).setView([this.state.event.latitude, this.state.event.longitude], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">Botan</a> JO 2024'
        }).addTo(map);

        L.marker([this.state.event.latitude, this.state.event.longitude]).addTo(map)
            .bindPopup(this.state.event.name)
            .openPopup();
    }
    
    dateTranslate(date) {
        const dateString = date;
        const [day, month, year] = dateString.split('/');

        // Créer un nouvel objet Date avec les parties de la date
        const newDate = new Date(year, month - 1, day); // Notez que les mois commencent à 0 (janvier) en JavaScript

        // Tableau des noms de mois en français
        const monthNames = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
        ];

        // Construire la chaîne formatée
        return `${day} ${monthNames[newDate.getMonth()]} ${year}`;

    }

    render() {
        const { event } = this.state;
        return MiniReact.createElement(
            "div", { id: "EventDetailPage" },
            MiniReact.createElement(Header),
            MiniReact.createElement(
                "main", { id : "EventDetail", style: {paddingTop: '6rem'}},
                MiniReact.createElement(
                    "div",
                    {
                        id: "event-map",
                        style: { width: "100%", height: "400px", marginTop: "20px" }
                    }
                ),
                MiniReact.createElement(
                    "section",
                    {
                        id: "events_info",
                        style: {background: "mintcream", padding: "5%"}
                    },
                    MiniReact.createElement(backButton, {
                        title: "Revenir",
                        class: "backButton",
                        onClick: () => window.location.href = '/event'
                    }),
                    MiniReact.createElement(
                        'div',
                        { class: "title-details" },
                        MiniReact.createElement(
                            "li",
                            { class: "category" },
                            event.type_de_sport
                        ),
                        MiniReact.createElement(
                            "li",
                            
                            {  style: {listStyleType: "none"}},
                            this.dateTranslate(event.date)
                        ),
                    ),
                    MiniReact.createElement(
                        "h2",
                        {
                            id: "event_title",
                            class: "title_event",
                            style: {},
                            
                        },
                        event.name
                    ),
                    MiniReact.createElement(Image, {
                        src: event.image,
                        alt: "Event 2024 Logo",
                        style: {
                            width: "-webkit-fill-available"
                        }
                    }),
                    MiniReact.createElement(
                        "ul",
                        {
                            id: "place_location",
                        },
                        MiniReact.createElement(
                            "li",
                            {
                            },
                            "Date : ", event.date
                        ),
                        MiniReact.createElement(
                            "li",
                            {
                            },
                            "Heure : ", event.heure
                        ),
                        MiniReact.createElement(
                            "li",
                            {
                            },
                            "Adresse : ", event.address
                        ),
                        MiniReact.createElement(
                            "li",
                            {
                            },
                            "Distance entre votre position et le lieu : ", this.state.placedistance
                        ),
                        MiniReact.createElement(
                            "li",
                            {},
                            "Type de sport : ", event.type_de_sport
                        ),
                        MiniReact.createElement(
                            "p",
                            {
                                id: "place_description",
                            },
                            event.description
                        ),
                
                    ),
                    MiniReact.createElement(
                        "div",
                        { class: "",  style : {marginTop: "2rem"}}
                        ,
                        MiniReact.createElement(
                            "h2",
                            {},
                            "Les spots",
                        ),
                        MiniReact.createElement(
                                "div",
                                {
                                    id: "imageGallery",
                                    style: { overflowX: "auto", whiteSpace: "nowrap", padding: "10px" }
                                },
                                MiniReact.createElement("br", null ),
                                ...event.spots.map(spot => (
                                    MiniReact.createElement(
                                        "div",
                                        {
                                            style: {
                                                display: "inline-block",
                                                width: "300px",
                                                height: "100%",
                                                margin: "0 10px 10px 0",
                                                verticalAlign: "top",
                                                backgroundColor: "#f0f0f0",
                                                padding: "10px",
                                            }
                                        },
                                        MiniReact.createElement("img", { src: spot.photo, style: { width: "100%", marginBottom: "10px"} }),
                                        MiniReact.createElement("p", { style: { margin: "0", "white-space": "normal"} }, "Spot : " + spot.name),
                                        MiniReact.createElement("br", null ),
                                        MiniReact.createElement("p", { style: { margin: "0", "white-space": "normal"} }, "Description : " + spot.description),
                                        MiniReact.createElement("br", null ),
                                        MiniReact.createElement("p", { style: { margin: "0", "white-space": "normal"} }, "Adresse : " + spot.address),
                                        MiniReact.createElement("br", null ),
                                        MiniReact.createElement(
                                            "div",
                                            {
                                                dangerouslySetInnerHTML: {
                                                    __html: "<p>Installation disponible :" + this.formatInstallation(spot.installation) + "</p>"
                                                }
                                            }
                                        ),
                                        MiniReact.createElement("br", null ),
                                        MiniReact.createElement(
                                            "span",
                                            {
                                                dangerouslySetInnerHTML: {
                                                    __html: "<p>Heures d'influence : " + this.formatHeure(spot.influence_hours) + "</p>"
                                                }
                                            }
                                        ),
                                        MiniReact.createElement(Button, {
                                            type: "button",
                                            title: "Afficher le spot la carte",
                                            class: "btn btn-primary w-100",
                                            onClick: () => this.AddPoint(spot.latitude, spot.longitude, spot.name, "Spots : " + spot.description, "../assets/img/pointer_spot.png", [100, 100], 13)
                                        }),
                                        MiniReact.createElement(
                                            "a",
                                            {
                                                href: "https://www.google.com/maps/dir/" + this.mylatitude + "," + this.mylongitude + "/" + spot.latitude + "," + spot.longitude,
                                                target:"_blank",
                                                style: {"display": "flex"}
                                            },
                                            "Afficher les itinéraires du spot"
                                        ),
                                    )
                                ))
                            ),
                    ),  
                ),
            
            ),
            MiniReact.createElement(Footer)
        );
    }
}

export default EventDetail;
