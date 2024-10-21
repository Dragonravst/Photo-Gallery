document.addEventListener('DOMContentLoaded', () => {
    const modal = document.createElement('div');
    modal.id = 'modal';
    document.body.appendChild(modal);
  
    const closeBtn = document.createElement('span');
    closeBtn.id = 'close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      removeBlur();
    });
    modal.appendChild(closeBtn);
  
    const images = document.querySelectorAll('.img');
    let currentIndex = 0;
  
    function showImage(index) {
      const img = document.createElement('img');
      img.src = images[index].src;
      img.id = "img";
      while (modal.firstChild && modal.firstChild !== closeBtn) {
        modal.removeChild(modal.firstChild);
      }
      modal.append(img, closeBtn);
      applyBlurExcept(index);
    }
  
    images.forEach((image, index) => {
      image.addEventListener('click', () => {
        currentIndex = index;
        modal.classList.add('active');
        showImage(currentIndex);
      });
    });
  
    document.addEventListener('keydown', (e) => {
      if (modal.classList.contains('active')) {
        if (e.key === 'ArrowRight') {
          currentIndex = (currentIndex + 1) % images.length;
          showImage(currentIndex);
        } else if (e.key === 'ArrowLeft') {
          currentIndex = (currentIndex - 1 + images.length) % images.length;
          showImage(currentIndex);
        } else if (e.key === 'Escape') {
          modal.classList.remove('active');
          removeBlur();
        }
      }
    });
  
    const applyBlurExcept = (index) => {
      images.forEach((image, i) => {
        if (i !== index) {
          image.classList.add('blur');
        }
      });
    };
  
    const removeBlur = () => {
      images.forEach(image => {
        image.classList.remove('blur');
      });
    };
  
    const preloadImages = () => {
      images.forEach(image => {
        const img = new Image();
        img.src = image.src;
      });
    };
  
    preloadImages();
  });
  