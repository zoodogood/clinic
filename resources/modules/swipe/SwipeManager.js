class SwipeManager extends EventEmitter {
  constructor({targetSelector}){
    super();
    this.nodes = [...document.querySelectorAll(targetSelector)];

    this.#setHandlers();
  }

  #handlers = {};
  #setHandlers(){
    Object.keys(this.constructor.#handlersList)
    .forEach(key => {
      let {target, callback, setHandler} = this.constructor.#handlersList[ key ];

      callback = callback.bind(this);
      if (typeof target === "function")
        target = target.call(this);

      setHandler(target, callback);
      this.#handlers[key] = {target, callback};
    });
  }

  #removeHandlers(){
    Object.keys(this.constructor.#handlers)
    .forEach(key => {
      let {target, callback} = this.constructor.#handlers[ key ];
      const {removeHandler} = this.constructor.#handlersList[ key ];

      removeHandler(target, callback);
      delete this.#handlers[key];
    });
  }

  pointerMoveHandler(preveousPosition, pointerEvent, target){
    const distance = ((pointerEvent.x - preveousPosition.x) ** 2 + (pointerEvent.y - preveousPosition.y) ** 2) ** 0.5;
    const angle = Math.atan2((pointerEvent.x - preveousPosition.x), -(pointerEvent.y - preveousPosition.y)) - Math.PI / 2;
    this.emit("force", {distance, angle, target})
  }

  static #handlersList = {
    "pointerdown":
    {
      description: "registers the down pointer and its dragging",
      target: function(){
        return this.nodes;
      },
      setHandler:    (target, callback) => target.forEach(node => node.addEventListener("pointerdown", callback)),
      removeHandler: (target, callback) => target.forEach(node => node.removeEventListener("pointerdown", callback)),
      callback: async function(pointerEvent){
        const target = pointerEvent.path.find(node => this.nodes.includes(node));
        const startsPosition = {x: pointerEvent.x, y: pointerEvent.y};
        let preveousPosition = {...startsPosition};

        this.emit("starts", {startsPosition, target});

        const onMove = (pointerEvent) => {
          this.pointerMoveHandler.call(this, preveousPosition, pointerEvent, target);
          preveousPosition.x = pointerEvent.x;
          preveousPosition.y = pointerEvent.y;
          this.emit("move", {position: preveousPosition, target});
        }
        const whenPointerUp = new Promise(resolve => document.addEventListener("pointerup", resolve, {once: true}));
        target.addEventListener("pointermove", onMove);

        await whenPointerUp;
        target.removeEventListener("pointermove", onMove);
        this.emit("end", {preveousPosition, target});
      }
    }

  };
}
