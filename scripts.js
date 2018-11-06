const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => { 
  const form = document.querySelector('.form'); 
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items; //items eru ul
    _form.addEventListener('submit', formHandler); 
   
    const itemList= items.querySelectorAll('.item');

    for(let i=0; i<itemList.length;i++){
      const checkbox = itemList[i].querySelector('.item__checkbox');
      const text = itemList[i].querySelector('.item__text');
      const itButton = itemList[i].querySelector('.item__button');

      checkbox.addEventListener('click', finish);
      text.addEventListener('click', edit);
      itButton.addEventListener('click', deleteItem);
    }
    const formButton = document.querySelector('.form__button');
    formButton.addEventListener('click',add);
  }

  function formHandler(e) { 
    e.preventDefault();

   console.log('formHandler');

   /*   Virkni sem hefði átt að stoppa mann í að setja tóma línu
   const{target}=e;
   const{parentNode}=target;
   const inntak=parentNode.querySelector('.form__input');
   if(inntak.value.trim()){
     let some=add(target);
     inntak.value='';
   }
   */
  
}

  // event handler fyrir það að klára færslu
  function finish(e) { //hakið 
    console.log('finish');
    const {target} = e;
    target.parentNode.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    console.log('edit');
    const {target} = e;
    const{textContent, parentNode} = target;

    parentNode.removeChild(target);

   let input= el('input','item__edit');
   input.addEventListener('keyup', commit);
   input.setAttribute('type', 'text');
   input.value = textContent;

   const itButton = parentNode.querySelector('.item__button');
    parentNode.insertBefore(input,itButton); 
  
    input.focus(); //bendillinn á þessu
    
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
  const{target}=e;
  const{parentNode}=target;
  const {keyCode} = e;
  let texti;
 

    if (keyCode=== ENTER_KEYCODE){
      console.log('ENTER WAS PRESSED');
      texti=target.value;
      console.log(texti);

      const span = el('span','item__text',edit);
      
      parentNode.removeChild(target);

      const txt = document.createTextNode(texti)
      span.appendChild(txt);

      let button = parentNode.querySelector('.item__button');
      parentNode.insertBefore(span,button);
    }
}

  // fall sem sér um að bæta við nýju item
  function add(value) {
  console.log('hallo');
   let newStuff= document.querySelector('.form__input').value;
   const newItem = el('li','item',null);
   const newInput = el('input','item__checkbox',finish);
   newInput.setAttribute('type','checkbox') ;
   const newText = el('span','item__text',edit);
   newText.appendChild(document.createTextNode(newStuff));
   const newButton = el('button','item__button',deleteItem)
   newButton.appendChild(document.createTextNode("Eyða"));

   newItem.appendChild(newInput);
   newItem.appendChild(newText);
   newItem.appendChild(newButton);
   console.log(newItem);

   const newUl= document.querySelector('.items');
   newUl.appendChild(newItem);
  
  }

  // event handler til að eyða færslu
function deleteItem(e) {
  const { target }= e;      
  const parent = target.parentNode; 

  let checkbox= parent.querySelector('.item__checkbox');
  checkbox.removeEventListener('click',finish); 

  parent.parentNode.removeChild(parent);
}

  // hjálparfall til að útbúa element
function el(type, className, clickHandler) {
const element= document.createElement(type);
    
if (className){
  element.setAttribute('class',className);
}

if (clickHandler){
  element.addEventListener('click', clickHandler);
}
    
  return element;

  }

  return {
    init: init
  }
})();
