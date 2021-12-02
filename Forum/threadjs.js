
                function addid(){
                    //default 0
                    var tid = 0;
                    try{
                    const queryString = window.location.search;
                    const parameters = new URLSearchParams(queryString);
                    tid = parameters.get('tid');
                    //console.log(tid);
                    }catch(e){
                        tid = 0;//useless but whatever
                    }
                    document.getElementById("formidbox").value = tid;
                }

                function submitleform(){

                    let username = document.getElementById("usernamebox").value
                    let password = document.getElementById("passwordbox").value
                    let content = document.getElementById("messagebox").value
                    let tid = document.getElementById("formidbox").value


                    console.log("username: " + username);
                     console.log("password: " + password);
                     console.log("content: " + content);
                     console.log("tid: " + tid);

                    let requestjsontext = "{\"username\":\"" + username + "\",\"password\":\""+password+"\",\"content\":\""+content+"\",\"tid\":\""+tid+"\"}";//do I have to initialise?
          
           
                    let response = fetch("http://localhost:8080/fileupload",{method:"Post",headers:{'Content-Type': 'application/json'},body:requestjsontext});
                    response.then(result=>{
                        console.log("form should have been sent:" + result); 
                    });
                }

                function loadthread(id){
                    //opens link with thread
                    window.location.replace("http://localhost:8080/threadviewer?=" + id);
                }

                function loadpage(){
                    if (document.getElementById("offsetnumber").value == null ||  document.getElementById("offsetnumber").value == undefined){
                        //window.location.replace("http://localhost:8080/threadloader?offset=0");
                        console.log(window.location.href());
                    }
                    //window.location.replace("http://localhost:8080/threadloader?offset="+document.getElementById("offsetnumber").value);
                }

                function changevalue(by){
                    if (document.getElementById("offsetnumber").value == null ||  document.getElementById("offsetnumber").value == undefined){
                        document.getElementById("offsetnumber").value = 0;
                    }
                    document.getElementById("offsetnumber").value = parseInt(document.getElementById("offsetnumber").value,10) + by;
                }
