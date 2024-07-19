import { MiniReact } from "../core/MiniReact.js";
import Component from "../core/Component.js";
import { Header, Footer, Image } from "../component/ReactComponent.js";

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

    render() {
        const uniqueSports = [...new Set(this.state.events.map(event => event.type_de_sport))];
        const uniqueSpotTypes = [...new Set(this.state.events.flatMap(event => event.spots.map(spot => spot.type)))];

        // Filter events by selected sport, selected date, and selected spot type
        const filteredEvents = this.state.events.filter(event => {
            const spotMatch = this.state.selectedSpotType
                ? event.spots.some(spot => spot.type === this.state.selectedSpotType)
                : true;
            return (!this.state.selectedSport || event.type_de_sport === this.state.selectedSport) &&
                (!this.state.selectedDate || this.formatDate(event.date) === this.state.selectedDate) &&
                spotMatch;
        });

        // Group events by pairs
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
                            "Filtre : "
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
                                { value: "" },
                                "Tous"
                            ),
                            ...uniqueSports.map(sport => (
                                MiniReact.createElement(
                                    "option",
                                    { value: sport },
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
                                { value: "" },
                                "Tous"
                            ),
                            ...uniqueSpotTypes.map(spotType => (
                                MiniReact.createElement(
                                    "option",
                                    { value: spotType },
                                    spotType
                                )
                            ))
                        ),
                        MiniReact.createElement(
                            "input",
                            {
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
                                            event.name
                                        ),
                                        MiniReact.createElement(
                                            "p",
                                            { class: "card-text" },
                                            event.description
                                        ),
                                        MiniReact.createElement(
                                            "p",
                                            { class: "card-text" },
                                            "Date: " + event.date
                                        ),
                                        MiniReact.createElement(
                                            "span",
                                            { class: "card-text" },
                                            "Lieu: " + event.lieu.name + ", " + event.lieu.city
                                        )
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
