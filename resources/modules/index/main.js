(async () => {
await new FileLoader("resources/modules/")
  .loadSync("EventEmitter.js", {parent: "body", type: "js"})
  .loadSync("index/moveBackgroundOnSwipe.js", {parent: "body", type: "js"})
  .loadSync("swipe/SwipeHelperElement.js", {parent: "body", type: "js"})
  .loadSync("index/arrangeElements/arrangeElements.js", {parent: "body", type: "js"})
  .whenQueueEnd;


})();
