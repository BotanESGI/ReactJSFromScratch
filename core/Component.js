import { MiniReact, MiniReactDom } from "./MiniReact.js";

export default class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
    this._dom = null;
    this.instanceKeyCounter = 0;

    this.render = this.render.bind(this);
  }


  generateUniqueKey() {
    const currentTime = Date.now();
    return Symbol.for(
        `__uniqueKey_${this.constructor.name}_${currentTime}_${this
            .instanceKeyCounter++}`
    );
  }


  setState(newState) {
    this._pendingState = { ...this.state, ...newState };
    MiniReactDom.scheduleUpdate(this);
  }


  _update() {
    const oldElement = this._dom;

    this.state = this._pendingState;
    this._pendingState = null;

    let newElement = this.render();

    MiniReactDom.updateElement(oldElement, newElement);
  }

  componentDidMount() {}

  render() {}
}