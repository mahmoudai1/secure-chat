function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.replace('data:', '').replace(/^.+,/, ''));
    reader.onerror = error => reject(error);
  });
}

function base64ToArrayBuffer(binaryString) {
  console.log(binaryString);
  // var binaryString = window.atob(base64);
  // console.log(binaryString);
  var binaryLen = binaryString.length;
  var bytes = new Uint8Array(binaryLen);
  for (var i = 0; i < binaryLen; i++) {
     var ascii = binaryString.charCodeAt(i);
     bytes[i] = ascii;
  }
  // console.log(bytes);
  return bytes;
}

function saveByteArray(invLink, fileName, byte) {
  var blob = new Blob([byte], {type: "application/pdf"});
  invLink.href = window.URL.createObjectURL(blob);
  invLink.download = fileName;
  // invLink.click();≠
}

function getAsciiOfTheString(m){
  var array = new Object();
  let everySeparate = "";
  let asciiM = "";
  for(let i = 0; i < m.length(); i++){
    let charLength = m.charCodeAt(i).length();
    asciiM += m.charCodeAt(i);
    everySeparate += charLength;
  }
  return array;
}

function scrollToTheBottom(){
  var chatBox = document.getElementById('chat-box');
  chatBox.scrollTop = chatBox.scrollHeight;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function deleteChilds(parent) {
  var e = parent;
  //e.firstElementChild can be used.
  var child = e.lastElementChild; 
  while (child) {
      e.removeChild(child);
      child = e.lastElementChild;
  }
}

function getEncMethodId(encMethod){
  if (encMethod == "des") return 0;
  else if (encMethod == "aes") return 1;
  else if (encMethod == "rsa") return 2;
  else if (encMethod == "gamal") return 3;
  else return -1;
}

function hover(type)
{
    if(type == "logout")
    {
        icon = document.getElementById("logoutIcon");
        logout = document.getElementById("logoutP");
    }
    icon.style.display = "inline-block";
}

function out(type)
{
    if(type == "logout")
    {
        icon = document.getElementById("logoutIcon");
        logout = document.getElementById("logoutP");
    }
    icon.style.display = "none";
}

$(document).ready(function() {
  setInterval(function() {
    if(modalIsOpen){
      ajaxDisplayMessages("displayNewOnly");
    }
  }, 250);

  setInterval(function() {
    if(modalIsOpen){
      ajaxCheckReceiverStatus("modal");
    }
  }, 2500);

  setInterval(function() {
    ajaxCheckReceiverStatus("home");
  }, 2500);
  $.ajaxSetup({ cache: false });
});

if ( window.history.replaceState ){
  window.history.replaceState(null, null, window.location.href);
}
