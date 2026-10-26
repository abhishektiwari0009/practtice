# 📝 Simple To-Do List

A lightweight, beginner-friendly To-Do List application built using plain **HTML**, **CSS**, and **JavaScript** (Vanilla JS).

---

## 📁 Project Structure

```text
To-Do/
├── todo.html     # Page structure and form elements
├── todo.css      # Styling, colors, layout, buttons, and strikethrough effect
├── todo.js       # Core logic (adding, completing, editing, and deleting tasks)
└── README.md     # Documentation and beginner's guide
```

---

## 🚀 How to Run the App

1. Open the `To-Do` folder on your computer.
2. Double-click on `todo.html` (or right-click and choose **Open With > Google Chrome / Any Browser**).
3. Type a task into the yellow box and click **Add** (or press `Enter`).

---

## 💡 Features & How It Works

### 1. Add Tasks
- Type your task in the input box and press **Enter** or click **Add**.
- `event.preventDefault()` stops the form from refreshing the page.
- A new `<li>` element is created dynamically and appended to the `<ul>`.

### 2. Mark as Completed
- Click directly on the task text.
- `listItem.classList.toggle('completed')` adds or removes a strikethrough line.

### 3. Edit Tasks (New ✨)
- Click the blue **Edit** button next to any task.
- The task text turns into an editable text field, and the button changes to **Save**.
- Update your task and click **Save** (or press `Enter` on your keyboard) to save the changes.

### 4. Delete Tasks
- Click the red **Delete** button to immediately remove the task from the list using `listItem.remove()`.

---

## 🔍 How the Edit Function Works (for Beginners)

Inside `todo.js`, the edit button toggles between **Edit Mode** and **Save Mode**:

```javascript
editButton.addEventListener('click', function () {
    if (editButton.textContent === 'Edit') {
        // 1. Create an input box with the current task text
        const editInput = document.createElement('input');
        editInput.value = taskSpan.textContent;

        // 2. Replace the text span with the input box
        listItem.replaceChild(editInput, taskSpan);
        editButton.textContent = 'Save';
        editInput.focus();
    } else {
        // 3. Read the new text
        const editInput = listItem.querySelector('.edit-input');
        taskSpan.textContent = editInput.value.trim();

        // 4. Put the text span back in place of the input box
        listItem.replaceChild(taskSpan, editInput);
        editButton.textContent = 'Edit';
    }
});
```

---

## 🌟 Key Concepts You Learned
- **DOM Selection**: `document.querySelector()`
- **Event Listeners**: `element.addEventListener('click', ...)` and `element.addEventListener('submit', ...)`
- **Dynamic Element Creation**: `document.createElement()` and `parentElement.appendChild()`
- **Replacing Elements in DOM**: `parentElement.replaceChild(newChild, oldChild)`
- **CSS Class Toggling**: `element.classList.toggle()`
- **DOM Removal**: `element.remove()`
