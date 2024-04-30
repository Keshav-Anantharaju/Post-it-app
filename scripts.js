const displayResult=document.getElementById('your-name');
const resultText=document.getElementById('result')
const runningline=document.getElementById('running-line')
const addTaskBtn=document.getElementById('add-task')
const taskBox=document.getElementById('task-box')
const addOrUpdateTaskBtn=document.getElementById('addorupdatetask')
const taskBoxCloseBtn=document.getElementById('task-box-close')
const titleInput=document.getElementById('title-input')
const dateInput=document.getElementById('date-input')
const descriptionInput=document.getElementById('description-input')
const tasksBox=document.getElementById('tasks-box')
const updateBtn=document.getElementById('update-btn')
const discardWindow=document.getElementById('discard-window')
const cancelBtn=document.getElementById('cancel-btn')
const discardBtn=document.getElementById('discard-btn')
const current_task={}
const tasks={
};
let task_id=""


updateTaskBox();

function openWindow(){
	taskBox.classList.toggle('hidden');
	addTaskBtn.classList.toggle('hidden');
	tasksBox.classList.toggle('hidden')
}

function addTask(){
	current_task['title']="";
	current_task['date']="";
	current_task['description']="";
	openWindow()
}

function checkInput(){
	return ((titleInput.value!==current_task['title'] || dateInput.value!==current_task['date'] || descriptionInput.value!==current_task['description']));	
}

function closeWindow(){
	openWindow()
	titleInput.value=""
	dateInput.value=""
	descriptionInput.value=""
	Object.keys(current_task).forEach(key => delete current_task[key]);
	task_id=""
}

function cancelBox(){
	if (checkInput()){
		warning('closebtn')
	}
	else{
	addOrUpdateTaskBtn.innerText==="Add Task"
	task_id=""
	closeWindow()
	}

}

function warning(e){
	if (e==="closebtn"){
		cancelBtn.innerHTML="Cancel"
		discardBtn.innerHTML="Discard"
	}
	else if(e==="deletebtn"){
		cancelBtn.innerHTML="No"
		discardBtn.innerHTML="Yes"
	}
	discardWindow.classList.toggle('hidden')
	task_id=""

}
function addOrUpdateTask(){
	if(titleInput.value===""|| descriptionInput.value===""||dateInput.value===""){
		alert("Fill all the details")
		return
	}

	if (addOrUpdateTaskBtn.innerText==="Update Task"){
		console.log(task_id)
		delete tasks[task_id]
		console.log(tasks)
		addOrUpdateTaskBtn.innerText==="Add Task"
	}
	const task={
		title: titleInput.value,
		date: dateInput.value,
		description: descriptionInput.value
	};
	task_id=(titleInput.value+dateInput.value);
	console.log(task_id)
	tasks[task_id]=task;
	updateTaskBox();
	closeWindow();
}

function updateTaskBox(){
	tasksBox.innerHTML=""
	Object.keys(tasks).forEach((value)=>{
		tasksBox.innerHTML+=`<div id="${value}" class="todo-box">
							<h1><b>${tasks[value]['title']}</b></h1>
							<p><b>Date: </b>${tasks[value]['date'].split('-').reverse().join('-')}</p>
							<p><b>Description: </b>${tasks[value]['description']}</p>
							<div>
								<button id="update-btn" class="btn btn-warning" onclick=updateWindow(this)>Update</button>
								<button id="delete-btn" class="btn btn-danger" onclick=deleteBtn(this)>Delete</button>
							</div>
						</div>`
	})
	task_id=""
}

function deleteBtn(e){
	warning('deletebtn')
	task_id=e.parentNode.parentNode.id
}

function discardOrDeleteOrReplace(e){
	if (e.innerHTML==="Discard"){
		closeWindow();
		discardWindow.classList.toggle('hidden');
	}
	else if(e.innerHTML==="Yes"){
		delete tasks[task_id]
		updateTaskBox()
		task_id=NaN
		discardWindow.classList.toggle('hidden')
	}
}
	
function updateWindow(e){
	task_id=e.parentNode.parentNode.id;
	current_task['title']=titleInput.value=tasks[task_id]['title'];
	current_task['date']=dateInput.value=tasks[task_id]['date'];
	current_task['description']=descriptionInput.value=tasks[task_id]['description'];
	task_id=(titleInput.value+dateInput.value)
	addOrUpdateTaskBtn.innerText="Update Task";

	openWindow();
}

addTaskBtn.addEventListener("click",addTask)
taskBoxCloseBtn.addEventListener('click',cancelBox)
addOrUpdateTaskBtn.addEventListener('click',addOrUpdateTask)
cancelBtn.addEventListener('click',()=>{
	discardWindow.classList.toggle('hidden');
})


