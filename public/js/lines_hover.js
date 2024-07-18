document.querySelector('.section2').addEventListener('mouseover', function() {
    this.parentNode.classList.add('hover');
  });
  
  document.querySelector('.section2').addEventListener('mouseout', function() {
    this.parentNode.classList.remove('hover');
  });
  