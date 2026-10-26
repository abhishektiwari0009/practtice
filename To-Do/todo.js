// Step 1: Get references to HTML elements
const todoForm = document.querySelector('.todo-input');
const todoInput = document.querySelector('.listinput');
const todoList = document.querySelector('.todolist');

// Step 2: Listen for when the form is submitted (Add button clicked or Enter pressed)
todoForm.addEventListener('submit', function (event) {
    // Prevent default form submission (stops page refresh)
    event.preventDefault();

    // Get the task text and remove extra spaces
    const taskText = todoInput.value.trim();

    // Do nothing if input is empty
    if (taskText === '') {
        return;
    }

    // Step 3: Create a new <li> element for the task
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';

    // Create a text span to hold the task description
    const taskSpan = document.createElement('span');
    taskSpan.className = 'todo-text';
    taskSpan.textContent = taskText;

    // Click on task text to mark as completed or uncompleted
    taskSpan.addEventListener('click', function () {
        listItem.classList.toggle('completed');
    });

    // Create a container for the action buttons (Edit & Delete)
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group';

    // Step 4: Create the Edit button and its function
    const editButton = document.createElement('button');
    editButton.className = 'edit-btn';
    editButton.textContent = 'Edit';
    editButton.type = 'button';

    // When Edit is clicked: toggle between editing mode and saving mode
    editButton.addEventListener('click', function () {
        if (editButton.textContent === 'Edit') {
            // 1. Enter edit mode: replace text span with an input field
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.className = 'edit-input';
            editInput.value = taskSpan.textContent;

            // Replace span with input field
            listItem.replaceChild(editInput, taskSpan);
            editButton.textContent = 'Save';
            editInput.focus();

            // Allow saving by pressing Enter inside the edit input
            editInput.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    editButton.click();
                }
            });
        } else {
            // 2. Save mode: read updated text and restore the span
            const editInput = listItem.querySelector('.edit-input');
            const updatedText = editInput.value.trim();

            if (updatedText !== '') {
                taskSpan.textContent = updatedText;
            }

            // Replace input field back with the text span
            listItem.replaceChild(taskSpan, editInput);
            editButton.textContent = 'Edit';
        }
    });

    // Step 5: Create the Delete button and its function
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = 'Delete';
    deleteButton.type = 'button';

    // When Delete is clicked: remove the <li> from the list
    deleteButton.addEventListener('click', function () {
        listItem.remove();
    });

    // Step 6: Assemble the elements
    buttonGroup.appendChild(editButton);
    buttonGroup.appendChild(deleteButton);

    listItem.appendChild(taskSpan);
    listItem.appendChild(buttonGroup);

    // Step 7: Add the task to the list on the page
    todoList.appendChild(listItem);

    // Step 8: Clear input for next task
    todoInput.value = '';
});
