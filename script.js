const API = "https://mi-api.onrender.com"; // reemplaza con tu URL real

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

document.addEventListener("DOMContentLoaded", listarPersonas);

