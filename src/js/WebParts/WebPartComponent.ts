import * as ReactDOM from "react-dom";

export default class WebPartComponent {
    public name: string;
    public container: string;
    public component: JSX.Element;

    /**
     * Constructor
     *
     * @param {string} name Component name
     * @param {string} container Component container
     * @param {JSX.Element} component Component instance
     */
    constructor(name: string, container: string, component: JSX.Element) {
        this.name = name;
        this.container = container;
        this.component = component;
    }

    /**
     * Renders the component if the specified container element exists
     */
    public renderOnPage(): boolean {
        if (document.getElementById(this.container) !== null) {
            ReactDOM.render(this.component, document.getElementById(this.container));
            return true;
        }
        return false;
    }
}
