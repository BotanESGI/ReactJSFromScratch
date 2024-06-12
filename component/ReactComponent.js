import { MiniReact } from "../core/MiniReact.js";
import NavBar from "./NavBar.js";

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
    return MiniReact.createElement(NavBar);
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
                    MiniReact.createElement("h5", { class: "text-uppercase" }, "Footer text"),
                    MiniReact.createElement(
                        "p",
                        null,
                        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias. Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam voluptatem veniam, est atque cumque eum delectus sint!"
                    )
                ),
                MiniReact.createElement(
                    "div",
                    { class: "col-lg-6 col-md-12 mb-4 mb-md-0" },
                    MiniReact.createElement("h5", { class: "text-uppercase" }, "Footer text"),
                    MiniReact.createElement(
                        "p",
                        null,
                        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias. Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam voluptatem veniam, est atque cumque eum delectus sint!"
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

export { Header, Footer, Carousel, Image};
