const template=document.createElement('template')
template.innerHTML=`
<style>
#inputTask{
    width: 70%;
    height: 40px;
    background-color: cornflowerblue;
    font-size: 20px;
    color: black;
    font-weight: bold;
    border-radius: 7px;
    box-sizing: border-box;
    
}
.addTaskButton{
    width: 100px;
    height: 40px;
    font-size: 20px;
    font-weight: bold;
    background-color: darkblue;
    color: darkgray;
    border-radius: 7px;
}
.edit{
    height: 50px;
    width: 50px;
    border-radius: 10px;
    background-color: cadetblue;
   
}
.delete{
    
    height: 50px;
    width: 50px;
    margin-left: 60px;
    border-radius: 10px;
    background-color: coral;
}
.delete:hover{
   background-color: cyan;
}
.edit:hover{
    background-color: cyan;
 }
.showToDo{
    background-color: cyan;
    min-width:  300px;
    height: 50px;
    margin:0 30px;
   font-size: 30px;
   font-weight: bold;
    border-radius: 10px;
}

li{

    cursor: pointer;
  position: relative;
 padding: 8px 6px 8px 6px;
  
  color: black;
 
}

p:hover{
background-color: yellow;
}
.close:hover{
    background-color:yellow;
}
.close {
   
    
    padding: 12px 16px 12px 16px;
    color: black;
    font-weight: bold;
    font-size: 15px;
    background-color:tomato;
    

  }
  .update{
    
    padding: 12px 16px 12px 16px;
    color: black;
    font-weight: bold;
    font-size: 15px;
    background-color:tomato;
    align-self:right;
    margin-left: 1100px;

  }
.input{
background-color:transparent;

width: 90%;
margin: 0 auto;
box-sizing: border-box;
max-width: 1400px;
flex-direction: row;
}
header{
    background-color:transparent;
    color: yellowgreen;
    padding: 10px;
    margin: 20px auto;
    flex: 0 0 300px;
    text-align: center;
    font-size: 30px;
}
main{
    background-color:transparent;
    color: #eee;
    flex: 1 0 auto;
}

@media screen and (max-width:1000px){
.input{
    flex-direction: column;
}
}
</style>
<header>
<h1>To Do List </h1> 
</header>  
<main>

<div class="input">

<input type="text" id="inputTask" name="" placeholder="add task  list" maxlength="28">
<button id="addTaskButton" class="addTaskButton" >Add</button> 
<ul id="addedTask">

</ul>
</div>
</main>


`

class  ToDo extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
// this.innerHTML=`<h2>${this.getAttribute('name')}</h2>`
    }
     newElement(){
        let taskHolder= this.shadowRoot.querySelector("#addedTask");
      
          let listItem=document.createElement("li");
          let editInput=document.createElement("input");
          let editButton=document.createElement("button");
          
          let deleteButton=document.createElement("button");
          let inputTask= this.shadowRoot.querySelector("#inputTask").value;
          
          
          editInput.value=inputTask;
         editInput.className="showToDo"
          listItem.className="editMode";
          editInput.type="text";
      
          
          editInput.style.color="rgb(0,153,0)";
          editButton.innerText="Update";
          editButton.className="edit";
          deleteButton.innerText="Delete";
          deleteButton.className="delete";
      
         
          
          listItem.appendChild(editInput);
          
          listItem.appendChild(editButton);
          listItem.appendChild(deleteButton);
          
          taskHolder.appendChild(listItem);
         }

      

    connectedCallback(){
        this.shadowRoot.querySelector('#addTaskButton').addEventListener('click',()=>this.newElement())

        //event listener
        this.shadowRoot.querySelector("#addedTask").addEventListener('click',(e)=>{
            if(e.target && e.target.className=="delete"){
              e.target.parentNode.remove()
            }
          
            if(e.target && e.target.className=="edit"){
             let li=e.target.parentNode;
             let input = li.querySelector('.showToDo');
             if (input.hasAttribute('readOnly')) {
                 input.removeAttribute('readOnly');
             }
             else {
                 input.setAttribute('readOnly', 'readOnly');
             }
            }
          })
  
    }
}
window.customElements.define('to-do',ToDo)