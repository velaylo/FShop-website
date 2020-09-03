'use strict';

function openSearch() {
  let display = document.getElementById("popup-serch-container").style.display;
  
  if (display == 'none') {
    document.getElementById("popup-serch-container").style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.getElementById("main-background").style.filter = 'blur(8px)';
  } else {
    document.getElementById("popup-serch-container").style.display = 'none';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let closeSearch = document.getElementById("popup-serch-container");
  closeSearch.onclick = function(event) {
    if (event.target.id == 'popup-serch' || event.target.id == 'serch-text' ||
        event.target.id == 'popup-search-text-clean-container' || event.target.id == 'popup-search-text-clean' ||
        event.target.id == 'button-popup-serch-img' || event.target.id == 'popup-search-img') {
      return
    } else {
      document.getElementById("popup-serch-container").style.display = 'none';
      document.getElementById("main-background").style.filter = 'blur(0px)';
      document.body.style.overflow = 'auto';
    }
  }
})


function closeSearch() {
  let display = document.getElementById("popup-serch-container").style.display;
  if (display == 'flex') {
    document.getElementById("popup-serch-container").style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById("main-background").style.filter = 'blur(0px)';
  } else {
    document.getElementById("popup-serch-container").style.display = 'flex';
  }
  document.getElementById("serch-text").value = '';

}

function cleanSearchText() {
  document.getElementById("serch-text").value = '';
}

document.addEventListener("DOMContentLoaded", () => {
  let navigationSection = document.getElementById("navigation-section");
  navigationSection.onclick = function(event) {
    if (event.target.id == 'navigation-menu-after-hovering-showed') {
      event.target.parentElement.querySelector('#navigation-hovering-container-hiding').id = 'first-section';
      event.target.id = 'navigation-menu-after-hovering';
      return;
    }

    let currentContainer = getNearestParentByClassName(event.target, 'navigation-hovering-container')
    let containerToRemove = getNearestParentById(event.target, 'first-section');

    containerToRemove.id = 'navigation-hovering-container-hiding';
    currentContainer.querySelector('#navigation-menu-after-hovering').id = 'navigation-menu-after-hovering-showed'
  }
})

function getNearestParentById(node, id) {
  let tempNode = node;

  while (tempNode.id != id) {
    tempNode = tempNode.parentElement;
  }

  return tempNode;
}

function getNearestParentByClassName(node, className) {
  let tempNode = node;

  while (!tempNode.classList.contains(className)) {
    tempNode = tempNode.parentElement;
  }

  return tempNode;
}

var multiItemSlider = (function () {
  return function (selector, config) {
    var
      _mainElement = document.querySelector(selector), 
      _sliderWrapper = _mainElement.querySelector('.flowers-slider-wrapper'), 
      _sliderItems = _mainElement.querySelectorAll('.flowers-slider-item'), 
      _sliderControls = _mainElement.querySelectorAll('.slider__control'), 
      _sliderControlLeft = _mainElement.querySelector('.slider__control_left'), 
      _sliderControlRight = _mainElement.querySelector('.slider__control_right'), 
      _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), 
      _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width),    
      _positionLeftItem = 0,
      _transform = 0, 
      _step = _itemWidth / _wrapperWidth * 100, 
      _items = []; 
        
    _sliderItems.forEach(function (item, index) {
      _items.push({ item: item, position: index, transform: 0 });
    });

    var position = {
      getMin: 0,
      getMax: _items.length - 1,
    }

    var _transformItem = function (direction) {
      if (direction === 'right') {
        if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) >= position.getMax) {
          return;
        }
        if (!_sliderControlLeft.classList.contains('slider__control_show')) {
          _sliderControlLeft.classList.add('slider__control_show');
        }
        if (_sliderControlRight.classList.contains('slider__control_show') && (_positionLeftItem + _wrapperWidth / _itemWidth) >= position.getMax) {
          _sliderControlRight.classList.remove('slider__control_show');
        }
        _positionLeftItem++;
        _transform -= _step;
      }
      if (direction === 'left') {
        if (_positionLeftItem <= position.getMin) {
          return;
        }
        if (!_sliderControlRight.classList.contains('slider__control_show')) {
          _sliderControlRight.classList.add('slider__control_show');
        }
        if (_sliderControlLeft.classList.contains('slider__control_show') && _positionLeftItem - 1 <= position.getMin) {
          _sliderControlLeft.classList.remove('slider__control_show');
        }
        _positionLeftItem--;
        _transform += _step;
       }
      _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
     }

        
    var _controlClick = function (e) {
      if (e.target.classList.contains('slider__control')) {
          e.preventDefault();
        var direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
        _transformItem(direction);
      }
    };

    var _setUpListeners = function () {
      _sliderControls.forEach(function (item) {
        item.addEventListener('click', _controlClick);
      });
    }
    
    _setUpListeners();

    return {
      right: function () { 
        _transformItem('right');
      },
      left: function () {
        _transformItem('left');
      }
    }
  }
}());

document.addEventListener("DOMContentLoaded", () => {
    var slider = multiItemSlider('.flowers-slider')
});


