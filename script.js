const state ={
    taskList: [],
};

const taskContent= document.querySelector(".task_content");
const taskModal= document.querySelector(".task__modal_body");

console.log(taskContent);

// Templetes for cards on screen
 const htmlTaskContent=({id, title,description, type, url}) =>{
    <div class="col-md-6 col-lg-4 mt-4" id={id}$>
        <div class="card shadow-sm task__card">
            <div class="card-header d-flex justify-content-end task__card_header">
                <button type="button" class="btn btn-outline-primary me-1.5" name={id}$></button>
                <i class="fas fa-pencil-alt" name={id}$></i>
                <button type="button" class="btn btn-outline-danger me-1.5" name={id}$></button>
                <i class="fas fa-trash-alt" name={id}$></i>
            </div>
            <div class="">

            </div>
        </div>
    </div>
 };