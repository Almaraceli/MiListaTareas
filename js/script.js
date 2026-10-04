const tareaInput = document.getElementById("tareaInput");
const agregarBtn = document.getElementById("agregarBtn");
const listaTareas = document.getElementById("listaTareas");
const contador = document.getElementById("contador");
const limpiarBtn = document.getElementById("limpiarBtn");

let tareas = [];

function agregarTarea() {

    const texto = tareaInput.value.trim();

    if (texto === "") {
        alert("Escribe una tarea.");
        return;
    }

    tareas.push({
        texto: texto,
        completada: false
    });

    tareaInput.value = "";

    mostrarTareas();
}

function mostrarTareas() {

    listaTareas.innerHTML = "";

    tareas.forEach((tarea, indice) => {

        const li = document.createElement("li");

        li.className = "tarea";

        if (tarea.completada) {
            li.classList.add("completada");
        }

        const texto = document.createElement("span");

        texto.textContent = tarea.texto;

        texto.addEventListener("click", () => {
            tareas[indice].completada = !tareas[indice].completada;
            mostrarTareas();
        });

        const eliminar = document.createElement("button");

        eliminar.textContent = "Eliminar";
        eliminar.className = "eliminar";

        eliminar.addEventListener("click", () => {

            tareas.splice(indice, 1);

            mostrarTareas();
        });

        li.appendChild(texto);
        li.appendChild(eliminar);

        listaTareas.appendChild(li);
    });

    actualizarContador();
}

function actualizarContador() {

    const pendientes = tareas.filter(
        tarea => !tarea.completada
    ).length;

    contador.textContent =
        pendientes === 1
            ? "1 tarea pendiente"
            : `${pendientes} tareas pendientes`;
}

limpiarBtn.addEventListener("click", () => {

    tareas = tareas.filter(
        tarea => !tarea.completada
    );

    mostrarTareas();
});

agregarBtn.addEventListener("click", agregarTarea);

tareaInput.addEventListener("keypress", (evento) => {

    if (evento.key === "Enter") {
        agregarTarea();
    }

});

mostrarTareas();