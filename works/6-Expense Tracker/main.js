
const expenseForm = document.querySelector('#expenseForm');
const amount= document.querySelector('#amount');
const description= document.querySelector('#description');
const category= document.querySelector('#category');
const userList= document.querySelector('#items');



expenseForm.addEventListener('submit',onsubmit);

function onsubmit(e){
    e.preventDefault();
    const userData={
        userAmount:`${amount.value}`,
        userDescription:`${description.value}`,
        userCategory:`${category.value}`
    }
    userDataString= JSON.stringify(userData);
    //adding element to local storage
    localStorage.setItem(`${amount.value}`,`${JSON.stringify(userData)}`);
    
    //adding element to browser
    const li = document.createElement(`li`);
    li.className=`list-group-item-light border border-black mt-3 p-2 ps-5 w-75`;
    li.innerText=` ${amount.value} rs - ${description.value} - ${category.value} `

    //edit btn
    const editbtn= document.createElement(`button`);
    editbtn.className=`btn btn-success editbtn m-2`;
    editbtn.setAttribute("type","submit");
    editbtn.setAttribute("id",`${userDataString}`);
    editbtn.innerHTML=`Edit`;

    //delebtn 
    const delbtn= document.createElement(`button`);
    delbtn.className=`btn btn-danger delbtn m-2`;
    delbtn.setAttribute("type","submit");
    delbtn.setAttribute("id",`${userDataString}`);
    delbtn.innerHTML=`Delete`;
   // appending
    li.appendChild(editbtn);
    li.appendChild(delbtn);
    userList.append(li);
    
    //reinitializing to blank 
    amount.value='';
    description.value='';
    category.value='';
}

// create delete function 
userList.addEventListener('click', onDelete);

function onDelete(e) {
    e.preventDefault();
    if (e.target.classList.contains('delbtn')) {
        // remove from local storage
        const btnId = JSON.parse(e.target.id).userAmount;
        localStorage.removeItem(`${btnId}`);

        // //delete value from browser
        e.target.parentElement.remove();

    }
    if (e.target.classList.contains('editbtn')) {
        // //remove from local storage
        const btnId = JSON.parse(e.target.id);
        localStorage.removeItem(`${btnId.userAmount}`);
        
        // //regain details
        const editAmout= document.querySelector('input');
        editAmout.value=`${btnId.userAmount}`;
        const editselect= document.querySelectorAll('select');
        editselect[0].value=`${btnId.userDescription}`;
        editselect[1].value=`${btnId.userCategory}`;
        // //delete value from browser
        e.target.parentElement.remove();
    }
}


