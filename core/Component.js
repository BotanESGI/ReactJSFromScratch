import { MiniReact, MiniReactDom } from "./MiniReact.js";

export default class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
    this._dom = null;
    this.instanceKeyCounter = 0;

    this.render = this.render.bind(this);
  }

  /**
   *
   * @returns A unique identifier that is used to track instances
   */
  generateUniqueKey() {
    const currentTime = Date.now();
    return Symbol.for(
        `__uniqueKey_${this.constructor.name}_${currentTime}_${this
            .instanceKeyCounter++}`
    );
  }

  /**
   * This method is called to set the new state of the component
   *
   * @param {Object} newState - the new state
   */
  setState(newState) {
    this._pendingState = { ...this.state, ...newState };
    MiniReactDom.scheduleUpdate(this);
  }

  /**
   * This method is called to apply the updates to the component
   */
  _update() {
    const oldElement = this._dom;

    this.state = this._pendingState;
    this._pendingState = null;

    let newElement = this.render();

    MiniReactDom.updateElement(oldElement, newElement);
  }

  _domRef() {
    return MiniReactDom.elementReferences.get(this._dom);
  }

  componentDidMount() {}

  render() {}
}