function ajaxDiffieHellman(){
  let dh = new DiffieHellman();
  let q;
  let proots;
  let prootsLength;
  let a;
  let xa;
  let xb;
  let ya, yb;
  let _a, _b;

  for(;;){
    q = dh.findRandomPrime(100, 10000);
    proots = dh.findPrimitives(q);
    prootsLength = dh.findPrimitives(q).length;
    a = proots[Math.round(Math.random() * prootsLength)];
    xa = (Math.random() * q - 1) + 2;
    xb = (Math.random() * q - 1) + 2;

    //Public Key Alice
    ya = dh.mpmod(a, xa, q)
    //Public Key Bob
    yb = dh.mpmod(a, xb, q)
    //Secret
    _a = dh.mpmod(yb, xa, q)
    _b = dh.mpmod(ya, xb, q)
    if(_a == _b){
      break;
    }
  }
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if(this.responseText != "")
          alert(this.responseText);
      } else {
          // alert(this.status + " " + this.readyState);
      }
  };
  var params = "sid=" + senderId + "&rid=" + receiverId + "&skey=" + _a + "&rkey=" + _b;
  xmlhttp.open("POST", "insert_both_keys.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(params);
}


function ajaxInsertMessage(){
  var messageText = document.getElementById('message-text').value;
  var encMethod = document.getElementById('enc-method').value;
  var encMethodId = getEncMethodId(encMethod);
  var file = document.getElementById("upload-file");
  var isFile = 0;
  var fileName = "";

  let c1;
  let xa;
  let q;
  let es;

  if(file.files.length != 0){
    isFile = 1;
    messageText = fileBytes;
    fileName = file.files[0].name;
  }

  if(encMethodId == 3){
    let gamal = new Gamal();
    q = gamal.findRandomPrime();
    let proots = gamal.findPrimitives(q);
    let prootsLength = gamal.findPrimitives(q).length;
    let a = proots[Math.floor(Math.random() * prootsLength)];
    xa = Math.floor(Math.random() * q - 1) + 2;
    let ya = gamal.mpmod(a, xa, q);
    let ciphers = gamal.encrypt(q, a, ya, messageText);
    c1 = ciphers[0];
    messageText = ciphers[1]; // c2
    es = ciphers[2];
  }

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if(this.responseText != "")
          alert(this.responseText);
      } else {
          // alert(this.status + " " + this.readyState);
      }
  };
  var params = "sid=" + senderId + "&rid=" + receiverId + "&msg=" + encodeURIComponent(messageText) + "&eid=" + encMethodId + "&isFile=" + isFile + "&fileName=" + fileName + 
                "&c1Gamal=" + c1 + "&xaGamal=" + xa + "&qGamal=" + q + "&esGamal=" + es;
  xmlhttp.open("POST", "insert_message.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(params);
}

function ajaxDisplayMessages(whichCase){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if(this.responseText != ""){
          // alert(this.responseText);
          messagesData = JSON.parse(this.responseText);
          if(ctModalOpen == 0){
            appendSecuredAlertBubble();
            ctModalOpen++;
          }
          for(let i = 0; i < messagesData.length; i++){
            let theMessage = messagesData[i][3];
            if(messagesData[i][2] == 3){
              let gamal = new Gamal();
              theMessage = gamal.decrypt(parseInt(messagesData[i][8][0]), messagesData[i][8][1], parseInt(messagesData[i][8][2]), parseInt(messagesData[i][8][3]), messagesData[i][8][4]);
            }
            appendNewChatBubble(messagesData[i][0], theMessage, messagesData[i][4], messagesData[i][5], messagesData[i][6], messagesData[i][7]);
          }
          if(messagesData.length > 0){
            scrollToTheBottom();
          }
        }
      } else {
          // alert(this.status + " " + this.readyState);
      }
  };
  xmlhttp.open("GET", "display_messages.php?sid=" + senderId + "&rid=" + receiverId + "&whichCase=" + whichCase, true);
  xmlhttp.send();
}

function ajaxCheckReceiverStatus(whichStatus){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if(this.responseText != ""){
          if(whichStatus == "modal"){
            const isOnline = JSON.parse(this.responseText)[0];
            const logoutTimestamp = JSON.parse(this.responseText)[1];

            var lastSeen = document.getElementById('last-seen');
            var receiverDot = document.getElementById('receiver-dot');
            
            if(isOnline == 1){
              lastSeen.innerHTML = "Online";
              receiverDot.classList.remove("text-secondary");
              receiverDot.classList.add("text-success");
              chatButtonEvent.setAttribute('data-bs-status', '0');
            }else{
              lastSeen.innerHTML = "Last Seen " + logoutTimestamp;
              receiverDot.classList.remove("text-success");
              receiverDot.classList.add("text-secondary");
              chatButtonEvent.setAttribute('data-bs-status', '0');
            }
          } else if (whichStatus == "home"){
            const usersStatus = JSON.parse(this.responseText);
            for(let i = 0; i < usersStatus.length; i++){
              updateUsersPublicStatus(usersStatus[i], i);
            }
          }
        }
      } else {
          // alert(this.status + " " + this.readyState);
      }
  };
  xmlhttp.open("GET", "check_receiver_status.php?rid=" + receiverId + "&whichStatus=" + whichStatus, true);
  xmlhttp.send();
}

function ajaxTypingReady(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if(this.responseText != ""){
        }
      } else {
          //alert(this.status + " " + this.readyState);
      }
  };
  xmlhttp.open("GET", "typing_ready.php?rid=" + receiverId, true);
  xmlhttp.send();
}

function ajaxTypingProcess(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if(this.responseText != ""){
        }
      } else {
          //alert(this.status + " " + this.readyState);
      }
  };
  xmlhttp.open("GET", "typing_process.php?rid=" + receiverId, true);
  xmlhttp.send();
}