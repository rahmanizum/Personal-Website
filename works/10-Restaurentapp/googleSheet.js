

//ASSIGNING ELEMENTS TO VARIABLE
const form = document.querySelector(`#my-form`);
const price = document.getElementById("price");
const dish = document.getElementById("pname");
const table = document.getElementById("ptable");
const submitButton = document.getElementById(`submitbtn`)
const table1 = document.getElementById(`tablebody1`);
const table2 = document.getElementById(`tablebody2`);
const table3 = document.getElementById(`tablebody3`);
const refreshButton = document.querySelector(`#refresh`);

// ON SUBMIT FUNCTION 
async function onSubmit(e){
  e.preventDefault();
  if(!validateForm()){
      alert(`Please fill all required fields`);
   }
   else{
        // CREATING OBJECT TO PASS TO SERVER 
        const dishdata = {
          id:new Date().getTime(),
          dishName : dish.value ,
          dishPrice: price.value,
          tableNo : table.value,
          }

        try{    
        //ADD TO SERVER
          const postResponse = await axios.post(`https://sheet.best/api/sheets/49b40c5b-db5f-4775-804d-d2e88702ba0c`,dishdata)
        //PRINT DATA ON BROWSER
          const getResponse = await axios.get(`https://sheet.best/api/sheets/49b40c5b-db5f-4775-804d-d2e88702ba0c`);
          showOutput(getResponse);}
        catch(err){
          console.error(err);
        }  
   }
 
}

// ON DELETE FUNCTION 
async function onDelete(e){
    e.preventDefault();
  //GET ID FROM BUTTON
    const btnId = e.target.id;
  // WHEN CLICK DELETE BUTTON 
    if (e.target && e.target.classList.contains("delbtn")){
  //REMOVE FROM SERVER
    try{
      await axios.delete(`https://sheet.best/api/sheets/49b40c5b-db5f-4775-804d-d2e88702ba0c/id/${btnId}`)
  //DELETE FROM BROWSER
    e.target.parentElement.parentElement.remove();}
    catch(err) {
      console.error(err)
    }   
 }
}

// PRINTING DATA WHEN CLICK REFRESH BUTTON
async function onRefresh(e) {
  e.preventDefault();
  try{
    const getresponse = await axios.get(`https://sheet.best/api/sheets/49b40c5b-db5f-4775-804d-d2e88702ba0c`);
    showOutput(getresponse);
  }
  catch(err){
    console.error(err);
  }
}

// FUNCTION FOR ADDING TO BROWSER
function showOutput(res){
    table1.innerHTML=table1.children[0].outerHTML;
    table2.innerHTML=table2.children[0].outerHTML;
    table3.innerHTML=table3.children[0].outerHTML;
    res.data.forEach((ele,index) => {
        const tr = document.createElement(`tr`);
        const userId = ele.id;
        const tableId = ele.tableNo;
        const txt = `
        <td>${index+1}</td>
        <td>${ele.dishName}</td>
        <td>${ele.dishPrice}</td>
        <td>
            <button class="btn btn-danger delbtn" id = ${userId}>
                delete
            </button>
        </td>
        `;
        //APENDING DETAILS TO TABLE
        tr.innerHTML+=txt;
        //CHOOSING CORRECT TABLE
        if(tableId === 'table1'){
          table1.appendChild(tr);   
        }
        if(tableId === 'table2'){
          table2.appendChild(tr);   
        }
        if(tableId === 'table3'){
          table3.appendChild(tr);   
        }

        //RESET VALUES 
        price.value = ``;
        dish.value = ``;
        table.value =``;
        
    });

  }

//FUNCTION FOR VALIDATION 
function validateForm() {
  if (dish.value === "" || price.value === "" || table.value === "") {
      return false;
  }
  return true; 
}

// EVENT LISTNERS
submitButton.addEventListener('click',onSubmit);
table1.addEventListener('click',onDelete);
table2.addEventListener('click',onDelete);
table3.addEventListener('click',onDelete);
refreshButton.addEventListener('click',onRefresh);

