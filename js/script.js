// Selecting elements from the HTML document
const input = document.querySelector(".parent2-input"),
    parent = document.querySelector(".parent"),
    parent2 = document.querySelector(".parent2"),
    answer = document.querySelector(".answer"),
    save = document.querySelector(".save"),
    addtask = document.querySelector(".addtask"),
    textarea = document.querySelector(".parent2-textarea"),
    checkboxes = document.querySelectorAll('.checkbox'),
    deleteBtn = document.getElementById('delete-btn'),
    confirm = document.querySelector(".confirm"),
    cancel = document.querySelector(".cancel"),
    emptyarray = [],
    arrayelem = document.querySelector(".array"),
    todoicon = document.querySelector(".titles i"),
    countnum = document.querySelector(".count-num"),
    open = document.querySelector("#open"),
    f = true,
    parentnode = document.querySelector(".parentnode-div");

// Initializing variables
let num = 0,
    checkboxess = document.querySelectorAll('input[type="checkbox"]'),
    isContentEmpty = false

// Event listener for input field
input.addEventListener('input', (e) => {
    if (input.value.trim() !== "") {
        save.disabled = false;
    } else {
        save.disabled = true;
    }
});

// Function to add an object to an array
function addToArray(name, last) {
    const newItem = { name, last };
    emptyarray.push(newItem);
}

// Event listener for the "save" button
save.addEventListener("click", (e) => {
    deleteBtn.disabled = true;
    parent.classList.toggle("displayblock");
    parent2.classList.toggle("displaynone");
    const cr = document.createElement("div");
    cr.className = "ez";
    cr.innerHTML = `
        <div class="parentnode-div">
            <li class="list-item">
                <input class="checkbox" type="checkbox">${input.value}
            </li>
            <small class="small">${textarea.value}</small>
        </div>
        <div class="parent-nodebtn">
        <button class="delete-node">
        <i class="fa-solid fa-trash"></i>
       </button>
        <button class="remove-node">
            <i class="fa-solid fa-pen-to-square"></i>
        </button></div>`;
    answer.append(cr);
    lastAddedItem = cr;
    textarea.value = "";
    input.value = "";
    const listItems = document.querySelectorAll(".list-item");

    // Event listener for the "remove-node" button
    cr.querySelector(".remove-node").addEventListener("click", () => {
        listItems.forEach((e) => {
            input.value = e.textContent.trim();
            textarea.value = document.querySelector("small").textContent;
            parent.classList.remove("displayblock");
            parent2.classList.remove("displaynone");
            save.disabled = true;

        })
    });

    // Loop through each list item and add an event listener to the checkbox
    listItems.forEach((li) => {
        const checkbox = li.querySelector('input[type="checkbox"]');
        checkbox.addEventListener("change", () => {
            let checkedCount = 0;
            listItems.forEach((li) => {
                const checkbox = li.querySelector('input[type="checkbox"]');
                // Enable or disable the delete button and open button based on the number of checked checkboxes
                if (checkbox.checked) {
                    checkedCount++;
                }
            });
            if (checkedCount > 0) {
                deleteBtn.disabled = false;
                open.disabled = false;
            } else {
                deleteBtn.disabled = true;
                open.disabled = true;
            }
        });

        // Event listener for the "delete" button in each list item
        const deleteBtns = document.querySelectorAll(".delete-node");
        deleteBtns.forEach((deleteBtn) => {
            deleteBtn.addEventListener("click", () => {
                const checkboxes = document.querySelectorAll('.checkbox:checked');
                checkboxes.forEach((checkbox) => {
                    if (checkbox.checked) {
                        // Find the index of the item to remove from the array
                        let index = emptyarray.findIndex(item => item.name === checkbox.parentNode.textContent.trim());
                        let itemToRemove = checkbox.parentNode.parentNode.parentNode;
                        // Remove the DOM element
                        itemToRemove.parentNode.removeChild(itemToRemove);
                    }
                });
            });
        });
    });
});

// Event listener for the "open" button
open.addEventListener("click", (e) => {
    const ez = document.querySelectorAll(".ez")
    let checkboxes = document.querySelectorAll(".checkbox:checked");
    checkboxes.forEach((checkbox) => {
        let parent = checkbox.closest('.ez');
        let small = parent.querySelector('.small');
        parent.style.setProperty('--content-empty', 'unset');
        small.style.setProperty('--content-empty', 'unset');
        parent.classList.remove("opacity");
        if (checkboxes.length === 0) {
            open.disabled = true;
        }
    });
});
// Event listener for the "deleteBtn" button
deleteBtn.addEventListener("click", (e) => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    deleteBtn.disabled = false
    checkboxes.forEach((checkbox) => {
        let parent = checkbox.closest('.ez');
        let small = parent.querySelector('.small');
        if (checkbox.checked) {
            parent.classList.add("opacity")
            parent.style.setProperty('--content-empty', '""');
            if (small.textContent == "") {
                small.style.setProperty('--content-empty', 'none');
            }
        } else {
            parent.classList.remove("opacity")
        }
    });

});

// Event listener for the "add task" button
addtask.addEventListener("click", () => {
    parent.classList.remove("displayblock")
    parent2.classList.remove("displaynone")
    save.disabled = true;

});

// Event listener for the "cancel" button
cancel.addEventListener("click", () => {
    parent.classList.add("displayblock")
    parent2.classList.add("displaynone")
    save.disabled = true;

});