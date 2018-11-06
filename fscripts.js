const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => { //gera stuff og þá er ekki fyrir neðan bara function gera stuff fyrir neðan neðan) //þú ætlar að gera eitthvað þegar eitthvað gerist, þegar skjarinn opnar, kállar á form og items
  const form = document.querySelector('.form'); //dom getur verið klikk líka
  const items = document.querySelector('.items');

  text.init(form, items);
});
/*
function gerastuff(){
  const form = document.querySelector('.form'); //dom getur verið klikk líka
  const items = document.querySelector('.items');

  text.init(form, items);
});

*/


const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items; //items eru ul
    _form.addEventListener('submit', formHandler); //þegar takki inn í forminu þegar þú ýtir á takkka þá framkallast submit, formHandlar gerist

    console.log(_items); //þetta er orðið bryeta út af query Selsctor , fyrir sama og þú kallar hlutinn í html
    console.log(_form);
   
    const itemList= items.querySelectorAll('.item');//þá færðu lista annars færðu bara einn
    console.log(itemList[0]); //þá færðu fyrsta li en þarft ekki að hafa kassa þá er allt

    for(let i=0; i<itemList.length;i++){
      const checkbox=itemList[i].querySelector('.item__checkbox');
      const text = itemList[i].querySelector('.item__text');
      const button = itemList[i].querySelector('.item__button');

      checkbox.addEventListener('click', finish);
      text.addEventListener('click', edit);
      button.addEventListener('click', deleteItem);
    }



  }

  function formHandler(e) { //þetta á bara að vera    stja eventListener á allt asem við ýtum á 
    e.preventDefault();

    console.log('halló heimur');
  }

  // event handler fyrir það að klára færslu
  function finish(e) { //hakið                                      langar að gera það blátt
    console.log('finish');
    const {target} = e;
    target.parentNode.classList.toggle('item--blue');//ef hluturinn hefur það þá taka annars bæta við :) classList.toggle!!!!!
    //ef heldur .item__text og hefur .item--done
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    console.log('edit');
    const {target} = e;
    const{textContent, parentNode} = target;

    parentNode.removeChild(target);
    //viljum bæta við í staðin

   // let input= el('input','item__edit');//ekki punktur bæta við klass , velja einhvað punktur

   let input = document.createElement('input');
   input.classList.add('item__edit');
   input.addEventListener('keyup', commit);
   input.setAttribute('type', 'text');
   input.value = textContent;

   const button = parentNode.querySelector('.item__button'); //velaja takkann
  parentNode.insertBefore(input,button); //getum editað
  
  input.focus(); //bendillinn á þessu

    //console.log(target);//12.52
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {//kallað á það þegar takka er sleppt upp

    const{keycode}= e;

    if (keycode=== ENTER_KEYCODE){
      console.log('ENTER WAS PRESSED');
    }

  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    console.log(e);//þurfum ekki að hafa þetta þarna samt 
    const { target }= e;      //const breyta= e.target   //terget sýnir á hvaða takka var ýtt á 
    const parent = target.parentNode; //skilar því sem heldur utan um það

    let checkbox= parent.querySelector('.item__checkbox');
    checkbox.removeEventListener('click',finish); //þetta á að vera í ollu!!!!

    parent.parentNode.removeChild(target); //takkinn er inni í breytu    parent.parentNode.removeCHid(parent ) þá hverfur línan
  
  
  
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {//útfæra element miðað við þessar breytur  //búa til eitthvða element þá eigum við alltaf að kalla á þetta fall
    //bua til div
    let div= document.createElement('div');
    
    if (className){
      //bæta við class
    }

    //gefa class
    div.classList.add('container');  //

    if (clickHandler){
      //bæta við cklickhandler
    }
    
    div.addEventListener('click', add);  // functionið sem ég vil
    
    return div;

  }
  //el('div','container', add) //container er klasinn

  return {
    init: init
  }
})();




/*
búa til element
let element = document.createElement('span'); Yta á enter kalla á element þá er span 
bæta texta við span hlutinn 
element.appendChild(document.createTextNode('Suprise!!!'));     henda einhverju í þetta

let thebody= querySelector ('body'); thebody/htmlbod
htmlbod     <body>
htmlbod.appendChild(element);   <span> þá ter komið surprise!!!!!!


create el = document.createElement('div')
el.classList.add('container');
el      div class="container" jeiiiiiiii
*/
