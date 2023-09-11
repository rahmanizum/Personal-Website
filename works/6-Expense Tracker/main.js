
//ASSIGNING ELEMENTS TO VARIABLE
const expenseForm = document.querySelector('#expenseForm');
const amount= document.querySelector('#amount');
const description= document.querySelector('#description');
const category= document.querySelector('#category');
const userList= document.querySelector('#items');


//ADD EVENT LISTNERS
expenseForm.addEventListener('submit',onsubmit);
userList.addEventListener('click', onEditDelete);

//SUBMIT FUNCTION
function onsubmit(e){
    const id = new Date().getTime();
    e.preventDefault();
    const userData={
        createdAt : id,
        userAmount:`${amount.value}`,
        userDescription:`${description.value}`,
        userCategory:`${category.value}`
    }
    //ADDING DATE TO LOCAL STORAGE 
    localStorage.setItem(`${id}`,`${JSON.stringify(userData)}`);
    
    //ADDING VALUES TO BROWSER BY CREATING A TABLE ROW
    const tr = document.createElement(`tr`);
    const td1 =document.createElement(`td`);
    const td2 =document.createElement(`td`);
    const td3 =document.createElement(`td`);
    const td4 =document.createElement(`td`);
    const td5 =document.createElement(`td`);
    td1.innerText = `${amount.value} ₹`;
    td2.innerText=`${description.value}`;
    td3.innerText=`${category.value}`;

    //CREATING EDIT BUTTON
    const editbtn= document.createElement(`button`);
    editbtn.className=`btn btn-success editbtn m-2`;
    editbtn.setAttribute("id",`${id}`);
    editbtn.innerHTML=`Edit`;
    td4.appendChild(editbtn);

    //CREATING DELETE BUTTON
    const delbtn= document.createElement(`button`);
    delbtn.className=`btn btn-danger delbtn m-2`;
    delbtn.setAttribute("id",`${id}`);
    delbtn.innerHTML=`Delete`;
    td5.appendChild(delbtn);
   // APPENDING ALL TABLE DATA TO TABLE ROW
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

   // APPENDING TABLE ROW TO TABLE BODY
    userList.append(tr);
    
   // RESETTING VALUES
    amount.value='';
    description.value='';
    category.value='';
}

//EDIT OR DELETE FUNCTION
function onEditDelete(e) {
    e.preventDefault();
    if (e.target.classList.contains('delbtn')) {
        // remove from local storage
        const btnId = parseInt(e.target.getAttribute('id'));
        localStorage.removeItem(`${btnId}`);

        // //delete value from browser
        e.target.parentElement.parentElement.remove();

    }
    if (e.target.classList.contains('editbtn')) {
        const btnId = parseInt(e.target.getAttribute('id'));
        const user = localStorage.getItem(`${btnId}`)
        const data = JSON.parse(user);
        console.log(data);
        // //remove from local storage
        localStorage.removeItem(`${btnId}`);
        
        // //regain details
        const editAmout= document.querySelector('input');
        editAmout.value= data.userAmount;
        const editselect= document.querySelectorAll('select');
        editselect[0].value=data.userDescription;
        editselect[1].value=data.userCategory;
        // //delete value from browser
        e.target.parentElement.parentElement.remove();
    }
}


