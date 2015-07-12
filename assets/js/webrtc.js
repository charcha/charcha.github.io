    var params={};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(str,key,value){params[key] = value;});
    var session = params["session"];

    var a;
    
    var name = prompt("Please enter your name", "");
    
    var mouses = {};
    
    var connection = new RTCMultiConnection();
    
    // easiest way to customize what you need!
    connection.session = {
        audio: true,
        video: false,
         data: true 
    };
    
    // on getting local or remote media stream
    connection.onstream = function(e) {
        var element = e.mediaElement;
        element.style.display = "none";
        document.body.appendChild(element);
    };
    
    // setup signaling channel
    connection.connect();
    connection.open();
    
    // open new session
    //document.querySelector('#openNewSessionButton').onclick = function() {
    //    connection.open();
    //};
    
    connection.onopen = function(event) {
        console.log('Text chat has been opened between you and ' + event.userid);
        document.getElementById('input-text-chat').disabled = false;
        document.getElementById('openNewSessionButton').style.display = "none";
        a = { "type": "join" , "data": {"name": name}};
        connection.send( a );
    };
    
    connection.onmessage = function(event) {
        if (event.data["type"] == "chat")
        {
            var msg = "<li><div class='header'><strong class='primary-font'>" + event.data["data"]["name"] + "</strong></div>";
            msg +=  "<p>" + event.data["data"]["chat"] + "</p></li>";
            document.querySelector("#chat").innerHTML +=  msg;
        }
        else if (event.data["type"] == "join")
        {
            var msg = event.data["data"]["name"] + " has joined";
            document.querySelector("#chat").innerHTML += "<li><center>" + msg + "</center></li>";
        }
        else if (event.data["type"] == "leave")
        {
            var msg = event.data["data"]["name"] + " has left";
            document.querySelector("#chat").innerHTML += "<li><center>" + msg + "</center></li>";
        }
        var objDiv = document.getElementById("chatbox");
        objDiv.scrollTop = objDiv.scrollHeight;
        // else if (event.data["type"] == "mouse")
        // {
        //     var mousename = event.data["data"]["name"];
        //     if (mouses[mousename])
        //     {
        //         var mouse = mouses[mousename]["mouse"];
        //         mouse.style.position = "absolute";
        //         mouse.style.left = event.data["data"]["x"];
        //         mouse.style.top = event.data["data"]["y"];
        //     }
        //     else
        //     {
        //         var mouse = document.createElement("H6");
        //         mouse.innerHTML = mousename;
        //         document.body.appendChild(mouse);
        //         mouses[mousename] = {"mouse": mouse}
        //         mouse.style.position = "absolute";
        //         mouse.style.left = event.data["data"]["x"];
        //         mouse.style.top = event.data["data"]["y"];
        //     }
        // }
    };
    
    document.getElementById('input-text-chat').onkeyup = function(e) {
        if(e.keyCode != 13) return; // if it is not Enter-key
        var value = this.value.replace(/^\s+|\s+$/g, '');
        if(!value.length) return; // if empty-spaces
        
        a = { "type": "chat" , "data": {"name": name, "chat": value}};
        
        connection.send( a );
        var msg = "<li><div class='header'><strong class='primary-font'>" + a["data"]["name"] + "</strong></div>";
            msg +=  "<p>" + a["data"]["chat"] + "</p></li>";
        //document.querySelector("#chat").appendChild(document.createTextNode(msg));  
        document.querySelector("#chat").innerHTML +=  msg;
        var objDiv = document.getElementById("chatbox");
        objDiv.scrollTop = objDiv.scrollHeight;
        // $("#chat").append(msg)    
        this.value = '';
    };
    
    // window.onmousemove = function(event){
    //     a = { "type": "mouse" , "data": {"name": name, "x": event.clientX, "y": event.clientY}};
    //     connection.send( a );
    //     setTimeout(1000);
    // }
    
    connection.onleave = function(e) {
        a = { "type": "leave" , "data": {"name": name}};
        connection.send( a );  
    };
    