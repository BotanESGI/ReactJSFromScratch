import { MiniReact } from "../core/MiniReact.js";
import NavBar from "./NavBar.js";

const Button = (props) => {
    return MiniReact.createElement(
        "button",
        {
            type: props.type,
            id: props.id,
            class: props.class,
            style: props.style,
            events: { click: props.onClick },
        },
        props.title
    );
};

const Image = ({ src, alt, style }) => {
    return MiniReact.createElement("img", { src, alt, style });
};

const Carousel = ({ images }) => {
    return MiniReact.createElement(
        "swiper-container",
        {
            class: "mySwiper",
            pagination: "true",
            "pagination-clickable": "true",
            navigation: "true",
            "space-between": "30",
            "centered-slides": "true",
            "autoplay-delay": "2500",
            "autoplay-disable-on-interaction": "false"
        },
        ...images.map(image =>
            MiniReact.createElement(
                "swiper-slide",
                {},
                MiniReact.createElement(Image, {
                    src: image.src,
                    alt: image.alt,
                })
            )
        )
    );
};

const Header = () => {
    return MiniReact.createElement('header', null, MiniReact.createElement(NavBar));
};


const Footer = () => {
    return MiniReact.createElement(
        "footer",
        { class: "bg-body-tertiary text-center text-lg-start" },
        MiniReact.createElement(
            "div",
            { class: "container p-4" },
            MiniReact.createElement(
                "div",
                { class: "row" },
                MiniReact.createElement(
                    "div",
                    { class: "col-lg-6 col-md-12 mb-4 mb-md-0" },
                    MiniReact.createElement("h5", { class: "text-uppercase" }, "React JS From Scratch"),
                    MiniReact.createElement(
                        "p",
                        null,
                        "Projet d'école ESGI pour le second semestre. Mini Framework React intégralement développé en JavaScript from Scratch."
                    )
                ),
                MiniReact.createElement(
                    "div",
                    { class: "col-lg-6 col-md-12 mb-4 mb-md-0" },
                    MiniReact.createElement("h5", { class: "text-uppercase" }, "JO 2024"),
                    MiniReact.createElement(
                        "p",
                        null,
                        "Projet portant sur les Jeux Olympiques de 2024 avec une map interactive pour les lieux et les événements."
                    )
                )
            )
        ),
        MiniReact.createElement(
            "div",
            {
                class: "text-center p-3",
                style: {
                    "background-color": "rgba(0, 0, 0, 0.05)",
                },
            },
            "© 2024 Copyright - ",
            MiniReact.createElement(
                "a",
                { class: "text-body", href: "http://localhost:8080/" },
                "localhost"
            )
        )
    );
};

export { Header, Footer, Carousel, Image, Button};
