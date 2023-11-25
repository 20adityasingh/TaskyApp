var state ={
    taskList: [],
};

var taskContent= document.querySelector(".task_content");
var taskModal= document.querySelector(".task__modal_body");

// Templetes for cards on screen dynamically
 var htmlTaskContent=({id, title,description, type, url}) => `
    <div class="col-md-6 col-lg-4 mt-4" id=${id}>
        <div class="card shadow-sm task__card">
            <div class="card-header d-flex justify-content-end  gap-2 task__card_header">
                <button type="button" class="btn btn-outline-primary me-1.5" name=${id} id=${id} onclick="edittask()">
                    <i class="fas fa-pencil-alt" name=${id} id=${id} onclick="edittask()"></i>
                </button>
                
                <button type="button" class="btn btn-outline-danger me-1.5" name=${id} onclick="deletion()">
                    <i class="fas fa-trash-alt" name=${id} onclick="deletion()"></i>
                </button>
                
            </div>

            <div class="card-body task__card_body">
                ${
                    url ?
                    `<img width="100%" src=${url} alt="Card Image" class="card-img-top md-3 rounded-lg" />`:
                    `<img width="100%" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoNaLFFSdD4YhW8mqgDBSWY8nHnte6ANHQWz6Lsl37yA&s" alt="Card Image" class="card-img-top md-3 rounded-lg" />`
                }
                <h4 class="card-title task__card_bodytitle">${title}</h4>
                <p class="description trim-3-lines">${description}</p>
                <div class="tasktype text-white d-flex flex-wrap">
                    <span class="badge bg-primary m-1">${type}</span>
                </div>
            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-outline-primary float-start" data-bs-toggle="modal" data-bs-target="#showTask" onclick="opentask()" id=${id}>Open Task</button>
            </div>
        </div>
    </div>
`;

// Open Task Modal Dynamic Body
var htmlModalContent=({id, title,description, url}) =>{
    var date =new Date(parseInt(id));
    return `
        <div id=${id}>
            ${ 
                url ?
                `<img width="100%" src=${url} alt="Open Card Image" class="img-fluid placeholder__image mb-3" />`:
                `<img width="100%" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoNaLFFSdD4YhW8mqgDBSWY8nHnte6ANHQWz6Lsl37yA&s" alt="Open Card Image" class="img-fluid placeholder__image mb-3" />`
            }
            <strong class="text-muted text-sm">Created on: ${date.toDateString()}</strong>
            <h2 class="my-3">${title}</h2>
            <p class="text-muted">${description}</p>
        </div>
    `;
};

// Updating Local Browser Storage
var updateLocalStorage=() => {
    localStorage.setItem(
        "task",
        JSON.stringify({
            tasks:state.taskList,
        })
    );
};

// Backup Storage
var LoadInitialData = () => {
    var localStoragecopy=JSON.parse(localStorage.task);

    if(localStoragecopy) state.taskList=localStoragecopy.tasks;

    state.taskList.map((cardDate)=>{
        taskContent.insertAdjacentHTML("beforeend",htmlTaskContent(cardDate));
    });
};

// Add New Modal Button Function
var handleSubmit=(event)=>{
    var id =`${Date.now()}`;
    var input={
        url:document.getElementById("imageurl").value,
        title:document.getElementById("tasktitle").value,
        type:document.getElementById("tasktype").value,
        description:document.getElementById("taskdesc").value,
    };
    if(input.title=="" || input.type=="" || input.description==""){
        return alert("Please Fill Necessary Fields :-)");
    }
    taskContent.insertAdjacentHTML("beforeend",htmlTaskContent({...input, id}));
    state.taskList.push({...input, id});
    updateLocalStorage();
};

// Open Task Button Function
var opentask=(e)=>{
    if(!e) e=window.event;

    var gettask=state.taskList.find(({id})=> id===e.target.id);

    taskModal.innerHTML=htmlModalContent(gettask);
};

// Deleting task
var deletion =(e)=>{
    if(!e) e=window.event;

    var targetID = e.target.getAttribute("name");
    var type = e.target.tagName;
    var remove = state.taskList.filter(({id})=> id !==targetID);
    updateLocalStorage();
    if(type === "BUTTON"){
        return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.parentNode
        );
    }
    else if(type === "I"){
        return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.parentNode.parentNode
        );
    }
}

// Edit Task
var edittask=(e)=>{
    if(!e) e=window.event;

    var targetID = e.target.id;
    var type = e.target.tagName;

    let parentNode;
    let taskTitle;
    let taskType;
    let taskDescription;
    let submitbutton;
    
    if(type === "BUTTON"){
        parentNode=e.target.parentNode.parentNode;
    }
    else if(type === "I"){
        parentNode=e.target.parentNode.parentNode.parentNode;
    }

    taskTitle=parentNode.childNodes[3].childNodes[3];
    taskDescription=parentNode.childNodes[3].childNodes[5];
    taskType=parentNode.childNodes[3].childNodes[7].childNodes[1];
    submitbutton=parentNode.childNodes[5].childNodes[1];

    taskTitle.setAttribute("contenteditable","true");
    taskDescription.setAttribute("contenteditable","true");
    taskType.setAttribute("contenteditable","true");
    submitbutton.setAttribute("onclick","saveEdit()");

    submitbutton.removeAttribute("data-bs-toggle");
    submitbutton.removeAttribute("data-bs-target");
    submitbutton.innerHTML="Save Edit";
};

// Save Edit
var saveEdit=(e)=>{
    if(!e) e=window.event;

    var targetID = e.target.id;
    var parentNode = e.target.parentNode.parentNode;
    var taskTitle = parentNode.childNodes[3].childNodes[3];
    var taskDescription = parentNode.childNodes[3].childNodes[5];
    var taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
    var submitbutton = parentNode.childNodes[5].childNodes[1];

    var updateData={
        taskTitle:taskTitle.innerHTML,
        taskDescription:taskDescription.innerHTML,
        taskType:taskType.innerHTML
    };

    var statecopy=state.taskList;
    statecopy=statecopy.map((task)=> task.id===targetID ? {
        id:task.id,
        title:updateData.taskTitle,
        description:updateData.taskDescription,
        type:updateData.taskType,
        url:task.url,
    }: task );

    state.taskList=statecopy;
    updateLocalStorage();

    taskTitle.setAttribute("contenteditable","false");
    taskDescription.setAttribute("contenteditable","false");
    taskType.setAttribute("contenteditable","false");
    submitbutton.setAttribute("onclick","opentask()");

    submitbutton.setAttribute("data-bs-toggle","modal");
    submitbutton.setAttribute("data-bs-target","#showTask");
    submitbutton.innerHTML="Open Task";
}

// Search Task
var searchTask=(e)=>{
    if(!e) e=window.event;
    
    while (taskContent.firstChild) {
        taskContent.removeChild(taskContent.firstChild);
    };

    var result = state.taskList.filter(({title})=> title.includes(e.target.value));

    result.map((cardData)=> {
        taskContent.insertAdjacentHTML("beforeend",htmlTaskContent(cardData));
    });
}