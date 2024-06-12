import { MiniReact } from "../core/MiniReact.js";

const Page404 = () => {
    return MiniReact.createElement(
        "div",
        {},
        //MiniReact.createElement(Header),
        MiniReact.createElement(
            "div",
            { class: "d-flex align-items-center justify-content-center vh-100" },
            MiniReact.createElement(
                "div",
                { class: "text-center" },
                MiniReact.createElement(
                    "h1",
                    { class: "display-1 fw-bold" },
                    "404"
                ),
                MiniReact.createElement(
                    "p",
                    { class: "fs-3" },
                    MiniReact.createElement(
                        "span",
                        { class: "text-danger" },
                        "Oups ! "
                    ),
                    "Page non trouvée."
                ),
                MiniReact.createElement(
                    "p",
                    { class: "lead" },
                    "La page que vous recherchez n’existe pas."
                ),
                MiniReact.createElement(
                    "a",
                    { href: "/", class: "btn btn-primary" },
                    "Retourner sur la page d'accueil"
                )
            )
        ),
    );
};

export default Page404;

