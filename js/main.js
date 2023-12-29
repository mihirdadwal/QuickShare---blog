const blogList = document.getElementById("blog-list");

// let buttonID=0;

//global variable blogList to access in all functions

class Blog{
//class blog with 3 data members and constructor
    #title;
    #author;
    #content;
    constructor(title, author, content){
        this.#title=title;
        this.#author=author;
        this.#content=content;
    }

    //getters and setters
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

//function a=to add blog dynamically on the web page. 
//same function used for adding blogs to site from json file and from create-blog form
const addBlog = (blog) => {
    const article= document.createElement('article');
    

    const title= document.createElement('h2');
    const author= document.createElement('p');
    const authorStrong= document.createElement('strong');
    const content= document.createElement('p');
    const updateButton= document.createElement('button');
    const expandButton=document.createElement('Button');
    const flexDateExpand=document.createElement('div')

    // const initialContent = document.createElement('p');
    // const initialContentData = document.createElement('a');
    // const seeMoreHref = document.createElement('a');

    const createdDate = new Date().toLocaleString();
    const dateFlag = document.createElement('time');

    // initialContentData.textContent = blog.content.substring(0,30);
    // seeMoreHref.href = '#';

    // seeMoreHref.id= 'see-more-link' + buttonId;
    // content.id = 'additional-content' + buttonId;
    // buttonId = buttonId+1;
    // seeMoreHref.textContent = '  .See More';
    // content.style.display = 'none';
    content.textContent = blog.content
    
    author.setAttribute("contenteditable","false")
    content.setAttribute("contenteditable","false")
    article.onclick="expandDiv(this)"

    article.className="blog-entry"
    title.className="blog-title"
    author.className="blog-author"
    dateFlag.className="blog-date"
    content.className="blog-content"
    expandButton.className="blog-expandButton"
    flexDateExpand.className="flex"
    
    article.appendChild(title);
    article.appendChild(author);
    flexDateExpand.appendChild(dateFlag);
    flexDateExpand.appendChild(expandButton);
    article.appendChild(flexDateExpand);
    // article.appendChild(dateFlag);
        author.appendChild(authorStrong);
        // article.appendChild(initialContentData);
        // article.appendChild(seeMoreHref);
    // blogList.appendChild(initialContent);
    article.appendChild(content);
    // article.appendChild(initialContent);
    // article.appendChild(content);
    article.appendChild(updateButton);
    blogList.appendChild(article);

    // parent.appendChild(row);

    title.textContent= blog.title;
    authorStrong.textContent= blog.author;
    dateFlag.textContent="Created on : "+ createdDate;
    content.textContent= blog.content;
    expandButton.textContent="+"

    updateButton.textContent = 'Edit';
    updateButton.addEventListener('click', function(event) {
        // expand(event);

        content.classList.toggle('expanded');
        
        if(updateButton.textContent==='Edit'){
            updateButton.textContent='Save';
            authorStrong.setAttribute('contenteditable', 'true');
            content.setAttribute('contenteditable', 'true');
            
            authorStrong.focus();
            content.focus();
        }else if(updateButton.textContent==='Save'){
            updateButton.textContent='Edit';
            authorStrong.setAttribute('contenteditable', 'false');
            content.setAttribute('contenteditable', 'false');
            // content.textContent=content.textContent;
        }
       
     });
     
    flexDateExpand.addEventListener('click', function() {
        content.classList.toggle('expanded');
    });

     

    // seeMoreHref.addEventListener('click', function(event) {
    //     expand(event);
    // });
    // function expand(event){
    //     event.preventDefault(); // Prevent the link from navigating
    //     if (content.style.display === 'none') {
    //         content.style.display = 'block';
    //         initialContentData.style.display = 'none';
    //         seeMoreHref.textContent = 'See Less';
            
    //     } else {
    //         content.style.display = 'none';
    //         initialContentData.style.display = 'block';
    //         seeMoreHref.textContent = 'See More';
    //     }
    // }
}

// fetching data from json file. XMLHTTPRequest
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

// ----------------------------------------------------------

    // global variables to access in all functions
    const createBlogBtn = document.getElementById("create-blog-btn");
    const createBlogForm = document.getElementById("create-blog-form");
    const addBlogBtn = document.getElementById("add-blog-btn");
    const blogCard = null;
    createBlogBtn.addEventListener("click", () => {
        // createBlogForm.style.display = "block";
        createBlogForm.style.display = "flex";
    });

    //onclick function to add blog
    addBlogBtn.addEventListener("click", () => {
        const title = document.getElementById("blog-title").value;
        const author = document.getElementById("blog-author").value;
        const content = document.getElementById("blog-content").value;

        //iff all inputs are not empty
        if (title && author && content) {
            const blog= new Blog(title,author,content);
            addBlog(blog)
            // Clear input fields
            document.getElementById("blog-title").value = "";
            document.getElementById("blog-author").value = "";
            document.getElementById("blog-content").value = "";
            
            createBlogForm.style.display = "none";
        }else{
            //if any of the fields are empty
            alert("Add all the fields");
        }
        
    });


    const container=document.getElementById("container");

    container.addEventListener("click", function (event){
        const id= event.target.id;
        console.log("sadasd");

        
    })

 

    // function createBlogCard(title, author, content, createdDate) {
    //     const blogCard = document.createElement("div");
    //     blogCard.className = "blog-card";
    //     blogCard.innerHTML = `

    //         <h2>${title}</h2>

    //         <p><strong>Author:</strong> ${author}</p>

    //         <p><strong>Created:</strong> ${createdDate}</p>

    //         <p>${content}</p>

    //         <button class="update-blog-btn" onclick = "updateBlogCard()">Update</button>

    //     `;

    //     return blogCard;

    // }    

        // function updateBlogCard(blogCard){

        //     // Add click event for updating the blog

        //     console.log("Inside the update Blog Card function");

        //     const updateBtn = blogCard.querySelector(".update-blog-btn");

        //     updateBtn.addEventListener("click", () => {

        //         updateBtn = blogCard.querySelector(".update-blog-btn");

        //         const authorElement = blogCard.querySelector("p");

        //         const contentElement = blogCard.querySelector("p");

        //         alert("1!!!!!!!!!!!!");

           

        //         contentElement.contentEditable = true;

        //         authorElement.contentEditable = true;

        //         updateBtn.textContent = "Save";

        //         updateBtn.addEventListener("click", () => {

        //             contentElement.contentEditable = false;

        //             authorElement.contentEditable = false;

        //             updateBtn.textContent = "Update";

        //         });

        //     });

        // }


    // You can fetch existing blogs from a JSON file using XMLHttpRequest or any other met