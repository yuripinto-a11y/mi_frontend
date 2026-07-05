const API = "https://mi-api-omqc.onrender.com";

function listarPersonas() {
    fetch(`${API}/personas`)
        .then(res => res.json())
        .then(data => {
            const tabla = document.getElementById("tabla-personas");
            tabla.innerHTML = "";
            data.forEach(p => {
                tabla.innerHTML += `
                    <tr>
                        <td>${p[0]}</td>
                        <td>${p[1]}</td>
                        <td>${p[2]}</td>
                        <td>
                            <button onclick="editarPersona(${p[0]}, '${p[1]}', '${p[2]}')">Editar</button>
                            <button onclick="eliminarPersona(${p[0]})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        });
}

function crearPersona() {
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;

    fetch(`${API}/personas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo })
    })
    .then(() => {
        listarPersonas();
        document.getElementById("nombre").value = "";
        document.getElementById("correo").value = "";
    });
}

function editarPersona(id, nombreActual, correoActual) {
    const nuevoNombre = prompt("Nuevo nombre:", nombreActual);
    const nuevoCorreo = prompt("Nuevo correo:", correoActual);
    if (!nuevoNombre || !nuevoCorreo) return;

    fetch(`${API}/editar/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nuevoNombre, correo: nuevoCorreo })
    })
    .then(() => listarPersonas());
}

function eliminarPersona(id) {
    if (!confirm("¿Seguro que deseas eliminar esta persona?")) return;

    fetch(`${API}/eliminar/${id}`, { method: "POST" })
        .then(() => listarPersonas());
}

document.addEventListener("DOMContentLoaded", listarPersonas);

