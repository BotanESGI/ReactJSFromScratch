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

const Card = (props) => {
    return MiniReact.createElement(
      "div",
        { class: `card eventCard rouded-lg` },
        MiniReact.createElement(Image,
        {
            src: `/../assets/img/${props.category}.jpg`,
            alt: "sport_img",
            class: "cardImage",
        }),
        MiniReact.createElement(
            "div",
            { class: "detail-container" },
            MiniReact.createElement("p", null, props.category),
            MiniReact.createElement("h3", null, props.title),
            
        ),
        MiniReact.createElement(
                "div",
                { class: "date-button-event" },
                MiniReact.createElement(
                    "button",
                    {
                        events: { click: props.buttonOnClick },
                        class: props.buttonClass
                    },
                        props.buttonTxt,
                    
                ),
                MiniReact.createElement(
                    "span",
                    {},
                    props.date
                )
            )

    );
}


const backButton = (props) => {
    return MiniReact.createElement(
        "div",
        { class: "backButtonContainer", events: {click : props.onClick}},
        MiniReact.createElement(
            'i',
            { class: "bi bi-arrow-left"},    
        ),
        MiniReact.createElement(
            "span",
            {class: `${props.class}`},
            props.title
        )
    )
}



const Footer = () => {
    return MiniReact.createElement(
        "footer",
        {},
        MiniReact.createElement(
            "div",
            { class: "footer_container" },
            MiniReact.createElement(
                "div",
                { class: "first_row" },
                MiniReact.createElement(Image, {
                    src: "./assets/img/logo2.png",
                    alt: "Paris 2024 Logo",
                    style: {
                        width: "5rem"
                    }
                }),
                MiniReact.createElement(
                    "span",
                    { class: "footer_span" },
                    "Paris Jeux Olympics 2024"
                ),
                MiniReact.createElement(
                    "div",
                    { class: "social_media_links" },
                    MiniReact.createElement(Image, {
                        src: "./assets/img/youtube.svg",
                        alt: "youtube Logo",
                        style: {
                            width: "2.5rem"
                        }
                    }),
                    MiniReact.createElement(Image, {
                        src: "./assets/img/twitter.svg",
                        alt: "twitter Logo",
                        style: {
                            width: "2.5rem"
                        }
                    }),
                    MiniReact.createElement(Image, {
                        src: "./assets/img/instagram.svg",
                        alt: "instagram Logo",
                        style: {
                            width: "2.5rem"
                        }
                    }),
                )
            ),
            MiniReact.createElement(
                "div",
                { class: "second_row" },
                MiniReact.createElement(
                    "div",
                    { class: "first_column" },
                    MiniReact.createElement(
                        'a',
                        {
                            class: "footer_link",
                            href: "/"
                        },
                        "link 1"
                    ),
                    MiniReact.createElement(
                        'a',
                        {
                            class: "footer_link",
                            href: "/"
                        },
                        "link 2"
                    ),
                    MiniReact.createElement(
                        'a',
                        {
                            class: "footer_link",
                            href: "/"
                        },
                        "link 3"
                    ),
                ),

                MiniReact.createElement(
                    "div",
                    { class: "second_column" },
                    MiniReact.createElement(
                        'a',
                        {
                            class: "footer_link",
                            href: "/"
                        },
                        "link 1"
                    ),
                    MiniReact.createElement(
                        'a',
                        {
                            class: "footer_link",
                            href: "/"
                        },
                        "link 2"
                    ),
                    MiniReact.createElement(
                        'a',
                        {
                            class: "footer_link",
                            href: "/"
                        },
                        "link 3"
                    ),
                ),
                MiniReact.createElement(
                    "div",
                    { class: "third_column" },
                    MiniReact.createElement(
                        'a',
                        {
                            class: "footer_link",
                            href: "/"
                        },
                        "link 1"
                    ),
                    MiniReact.createElement(
                        'a',
                        {
                            class: "footer_link",
                            href: "/"
                        },
                        "link 2"
                    ),
                    MiniReact.createElement(
                        'a',
                        {
                            class: "footer_link",
                            href: "/"
                        },
                        "link 3"
                    ),
                ),
            )
        )
    )
};

export { Header, Footer, Carousel, Image, Button, Card, backButton};
