(() => {
  const STORAGE_KEY = "tareas-v1";

  const form = document.getElementById("task-form");
  const input = document.getElementById("task-input");
  const list = document.getElementById("task-list");
  const emptyMsg = document.getElementById("empty-msg");

  let tasks = load();

  function load() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function render() {
    list.innerHTML = "";

    tasks.forEach((task) => {
      const li = document.createElement("li");
      if (task.done) li.classList.add("done");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.done;
      checkbox.addEventListener("change", () => {
        task.done = checkbox.checked;
        save();
        render();
      });

      const text = document.createElement("span");
      text.textContent = task.text;

      const del = document.createElement("button");
      del.type = "button";
      del.className = "delete-btn";
      del.textContent = "Borrar";
      del.addEventListener("click", () => {
        tasks = tasks.filter((t) => t.id !== task.id);
        save();
        render();
      });

      li.append(checkbox, text, del);
      list.appendChild(li);
    });

    emptyMsg.style.display = tasks.length ? "none" : "block";
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    tasks.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2), text, done: false });
    save();
    render();
    input.value = "";
    input.focus();
  });

  render();
})();
