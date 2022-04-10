class PageForm {
  constructor(){
    this.node = document.createElement("form");
    this.node.className = "arrangeElement arrangeElement--page-form--form";

    this.node.innerHTML = this.constructor.innerHTML;
    this.node.style.left = `${ Math.random() * 80 }%`;
  }

  static innerHTML = `
    <p>Необязательная форма</p>
    <select>
      <option hidden value = "none">Кем Вы были при жизни?</option>
      <option value = "people">Человек</option>
    </select>

    <select>
      <option hidden value = "none">Как много Вы украли?</option>
      <option value = "0">Не про меня</option>
      <option value = "1">Были случаи, в детсве по глупости</option>
      <option value = "2">Это был не я!</option>
      <option value = "3">Много</option>
    </select>

    <select>
      <option hidden value = "none">Вы понимаете где сейчас находитесь?</option>
      <option value = "0">В кафе.</option>
      <option value = "1">Это похоже на клинику</option>
      <option value = "2">В раю?</option>
      <option value = "3">В некотором помещении</option>
    </select>

    <textarea placeholder = "Расскажите нам о себе"></textarea>
    <input type = "submit"></input>
  `;
}
