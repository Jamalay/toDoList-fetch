let arr_data = fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response) => response.json())
    .then((data) => {
        render(data);
    });



async function render(data) {
    const todo_list = document.getElementById('todo_list');

    const inputVal = document.getElementById('inputVal');
    const add_button = document.getElementById('add_button');

    todo_list.innerHTML = '';

    add_button.addEventListener('click', (e) => {
        e.preventDefault();
        addI(inputVal.value, data);
        inputVal.value = '';
        console.log(data.length);
    })


    for (let i = 0; i < data.length; i++) {
        const div = document.createElement('div');
        div.classList.add('list_item');

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.classList.add('doneBut')
        input.textContent = 'done';

        const p = document.createElement('p');
        p.textContent = data[i].title;

        const button = document.createElement('button');
        button.textContent = 'delete';

        div.append(input, p, button);

        todo_list.append(div);

        if (data[i].completed === true) {
            input.checked = true;
            p.style.color = 'white';
        }

        button.addEventListener('click', () => {
            remove(data[i].id, button.parentElement);
        })

        input.addEventListener('click', () => {
            done(data[i].id, input.nextSibling);
        })

    }
}

function remove(id, node) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
    }).then((response) => {
        if (response.status === 200) {
            console.log('deleted');
            node.remove();
        }
    })
}

async function addI(title, allData) {
    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify(
            {
                "userId": 10,
                "title": `${title}`,
                "completed": false,
            }
        ),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then((response) => response.json())
        .then((data) => {
            if (title !== '') {
                allData.push(data);
                console.log(allData);
                render(allData);
            }
        })
}

function done(id, p) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ "completed": true })
    }).then((response) => {
        if (response.status === 200) {
            console.log('done');
            p.style.color = 'white';
            //p.previousSibling.remove();
        }
    })
}