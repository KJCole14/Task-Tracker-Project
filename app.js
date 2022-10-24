// tells the page what to do upon loading
window.addEventListener('load', () => {
    const form = document.querySelector('#new-task-container');
    const input = document.querySelector('#task-input');
    //el = element
    const list_el = document.querySelector('#tasks')

    form.addEventListener('submit', (s) => {
        //prevents the page from reloading when we submit a task    
        s.preventDefault();

        //makes it so we get an alert if task input is blank
        const task = input.value;
        if (!task) {
            alert("Please submit a proper task")
            return;
        }
        //used to test to make sure validation was working as intended
        // else {
        //     console.log("Submitted");
        // }

        //makes a new element
        const task_el = document.createElement("div");
        //assigns new element the class of "task"
        task_el.classList.add("task");

        // same process but more specific
        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        // puts it at the end of the element
        task_el.appendChild(task_content_el);

        // same process but for the input
        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly");

        task_content_el.appendChild(task_input_el);

        // doing the same but for the buttons
        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Edit";

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Delete"

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);

        input.value = "";

        // making the edit and delete buttons work

        // tells our code that when the button is clicked, it is no longer "readonly" and can be edited
        task_edit_el.addEventListener('click', () => {
            if (task_edit_el.innerText.toLocaleLowerCase() == "edit") {
                task_input_el.removeAttribute("readonly");
                // auto focus so we wont need to select it again
                task_input_el.focus();
                // "Edit" button turns into a "Save" button
                task_edit_el.innerText = "Save";
            } else {
                // turns it back to normal
                task_input_el.setAttribute("readonly", "readonly");
                task_edit_el.innerText = "Edit";
            }
          
        });

        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
        });
    });
});
