const state ={
    taskList: [],
};

const taskContent= document.querySelector(".task_content");
const taskModal= document.querySelector(".task__modal_body");

// console.log(taskContent);

// Templetes for cards on screen
 const htmlTaskContent=({id, title,description, type, url}) => `
    <div class="col-md-6 col-lg-4 mt-4" id=${id}>
        <div class="card shadow-sm task__card">
            <div class="card-header d-flex justify-content-end task__card_header">
                <button type="button" class="btn btn-outline-primary me-1.5" name=${id}></button>
                <i class="fas fa-pencil-alt" name=${id}></i>
                <button type="button" class="btn btn-outline-danger me-1.5" name=${id}></button>
                <i class="fas fa-trash-alt" name=${id}></i>
            </div>

            <div class="card-body task__card_body">
                ${
                    url&&
                    `<img width="100%" src=${url} alt="Card Image" class="card-img-top md-3 rounded-lg" />`
                }
                <h4 class="card-title task__card_bodytitle">${title}</h4>
                <p class="description trim-3-lines">${description}</p>
                <div class="tasktype text-white d-flex flex-wrap">
                    <span class="badge bg-primary m-1>${type}</span>
                </div>
            </div>

            <div class="card-footer">
                <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#showTask">Open Task</button>
            </div>
        </div>
    </div>
`;

const htmlModalContent=({id, title,description, url}) =>{
    const date =new Date(parseInt(id));
    return `
        <div id=${id}>
            ${ 
                url&&
                `<img width="100%" src=${url} alt="Open Card Image" class="img-fluid placeholder__image mb-3" />`
            }
            <strong class="text-muted text-sm">Created on: ${date.toDateString()}</strong>
            <h2 class="my-3">${title}</h2>
            <p class="text-muted">${description}</p>
        </div>
    `;
};

const updateLocalStorage=() => {
    localStorage.setItem(
        "tasky",
        JSON.stringify({
            tasks:state.taskList,
        })
    );
};

const LoadInitialData = () => {
    const localStoragecopy=JSON.parse(localStorage.tasks);

    if(localStoragecopy) state.taskList=localStoragecopy.tasks;

    state.taskList.map((cardDate)=>{
        taskContent.insertAdjacentHTML("beforeend",htmlTaskContent(cardDate));
    });
};

const handleSubmit=(event)=>{
    const id =`${Date.now}`;
    const input={
        url:document.getElementById("imageurl").value,
        title:document.getElementById("tasktitle").value,
        type:document.getElementById("tasktype").value,
        description:document.getElementById("taskdesc").value
    };
    taskContent.insertAdjacentHTML("beforeend",htmlTaskContent({...input, id}));
    state.taskList.push({...input, id});
    updateLocalStorage();
};