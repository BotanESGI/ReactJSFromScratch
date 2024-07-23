import { MiniReact } from "../core/MiniReact.js";
import Component from "../core/Component.js";
import { Header, Footer, Image, Button, Card } from "../component/ReactComponent.js";

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
                "main", {style: {paddingTop: '8rem'}},
                MiniReact.createElement(
                    "section",
                    {
                        id: "events_list",
                        style: { display: "flex", flexDirection: "column", alignItems: "center" }
                    },
                    MiniReact.createElement(
                        "h2",
                        {class: "titleEvent"},
                        "Évènements"
                    ),
                    MiniReact.createElement(
                        "div",
                        {class: "filter-container"},
                        MiniReact.createElement(
                            'div',
                            {},
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
                        ),
                        MiniReact.createElement(
                            "div",
                            {},
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
                        ),
                        MiniReact.createElement(
                            "div",
                            {},
                            MiniReact.createElement(
                                "label",
                                { for: "date-select", style: { "margin-left": "10px", "margin-right": "3px" } },
                                "Date : "
                            ),
                            MiniReact.createElement(
                                "input",
                                {
                                    id: "date-select",
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
                    ),
                    MiniReact.createElement(
                            "div",
                            {
                                class: "card-grid",

                            },
                            ...eventPairs.flat().map((event, index) => (
                                MiniReact.createElement(
                                    Card,
                                    {
                                        key: index,
                                        title: event.name,
                                        class: event.type_de_sport,
                                        category: event.type_de_sport,
                                        buttonTxt: "En savoir plus",
                                        buttonClass: "event-button",
                                        buttonOnClick: () => this.ShowEvent(event)
                                    }
                                )
                            ))
                        )
                )
            ),
            MiniReact.createElement(Footer)
        );

        this._dom = element;
        return element;
    }
}

export default Event;
