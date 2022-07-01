document.querySelector("#upload-file").onchange = function(){
  var file = document.querySelector("#upload-file").files[0];
  document.getElementById("message-text").value = file.name;
  document.querySelector("#message-text").style.fontWeight = "900";
  getBase64(file).then(data => {
    fileBytes = window.atob(data);
    // console.log(fileBytes);
    // saveByteArray(this.files[0].name, fileBytes);
  });
  
  fileName = this.files[0].name;
  document.getElementById('send-button').disabled = false;
}

chatModal.addEventListener('show.bs.modal', event => {
  const button = event.relatedTarget;
  chatButtonEvent = event.relatedTarget;
  const recipient = button.getAttribute('data-bs-username');
  const status = button.getAttribute('data-bs-status');   // A bug exists here
  senderId = button.getAttribute('data-bs-senderId');
  receiverId = button.getAttribute('data-bs-receiverId');
  const modalTitle = chatModal.querySelector('.modal-title');
  modalTitle.innerHTML = "Chat with ";
  // const modalBodyInput = chatModal.querySelector('.modal-body input');
  // At the send button
  
  var dot = "";
  if(status == 1){
    dot = "<i style='font-size:10px;' id='receiver-dot' class='fas fa-circle align-middle text-success'></i>";
  }
  else{
    dot = "<i style='font-size:10px;' id='receiver-dot' class='fas fa-circle align-middle text-secondary'></i>";
  }

  var recipientBold = "<span class='fw-bold'>" + capitalizeFirstLetter(recipient) +"</span>";
  modalTitle.innerHTML += `${recipientBold+"  "+dot}`;
  // modalBodyInput.value = recipient;
  
})

document.addEventListener("keyup", function(event) {
  var messageText = document.getElementById('message-text').value;
  if (event.keyCode === 13 && messageText.length > 0 && messageText.trim().length !== 0) {
      sendClicked();
  }
});

function sendClicked(){
  ajaxInsertMessage();

  document.getElementById('message-text').value = '';
  messageTextChanged();
  document.getElementById("message-text").focus();

  var elem = document.getElementById('chat-box');
  elem.scrollTop = elem.scrollHeight;

  document.getElementById('message-text').style.height = '';
  document.getElementById('message-text').style.height = document.getElementById('message-text').scrollHeight + 'px'
}

function messageTextChanged(){
  var messageText = document.getElementById('message-text').value;
  document.querySelector("#message-text").style.fontWeight = "400";
  document.getElementById('upload-file').value = null;
  if(messageText.length == 0 || messageText.trim().length === 0){
    document.getElementById('send-button').disabled = true;
    ajaxTypingProcess();
  }
  else{
    document.getElementById('send-button').disabled = false;
  }
}
// let rsa = new RSA();
// const p = rsa.findRandomPrime(-1);
// const q = rsa.findRandomPrime(Big(p));
// const n = rsa.compute_n(Big(p), Big(q));
// const z = rsa.eular_z(Big(p), Big(q));
// const e = rsa.find_e(Big(z));
// alert(z);
//const d = RSA.find_d(Big(e), Big(z));
//alert(d);