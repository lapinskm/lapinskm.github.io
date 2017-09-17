
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
}

function inOrder(a) {
  for (var i = 0; i < a.length; i++){
    if ( a[i+1] < a[i] ){
      return false;
    }
  }
  return true;
}

