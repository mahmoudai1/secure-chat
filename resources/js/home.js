$('#chatModal').on('shown.bs.modal', function (e) {
  document.getElementById("message-text").focus();
  modalIsOpen = true;
  ajaxDisplayMessages("displayAll");
  ajaxTypingReady();
  ajaxDiffieHellman();
})

$('#chatModal').on('hidden.bs.modal', function (e) {
  var chatBox = document.getElementById('chat-box');
  senderId = 0;
  receiverId = 0;
  modalIsOpen = false;
  ctModalOpen = 0;
  document.getElementById('last-seen').innerHTML = "Status"; // Or to leave it blank
  deleteChilds(chatBox);
})

function updateUsersPublicStatus(userStatus, whichRow){
  var dots = document.getElementsByClassName('receiver-public-dot');
  var statusTexts = document.getElementsByClassName('receiver-public-statusText');
  var chatIcons = document.getElementsByClassName('receiver-public-chatIcon');

  if(userStatus != statusTexts[whichRow].innerHTML){
    if(userStatus == "Online"){
      statusTexts[whichRow].innerHTML = "Online";
      dots[whichRow].style.color = "#198853"; // text-success  == Instead of classList.add and .remove because it bugs
      chatIcons[whichRow].style.color = "#0E6DFD";
    } else if (userStatus == "Offline"){
      statusTexts[whichRow].innerHTML = "Offline";
      dots[whichRow].style.color = "#6C757D"; // text-secondary
      chatIcons[whichRow].style.color = "#6C757D";
    }
  }
}
