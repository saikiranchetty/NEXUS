function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const taskList = document.getElementById('taskList');
    
    const li = document.createElement('li');
    li.textContent = taskText;

    li.addEventListener('click', function() {
        li.classList.toggle('completed');
    });

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent triggering the li click event
        taskList.removeChild(li);
    });

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    input.value = ''; // Clear the input field
}
