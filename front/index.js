function loading(state) {
    if (state) {
        swal.close()
        return;
    }
    swal.fire({
        title: `
    <div class="d-flex justify-content-center">
        <div class="spinner-border text-primary" style="width:5rem;height:5rem" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    `,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
    })
}

async function saveTask() {
    loading()
    task = document.querySelector('#task_add input').value
    const res = await axios({
        method: 'POST',
        url: 'http://localhost:3333/todo',
        data: {
            task
        }
    }).catch((err) => {
        swal.fire({
            icon: 'error',
            title: 'Erro para adicionar task',
            message: err
        })
        return true;
    })
    location.reload()
}

async function getTasks() {
    const tasks = await axios({
        method: 'GET',
        url: 'http://localhost:3333/todo',
    }).catch((err) => {
        swal.fire({
            icon: 'error',
            title: 'Erro para pegar as task',
            message: err
        })
    })
    return tasks.data.tasks
}

async function loadTask(id) {
    const task = await axios({
        method: 'GET',
        url: `http://localhost:3333/todo/${id}`,
    }).catch((err) => {
        swal.fire({
            icon: 'error',
            title: 'Erro para pegar a task',
            message: err
        })
    })
    const task_data = task.data.task[0]
    const btn_editar = document.getElementById('btn_editar')
    const input_task_name = document.getElementById('edit_task_name')
    const input_description = document.getElementById('descricao')
    input_task_name.value = task_data.task
    input_description.value = task_data.description
    document.getElementById('btn_editar').addEventListener('click', (e) => {
        editarTask(task_data.id)
    })
    if (task_data.status != 0) {
        input_task_name.setAttribute('disabled', true)
        input_description.setAttribute('disabled', true)
        btn_editar.setAttribute('disabled', true)
        btn_editar.classList.toggle('d-none')
    }
    document.getElementById('edit_task_name').value = task_data.task
}

$("#modalTask").on("hidden.bs.modal", function () {
    const btn_editar = document.getElementById('btn_editar')
    const input_task_name = document.getElementById('edit_task_name')
    const input_description = document.getElementById('descricao')
    if (btn_editar.classList.contains('d-none')) {
        btn_editar.classList.toggle('d-none')
    }
    input_task_name.removeAttribute('disabled')
    input_description.removeAttribute('disabled')
    btn_editar.removeAttribute('disabled')
});

async function finalizarTask(id) {
    loading()
    const res = await axios({
        method: 'PUT',
        url: `http://localhost:3333/todo/${id}/finish`,
    }).catch((err) => {
        swal.fire({
            icon: 'error',
            title: 'Erro para atualizar task',
            message: err.response.data.message
        })
        return true;
    })
    location.reload()
}

async function deletarTask(id) {
    loading()
    const res = await axios({
        method: 'DELETE',
        url: `http://localhost:3333/todo/${id}`,
    }).catch((err) => {
        swal.fire({
            icon: 'error',
            title: 'Erro para deletar task',
            message: err.response.data.message
        })
        return false;
    })
    location.reload()
}

async function editarTask(id) {
    loading()
    const data = {
        task: document.querySelector('#modalTask #edit_task_name').value ?? '',
        description: document.querySelector('#modalTask #descricao').value ?? '',
    }
    const res = await axios({
        method: 'PUT',
        url: `http://localhost:3333/todo/${id}`,
        data
    }).catch((err) => {
        swal.fire({
            icon: 'error',
            title: 'Erro para atualizar task',
            message: err.response.data.message
        })
        return;
    })
    location.reload()
}


async function addTasksInTemplete() {
    loading()
    const tasks = await getTasks()
    const div_tasks = document.querySelector('#tasks')
    if (tasks.length != 0) {
        div_tasks.innerHTML = ''
        tasks.forEach(task => {
            document.querySelector('#tasks').innerHTML += `
                <div class="tasks py-1 px-3 d-flex w-100 mt-2">
                <input value="${task.task}" disabled class="w-100 form-control" />
                <div class="buttons_task d-flex"></div>
                </div>
            `
            const div_tasks = document.querySelectorAll('.tasks input')
            if (task.status != 0) {
                div_tasks[div_tasks.length - 1].classList.toggle('bg-success')
                div_tasks[div_tasks.length - 1].classList.toggle('text-white')
            }
            const buttons_task_div = document.querySelectorAll('.buttons_task')
            if (task.status == 0) {
                buttons_task_div[buttons_task_div.length - 1].innerHTML += `
                <button onclick="finalizarTask('${task.id}')" class="px-3 bg-success text-white">
                    <i class="fas fa-check p-0 m-0"></i>
                </button>
                `
            }
            buttons_task_div[buttons_task_div.length - 1].innerHTML += `
                <button onclick="loadTask('${task.id}')" data-toggle="modal" data-target="#modalTask" class="bg-primary px-3 text-white">
                    <i class="fas fa-eye p-0 m-0"></i>
                </button>
                <button onclick="deletarTask('${task.id}')"  class="px-3 bg-danger text-white">
                    <i class="fas fa-trash-alt p-0 m-0"></i>
                </button>
            `
        })
        loading(true)
        return true
    }
    loading(true)
    div_tasks.innerHTML = `
        <div class="d-flex flex-column align-items-center">
            <i class="fas fa-ghost mb-5 mt-5" style="font-size: 150px"></i>
            <h5>Você ainda não tem tasks cadastradas.</h5>
        </div>
    `
}

document.addEventListener('DOMContentLoaded', async function (e) {
    await addTasksInTemplete()
    document.querySelector('#task_add input').addEventListener('keyup', (e) => {
        const btn_add = document.querySelector('#task_add button')
        btn_add.setAttribute('disabled', true)
        if (e.target.value.length != 0) {
            btn_add.removeAttribute('disabled')
        }
    })
})