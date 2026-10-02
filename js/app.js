// ========================================
// ELEMENT SELECTORS
// ========================================

const taskInput = document.getElementById("taskInput");

const addTaskBtn = document.getElementById("addTaskBtn");

const loadSamplesBtn = document.getElementById("loadSamplesBtn");

const taskList = document.getElementById("taskList");

const taskMessage = document.getElementById("taskMessage");

const totalCount = document.getElementById("totalCount");

const pendingCount = document.getElementById("pendingCount");

const completedCount = document.getElementById("completedCount");


// ========================================
// TASK ID COUNTER
// ========================================

let taskCounter = 0;


// ========================================
// CREATE TASK ELEMENT
// ========================================

function createTaskElement(taskText, taskId) {

    // Create the <li>
    const taskItem = document.createElement("li");

    // Add class
    taskItem.classList.add("task-item");

    // Add required data attributes
    taskItem.dataset.taskId = taskId;
    taskItem.dataset.state = "pending";


    // ------------------------------------
    // Create task text
    // ------------------------------------

    const taskTextSpan = document.createElement("span");

    taskTextSpan.classList.add("task-text");

    taskTextSpan.textContent = taskText;


    // ------------------------------------
    // Create Complete button
    // ------------------------------------

    const completeButton = document.createElement("button");

    completeButton.classList.add("complete-btn");

    completeButton.textContent = "Complete";


    // ------------------------------------
    // Create Edit button
    // ------------------------------------

    const editButton = document.createElement("button");

    editButton.classList.add("edit-btn");

    editButton.textContent = "Edit";


    // ------------------------------------
    // Create Remove button
    // ------------------------------------

    const removeButton = document.createElement("button");

    removeButton.classList.add("remove-btn");

    removeButton.textContent = "Remove";


    // ------------------------------------
    // Add elements to task item
    // ------------------------------------

    taskItem.appendChild(taskTextSpan);

    taskItem.appendChild(completeButton);

    taskItem.appendChild(editButton);

    taskItem.appendChild(removeButton);


    // Return the task
    return taskItem;
}


// ========================================
// ADD TASK
// ========================================

function addTask(taskText) {

    // Remove whitespace from beginning/end
    const text = taskText.trim();


    // ------------------------------------
    // Validate empty task
    // ------------------------------------

    if (text === "") {

        taskMessage.textContent = "Task cannot be empty";

        return;
    }


    // ------------------------------------
    // Create unique task ID
    // ------------------------------------

    taskCounter++;

    const taskId = `task-${taskCounter}`;


    // ------------------------------------
    // Create task element
    // ------------------------------------

    const taskItem = createTaskElement(text, taskId);


    // ------------------------------------
    // Add task to DOM
    // ------------------------------------

    taskList.appendChild(taskItem);


    // ------------------------------------
    // Clear input
    // ------------------------------------

    taskInput.value = "";


    // ------------------------------------
    // Clear error message
    // ------------------------------------

    taskMessage.textContent = "";


    // ------------------------------------
    // Update counters
    // ------------------------------------

    updateTaskCounts();
}


// ========================================
// TOGGLE TASK COMPLETE
// ========================================

function toggleTaskComplete(taskItem) {

    // Toggle completed class
    taskItem.classList.toggle("completed");


    // Change data-state
    if (taskItem.dataset.state === "pending") {

        taskItem.dataset.state = "completed";

    } else {

        taskItem.dataset.state = "pending";
    }


    // Update counters
    updateTaskCounts();
}


// ========================================
// BEGIN TASK EDIT
// ========================================

function beginTaskEdit(taskItem) {

    // Find current task text
    const taskTextSpan = taskItem.querySelector(".task-text");


    // Get current text
    const currentText = taskTextSpan.textContent;


    // Create edit input
    const editInput = document.createElement("input");


    // Add required class
    editInput.classList.add("edit-input");


    // Set input type
    editInput.type = "text";


    // Put current task text into input
    editInput.value = currentText;


    // Replace text span with input
    taskTextSpan.replaceWith(editInput);


    // Find Edit button
    const editButton = taskItem.querySelector(".edit-btn");


    // Change button to Save
    editButton.textContent = "Save";


    // Automatically focus input
    editInput.focus();
}


// ========================================
// SAVE TASK EDIT
// ========================================

function saveTaskEdit(taskItem) {

    // Find edit input
    const editInput = taskItem.querySelector(".edit-input");


    // Get edited text
    const newText = editInput.value.trim();


    // ------------------------------------
    // Validate empty edit
    // ------------------------------------

    if (newText === "") {

        taskMessage.textContent = "Task cannot be empty";

        return;
    }


    // ------------------------------------
    // Create new task text span
    // ------------------------------------

    const newTaskText = document.createElement("span");


    // Add class
    newTaskText.classList.add("task-text");


    // Safely add text
    newTaskText.textContent = newText;


    // ------------------------------------
    // Replace input with span
    // ------------------------------------

    editInput.replaceWith(newTaskText);


    // ------------------------------------
    // Change Save back to Edit
    // ------------------------------------

    const editButton = taskItem.querySelector(".edit-btn");

    editButton.textContent = "Edit";


    // Clear error
    taskMessage.textContent = "";
}


// ========================================
// REMOVE TASK
// ========================================

function removeTask(taskItem) {

    // Remove only the selected task
    taskItem.remove();


    // Update counters
    updateTaskCounts();
}


// ========================================
// UPDATE TASK COUNTS
// ========================================

function updateTaskCounts() {

    // Get all current task elements
    const tasks = taskList.querySelectorAll(".task-item");


    // Start counters
    let pending = 0;

    let completed = 0;


    // Check every task
    tasks.forEach(function(task) {

        if (task.dataset.state === "completed") {

            completed++;

        } else {

            pending++;
        }

    });


    // Display total
    totalCount.textContent = tasks.length;


    // Display pending
    pendingCount.textContent = pending;


    // Display completed
    completedCount.textContent = completed;
}


// ========================================
// HANDLE TASK LIST CLICK
// EVENT DELEGATION
// ========================================

function handleTaskListClick(event) {

    // Get clicked element
    const clickedButton = event.target;


    // ------------------------------------
    // Check if clicked element is a button
    // ------------------------------------

    if (
        !clickedButton.matches(".complete-btn") &&
        !clickedButton.matches(".edit-btn") &&
        !clickedButton.matches(".remove-btn")
    ) {

        return;
    }


    // ------------------------------------
    // Find the task that owns the button
    // ------------------------------------

    const taskItem = clickedButton.closest(".task-item");


    // ------------------------------------
    // COMPLETE
    // ------------------------------------

    if (clickedButton.matches(".complete-btn")) {

        toggleTaskComplete(taskItem);

        return;
    }


    // ------------------------------------
    // EDIT / SAVE
    // ------------------------------------

    if (clickedButton.matches(".edit-btn")) {

        if (clickedButton.textContent === "Edit") {

            beginTaskEdit(taskItem);

        } else {

            saveTaskEdit(taskItem);
        }

        return;
    }


    // ------------------------------------
    // REMOVE
    // ------------------------------------

    if (clickedButton.matches(".remove-btn")) {

        removeTask(taskItem);

        return;
    }
}


// ========================================
// LOAD SAMPLE TASKS
// ========================================

function loadSampleTasks() {

    // Create DocumentFragment
    const fragment = document.createDocumentFragment();


    // Required sample tasks
    const sampleTasks = [
        "Review DOM selectors",
        "Practice createElement",
        "Study event delegation"
    ];


    // Create all sample tasks
    sampleTasks.forEach(function(taskText) {

        // Create unique ID
        taskCounter++;

        const taskId = `task-${taskCounter}`;


        // Create task
        const taskItem = createTaskElement(
            taskText,
            taskId
        );


        // Add task to fragment
        fragment.appendChild(taskItem);

    });


    // Append fragment only once
    taskList.appendChild(fragment);


    // Update counts
    updateTaskCounts();
}


// ========================================
// ADD TASK BUTTON
// ========================================

addTaskBtn.addEventListener("click", function() {

    addTask(taskInput.value);

});


// ========================================
// LOAD SAMPLE BUTTON
// ========================================

loadSamplesBtn.addEventListener("click", function() {

    loadSampleTasks();

});


// ========================================
// SINGLE EVENT DELEGATION LISTENER
// ========================================

taskList.addEventListener(
    "click",
    handleTaskListClick
);


// ========================================
// INITIAL COUNTS
// ========================================

updateTaskCounts();
