// FRONT-END (CLIENT) JAVASCRIPT HERE
const form = document.getElementById("todo-form");
const editIdInput = document.getElementById("edit-id");
const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority")
const tbody = document.getElementById("results-body");
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");

// Render 
function render(todos) {
  tbody.innerHTML = "";
  if (!Array.isArray(todos) || todos.length === 0) {
    const tr = document.createElement("tr");
    tr.className = "empty-row";
    tr.innerHTML = `<td colspan="5">No items yet.</td>`;
    tbody.appendChild(tr);
    return;
  }

  const frag = document.createDocumentFragment();
  for (const t of todos) {
    const tr = document.createElement("tr");
    const created = t.createdAt ? new Date(t.createdAt).toLocaleDateString() : "";
    const due = t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "";

  tr.innerHTML = `
    <td>${t.task}</td>
    <td>${t.priority}</td>
    <td>${created}</td>
    <td>${due}</td>
    <td>
      <button type="button" class="edit-btn" data-id="${t.id}" data-task="${t.task}" data-priority="${t.priority}">Edit</button>
      <button type="button" class="delete-btn danger" data-id="${t.id}">Delete</button>
    </td>
  `;
  frag.appendChild(tr);
  }
  tbody.appendChild(frag);
}

// Initial load
window.addEventListener("DOMContentLoaded", () => {
  fetch("/todos")
    .then(r => r.json())
    .then(render)
    .catch(err => setStatus(err.message || "Failed to load", "error"));
});

// Form submit: create or update 
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = editIdInput?.value?.trim() || "";
  const task = taskInput.value.trim();
  const priority = priorityInput.value;

  if (!task) { setStatus("Task is required.", "error"); taskInput.focus(); return; }
  if (!["low","medium","high"].includes(priority)) { setStatus("Choose a priority.", "error"); return; }

  submitBtn.disabled = true;
  setStatus(id ? "Saving…" : "Adding…");

  const url = id ? "/todos/update" : "/todos";
  const body = id ? { id, task, priority } : { task, priority };

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
  .then(r => r.json())
  .then((todos) => {
    // Reset form state after success
    form.reset();
    if (editIdInput) editIdInput.value = "";
    submitBtn.textContent = "Add";
    setStatus(id ? "Saved!" : "Added!", "ok");
    render(todos); 
  })
  .catch(err => setStatus(err.message || "Request failed", "error"))
  .finally(() => { submitBtn.disabled = false; });
});



