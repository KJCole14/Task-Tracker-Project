// //Attempt 2
// // tells the page what to do upon loading
// window.addEventListener('load', () => {
//     const form = document.querySelector('#new-task-container');
//     const input = document.querySelector('#task-input');
//     //el = element
//     const list_el = document.querySelector('#tasks')

//     form.addEventListener('submit', (s) => {
//         //prevents the page from reloading when we submit a task    
//         s.preventDefault();

//         //makes it so we get an alert if task input is blank
//         const task = input.value;
//         if (!task) {
//             alert("Please submit a proper task")
//             return;
//         }
//         //used to test to make sure validation was working as intended
//         // else {
//         //     console.log("Submitted");
//         // }

//         //makes a new element
//         const task_el = document.createElement("div");
//         //assigns new element the class of "task"
//         task_el.classList.add("task");

//         // same process but more specific
//         const task_content_el = document.createElement("div");
//         task_content_el.classList.add("content");

//         // puts it at the end of the element
//         task_el.appendChild(task_content_el);

//         // same process but for the input
//         const task_input_el = document.createElement("input");
//         task_input_el.classList.add("text");
//         task_input_el.type = "text";
//         task_input_el.value = task;
//         task_input_el.setAttribute("readonly", "readonly");

//         task_content_el.appendChild(task_input_el);

//         // doing the same but for the buttons
//         const task_actions_el = document.createElement("div");
//         task_actions_el.classList.add("actions");

//         const task_edit_el = document.createElement("button");
//         task_edit_el.classList.add("edit");
//         task_edit_el.innerHTML = "Edit";

//         const task_delete_el = document.createElement("button");
//         task_delete_el.classList.add("delete");
//         task_delete_el.innerHTML = "Delete"

//         task_actions_el.appendChild(task_edit_el);
//         task_actions_el.appendChild(task_delete_el);

//         task_el.appendChild(task_actions_el);

//         list_el.appendChild(task_el);

//         input.value = "";

//         // making the edit and delete buttons work

//         // tells our code that when the button is clicked, it is no longer "readonly" and can be edited
//         task_edit_el.addEventListener('click', () => {
//             if (task_edit_el.innerText.toLocaleLowerCase() == "edit") {
//                 task_input_el.removeAttribute("readonly");
//                 // auto focus so we wont need to select it again
//                 task_input_el.focus();
//                 // "Edit" button turns into a "Save" button
//                 task_edit_el.innerText = "Save";
//             } else {
//                 // turns it back to normal
//                 task_input_el.setAttribute("readonly", "readonly");
//                 task_edit_el.innerText = "Edit";
//             }
          
//         });

//         task_delete_el.addEventListener('click', () => {
//             list_el.removeChild(task_el);
//         });
//     });
// });

// Attempt 3

window.addEventListener('load', () => {
      // tells the page on load to check the local storage for saved 'tasks' and retrieve them
    // if not, it will be left empty
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // makes nameInput equal to the input field with the id="name"
    const nameInput = document.querySelector('#name');
    // same as above but for our form
	const newTaskForm = document.querySelector('#new-task-form');
    // same thing but for saved 'username'
	const username = localStorage.getItem('username') || '';
    
    // makes whatever we put in nameInput a.k.a the #name field equal username
    // which is connected to the local storage
	nameInput.value = username;

     // detects a change in the nameInput and puts it into the local storage under 'username'
	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})
    // stops the button from submitting the form to nowhere
	newTaskForm.addEventListener('submit', e => {
		e.preventDefault();

        const task = {
            // tells it to use the value of the event targets element under the names "content and category" 
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
            done: false,
    // gives us a timestamp
			createdAt: new Date().getTime()
		}
    // puts it in our task array        
		tasks.push(task);

    // turns our array into a Json string and puts it in local storage
		localStorage.setItem('tasks', JSON.stringify(tasks));

	// Resets the form on submission
		e.target.reset();
    // calls the function outside...
		displayTasks()
	})
// makes sure to display tasks on page load
	displayTasks()
})

// used to display our tasks
function displayTasks () {
	const taskList = document.querySelector('#task-list');
	taskList.innerHTML = "";

// makes all needed elements for each task created and gives them the appropriate class
	tasks.forEach(task => {
		const taskItem = document.createElement('div');
		taskItem.classList.add('task-item');

     // Elements       
		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

    
// Classes and Types
		input.type = 'checkbox';
		input.checked = task.done;
        span.classList.add('bubble');
        
    // if else statement to differentiate between the two categories    
		if (task.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('business');
        }
        
    // more classes
		content.classList.add('task-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
        deleteButton.classList.add('delete');
        
    // making the task text field and buttons
		content.innerHTML = `<input type="text" value="${task.content}" readonly>`;
		edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';
        
    // puts the created elements at the end of the list
		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		taskItem.appendChild(label);
		taskItem.appendChild(content);
		taskItem.appendChild(actions);

		taskList.appendChild(taskItem);

    // if task is done, it will recieve the class "done"
		if (task.done) {
			taskItem.classList.add('done');
		}

    // makes sure the task is checked and updates the local storage 
		input.addEventListener('click', e => {
			task.done = e.target.checked;
			localStorage.setItem('tasks', JSON.stringify(tasks));
        
    // if else statement to make sure the 'done' class is removed
    // when the box is unchecked
			if (task.done) {
				taskItem.classList.add('done');
			} else {
				taskItem.classList.remove('done');
			}

        // updates our tasks on the screen
            displayTasks();

		})
    // tells the code to take away the contents 'readonly' attribute so we can edit it
		edit.addEventListener('click', e => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
            input.focus();
        // gives the read only attribut back when you input is not focused or blurred
			input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
            
            // sets the changes, updates the local storage and re displays the tasks
				task.content = e.target.value;
				localStorage.setItem('tasks', JSON.stringify(tasks));
				displayTasks()

			})
		})

    // we use .filter to make a new array, put the task content through a test that auto fails
    // brings back an empty array and updates the local storage
    // then re-displays the tasks 
		deleteButton.addEventListener('click', (e) => {
			tasks = tasks.filter(t => t != task);
			localStorage.setItem('tasks', JSON.stringify(tasks));
			displayTasks()
		})

	})
}