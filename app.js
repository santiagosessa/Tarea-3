class Tarea {
    constructor(id, titulo, completada = false) {
        this.id = id;
        this.titulo = titulo;
        this.completada = completada;
    }

    toggleEstado() {
        this.completada = !this.completada;
    }
}

class GestorTareas {
    constructor() {
        this.tareas = [];
    }

    agregarTarea(titulo) {
        const nuevoId = this.tareas.length > 0 ? this.tareas[this.tareas.length - 1].id + 1 : 1;
        const nuevaTarea = new Tarea(nuevoId, titulo);
        this.tareas.push(nuevaTarea);
    }

    listarTareas() {
        this.tareas.forEach(tarea => {
            console.log(`[${tarea.id}] ${tarea.titulo} - Estado: ${tarea.completada ? 'Completada' : 'Pendiente'}`);
        });
    }

    buscarPorTitulo(titulo) {
        return this.tareas.find(tarea => tarea.titulo === titulo);
    }

    listarCompletadas() {
        return this.tareas.filter(tarea => tarea.completada === true);
    }
}

// Simulación asíncrona
function cargarTareas() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const tareasIniciales = [
                new Tarea(1, "Leer documentación de JS", true),
                new Tarea(2, "Practicar asincronía", false),
                new Tarea(3, "Crear repositorio en GitHub", false)
            ];
            resolve(tareasIniciales);
        }, 2000);
    });
}

function cargarUsuarios() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(["Santiago", "Ana", "Lucas"]);
        }, 1500);
    });
}

// Flujo del programa
async function iniciar() {
    const gestor = new GestorTareas();

    try {
        console.log("Cargando sistema...");

        // Aplicar Promise.all para simular carga en paralelo (Extra opcional)
        const [tareas, usuarios] = await Promise.all([cargarTareas(), cargarUsuarios()]);
        
        // Asignar resultados al GestorTareas
        gestor.tareas = tareas;
        
        console.log("Tareas cargadas correctamente");
        console.log("Usuarios en sistema (simulación paralela):", usuarios.join(', '));
        
        console.log("\n--- Listado Inicial de Tareas ---");
        gestor.listarTareas();
        
        console.log("\n--- Agregando nueva tarea ---");
        gestor.agregarTarea("Aprender métodos de arrays");
        gestor.listarTareas();
        
        console.log("\n--- Marcando una tarea como completada ---");
        const tareaEncontrada = gestor.buscarPorTitulo("Practicar asincronía");
        if (tareaEncontrada) {
            tareaEncontrada.toggleEstado();
            console.log(`Se completó la tarea: "${tareaEncontrada.titulo}"`);
        }

        console.log("\n--- Listado de Tareas Completadas ---");
        const completadas = gestor.listarCompletadas();
        completadas.forEach(t => console.log(`- ${t.titulo}`));
        
        console.log("\n--- Array de títulos (Extra opcional con map) ---");
        const titulos = gestor.tareas.map(tarea => tarea.titulo);
        console.log(titulos);
        
    } catch (error) {
        console.error("Hubo un error en la carga:", error);
    }
}

iniciar();
