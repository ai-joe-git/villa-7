//  DOM Variable(s)
  // Header Variable(s) 
const listIcon = $('.header-list__icon');
const menuText = $('.menu-text');
const search = $('.header-list__search-inner input')
const hamburger = $('#hamburger');
const menuIcon = $('.header-menu__icon');
const menuBlocks = $('.menu-block');
const headerMenu = $('.header-menu');
const cancel = $('.header-menu__cancel');
const sups = $('.menu-block__text sup');

  // Grid Variable(s)
const navLeft = $('.grid-nav__left');
const viewLink = $('.grid-view__inn a');
const navRight = $('.grid-nav__right');
const mainNote = $('.grid-main__note');

  // Circle
const circle = $('.circle');


// Not DOM Variable(s)
const slots = [
  {
    img: $('.main-img__1'),
    main: [],
    menu: [],
    line: $('.grid-line__each-count div:nth-child(1)'),
    number: $('.grid-number__each-count div:nth-child(1)')
  },
  {
    img: $('.main-img__2'),
    main: [],
    menu: [],
    line: $('.grid-line__each-count div:nth-child(2)'),
    number: $('.grid-number__each-count div:nth-child(2)')
  },
  {
    img: $('.main-img__3'),
    main: [],
    menu: [],
    line: $('.grid-line__each-count div:nth-child(3)'),
    number: $('.grid-number__each-count div:nth-child(3)')
  },
];
const mouseResponse = [navLeft, navRight, cancel, listIcon, menuText, viewLink, menuIcon, search];

  // Number(s) and string(s)
let count = 0;
let navActive = '#ECECEC';
let navFaint = 'rgba(236, 236, 236, .6)';
let slotMain = 'main';
let slotMenu = 'menu';
let slotLine = 'line';
let slotNumber = 'number';
let add = 'add';
let remove = 'remove';






// Function(s)
  // Start function
function start() {
  const allList = $('.main-head__child');
  const allMenu = $('.menu-text');


  // Note(s)
  const text1 = ['INTERIOR', 'FURNITURE', 'AFFORDABLE', 'DESIGN', 'DESIGN', 'PRICES'];
  const text2 = ['INTERIOR DESIGN', 'FURNITURE DESIGN', 'AFFORDABLE PRICES'];

  // Dom change(s)
  parentLoop(allList, text1, slotMain);
  parentLoop(allMenu, text2, slotMenu);
}

  // Parent loop
function parentLoop(arr, str, slot) {
  for (var i = 0; i < arr.length; i++) {
    // Create && Add span to parent
    createSpans(arr[i], str[i]);

    // Add parent to slots
    addToSlot(arr[i], slot, i);
  }
}

  // Create span(s) && Append 
function createSpans(dom, str) {
  for (var i = 0; i < str.length; i++) {
    const span = document.createElement('span');
    span.textContent = str[i];

    // Checking for empty span
    if (str[i] === ' ') {
      span.style.padding = '0 .35vw'
    }

    // Append span
    dom.append(span);
  }
}

  // Add Span(s) to Respective Slot(s)
function addToSlot(dom, slot, numb) {
  const domId = dom.getAttribute('id');
  const selectSpans = $(`#${domId} span`);
  let curSlot = numb <= 2 ? numb : numb - 3;

  slots[curSlot][slot].push(selectSpans);
}


//Animation Function(s) 
  // Change Image Function
function changeImage(str, ind) {
  if (str === add) {
    slots[ind].img.css({
      'transform': 'scale(1.3)',
      'zIndex': '-3',
      'transition': 'transform 1.6s ease-in .4s, z-index .2s ease-in 1.4s'
    });
  } else {
    slots[ind].img.css({
      'transform': 'scale(1)',
      'zIndex': '-1',
      'transition': 'z-index .2s ease-in 1.4s'
    });
  }
}

  // Change Navigation Icon Colour
function iconColourChange(numb) {
  if (numb > 0) {
    navLeft.css('background', navActive);
  }

  if (numb === 0) {
    navLeft.css('background', navFaint);
  }

  if (numb === 2) {
    navRight.css('background', navFaint);
  }

  if (numb < 2) {
    navRight.css('background', navActive);
  }
}

  // Animation Loop Function
function animationLoop(cur, time, props) {
  const spanList = slots[cur][props];
  const duration = 0.7
  let eachSec = props === slotMain ? 0.03 : 0.01;
  let pace;

  spanList.forEach(list => {
    let listArr = Array.from(list);

    listArr.forEach((child, ind) => {
      if (time === add) {
        pace = duration - (eachSec * ind);
      } else {
        pace = 0 + (eachSec * ind);
      }

      // Call Animate span
      animateSpan(child, pace, time, props);
    })
  })
}

  // Animate span
function animateSpan(cur, pace, time, props) {
  let val = time === add ? 100 : 10;
  let del = time === add ? 0 : props === slotMenu ? .7 : 1.3;

  cur.style.transform = `translateY(${val}%)`;
  cur.style.transition = `transform .3s ease ${del + pace}s`;
}

  // Note Animation
function noteAnimation(dom) {
  dom.css({
    'animation': 'textAnimation 1.2s ease-out forwards .4s'
  })
}

  // Line To Fill
function lineToFill(curIndex) {
  const textArr = Array.from(menuBlocks);

  textArr.forEach((text, ind) => {
    ind === curIndex ?
      text.classList.add('open') :
      text.classList.remove('open');
  })
}

  // Line && Number Animation
function lineAnimation(cur, time, props, dir) {
  let del = time === add ? .7 : 1.4;
  let val = time === add ?
    dir === 'right' ? -110 : 110 : -0;
  let dom = slots[cur][props];

  // Add animation
  dom.css({
    'top': `${val}%`,
    'transition': `top .4s ease-out ${del}s`
  })
}

  // Circle change(s) on Links
function mouseEffect(dom) {
  dom.mousemove(() => circle.css({
    'background': '#ececec27',
    'border': '2px solid #ECECEC'
  }));

  dom.mouseleave(() => circle.css({
    'background': 'rgbA(236, 236, 236, .6)',
    'border': 'none'
  }))
}


// Dom Change Function
  // Dom change(s)
function domChanges(curIndex, curDom, curDir) {
  // Change Image
  changeImage(curDom, curIndex);

  // Animation Loop
  animationLoop(curIndex, curDom, slotMain);

  // Line Animation
  lineAnimation(curIndex, curDom, slotLine, curDir);

  // Number Animation
  lineAnimation(curIndex, curDom, slotNumber, curDir);
}




// Event Listener
  // Circle Mousemove Listener
$(document).mousemove(function(e) {
  let x = e.pageX;
  let y = e.pageY;

  circle.css({
    'top': `${y - 35}px`,
    'left': `${x - 35}px`,
    'opacity': '1',
    'transform': 'scale(1)'
  });
});

  // Circle Mouseleave listener
$(document).mouseleave(function(e) {
  circle.css({
    'opacity': '0',
    'transform': 'scale(0)'
  })
})

  // Links Mousemove && Mouseleave Listener
mouseResponse.forEach((res) => mouseEffect(res))

  // Navright click Listener
navRight.click(function() {

  if (count < 2) {
    // Before count
    domChanges(count, add, 'right')
    
    // Increment
    count++
    
    // After count
    // Note animation
    noteAnimation(mainNote);
    
    // Dom change(s)
    domChanges(count, remove, 'right');

    // Change icon colour
    iconColourChange(count);

    // LineToFill
    lineToFill(count);
  }

  // Lazy fix to one text Animation
  setTimeout(() => {
    mainNote.css('animation', 'none');
  }, 2000)
});


  // Navleft Click Listener 
navLeft.click(function() {

  if (count > 0) {
    // Before count
    domChanges(count, add, 'left');
    
    // Decrement
    count--
    
    // After count
    // NoteAnimation
    noteAnimation(mainNote);
    
    // Dom change(s) 
    domChanges(count, remove, 'left');
    
    // Change icon colour
    iconColourChange(count);

    // LineToFill
    lineToFill(count);
  }

  // Lazy fix to one text Animation
  setTimeout(() => {
    mainNote.css('animation', 'none');
  }, 2000)
})

  // Hamburger Click Listener
hamburger.click(() => {
  // Header Menu
  headerMenu.addClass('open')

  // Menu List
  slots.forEach((slot, ind) => animationLoop(ind, remove, slotMenu));

  // Menu list hightlight
  sups.css('opacity', '1')
});

  // Header cancel
cancel.click(() => {
  // headerMenu
  headerMenu.removeClass('open');

  // MenuList
  slots.forEach((slot, ind) => animationLoop(ind, add, slotMenu));

  // Menu list hightlight
  sups.css('opacity', '0')
});


  // Menu Text Click Listener
Array.from(menuText).forEach((text, ind) => text.addEventListener('click', () => {
  let dir = count > ind ? 'left' : 'right';

  // HeaderMenu remove class
  headerMenu.removeClass('open');

  // Dom Change(s)
  domChanges(count, add, dir);

  // Animation Loop Menu
  slots.forEach((slot, ind) => animationLoop(ind, remove, slotMenu));

  // Increment
  count = ind;

  // NoteAnimation
  noteAnimation(mainNote);

  // Dom changes
  domChanges(count, remove, dir);

  // Animation Loop Menu
  slots.forEach((slot, ind) => animationLoop(ind, add, slotMenu));

  // line Animation
  iconColourChange(count);

  // LineToFill
  lineToFill(count);
  
  // Lazy fix to one text Animation
  setTimeout(() => {
    mainNote.css('animation', 'none');
  }, 2000)
}))



// Call Start function
start();