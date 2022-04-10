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
    const distance = this.constructor.getDistance(pointerEvent, preveousPosition);
    const angle = this.constructor.getAngle(pointerEvent, preveousPosition);
    this.emit("swipe", {distance, angle, target});
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
        const startsPosition = {x: pointerEvent.x, y: pointerEvent.y, pointerEvent};
        let lastPosition = {...startsPosition};
        let preveousPosition;

        this.emit("starts", {startsPosition, target});

        const onMove = (pointerEvent) => {
          const currentPosition = {
            x: pointerEvent.x,
            y: pointerEvent.y,
            pointerEvent
          }

          preveousPosition = lastPosition;
          this.pointerMoveHandler.call(this, preveousPosition, pointerEvent, target);
          this.emit("move", {position: preveousPosition, target, pointerEvent});

          preveousPosition = lastPosition;
          lastPosition = currentPosition;
        }
        const whenPointerUp = new Promise(resolve => document.addEventListener("pointerup", resolve, {once: true}));
        target.addEventListener("pointermove", onMove);

        const pointerUpEvent = await whenPointerUp;
        target.removeEventListener("pointermove", onMove);
        this.emit("end", {preveousPosition, pointerUpEvent, target});
      }
    },
    "selfend": {
      description: "registers a layer toss",
      target: function(){
        return this;
      },
      setHandler:    (target, callback) => target.on("end", callback),
      removeHandler: (target, callback) => target.removeListener("end", callback),
      callback: async function({preveousPosition, pointerUpEvent, target}){
        const timeSlice = performance.now() - preveousPosition.pointerEvent.timeStamp;
        if (timeSlice > 100)
          return;

        let tossBreak = false;
        this.once("starts", () => tossBreak = true);

        const distance = this.constructor.getDistance(pointerUpEvent, preveousPosition);
        const angle = this.constructor.getAngle(pointerUpEvent, preveousPosition);
        let force = distance;


        while (force > 1){
          if (tossBreak === true)
            break;

          const SPEED_MULTIPLAYER = 0.05;
          const FORCE_MULTIPLAYER = 5;

          const speed = force / (1 / SPEED_MULTIPLAYER);
          force -= speed;
          const currentForce = speed * FORCE_MULTIPLAYER;

          await new Promise(resolve => setTimeout(resolve, 10));
          this.emit("swipe", {distance: currentForce, angle, target});
        }

      }
    }

  };

  static getDistance(vector, vector2){
    return ((vector.x - vector2.x) ** 2 + (vector.y - vector2.y) ** 2) ** 0.5;
  }

  static getAngle(vector, vector2){
    return Math.atan2((vector.x - vector2.x), -(vector.y - vector2.y)) - Math.PI / 2;
  }
}
