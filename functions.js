
function loadComments() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("comments").innerHTML = "";
      var result = this.responseText;

      var results = JSON.parse(result);

      results.forEach((comment) => {
        var node = document.createElement("div");
        var name = document.createElement("H5");
        var date = document.createElement("H6");
        var message = document.createElement("P");
        var likes = document.createElement("H6");
        var likeButton = document.createElement("button");

        node.className = "card-body";
        name.className = "card-title";
        date.className = "card-subtitle text-muted";
        likes.className = "card-likes";
        likeButton.className = "card-button";

        var textName = document.createTextNode("Name: " + comment.userName);
        var textDate = document.createTextNode("Date: " + comment.date);
        var textMessage = document.createTextNode(comment.comment);
        var givenLikes = document.createTextNode("Likes: " + comment.likes);
        var likeButtonText = document.createTextNode("Like");

        name.appendChild(textName);
        date.appendChild(textDate);
        message.appendChild(textMessage);
        likes.appendChild(givenLikes);
        likeButton.innerHTML = "Like";
        likeButton.onclick = function () {
          comment.likes = comment.likes + 1;
          loadComments();
        }

        node.appendChild(name);
        node.appendChild(date);
        node.appendChild(message);
        node.appendChild(likes);
        node.appendChild(likeButton);

        document.getElementById("comments").appendChild(node);

        document.getElementById("name").innerHTML = localStorage.getItem("username");
        console.log(document.getElementById("name").value);
      });
    }
  };

  xhttp.open("GET", "/home", true);
  xhttp.send();
}

function insertComment() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.responseText;
      console.log(result);
      loadComments();
    }
  };

  //var name = document.getElementById("name").value;

  var name = localStorage.getItem("username");
  var checkbox = document.getElementById("togbtn");
 
    if (checkbox.checked === true) {
      name = "anonim";
      console.log("anonim");
    }

  var message = document.getElementById("message").value;

  xhttp.open("POST", "/insert", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send('{"name":"' + name + '", "message":"' + message + '"}');
}



