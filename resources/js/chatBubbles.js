function appendNewChatBubble(theSender, theMessage, theTime, theTimeAgo, isFile, fileName){
  const chatBox = document.getElementById("chat-box");
  const messageNode = document.createElement("div");
  const timeNode = document.createElement("label");
  const fileLink = document.createElement("a");
  const downloadIcon = document.createElement("i");

  messageNode.style.clear = "both";
  messageNode.style.padding = "4px 10px";
  messageNode.style.border = "1px solid #ccc";
  messageNode.style.borderRadius = "10px";
  messageNode.style.marginBottom = "2px";
  messageNode.style.marginTop = "15px";
  messageNode.classList.add("animate__animated");
  messageNode.classList.add("animate__fadeInUp");    //fadeInUp, fadeIn
  messageNode.classList.add("animate__faster");
  

  timeNode.style.clear = "both";
  timeNode.style.fontSize = "10px";
  timeNode.style.fontWeight = "300";
  timeNode.style.color = "#999";
  timeNode.classList.add("animate__animated");
  timeNode.classList.add("animate__fadeInUp");
  timeNode.classList.add("animate__faster");

  if(isFile == 1) {
    downloadIcon.setAttribute('class','fas fa-download');
    fileLink.setAttribute('class', 'btn btn-sm btn-outline-secondary');
    fileLink.style.borderRadius = "50px";
    fileLink.style.fontSize = "14px";
    fileLink.style.marginLeft = "8px";
    messageNode.style.fontWeight = "600";
    messageNode.style.fontStyle = "italic";
  }

  if(theSender == senderId){
    messageNode.style.float = "right";
    messageNode.style.backgroundColor = "#B3E8E5";
    messageNode.style.borderBottomRightRadius = "0";
    messageNode.style.marginLeft = "50px";

    timeNode.style.float = "right";
  }
  else{
    messageNode.style.float = "left";
    messageNode.style.backgroundColor = "#fff";
    messageNode.style.borderBottomLeftRadius = "0";
    messageNode.style.marginRight = "50px";

    timeNode.style.float = "left";
  }

  if(isFile == 1){
    // console.log(theMessage);
    var arrayBuffer = base64ToArrayBuffer(theMessage);
    saveByteArray(fileLink, fileName, arrayBuffer);
  }

  const messageNodeText = document.createTextNode(isFile == 0 ? theMessage : fileName);
  const timeNodeText = document.createTextNode(theTimeAgo);
  if(isFile == 1) fileLink.appendChild(downloadIcon);
  

  messageNode.appendChild(messageNodeText);
  if(isFile == 1) messageNode.appendChild(fileLink);
  timeNode.appendChild(timeNodeText);

  chatBox.appendChild(messageNode);
  chatBox.appendChild(timeNode);
}


function appendSecuredAlertBubble(){
  const chatBox = document.getElementById("chat-box");
  const alertNode = document.createElement("div");

  alertNode.style.clear = "both";
  alertNode.style.padding = "6px 12px";
  alertNode.style.border = "1px solid #ccc";
  alertNode.style.borderRadius = "10px";
  alertNode.style.margin = "15px auto";
  alertNode.style.backgroundColor = "#FFE3A9";
  alertNode.style.textAlign = "center";
  alertNode.style.fontSize = "14px";
  alertNode.style.width = "90%";

  alertNode.classList.add("animate__animated");
  alertNode.classList.add("animate__fadeIn");    //fadeInUp, fadeIn
  alertNode.classList.add("animate__faster");

  const alertNodeIcon = document.createElement("i");
  alertNodeIcon.classList.add("fas");
  alertNodeIcon.classList.add("fa-lock");

  const alertNodeText = document.createTextNode("\t\t Messages are end-to-end encrypted.\nNo one outside of this chat, not even the developer, can read them.");
  
  alertNode.appendChild(alertNodeIcon);
  alertNode.appendChild(alertNodeText);

  chatBox.appendChild(alertNode);
}