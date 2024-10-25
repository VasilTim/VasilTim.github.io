function addItem() {
    const itemInput = document.getElementById("itemInput");
    const itemText = itemInput.value.trim();

    if (itemText === "") return;

    const listItem = document.createElement("li");
    const text = document.createElement("span");
    text.textContent = itemText

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Видалити";
    deleteButton.onclick = () => removeItem(listItem);

    const editButton = document.createElement("button");
    editButton.textContent = "Редагувати";
    editButton.onclick = () => editItem(listItem, text);

    const div = document.createElement("div")
    div.setAttribute("class", "buttons")

    listItem.appendChild(text);
    div.appendChild(editButton);
    div.appendChild(deleteButton);
    listItem.appendChild(div)
    document.getElementById("list").appendChild(listItem);

    itemInput.value = "";
    itemInput.focus();
}

function removeItem(listItem) {
    if (confirm("Ви впевнені, що хочете видалити цей елемент?")) {
        listItem.remove();
    }
}

function editItem(listItem, text) {
    const newText = prompt("Редагуйте елемент:", text.textContent);
    if (newText !== null && newText.trim() !== "") {
        text.textContent = newText.trim();
    }
}

document.getElementById("itemInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addItem();
    }
});