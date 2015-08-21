    var params={};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(str,key,value){params[key] = value;});
    var session = params["session"];

    var joined = false;
    
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
    //connection.open();
    
    // open new session
    document.querySelector('#openNewSessionButton').onclick = function() {
        connection.open();
    };
    
    connection.onopen = function(event) {
        console.log('Text chat has been opened between you and ' + event.userid);
        document.getElementById('input-text-chat').disabled = false;
        document.getElementById('openNewSessionButton').style.display = "none";
        if (!joined)
        {
            a = { "type": "join" , "data": {"name": name}};
            connection.send( a );
            joined = true;
        }
    };
    
    connection.onmessage = function(event) {
        if (event.data["type"] == "chat")
        {
            // This is the chat code
            // If we want to get the user name who sent the chat : event.data["data"]["name"]
            // If we want to get the chat message : event.data["data"]["chat"]
            // This code will append the chat into the chat box.
            var msg = '<li class="other"><div class="avatar">'+event.data["data"]["name"]+'</div>'+
                '<div class="messages"><p>'+event.data["data"]["chat"]+'</p></div></li>'
            $(".discussion").append(msg)
            // this will calculate the total scroll height of the scrollbox.
            var scrollTo_int = $(".discussion").prop('scrollHeight') + 'px';
            // This will scroll the discussion to that last chat.
            $(".discussion").slimScroll({ scrollBy: scrollTo_int});
        }
        else if (event.data["type"] == "join")
        {
            var name = event.data["data"]["name"];
            document.querySelector(".online").innerHTML += "<li id='"+name+"'><center>" + name + "</center></li>";
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
        // The above line will send our chat message to the other people, when we hit enter.
        // The below line, adds the text on the html page.
        // How do we know the name and message ?
        // a["data"]["name"]  -- name
        // a["data"]["chat"] -- message we typed.
        // class =self, meaning, I have sent the messge.
        var msg = '<li class="self"><div class="avatar">'+a["data"]["name"]+'</div>'+
                '<div class="messages"><p>'+a["data"]["chat"]+'</p></div></li>';
        $(".discussion").append(msg)
        // this will calculate the total scroll height of the scrollbox.
        var scrollTo_int = $(".discussion").prop('scrollHeight') + 'px';
        // This will scroll the discussion to that last chat.
        $(".discussion").slimScroll({ scrollBy: scrollTo_int});
        // $("#chat").append(msg)    
        this.value = '';
    };
    
    // window.onmousemove = function(event){
    //     a = { "type": "mouse" , "data": {"name": name, "x": event.clientX, "y": event.clientY}};
    //     connection.send( a );
    //     setTimeout(1000);
    // }
    
    connection.onclose = function(e) {
        a = { "type": "leave" , "data": {"name": name}};
        connection.send( a );  
    };
    
    // This is the slimscroll initialization
     $('.discussion').slimScroll({
        height: '400px'
    });