class PageTopSection {
  constructor(){
    this.node = document.createElement("section");
    this.node.className = "arrangeElement arrangeElement--page-top-section--section";
    this.node.innerHTML = this.constructor.innerHTML;

  }

  static innerHTML = `
    <div onclick = "alert('Представьте, что Вы телепортируетесь отсюда, из этого *ужасного* места')" class = "page-top-section--teleport">Телепорт</div>
    <a href = "https://github.com/zoodogood/clinic" class = "page-top-section--github-link">GitHub™</a>
    <span class = "page-top-section--control-warning">Осторожно, на сайте ужасное управление</span>
  `;
}
