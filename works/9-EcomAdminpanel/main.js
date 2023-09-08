

//ASSIGN ELEMENTS TO VARIABLE
const form = document.querySelector(`#my-form`);
const price = document.getElementById("price");
const productName = document.getElementById("pname");
const submitButton = document.getElementById(`submitbtn`)
const tableBody = document.getElementById(`tablebody`);
const tablefootData = document.getElementById(`tablefootdata`);


// ON SUBMIT FUNCTION 
async function onSubmit(e) {
  e.preventDefault();

  // CREATING OBJECT TO PASS TO SERVER 
  const productdata = {
    productPrice: price.value,
    productName: productName.value,
  };
  console.log(JSON.stringify(productdata));

  try {
    //ADD TO SERVER 
    const postResponse = await axios.post(
      `https://crudcrud.com/api/5e13f6dc21894094834636322a4af2c1/productdata`,
      { productdata }
    );

    console.log(`${postResponse.data.productdata.productName} added`);
    console.log(postResponse);

    // FUNCTION TO PRINT DATA ON BROWSER
    const getResponse = await axios.get(
      `https://crudcrud.com/api/5e13f6dc21894094834636322a4af2c1/productdata`
    );

    console.log(`data fetched for printing`);
    showOutput(getResponse);
    console.log(getResponse);
  } catch (err) {
    console.error(err);
  }
}


// ON EDITORDELETE FUNCTION 
async function onEditorDelete(e) {
  e.preventDefault();
  // GET ID FOR PROCESSING
  const btnId = e.target.id;

  // WHEN CLICK EDIT BUTTON
  if (e.target && e.target.classList.contains("editbtn")) {
    try {
      // GET DATA FFROM SERVER
      const res = await axios.get(
        `https://crudcrud.com/api/5e13f6dc21894094834636322a4af2c1/productdata/${btnId}`
      );
      editing(res);
      // DELETE FROM SERVER
      await axios.delete(
        `https://crudcrud.com/api/5e13f6dc21894094834636322a4af2c1/productdata/${btnId}`
      );

      console.log(`This id : ${btnId}  data deleted`);

      // DELETE FROM BROWSER
      e.target.parentElement.parentElement.remove();

      // RESET VALUES FOR EDITING 
      function editing(res){
        const editProduct = res.data.productdata;
        price.value= editProduct.productPrice;
        productName.value = editProduct.productName;
    }
      // TOTAL WAITING FOR UPDATION 
      tablefootData.innerHTML = `Total Value worth of products : edit product to fetch total`;
    } catch (err) {
      console.error(err);
    }
  }

// WHEN CLICK DELETE BUTTON
  if (e.target && e.target.classList.contains("delbtn")) {
    try {
      // REMOVE FROM SERVER
      await axios.delete(
        `https://crudcrud.com/api/5e13f6dc21894094834636322a4af2c1/productdata/${btnId}`
      );
      // REMOVE FROM BROWSER
      e.target.parentElement.parentElement.remove();
      // TOTAL WAITING FOR REFRESH
      tablefootData.innerHTML = `Total Value worth of products : refresh to fetch total`;
    } catch (err) {
      console.error(err);
    }
  }
}


// FUNCTION FOR ADDING TO BROWSER
function showOutput(res) {
  let totalPrice = 0;
  console.log(res.data);
  tableBody.innerHTML = tableBody.children[0].outerHTML;
  res.data.forEach((ele, index) => {
    totalPrice += Number(ele.productdata.productPrice);
    const tr = document.createElement(`tr`);
    tr.className = 'nowrap';
    const val = ele.productdata;
    const userId = ele._id;
    const txt = `
        <td>${index + 1}</td>
        <td>${val.productName}</td>
        <td>${val.productPrice}</td>
        <td>
            <button class="btn btn-success editbtn" id = ${userId}>
                edit
            </button>
        </td>
        <td>
            <button class="btn btn-danger delbtn" id = ${userId}>
                delete
            </button>
        </td>
        `;
    //appending details to table
    tr.innerHTML += txt;
    tableBody.appendChild(tr);
  });

  //updating the total value worth products 
  tablefootData.innerHTML = `Total Value worth of products : &#8377;${totalPrice}.00`
  // reinitiate to blank
  price.value = '';
  productName.value = '';
}

// PRINTING DATA WHEN CUSTOMER OPEN WEBSITE
async function refresh() {
  try {
    const res = await axios.get(
      `https://crudcrud.com/api/5e13f6dc21894094834636322a4af2c1/productdata`
    );

    console.log(`1st time printing`);
    showOutput(res);
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}
refresh();

// EVENT LISTNERS

submitButton.addEventListener('click', onSubmit);
tableBody.addEventListener('click', onEditorDelete);
