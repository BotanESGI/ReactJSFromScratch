import { MiniReact } from "../core/MiniReact.js";
import Component from "../core/Component.js";
import { Header, Footer, Image, Button } from "../component/ReactComponent.js";

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            selectedSport: "",
            selectedDate: "",
            selectedSpotType: ""
        };
        this.getAllEvents();
        this.ShowEvent = this.ShowEvent.bind(this);
    }

    getAllEvents() {
        fetch('../assets/data/events.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({ events: data });
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }

    handleSportChange(sport) {
        this.setState({ selectedSport: sport });
    }

    handleDateChange(date) {
        this.setState({ selectedDate: date });
    }

    handleSpotTypeChange(spotType) {
        this.setState({ selectedSpotType: spotType });
    }

    formatDate(dateStr) {
        const [day, month, year] = dateStr.split('/');
        return `${year}-${month}-${day}`;
    }

    ShowEvent(event) {
        const eventWithGeo = {
            ...event,
            latitude: event.latitude,
            longitude: event.longitude
        };
        sessionStorage.setItem('selectedEvent', JSON.stringify(eventWithGeo));
        window.location.href = '/event-detail';
    }

    render() {
        const uniqueSports = [...new Set(this.state.events.map(event => event.type_de_sport))];
        const uniqueSpotTypes = [...new Set(this.state.events.flatMap(event => event.spots.map(spot => spot.type)))];

        const filteredEvents = this.state.events.filter(event => {
            const spotMatch = this.state.selectedSpotType
                ? event.spots.some(spot => spot.type === this.state.selectedSpotType)
                : true;
            return (!this.state.selectedSport || event.type_de_sport === this.state.selectedSport) &&
                (!this.state.selectedDate || this.formatDate(event.date) === this.state.selectedDate) &&
                spotMatch;
        });

        const eventPairs = [];
        for (let i = 0; i < filteredEvents.length; i += 2) {
            eventPairs.push(filteredEvents.slice(i, i + 2));
        }

        const element = MiniReact.createElement(
            "div", { id: "EventPage" },
            MiniReact.createElement(Header),
            MiniReact.createElement(
                "main", null,
                MiniReact.createElement(
                    "section",
                    {
                        id: "events_list",
                        style: { display: "flex", flexDirection: "column", alignItems: "center" }
                    },
                    MiniReact.createElement(
                        "h2",
                        null,
                        "Évènements"
                    ),
                    MiniReact.createElement(
                        "div",
                        null,
                        MiniReact.createElement(
                            "label",
                            { for: "sport-select", style: { "margin-right": "10px" } },
                            "Sport : "
                        ),
                        MiniReact.createElement(
                            "select",
                            {
                                id: "sport-select",
                                value: this.state.selectedSport,
                                events: {
                                    change: (e) => {
                                        this.handleSportChange(e.target.value);
                                    },
                                },
                            },
                            MiniReact.createElement(
                                "option",
                                this.state.selectedSport === ""
                                    ? { value: "", selected: true }
                                    : { value: "" },
                                "Tous"
                            ),
                            ...uniqueSports.map(sport => (
                                MiniReact.createElement(
                                    "option",
                                    this.state.selectedSport === sport
                                        ? { value: sport, selected: true }
                                        : { value: sport },
                                    sport
                                )
                            ))
                        ),
                        MiniReact.createElement(
                            "label",
                            { for: "spot-type-select", style: { "margin-left": "10px", "margin-right": "10px" } },
                            "Type de spot : "
                        ),
                        MiniReact.createElement(
                            "select",
                            {
                                id: "spot-type-select",
                                value: this.state.selectedSpotType,
                                events: {
                                    change: (e) => {
                                        this.handleSpotTypeChange(e.target.value);
                                    },
                                },
                            },
                            MiniReact.createElement(
                                "option",
                                this.state.selectedSpotType === ""
                                    ? { value: "", selected: true }
                                    : { value: "" },
                                "Tous"
                            ),
                            ...uniqueSpotTypes.map(spotType => (
                                MiniReact.createElement(
                                    "option",
                                    this.state.selectedSpotType === spotType
                                        ? { value: spotType, selected: true }
                                        : { value: spotType },
                                    spotType
                                )
                            ))
                        ),
                        MiniReact.createElement(
                            "label",
                            { for: "date-select", style: { "margin-left": "10px", "margin-right": "3px" } },
                            "Date : "
                        ),
                        MiniReact.createElement(
                            "input",
                            {
                                id:"date-select",
                                type: "date",
                                value: this.state.selectedDate,
                                events: {
                                    change: (e) => {
                                        this.handleDateChange(e.target.value);
                                    },
                                },
                                style: { "margin-left": "10px" }
                            }
                        )
                    ),
                    ...eventPairs.map(pair => (
                        MiniReact.createElement(
                            "div",
                            {
                                style: { display: "flex", justifyContent: "space-around", width: "100%", marginBottom: "20px" }
                            },
                            ...pair.map(event => (
                                MiniReact.createElement(
                                    "div",
                                    {
                                        class: "card",
                                        style: { margin: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", width: "35%" }
                                    },
                                    MiniReact.createElement(
                                        "div",
                                        { class: "card-body" },
                                        MiniReact.createElement(Image, {
                                            src: event.image,
                                            alt: "Evenement Logo",
                                            style: {
                                                width: "100%"
                                            }
                                        }),
                                        MiniReact.createElement(
                                            "h5",
                                            { class: "card-title" },
                                            event.name, " - ", event.heure
                                        ),
                                        MiniReact.createElement(
                                            "p",
                                            { class: "card-text" },
                                            event.description
                                        ),
                                        MiniReact.createElement(
                                            "p",
                                            { class: "card-text" , style: { "margin": "0px"}},
                                            "Date: " + event.date
                                        ),
                                        MiniReact.createElement(
                                            "p",
                                            { class: "card-text" , style: { "margin-bottom": "5px"}},
                                            "Adresse : " + event.address
                                        ),
                                        MiniReact.createElement(
                                            "p",
                                            { class: "card-text" , style: { "margin-bottom": "1px"}},
                                            "Sport : " + event.type_de_sport
                                        ),
                                        MiniReact.createElement(Button, {
                                            type: "button",
                                            title: "Afficher plus de détail",
                                            class: "btn btn-primary w-100",
                                            onClick: () => this.ShowEvent(event)
                                        }),
                                    )
                                )
                            ))
                        )
                    ))
                )
            ),
            MiniReact.createElement(Footer)
        );

        this._dom = element;
        return element;
    }
}

export default Event;
