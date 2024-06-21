import { MiniReact } from "../core/MiniReact.js";
import Component from "../core/Component.js";
import { Button, Header, Footer } from "../component/ReactComponent.js";

class Setting extends Component {
    constructor(props) {
        super(props);
    }

    ResetDefaultLanguage() {
        var iframe = document.getElementsByClassName('goog-te-banner-frame')[0]
            || document.getElementById(':1.container');
        if (!iframe) return;
        var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        var restore_el = innerDoc.getElementsByTagName("button");
        for (var i = 0; i < restore_el.length; i++) {
            if (restore_el[i].id.indexOf("restore") >= 0) {
                restore_el[i].click();
                return;
            }
        }
    }

    render() {


        const element = MiniReact.createElement(
            "div", { id: "SettingPage" },
            MiniReact.createElement(Header),
            MiniReact.createElement(
                "main", null,
                MiniReact.createElement(
                    "div",
                    { class: "row justify-content-center", style: "" },
                    MiniReact.createElement(
                        "div",
                        { class: "col-md-6", style: { margin: "43px 43px 30px 43px", padding: "20px", border: "3px solid", backgroundColor: "aliceblue" } },
                        MiniReact.createElement(
                            "div",
                            { class: "form-row" },
                            MiniReact.createElement(
                                "span",
                                { style: { margin: "0 10px 0 0" } },
                                "Changer la langue du site : "
                            ),
                            MiniReact.createElement("div",
                                {
                                    id: "google_translate_element"
                                }
                            ),
                            MiniReact.createElement(Button, {
                                type: "button",
                                title: "Français (par defaut)",
                                class: "btn btn-success mt-1 w-100",
                                onClick: () => this.ResetDefaultLanguage()
                            }),

                        )
                    )
                ),
                MiniReact.createElement(
                    "div",
                    { class: "row justify-content-center", style: "" },
                    MiniReact.createElement(
                        "div",
                        { class: "col-md-6", style: { margin: "43px 43px 30px 43px", padding: "20px", border: "3px solid", backgroundColor: "aliceblue" } },
                        MiniReact.createElement(
                            "div",
                            { class: "form-row" },
                            MiniReact.createElement(
                                "span",
                                { style: { margin: "0 10px 0 0" } },
                                "Changer le theme du site : "
                            ),
                        ),

                        MiniReact.createElement(Button, {
                            type: "button",
                            title: "Mode Sombre",
                            class: "btn btn-dark w-100 mt-1 mb-2",
                            onClick: () => this.ChangeThemeToDark()
                        }),
                        MiniReact.createElement(Button, {
                            type: "button",
                            title: "Mode Claire",
                            class: "btn btn-secondary w-100",
                            onClick: () => this.ChangeThemeToLight()
                        }),

                    )
                )
            ),
            MiniReact.createElement(Footer)
        );

        this._dom = element;
        return element;
    }
}

export default Setting;
