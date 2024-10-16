var A_CODE = 'a'.charCodeAt(0);
var Z_CODE = 'z'.charCodeAt(0);
var letters = [];
for(var code=A_CODE;code<=Z_CODE;++code){
  letters.push(getLetter(code));
}
var audioTemplate = _.template(document.getElementById('template-audio').innerHTML,{variable:'d'});
_.each(letters,function(letter){
  document.write(audioTemplate({
    id: 'audio-' + letter,
    oggSrc: 'audio/' + letter + '.ogg'
  }));
});

function isLetter(code){
  return A_CODE <= code && code <= Z_CODE ||  A_CODE <= code+32 && code+32 <= Z_CODE;
}
function getCodeFromEvent(e){
  return e.which || e.keyCode;
}
function getLetter(code){
  return String.fromCharCode(code).toLowerCase();
}
function getAudioByCode(code){
  return document.getElementById('audio-' + getLetter(code) );
}
window.addEventListener('keydown',function(e){
  var code = getCodeFromEvent(e);
  if(!e.ctrlKey && !e.metaKey && !e.altKey &&  isLetter(code)){
    var l=getLetter(code);
    var text = document.getElementById('letter').innerHTML;
    if(-1==text.indexOf(l)){
      getAudioByCode(code).play();
    }
    document.getElementById('letter').innerHTML = l+text.replace(l,'');
  }else{
    e.preventDefault();
  }
});
window.addEventListener('keyup',function(e){
  var code = getCodeFromEvent(e);
  if(isLetter(code)){
    var l=getLetter(code);
    document.getElementById('letter').innerHTML = document.getElementById('letter').innerHTML.replace(l,'');
    getAudioByCode(code).pause();
    getAudioByCode(code).currentTime = 0;
  }else{
    e.preventDefault();
  }
});
