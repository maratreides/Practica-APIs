const isAPIsupported = () => {
  return window.File && window.FileReader && window.FileList && window.Blob;
}

const handleFileSelect = (evt) => {
  const file = evt.target.files[0];

  if (!file.type.match('video.*')) {
    return;
  }

  const reader = new FileReader();

  reader.onload = ((theFile) => {
    return (e) => {
      const videoDiv = document.querySelector('.video-container');

      if (videoDiv) {
        videoDiv.parentNode.removeChild(videoDiv);
      }

      const div = document.createElement('div');
      div.id = 'video-div';
      div.className = 'video-container';
      div.innerHTML = `<video controls id="video" class="thumb" src="${e.target.result}" title="${escape(theFile.name)}"/>`;

      document.getElementById('video-output').insertBefore(div, null);

      const loadingMessage = document.createElement('p');

      loadingMessage.id = 'loading';
      loadingMessage.className = 'loading-message';
      loadingMessage.innerHTML = 'El video está cargando';

      document.getElementById('video-output').insertBefore(loadingMessage, null);

      const playButton = document.getElementById('play');
      const pauseButton = document.getElementById('pause');
      const volumeUp = document.getElementById('up');
      const volumeDown = document.getElementById('down');

      playButton.addEventListener('click', () => {
        document.getElementById('video').play();
      });

      pauseButton.addEventListener('click', () => {
        document.getElementById('video').pause();
      });

      volumeUp.addEventListener('click', () => {
        document.getElementById('video').volume += 0.1;
      });

      volumeDown.addEventListener('click', () => {
        document.getElementById('video').volume -= 0.1;
      });

      document.getElementById('video').addEventListener('canplay', () => {
        const loadingMessage = document.getElementById('loading');

        document.getElementById('video-output').removeChild(loadingMessage);

        document.getElementById('video').style.visibility = 'visible';

        playButton.style.visibility = 'visible';
        pauseButton.style.visibility = 'visible';
        volumeUp.style.visibility = 'visible';
        volumeDown.style.visibility = 'visible';
      });
    }
  })(file);

  reader.readAsDataURL(file);
};

if (isAPIsupported()) {
  alert('¡Genial! Todas las API\'s están soportadas :)');
} else {
  alert('La API no está soportada por este navegador... :(');
}

document.getElementById('file').addEventListener('change', handleFileSelect, false);
