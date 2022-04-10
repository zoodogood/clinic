class PageTitle {
  constructor(){
    this.node = document.createElement("section");
    this.node.className = "arrangeElement arrangeElement--page-title--section";

    const contents = this.constructor.TEXT_CONTENTS;
    this.node.innerHTML = `
      <p>${ contents.title }</p>
      <main>${ contents.description }</main>
    `;

    this.#addSwipeHelper();
  }

  async #addSwipeHelper(){
    await globalThis.moveBackgroundOnSwipe.whenLoad;
    const swipeHelper = new SwipeHelperElement(globalThis.moveBackgroundOnSwipe.swipeManager);
    this.node.append(swipeHelper.node);
  }

  static TEXT_CONTENTS = {
    title: "Наше кафе-парикмахерская-больница-нечто-ветеренарная клиника открылась!",
    description: `
      Это место, в которое попадают животные. Для этого не нужно записываться, просто выпейте наше кофе! Оно вкусное!
      *Используйте свайп или потяните экран с помощью мыши*
    `,
  };
}
