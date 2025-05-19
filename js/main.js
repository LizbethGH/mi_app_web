const API_URL = "http://3.237.62.192:5000/api/devices";
const tableBody = document.getElementById("deviceTableBody");
const statusActual = document.getElementById("statusActual");

function cargarDatos() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            tableBody.innerHTML = "";

            if (data.devices.length > 0 && data.devices[0].status !== "") {
                statusActual.textContent = `Estado actual: ${data.devices[0].status}`;
            } else {
                statusActual.textContent = "Estado actual: sin datos";
            }

            data.devices.forEach(dispositivo => {
                const fila = document.createElement("tr");

                fila.innerHTML = `
                    <td>${dispositivo.id}</td>
                    <td>${dispositivo.name}</td>
                    <td>${dispositivo.ip}</td>
                    <td>${dispositivo.status}</td>
                    <td>${dispositivo.date}</td>
                `;

                tableBody.appendChild(fila);
            });
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
            statusActual.textContent = "Error al cargar estado actual";
            tableBody.innerHTML = `<tr><td colspan="5">No se pudieron cargar los datos</td></tr>`;
        });
}

// Cargar al inicio y refrescar cada 2 segundos
cargarDatos();
setInterval(cargarDatos, 2000);
