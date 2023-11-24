const state ={
    taskList: [],
};

const taskContent= document.querySelector(".task_content");
const taskModal= document.querySelector(".task__modal_body");

// Templetes for cards on screen dynamically
 const htmlTaskContent=({id, title,description, type, url}) => `
    <div class="col-md-6 col-lg-4 mt-4" id=${id}>
        <div class="card shadow-sm task__card">
            <div class="card-header d-flex justify-content-end  gap-2 task__card_header">
                <button type="button" class="btn btn-outline-primary me-1.5" name=${id}>
                    <i class="fas fa-pencil-alt" name=${id}></i>
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
const htmlModalContent=({id, title,description, url}) =>{
    const date =new Date(parseInt(id));
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
const updateLocalStorage=() => {
    localStorage.setItem(
        "task",
        JSON.stringify({
            tasks:state.taskList,
        })
    );
};

// Backup Storage
const LoadInitialData = () => {
    const localStoragecopy=JSON.parse(localStorage.task);

    if(localStoragecopy) state.taskList=localStoragecopy.tasks;

    state.taskList.map((cardDate)=>{
        taskContent.insertAdjacentHTML("beforeend",htmlTaskContent(cardDate));
    });
};

// Add New Modal Button Function
const handleSubmit=(event)=>{
    const id =`${Date.now()}`;
    const input={
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
const opentask=(e)=>{
    if(!e) e=window.event;

    const gettask=state.taskList.find(({id})=> id===e.target.id);

    taskModal.innerHTML=htmlModalContent(gettask);
};

// Deleting task
const deletion =(e)=>{
    if(!e) e=window.event;

    const targetID = e.target.getAttribute("name");
    const type = e.target.tagName;
    const remove = state.taskList.filter(({id})=> id!==targetID);
    updateLocalStorage();
    if(type === "BUTTON"){
        return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.parentNode
        )
    }
    else{
        return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.parentNode.parentNode
        )
    }
}