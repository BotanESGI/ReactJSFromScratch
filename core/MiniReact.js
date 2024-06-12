import BrowserRouter from "./BrowserRouter.js";
import Component from "./Component.js";

const MiniReactDom = {
  parentReferences: new Map(),
  elementReferences: new Map(),
  scheduledUpdates: [],

  render: function (rootElement, routes) {
    const router = new BrowserRouter(routes, rootElement);

    const oldPushState = history.pushState;
    history.pushState = function (state, title, url) {
      oldPushState.call(history, state, title, url);
      window.dispatchEvent(new Event("popstate"));
    };

    window.onpopstate = this;
  },

  generateStructure: function generateDom(structure, parent) {
    let element;

    if (typeof structure.type === "string") {
      if (structure.type === "TEXT_NODE") {
        return document.createTextNode(structure.content);
      }
      element = document.createElement(structure.type);
    }
    if (structure.props) {
      for (const propName in structure.props) {
        if (propName === "style") {
          Object.assign(element.style, structure.props[propName]);
        } else if (propName.startsWith("data-")) {
          element.dataset[propName.replace("data-", "")] =
              structure.props[propName];
        } else if (propName === "events") {
          for (const eventName in structure.props[propName]) {
            element.addEventListener(
                eventName,
                structure.props[propName][eventName]
            );
          }
        } else {
          element.setAttribute(propName, structure.props[propName]);
        }
      }
    }

    if (structure.children) {
      for (const child of structure.children) {
        if (child !== null) {
          const childDOM = this.generateStructure(child, element);
          MiniReactDom.elementReferences.set(child, childDOM);
          element.appendChild(childDOM);
        }
      }
    }
    MiniReactDom.elementReferences.set(structure, element);
    MiniReactDom.parentReferences.set(structure, parent);

    return element;
  },

  diff: function (oldTree, newTree) {
    if (oldTree === null || newTree === null) {
      return;
    }

    if (oldTree.type !== newTree.type) {
      return true;
    }

    if (oldTree.props && newTree.props) {
      const oldProps = Object.keys(oldTree.props);
      const newProps = Object.keys(newTree.props);

      if (oldProps.length !== newProps.length) {
        return true;
      }

      for (let i = 0; i < oldProps.length; i++) {
        const propName = oldProps[i];
        if (oldTree.props[propName] !== newTree.props[propName]) {
          return true;
        }
      }
    }

    if (oldTree.children && newTree.children) {
      if (oldTree.children.length !== newTree.children.length) {
        return true;
      }

      for (let i = 0; i < oldTree.children.length; i++) {
        const oldChild = oldTree.children[i];
        const newChild = newTree.children[i];

        if (oldChild.type === "TEXT_NODE" && newChild.type === "TEXT_NODE") {
          if (oldChild.content !== newChild.content) {
            return true;
          }
        } else {
          if (MiniReactDom.diff(oldChild, newChild)) {
            return true;
          }
        }
      }
    }

    return false;
  },

  flushScheduledUpdates: function () {
    MiniReactDom.scheduledUpdates.forEach((component) => {
      component._update();
    });
    MiniReactDom.scheduledUpdates = [];
  },

  scheduleUpdate: function (component) {
    MiniReactDom.scheduledUpdates.push(component);
    setTimeout(MiniReactDom.flushScheduledUpdates, 0);
  },

  updateElement: function (oldElement, newElement) {
    const hasChanges = MiniReactDom.diff(oldElement, newElement);

    let parent = MiniReactDom.parentReferences.get(oldElement);
    let oldElementDom = MiniReactDom.elementReferences.get(oldElement);
    let newElementDom = MiniReactDom.generateStructure(newElement, parent);
    const isChild = parent.contains(oldElementDom);

    if (hasChanges) {
      if (isChild) {
        parent.replaceChild(newElementDom, oldElementDom);

        MiniReactDom.parentReferences.set(newElement, parent);
        MiniReactDom.elementReferences.set(newElement, newElementDom);
      }
    }
  },
};

const MiniReact = {
  componentInstancesReference: new Map(),
  componentPropsRefecence: new Map(),
  instanceKeyCounter: 0,

  generateUniqueKey: () => {
    return Symbol(`__uniqueKey_${MiniReact.instanceKeyCounter++}`);
  },

  createElement: (type, props = {}, ...children) => {
    MiniReact.counter = 0;
    const processedChildren = children.map((child) =>
        typeof child === "object" ? child : MiniReact.createTextElement(child)
    );

    if (type.prototype instanceof Component) {
      const key = props.key || MiniReact.generateUniqueKey();
      let instance = MiniReact.componentInstancesReference.get(key);
      let oldProps = MiniReact.componentPropsRefecence.get(key);

      if (!instance) {
        instance = new type({ ...props, key, children: processedChildren });
        MiniReact.componentInstancesReference.set(key, instance);
        MiniReact.componentPropsRefecence.set(key, props);
      } else if (JSON.stringify(oldProps) !== JSON.stringify(props)) {
        instance.props = { ...props, children: processedChildren };
        MiniReact.componentPropsRefecence.set(key, instance.props);
      }

      if (typeof instance.componentDidMount === "function") {
        instance.componentDidMount();
      }

      return instance.render();
    } else if (typeof type === "function") {
      return type({ ...props, children: processedChildren });
    } else {
      return {
        type,
        children: processedChildren,
        props: { ...props },
      };
    }
  },

  createTextElement: (text) => {
    return {
      type: "TEXT_NODE",
      content: text,
    };
  },

  cleanupUnusedInstances: (domContent) => {
    for (const [key, instance] of MiniReact.componentInstancesReference) {
      const elementStructure = instance._dom;
      const domElement = MiniReactDom.elementReferences.get(elementStructure);

      if (domElement && domContent.contains(domElement)) {
        return;
      } else {
        MiniReact.componentInstancesReference.delete(key);
        MiniReact.componentPropsRefecence.delete(key);
      }
    }
  },
};

export { MiniReact, MiniReactDom };