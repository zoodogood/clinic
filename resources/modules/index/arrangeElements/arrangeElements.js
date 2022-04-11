(async () => {
const containerNode = document.querySelector("#global--bodyLayer");

await new FileLoader("resources/modules/index/arrangeElements/")
  .loadAsync("arrangeElements.css", {parent: "head", type: "css"})

  .loadSync("Title.js", {parent: "body", type: "js"})
  .loadAsync("title.css", {parent: "head", type: "css"})

  .loadSync("Form.js", {parent: "body", type: "js"})
  .loadAsync("form.css", {parent: "head", type: "css"})

  .loadSync("TopSection.js", {parent: "body", type: "js"})
  .loadAsync("topSection.css", {parent: "head", type: "css"})

  .loadSync("RandomImages.js", {parent: "body", type: "js"})
  .loadAsync("randomImages.css", {parent: "head", type: "css"})

  .loadSync("RightText.js", {parent: "body", type: "js"})
  .loadAsync("rightText.css", {parent: "head", type: "css"})
  .whenQueueEnd;


const pageTitle = new PageTitle();
containerNode.append(pageTitle.node);

const pageForm = new PageForm();
containerNode.append(pageForm.node);

const pageTopSection = new PageTopSection();
containerNode.append(pageTopSection.node);

const pageRandomImages = new RandomImages(containerNode);
pageRandomImages.nodes.forEach(node => containerNode.append(node));

const pageRightText = new RightText(containerNode);
containerNode.append(pageRightText.node);
})();
