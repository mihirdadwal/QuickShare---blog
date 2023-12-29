class Blog{
    #title;
    #author;
    #content;
    constructor(title, author, content){
        this.#title=title;
        this.#author=author;
        this.#content=content;
    }

    get title(){
        return this.#title;
    }

    get author(){
        return this.#author;
    }

    get content(){
        return this.#content;
    }

}
const blogList = document.getElementById("blog-list");

const addBlog = (blog) => {

    const title= document.createElement('h2');
    const author= document.createElement('p');
    const authorStrong= document.createElement('strong');
    const content= document.createElement('p');
    const button= document.createElement('button');


    blogList.appendChild(title);
    blogList.appendChild(author);
        author.appendChild(authorStrong);
    blogList.appendChild(content);
    blogList.appendChild(button);

    // parent.appendChild(row);

    title.textContent= blog.title;
    authorStrong.textContent= blog.author;
    content.textContent= blog.content;
    button.textContent="UPDATE";
}

const fetchBlog = () => {
    const blogURI='/data/blog.json';
    const xhr=new XMLHttpRequest();
    xhr.open('GET', blogURI);
    xhr.addEventListener('load',function() {
        if(this.status===200){
            const responseText=this.responseText;
            const blogList= JSON.parse(responseText);
            blogList.forEach((item) => {
                const blog= new Blog(item.title,item.author,item.content);
                addBlog(blog);
            })
        }
    });
    xhr.send();
}

fetchBlog();


// ----------------
const setEditable = (editable) => {
    const fields = [author, content];
    fields.forEach((field) => {
        field.contentEditable = editable;
    });
};

const toggleContent = () => {
    if (content.classList.contains('content-collapsed')) {
        content.style.maxHeight = 'none'; // Expand fully
        content.classList.remove('content-collapsed');
    } else {
        content.style.maxHeight = '200px'; // Collapse
        content.classList.add('content-collapsed');
    }
};

updateFields();

if (person.edit) {
    // Fields are editable in edit mode
    setEditable(true);
}

editButton.textContent = person.edit ? 'Save' : 'Edit';
col2.appendChild(editButton);

editButton.addEventListener('click', () => {
    if (person.edit) {
        // Save changes
        person.image = image.src;
        person.title = title.textContent;
        person.author = author.textContent;
        person.content = content.textContent;
        person.date = date.textContent;
        person.time = time.textContent;

        
        person.toggleEdit();

        // Update fields
        setEditable(false);
        editButton.textContent = 'Edit';
    } else {
        // Enter edit mode
        setEditable(true);
        editButton.textContent = 'Save';
        person.toggleEdit();
    }
});