(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
class WebRenderer {
  async render(dom, container) {
    throw new Error("Not implemented");
  }
}
class BrowserRenderer extends WebRenderer {
  #templateParser;
  #pageBuilder;
  constructor({ templateParser: templateParser2, pageBuilder }) {
    super();
    this.#templateParser = templateParser2;
    this.#pageBuilder = pageBuilder;
  }
  async render(container) {
    const template = await this.#pageBuilder.build();
    const dom = this.#templateParser.toDOM(template);
    container.appendChild(dom);
    await this.#pageBuilder.afterRender(container);
    return container;
  }
}
class CacheControl {
  async get(key) {
    throw new Error("Not implemented");
  }
  async set(key, value) {
    throw new Error("Not implemented");
  }
  async has(key) {
    throw new Error("Not implemented");
  }
  async delete(key) {
    throw new Error("Not implemented");
  }
  async clear() {
    throw new Error("Not implemented");
  }
}
class RuntimeCacheControl extends CacheControl {
  #cache = /* @__PURE__ */ new Map();
  get(key) {
    return this.#cache.get(key);
  }
  set(key, value) {
    this.#cache.set(key, value);
  }
  has(key) {
    return this.#cache.has(key);
  }
  delete(key) {
    return this.#cache.delete(key);
  }
  clear() {
    this.#cache.clear();
  }
}
class SourceLoader {
  async load(url, afterLoad) {
    throw new Error("Not implemented");
  }
}
class FetchSourceLoader extends SourceLoader {
  #callbackQueues = /* @__PURE__ */ new Map();
  #cacheControl;
  constructor({ cacheControl: cacheControl2 }) {
    super();
    if (!cacheControl2) {
      console.error("FetchSourceLoader requires a cacheControl instance");
    }
    this.#cacheControl = cacheControl2;
  }
  async load(url, afterLoad) {
    if (this.#cacheControl.has(url)) {
      const content = this.#cacheControl.get(url);
      afterLoad(content);
      return content;
    }
    this.#addCallbackQueue(url, afterLoad);
    return await this.#promise(url);
  }
  #safeFetch(response) {
    if (response.ok) {
      return response.text();
    } else {
      return null;
    }
  }
  #addCallbackQueue(url, callback) {
    if (!this.#callbackQueues.has(url)) {
      this.#callbackQueues.set(url, {
        promise: fetch(url).then(this.#safeFetch),
        callbacks: []
      });
    }
    if (callback) {
      this.#callbackQueues.get(url).callbacks.push(callback);
    }
  }
  async #promise(path) {
    const queue = this.#callbackQueues.get(path);
    const content = await queue.promise;
    if (!this.#cacheControl.has(path)) {
      this.#cacheControl.set(path, content);
      for (const callback of queue.callbacks) {
        callback(content);
      }
      this.#callbackQueues.delete(path);
    }
    return content;
  }
}
class TemplateParser {
  async toDOM(template) {
    throw new Error("Not implemented");
  }
}
class HTMLParser extends TemplateParser {
  toDOM(html) {
    const clone = document.createElement("template");
    clone.innerHTML = html;
    return clone.content.cloneNode(true);
  }
}
class DataPersistence {
  async create(entity, data) {
    throw new Error("Not implemented");
  }
  async read(entity, id) {
    throw new Error("Not implemented");
  }
  async update(entity, data) {
    throw new Error("Not implemented");
  }
  async delete(entity, id) {
    throw new Error("Not implemented");
  }
  async all(entity) {
    throw new Error("Not implemented");
  }
}
class RuntimePersistence extends DataPersistence {
  #db = /* @__PURE__ */ new Map();
  create(entity, data) {
    if (!this.#db.has(entity)) {
      this.#db.set(entity, /* @__PURE__ */ new Map());
    }
    this.#db.get(entity).set(data.id, data);
  }
  read(entity, id) {
    return this.#db.get(entity).get(id);
  }
  update(entity, data) {
    this.#db.get(entity).set(data.id, data);
  }
  delete(entity, id) {
    this.#db.get(entity).delete(id);
  }
  all(entity) {
    return this.#db.get(entity);
  }
}
const cacheControl = new RuntimeCacheControl();
const sourceLoader = new FetchSourceLoader({ cacheControl });
const templateParser = new HTMLParser();
const dataPersistence = new RuntimePersistence();
class PageBuilder {
  async build() {
    throw new Error("Not implemented");
  }
  async afterRender() {
    throw new Error("Not implemented");
  }
}
class CardEntity {
  #title;
  #creation;
  #target;
  #tag;
  #priority;
  #user;
  #size;
  constructor(props) {
    this.#title = props.title;
    this.#creation = props.creation;
    this.#target = props.target;
    this.#tag = props.tag;
    this.#priority = props.priority;
    this.#user = props.user;
    this.#size = props.size;
  }
  getTitle() {
    return this.#title;
  }
  getCreation() {
    return this.#creation;
  }
  getTarget() {
    return this.#target;
  }
  getTag() {
    return this.#tag;
  }
  getPriority() {
    return this.#priority;
  }
  getUser() {
    return this.#user;
  }
  getSize() {
    return this.#size;
  }
}
class CardRepository {
  #dataPersistence;
  constructor({ dataPersistence: dataPersistence2 }) {
    this.#dataPersistence = dataPersistence2;
  }
  async save(type, card) {
    const storage = await this.#dataPersistence.all(type);
    const hasItem = storage?.has(card.id);
    if (hasItem) {
      this.#dataPersistence.update(type, card);
    } else {
      this.#dataPersistence.create(type, card);
    }
  }
  async getAll() {
    return Object.fromEntries([
      "cardsToPlan",
      "cardsToDo",
      "cardsToDoing",
      "cardsToDone"
    ].map((type) => {
      return [type, this.#dataPersistence.all(type)];
    }));
  }
}
class CardService {
  #repository;
  constructor({ dataPersistence: dataPersistence2 }) {
    this.#repository = new CardRepository({ dataPersistence: dataPersistence2 });
  }
  createElement(tagName, props) {
    const element = document.createElement(tagName);
    const entity = new CardEntity(props);
    element.setAttribute("title", entity.getTitle());
    element.setAttribute("creation", entity.getCreation());
    element.setAttribute("target", entity.getTarget());
    element.setAttribute("tag", entity.getTag());
    element.setAttribute("priority", entity.getPriority());
    element.setAttribute("user", entity.getUser());
    element.setAttribute("size", entity.getSize());
    return element;
  }
  generateRandomProps() {
    const now = (/* @__PURE__ */ new Date()).getTime();
    const beforeNow = new Date(2025, 0, 1).getTime();
    const afterNow = new Date(2025, 11, 1).getTime();
    const randomCreation = new Date(Math.floor(Math.random() * (beforeNow - now + 1)) + now);
    const randomTarget = new Date(Math.floor(Math.random() * (now - afterNow + 1)) + afterNow);
    return {
      title: `Card ${Math.floor(Math.random() * 1e3)}`,
      creation: randomCreation.toISOString().split("T")[0],
      target: randomTarget.toISOString().split("T")[0],
      tag: `Tag ${Math.floor(Math.random() * 10)}`,
      priority: Math.floor(Math.random() * 5) + 1,
      user: Math.floor(Math.random() * 10) % 2 === 0 ? "Duran" : "Bia",
      size: Math.floor(Math.random() * 10)
    };
  }
  persist(type, card) {
    this.#repository.save(type, card);
  }
  async getStorage() {
    return await this.#repository.getAll();
  }
}
let HomeBuilder$1 = class HomeBuilder extends PageBuilder {
  #templateUrl = new URL("/homanager/assets/home-CMe6XGZC.html", import.meta.url);
  #sourceLoader;
  #data;
  #DOMHandler;
  #handlers;
  #cardService;
  constructor({ sourceLoader: sourceLoader2, data, DOMHandler: DOMHandler2, dataPersistence: dataPersistence2 }) {
    super();
    this.#sourceLoader = sourceLoader2;
    this.#data = data;
    this.#DOMHandler = DOMHandler2;
    this.#cardService = new CardService({ dataPersistence: dataPersistence2 });
  }
  async build() {
    return await this.#sourceLoader.load(this.#templateUrl);
  }
  async afterRender(dom) {
    this.#DOMHandler.build(dom);
    this.#handlers = this.#DOMHandler.export();
    const data = this.#data?.getData();
    await this.#populate(data);
    await this.#renderCards(data);
  }
  async #populate(data) {
    for (const type in data) {
      data[type].forEach(async (card) => {
        card.id = card.title;
        await this.#cardService.persist(type, card);
      });
    }
  }
  async #renderCards() {
    const storage = await this.#cardService.getStorage();
    console.log(storage);
    for (const type in storage) {
      const cards = await storage[type];
      cards.forEach((cardProps) => {
      });
    }
  }
};
class DOMHandler {
  async build(dom) {
    throw new Error("Not implemented");
  }
  async export() {
    throw new Error("Not implemented");
  }
}
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/homanager/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    let allSettled = function(promises$2) {
      return Promise.all(promises$2.map((p$1) => Promise.resolve(p$1).then((value$1) => ({
        status: "fulfilled",
        value: value$1
      }), (reason) => ({
        status: "rejected",
        reason
      }))));
    };
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
    promise = allSettled(deps.map((dep) => {
      dep = assetsURL(dep);
      if (dep in seen) return;
      seen[dep] = true;
      const isCss = dep.endsWith(".css");
      const cssSelector = isCss ? '[rel="stylesheet"]' : "";
      if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) return;
      const link = document.createElement("link");
      link.rel = isCss ? "stylesheet" : scriptRel;
      if (!isCss) link.as = "script";
      link.crossOrigin = "";
      link.href = dep;
      if (cspNonce) link.setAttribute("nonce", cspNonce);
      document.head.appendChild(link);
      if (isCss) return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
      });
    }));
  }
  function handlePreloadError(err$2) {
    const e$1 = new Event("vite:preloadError", { cancelable: true });
    e$1.payload = err$2;
    window.dispatchEvent(e$1);
    if (!e$1.defaultPrevented) throw err$2;
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
class sCache {
  static #cache = /* @__PURE__ */ new Map();
  static get(key) {
    return this.#cache.get(key);
  }
  static set(key, value) {
    this.#cache.set(key, value);
  }
  static has(key) {
    return this.#cache.has(key);
  }
  static delete(key) {
    return this.#cache.delete(key);
  }
  static clear() {
    this.#cache.clear();
  }
}
class sFetch {
  static #callbackQueues = /* @__PURE__ */ new Map();
  static #viteFiles = /* @__PURE__ */ Object.assign({ "/src/interface/components/add-form/template.html": () => __vitePreload(() => import("./template-CCjc7kbs.js"), true ? [] : void 0).then((m) => m["default"]), "/src/interface/components/card/template.html": () => __vitePreload(() => import("./template-DR594Duu.js"), true ? [] : void 0).then((m) => m["default"]), "/src/interface/components/icon-bar/template.html": () => __vitePreload(() => import("./template-CPoHQs4n.js"), true ? [] : void 0).then((m) => m["default"]) });
  static async file(url, afterLoad) {
    const path = `${url.pathname}${url.search}`;
    if (sCache.has(path)) {
      afterLoad(sCache.get(path));
      return;
    }
    await this.addCallbackQueue(path, afterLoad);
    await this.#promise(path);
  }
  static #safeFetch(response) {
    if (response.ok) {
      return response.text();
    } else {
      return null;
    }
  }
  static async addCallbackQueue(path, callback) {
    if (!this.#callbackQueues.has(path)) {
      const entries = Object.entries(this.#viteFiles);
      const entry = entries.find(([key]) => {
        const normalizedKey = key.replace(/\\/g, "/");
        return path.endsWith(normalizedKey);
      }) || [];
      const resolver = entry[1];
      const resolvedUrl = resolver ? await resolver() : path;
      console.log(resolvedUrl);
      this.#callbackQueues.set(path, {
        promise: fetch(resolvedUrl).then(this.#safeFetch),
        callbacks: []
      });
    }
    this.#callbackQueues.get(path).callbacks.push(callback);
  }
  static async #promise(path) {
    const queue = this.#callbackQueues.get(path);
    const content = await queue.promise;
    if (!sCache.has(path)) {
      sCache.set(path, content);
      for (const callback of queue.callbacks) {
        callback(content);
      }
      this.#callbackQueues.delete(path);
    }
  }
}
class wComponent extends HTMLElement {
  #style;
  #template;
  #dom;
  #slot;
  #props;
  #moduleUrl;
  #build;
  constructor(build, moduleUrl) {
    if (!build || typeof build !== "function") {
      throw new Error("A build function must be provided to the component constructor.");
    }
    super();
    this.attachShadow({ mode: "open" });
    this.#style = document.createElement("style");
    this.#dom = document.createElement("div");
    this.#slot = document.createElement("slot");
    this.#build = build;
    this.#moduleUrl = moduleUrl;
  }
  connectedCallback() {
    if (this.#moduleUrl) {
      this.#importStyle();
    }
    this.#build(this);
    this.shadowRoot.append(this.#style, this.#dom);
  }
  #importStyle() {
    const loadCss = (css) => {
      this.setStyle(css);
    };
    sFetch.file(new URL("./style.css?raw", this.#moduleUrl), loadCss);
  }
  async #importTemplate() {
    const loadTemplate = (html) => {
      this.#template = html;
    };
    await sFetch.file(new URL("./template.html", this.#moduleUrl), loadTemplate);
  }
  setStyle(style) {
    this.#style.textContent = style;
  }
  append(element) {
    this.#dom.appendChild(element);
  }
  setClass(className) {
    this.#dom.classList.add(className);
  }
  getContent() {
    return this.#slot;
  }
  getDOM() {
    return this.#dom;
  }
  setProps(props) {
    if (typeof props !== "object") {
      throw new Error("Props must be an object.");
    }
    this.#props = props;
  }
  async useTemplate(props = {}) {
    if (!this.#template) {
      await this.#importTemplate();
    }
    this.setProps(props);
    const clone = document.createElement("template");
    clone.innerHTML = this.#props ? this.#template.replace(/{{(.*?)}}/g, (_, key) => this.#props[key.trim()] || "").trim() : this.#template;
    this.append(clone.content.cloneNode(true));
    return this.#dom;
  }
}
class oScreen extends wComponent {
  constructor() {
    super((component) => {
      const elTrack = document.createElement("div");
      component.setStyle(`
                #viewport {
                    --padding: var(--xl-number);

                    width: 100vw;
                    height: 100vh;
                    box-sizing: border-box;
                    overflow: hidden;
                    touch-action: none;
                    scroll-behavior: smooth;
                    background-color: var(--white);

                    & .track {
                        width: calc((100vw * var(--thread-number)));
                        height: 100%;
                        display: flex;
                    }
                }
            `);
      elTrack.classList.add("track");
      elTrack.appendChild(component.getContent());
      component.getDOM().setAttribute("id", "viewport");
      component.append(elTrack);
    });
  }
}
class oThread extends wComponent {
  constructor() {
    super((component) => {
      const elDom = component.getDOM();
      let lastTouch = 0;
      const onWheel = (event) => {
        elDom.style.scrollBehavior = "unset";
        elDom.scrollTo({
          top: Math.max(0, elDom.scrollTop + event.deltaY)
        });
        elDom.style.scrollBehavior = "smooth";
      };
      const onTouchStart = (event) => {
        lastTouch = event.touches[0].clientY;
      };
      const onTouchEnd = (event) => {
        lastTouch = 0;
      };
      const onTouchMove = (event) => {
        const currentTouch = event.touches[0].clientY;
        elDom.style.scrollBehavior = "unset";
        elDom.scrollTo({
          top: Math.max(0, elDom.scrollTop + (lastTouch - currentTouch))
        });
        elDom.style.scrollBehavior = "smooth";
        lastTouch = currentTouch;
      };
      component.setStyle(`
                .thread {
                    width: 100vw;
                    height: 100%;
                    overflow: hidden;
                    scroll-behavior: smooth;
                }
            `);
      component.setClass("thread");
      component.append(component.getContent());
      elDom.addEventListener("wheel", onWheel);
      elDom.addEventListener("touchstart", onTouchStart);
      elDom.addEventListener("touchend", onTouchEnd);
      elDom.addEventListener("touchmove", onTouchMove);
    });
  }
}
class oContainer extends wComponent {
  constructor() {
    super((component) => {
      const name = component.getAttribute("name");
      component.setStyle(`
                .container {
                    padding: var(--padding);
                    margin-bottom: var(--footer-size);
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                }
            `);
      name && component.setAttribute("id", name);
      component.setClass("container");
      component.append(component.getContent());
    });
  }
}
class oWrapper extends wComponent {
  constructor() {
    super((component) => {
      const title = component.getAttribute("title");
      const elHeader = document.createElement("header");
      const elTitle = document.createElement("h1");
      component.setStyle(`
                .wrapper {
					width: 100%;
					margin: var(--padding) 0;

                    & h1 {
                        margin: 0;
                        text-transform: capitalize;
                    }
				}
            `);
      if (title) {
        elTitle.textContent = title;
        elHeader.appendChild(elTitle);
        component.append(elHeader);
      }
      component.setClass("wrapper");
      component.append(component.getContent());
    });
  }
}
class wcIconBar extends wComponent {
  constructor() {
    super(async (component) => {
      component.setClass("icon-bar");
      const dom = await component.useTemplate();
      dom.querySelectorAll("li[link]").forEach((element) => {
        element.addEventListener("click", (event) => {
          scroll(event, element.getAttribute("link"));
        });
      });
    }, import.meta.url);
  }
}
function scroll(event, id) {
  event.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest"
    });
  }
}
class wcAddForm extends wComponent {
  constructor() {
    super(async (component) => {
      component.setClass("add-form");
      const dom = await component.useTemplate();
      const form = dom.querySelector("form");
      form.addEventListener("submit", (event) => {
        const fieldToValidate = form.querySelectorAll("[aria-required=true]");
        for (const field of fieldToValidate) {
          field.classList.toggle("invalid", field.matches(":invalid"));
        }
        if (form.querySelectorAll(".invalid").length) {
          event.preventDefault();
        }
      });
    }, import.meta.url);
  }
}
class wcCard extends wComponent {
  constructor() {
    super(async (component) => {
      component.setClass("card");
      const dom = await component.useTemplate({
        title: component.getAttribute("title"),
        creation: component.getAttribute("creation"),
        target: component.getAttribute("target"),
        tag: component.getAttribute("tag"),
        priority: component.getAttribute("priority"),
        user: component.getAttribute("user"),
        size: component.getAttribute("size")
      });
      const elTitle = dom.querySelectorAll("p")[0];
      const elOpenButton = dom.querySelectorAll(".button")[0];
      const elPlayButton = dom.querySelectorAll(".button")[1];
      elOpenButton.addEventListener("click", () => {
        console.log(`Open ${elTitle.textContent} clicked`);
      });
      elPlayButton.addEventListener("click", () => {
        console.log(`Play ${elTitle.textContent} clicked`);
      });
    }, import.meta.url);
  }
}
let HomeHandler$1 = class HomeHandler extends DOMHandler {
  #elements = {};
  build(dom) {
    const components = {
      "wc-screen": oScreen,
      "wc-thread": oThread,
      "wc-container": oContainer,
      "wc-wrapper": oWrapper,
      "wc-icon-bar": wcIconBar,
      "wc-add-form": wcAddForm,
      "wc-card": wcCard
    };
    for (const tagName in components) {
      const component = components[tagName];
      customElements.get(tagName) || customElements.define(tagName, component);
    }
    const elWrappers = dom.querySelectorAll("wc-wrapper");
    this.#elements.wrapper = {
      "plan": elWrappers[1],
      "do": elWrappers[2],
      "doing": elWrappers[3],
      "done": elWrappers[4]
    };
  }
  export() {
    return {
      addCard: this.#addCard.bind(this),
      getCards: this.#getCards.bind(this)
    };
  }
  #addCard(type, card) {
    this.#elements.wrapper[type].appendChild(card);
  }
  #getCards(type) {
    return this.#elements.wrapper[type].querySelectorAll("wc-card");
  }
};
class HomeData {
  #cardsToPlan;
  #cardsToDo;
  #cardsToDoing;
  #cardsToDone;
  constructor({ cardsToPlan, cardsToDo, cardsToDoing, cardsToDone } = {}) {
    this.#cardsToPlan = cardsToPlan || [];
    this.#cardsToDo = cardsToDo || [];
    this.#cardsToDoing = cardsToDoing || [];
    this.#cardsToDone = cardsToDone || [];
  }
  getData() {
    return {
      cardsToPlan: this.#cardsToPlan,
      cardsToDo: this.#cardsToDo,
      cardsToDoing: this.#cardsToDoing,
      cardsToDone: this.#cardsToDone
    };
  }
}
const cardService = new CardService({
  dataPersistence: new RuntimePersistence()
});
const DataMock = new HomeData({
  cardsToPlan: [
    cardService.generateRandomProps(),
    cardService.generateRandomProps()
  ],
  cardsToDo: [
    cardService.generateRandomProps(),
    cardService.generateRandomProps(),
    cardService.generateRandomProps(),
    cardService.generateRandomProps(),
    cardService.generateRandomProps()
  ],
  cardsToDoing: [
    cardService.generateRandomProps()
  ],
  cardsToDone: [
    cardService.generateRandomProps(),
    cardService.generateRandomProps(),
    cardService.generateRandomProps()
  ]
});
const HomeHandler2 = new HomeHandler$1();
const HomeDataMock = DataMock;
const HomeBuilder2 = (dependencies) => {
  const defaultDependencies = {
    data: HomeDataMock,
    DOMHandler: HomeHandler2
  };
  return new HomeBuilder$1({
    ...defaultDependencies,
    ...dependencies
  });
};
document.addEventListener("DOMContentLoaded", async () => {
  const controller = new BrowserRenderer({
    templateParser,
    pageBuilder: HomeBuilder2({ sourceLoader, dataPersistence })
  });
  await controller.render(document.body);
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/homanager/service-worker.js").then((reg) => {
      console.log("Service worker registered.", reg);
    });
  }
});
