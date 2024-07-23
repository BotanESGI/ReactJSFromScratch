import Component from "../core/Component.js";
import { MiniReact } from "../core/MiniReact.js";
import { Image } from "/component/ReactComponent.js";
//12/06/24 Botan - navbar boutton mobile terminer RESPONSIVE :)
const NavBarComponent = (props) => {
    return MiniReact.createElement(
        "nav",
        { class: "navbar navbar-expand-lg navbar-light bg-ligh  t" },
        MiniReact.createElement(
            "div",
            {
                class: "container-fluid",
                style: {
                    "flex-wrap": "nowrap !important",
                    "padding": "0rem 2rem",
                },
            },
            MiniReact.createElement(
                "a",
                { class: "navbar-brand", href: "/" },
                MiniReact.createElement(Image, {
                    src: "./assets/img/logo.svg",
                    alt: "Paris 2024 Logo",
                    style: {
                        width: "50%"
                    }
                })
            ),
            MiniReact.createElement(
                "button",
                {
                    class: "navbar-toggler",
                    type: "button",
                    id: "navbarToggle",
                    events: { click: props.onClick },
                },
                MiniReact.createElement("span", { class: "navbar-toggler-icon" })
            ),
            MiniReact.createElement(
                "div",
                { class: props.class, id: "navbarNav" },
                MiniReact.createElement(
                    "ul",
                    { class: "navbar-nav ms-auto" },
                    MiniReact.createElement(
                        "li",
                        { class: "nav-item" },
                        MiniReact.createElement(
                            "a",
                            { class: "nav-link" + (props.activePage === "/map" ? " active" : ""), href: "/map" },
                            "Map"
                        )
                    ),
                    MiniReact.createElement(
                        "li",
                        { class: "nav-item" },
                        MiniReact.createElement(
                            "a",
                            { class: "nav-link" + (props.activePage === "/event" ? " active" : ""), href: "/event" },
                            "Évènement"
                        )
                    ),
                    MiniReact.createElement(
                        "li",
                        { class: "nav-item" },
                        MiniReact.createElement(
                            "a",
                            { class: "nav-link" + (props.activePage === "/setting" ? " active" : ""), href: "/setting" },
                            "Langue"
                        )
                    ),
                )
            )
        )
    );
};

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
        this.activePage = window.location.pathname;
    }

    document.getElementById('menu-icon').addEventListener('click', function() {
        var navLinks = document.getElementById('nav-links');
        var mainContent = document.getElementById('main-content');
        
        if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mainContent.style.paddingTop = '80px';
        } else {
        navLinks.classList.add('active');
        mainContent.style.paddingTop = (80 + navLinks.offsetHeight) + 'px';
        }
    });

    openNavBarMobile = () => {
        this.setState({
            show: true
        });
    };

    closeNavBarMobile = () => {
        this.setState({
            show: false
        });
    };

    render() {
        let element = !this.state.show ?
            MiniReact.createElement(
                NavBarComponent,
                {
                    class: "collapse navbar-collapse",
                    onClick: this.openNavBarMobile,
                    activePage: this.activePage
                }
            ) :
            MiniReact.createElement(
                NavBarComponent, {
                    class: "collapse navbar-collapse show text-center",
                    onClick: this.closeNavBarMobile,
                    activePage: this.activePage
                }
            );

        this._dom = element;
        return element;

    }

}

export default NavBar;