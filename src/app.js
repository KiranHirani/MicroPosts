import { http } from './http';
import { ui } from './ui';

const url = 'http://localhost:3000/posts';

//Get posts on dom load 
document.addEventListener('DOMContentLoaded', getPosts);

//Listen for add posts
document.querySelector('.posts-submit').addEventListener('click', submitPosts);

//Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

//Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);


//Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);


//Get Posts
function getPosts() {
    http.get(url)
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err));
}

//Submit post
function submitPosts() {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;

    if (title === '' || body === '') {
        ui.showAlert('Please fill in all fields', 'alert alert-danger');
    }
    else {

        // ES5 syntax, if key- value have same name, we don't need to make it like body:body, just body is enuf 
        const data = {
            title,
            body
        }


        //Check for ID
        if (id === '') {
             //Create post 
             http.post(url, data)
             .then(data => {
                 ui.showAlert('Post Added', 'alert alert-success');
                 ui.clearFields();
                 getPosts();
             })
             .catch(err => console.log(err));
        } else {
            //Update the post
            http.put(`${url}/${id}`,data)
            .then(data=>{
                ui.showAlert('Post Updated','alert alert-success');
                ui.changeFormState('add');
                getPosts();
            })
           
        }
    }

}


function deletePost(event) {

    if (event.target.parentElement.classList.contains("remove")) {
        const id = event.target.parentElement.dataset.id;
        if (confirm('Are you sure?')) {
            http.delete(`${url}/${id}`)
                .then(data => {
                    ui.showAlert('Post Removed!', 'alert alert-success');
                    getPosts();
                })
                .catch(err => console.log(err));
        }

    }

    event.preventDefault();
}

function enableEdit(event) {

    if (event.target.parentElement.classList.contains("edit")) {
        // dataset coz its a data id 
        const id = event.target.parentElement.dataset.id;
        const body = event.target.parentElement.previousElementSibling.textContent;
        const title = event.target.parentElement.previousElementSibling.previousElementSibling.textContent;

        const data = { id, title, body };

        ui.fillForm(data);

    }

    event.preventDefault();
}

function cancelEdit(event) {
    if (event.target.classList.contains('post-cancel')) {
        ui.changeFormState('add');
    }

    event.preventDefault();
}
