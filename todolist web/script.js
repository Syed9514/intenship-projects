document.getElementById("addTaskBtn").addEventListener("click", addTask);

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    
    if (taskText !== "") {
        const taskList = document.getElementById("taskList");

        // Create a new list item
        const li = document.createElement("li");
        li.textContent = taskText;

        // Create a delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function () {
            taskList.removeChild(li);
        });

        li.appendChild(deleteBtn);

        // Toggle completion on click
        li.addEventListener("click", function () {
            li.classList.toggle("completed");
        });

        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";
    }
}