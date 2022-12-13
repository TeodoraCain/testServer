
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
        
        var data = new Date(comment.date);

        var textName = document.createTextNode("Nume: " + comment.userName);
        var textDate = document.createTextNode("Data: " + data);
        var textMessage = document.createTextNode(comment.comment);
        var givenLikes = document.createTextNode("Likes: " + comment.likes);
        var likeButtonText = document.createTextNode("Like");

        name.appendChild(textName);
        date.appendChild(textDate);
        message.appendChild(textMessage);
        likes.appendChild(givenLikes);
        likes.setAttribute("nrOfLikes", comment.likes);
        likes.setAttribute("id", comment.ID);

        likeButton.innerHTML = "Like";
        likeButton.style = "background-color : rgb(43, 83, 214)";
        likeButton.setAttribute("clicked", false);
        likeButton.onclick = function () {
          var likes = document.getElementById(comment.ID);
          
          if (this.clicked === false) {
            comment.likes = comment.likes - 1;
            likes.innerHTML = "Likes: " + comment.likes;
            this.clicked = true;
            this.innerHTML = "Like";
          } else {
            comment.likes = comment.likes + 1;
            likes.innerHTML = "Likes: " + comment.likes;
            this.clicked = false;
            this.innerHTML = "Unlike";
          }
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

  var comments = document.getElementById("comments");
  comments.scrollTo(0, comments.scrollHeight);
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

  var name = localStorage.getItem("username");
  var checkbox = document.getElementById("togbtn");

  if (checkbox.checked === true) {
    name = "Anonim";
  }

  var message = document.getElementById("message").value;

  xhttp.open("POST", "/insert", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send('{"name":"' + name + '", "message":"' + message + '"}');

}

// function updateLikes(likes, id) {
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       var result = this.responseText;
//       console.log(result);
//       loadComments();
//     }
//   };

//   xhttp.open("POST", "/update", true);
//   xhttp.setRequestHeader("Content-Type", "application/json");
//   xhttp.send('{"likes":"' + likes +'"}');
// }

//changes name to anonymous on click
function changeName() {
  var checkbox = document.getElementById("togbtn");
  if (checkbox.checked === true) {
    document.getElementById("name").innerHTML = "Anonim";
  } else {
    document.getElementById("name").innerHTML = localStorage.getItem("username");
  }
}

