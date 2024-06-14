import { MiniReact } from "../core/MiniReact.js";
import Component from "../../core/Component.js";

class MapComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MapStatus: this.props.MapStatus,
        };
    }

    componentDidMount() {
        if (this.props.MapStatus === "Loaded" && !this.mapInitialized) {
            setTimeout(() => {
                if (!document.getElementById('map')._leaflet_id) {
                    this.map = L.map('map').setView([48.8566, 2.3522], 13);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">Botan</a>'
                    }).addTo(this.map);

                    // Notify parent that map is loaded
                    if (this.props.onMapLoad) {
                        this.props.onMapLoad(this.map);
                    }

                    this.setState({ MapStatus: "Map Initialized" });
                    this.mapInitialized = true;
                }
            }, 1000);
        }
    }

    render() {
        const element = MiniReact.createElement(
            "p",
        );
        this._dom = element;
        return element;
    }
}

export default MapComponent;
