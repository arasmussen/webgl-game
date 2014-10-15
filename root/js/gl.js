define(function() {
  var canvas = document.getElementById('canvas');
  var originalSize = {
    width: canvas.width,
    height: canvas.height
  };
  function setGLViewport() {
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
  }
  try {
    var gl = canvas.getContext("experimental-webgl");
    setGLViewport();
  } catch (e) {
    console.log(e);
  }
  if (!gl) {
    alert("Could not initialise WebGL, sorry :-(");
  }
  function onFullScreenChange() {
    var fullScreenElement =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement;
    var isFullScreen = (fullScreenElement === canvas);
    if (isFullScreen) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setGLViewport();
    } else {
      canvas.width = originalSize.width;
      canvas.height = originalSize.height;
      setGLViewport();
    }
  }
  document.addEventListener(
    'fullscreenchange',
    onFullScreenChange
  );
  document.addEventListener(
    'mozfullscreenchange',
    onFullScreenChange
  );
  document.addEventListener(
    'webkitfullscreenchange',
    onFullScreenChange
  );
  return gl;
});
