

class SwipeHelperElement {
  constructor(swipeManager){
    this.node = this.#initNode();
    swipeManager.once("end", () => this.remove());
  }

  #initNode(){
    const node = document.createElement("object");
    node.setAttribute("type", "image/svg+xml");
    node.setAttribute("data", `${ this.constructor.MODULE_PATH }/swipe.svg`);
    node.className = "swiper-helper-element swipe--swipe-svg-object";

    return node;
  }

  async remove(){
    this.node.classList.add("remove");
    await new Promise(resolve => setTimeout(resolve, 300));
    this.node.remove();
    delete this.node;
  }

  static MODULE_PATH = "resources/modules/swipe";
}

new FileLoader(SwipeHelperElement.MODULE_PATH).loadAsync("/swipe.css", {parent: "head", type: "css"});
