class UI{

    constructor(){
        this.posts = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.submitBtn = document.querySelector('.posts-submit');
        this.formState = 'add';
    }

    showPosts(posts){
        let output = '';
        posts.forEach((post) => {
            output += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}</p>
                        <a href="#" class="edit card-link" data-id="${post.id}">
                         <i class="fa fa-pencil"></i></a>
                         <a href="#" class="remove card-link" data-id="${post.id}">
                         <i class="fa fa-remove"></i></a>
                    </div>
                </div>
            `
        })
        this.posts.innerHTML=output;
    }

    showAlert(msg,classList){
        this.clearAlert();
        const div = document.createElement('div');
        div.className = classList;
        div.appendChild(document.createTextNode(msg));
        //get parent
        const container = document.querySelector('.postsContainer');
        //get posts
        const posts = document.querySelector('#posts');

        container.insertBefore(div,posts);

        setTimeout(this.clearAlert,3000);
    }

    clearAlert(){
       const alert = document.querySelector('.alert');

       if(alert){
           alert.remove();
       }
    }
    clearFields(){
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }

    //fill form to edit
    fillForm(data){
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;

        this.changeFormState('edit');
    }

    changeFormState(type){
        if(type==="edit"){
            this.submitBtn.textContent="Update Post";
            this.submitBtn.className ="post-submit btn btn-warning btn-block"

            //create cancel 
            const button = document.createElement('button');
            button.className ="btn btn-block btn-light post-cancel";
            button.appendChild(document.createTextNode('Cancel Edit'));

            //Insert into dom
            const cardForm = document.querySelector('.card-form');
            //get element to insert before
            const formEnd = document.querySelector('.form-end');

            cardForm.insertBefore(button,formEnd);
        }else{
            this.submitBtn.textContent="Post It";
            this.submitBtn.className ="post-submit btn btn-primary btn-block"

            //remove cancel btn if its there
            if(document.querySelector('.post-cancel'))
            {
                document.querySelector('.post-cancel').remove();
            }

            //Clear ID from hidden field
            this.clearIdInput();
            this.clearFields();
        }
    }

    clearIdInput(){
        this.idInput.value='';
    }
}

export const ui = new UI(); 
