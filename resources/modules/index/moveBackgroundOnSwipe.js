(async () => {
let whenLoadResolve;
const whenLoad = new Promise(resolve => whenLoadResolve = resolve);
globalThis.moveBackgroundOnSwipe = {
  whenLoad
};


await new FileLoader("resources/modules/")
  .loadSync("swipe/SwipeManager.js", {parent: "body", type: "js"})
  .whenQueueEnd;

const swipeManager = new SwipeManager({targetSelector: "#global--bodyLayer-container"});
swipeManager.on("swipe", ({ angle, distance, target }) => {
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;

  const current = {
    left: parseInt(target.style.left || 0),
    top:  parseInt(target.style.top  || 0)
  };

  target.style.left = `${ current.left + x }px`;
  target.style.top  = `${ current.top  + y }px`;
});

swipeManager.on("end", ({ target }) => {
  const {width, height} = target.getBoundingClientRect();

  if (parseInt(target.style.left) > width / 2)
    target.style.left = `${ width / 2 }px`;

  if (parseInt(target.style.top) > height / 2)
    target.style.top  = `${ height / 2 }px`;

  if (parseInt(target.style.left) < -width / 2)
    target.style.left = `${ -width / 2 }px`;

  if (parseInt(target.style.top) < -height / 2)
    target.style.top = `${ -height / 2 }px`;
});


globalThis.moveBackgroundOnSwipe.swipeManager = swipeManager;
whenLoadResolve();
})();
