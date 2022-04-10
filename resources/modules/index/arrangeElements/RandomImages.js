class RandomImages {
  constructor(layer){
    const {limitX, limitY} = this.constructor.getLayerLimit(layer);
    this.nodes = this.constructor.IMAGES_PATH
      .map(path => {
        const node = document.createElement("div");
        node.style.setProperty("--background-image", `url(${ path })`);
        return node;
      });

    this.nodes
      .forEach(node => {
        node.className = "arrangeElement arrangeElement--page-random-image--div";
        node.style.left = `${ Math.random() * limitX * 0.8 }px`;
        node.style.top  = `${ Math.random() * limitY * 0.8 }px`;
      });
  }

  static IMAGES_PATH = ["../../../images/people.png", "../../../images/wolf.png", "../../../images/foxy.png"];

  static getLayerLimit(layer){
    const source = getComputedStyle(layer);

    const limitX = parseInt(source.getPropertyValue("--width-limit"));
    const limitY = parseInt(source.getPropertyValue("--height-limit"));
    return {limitX, limitY};
  };
}
