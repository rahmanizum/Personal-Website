//ASSIGNING ELEMENTS TO VARIABLE
const name = document.querySelector('#name');
const date = document.querySelector(`#date`);
const item = document.querySelector(`#item`);
const price  = document.querySelector(`#price`);
const htable = document.querySelector(`#htable`);
const mtable = document.querySelector(`#mtable`);
const htfoot = document.querySelector(`#htfoot`);
const mtfoot = document.querySelector(`#mtfoot`);
const submitButton = document.querySelector(`#submitbtn`);
const refreshButton = document.querySelector(`#refresh`);



//EVENT LISTNERS
submitButton.addEventListener('click',onSubmit);
refreshButton.addEventListener('click',onRefresh);

//ON SUBMIT FUNCTION 
async function onSubmit(e){
    e.preventDefault();
    if(!validateForm()){
        alert(`Please fill all required fields`);
    }
    else{
            //CREATING OBJECT TO PASS TO SERVER
    const expenseData = {
        id:new Date().getTime(),
        userName : name.value,
        userDate : date.value,
        userItem : item.value,
        userPrice: price.value
    }
    console.log("expense data",JSON.stringify(expenseData));
    try{
        //ADD TO SERVER 
        await axios.post(`https://sheet.best/api/sheets/e8748bf2-afaf-4336-a09f-6ec6ec431c11`,expenseData);
        //PRINT DATA ON BROWSER
        const getResponse = await axios.get(`https://sheet.best/api/sheets/e8748bf2-afaf-4336-a09f-6ec6ec431c11`);
        showOutput(getResponse);
        //REST ALL 
        name.value='';
        date.value='';
        item.value='';
        price.value='';
    }
    catch(err){
        console.error(err);
    }
    }

}
//ON CLICKING REFRESH BUTTON 
async function onRefresh(e){
    e.preventDefault();

    try{
        //PRINT DATA ON BROWSER
        const getResponse = await axios.get(`https://sheet.best/api/sheets/e8748bf2-afaf-4336-a09f-6ec6ec431c11`);
        showOutput(getResponse);
    }catch(err){
     console.error(err);
    }

}
//FUNCTION FOR ADDING TO BROWSER
function showOutput(res){
    const hamnadata = res.data.filter((ele)=>{
        return ele.userName=='hamna'
    })
    const mufildata = res.data.filter((ele)=>{
        return ele.userName=='mufil'
    })
calculateTotal(hamnadata,'hamna');
calculateTotal(mufildata,'mufil');
function calculateTotal(resData,who){
    let foodSum=0,shSum=0,clothSum=0,travelSum=0,groceriesSum=0,outingSum=0,othersSum=0,totalData=0;;
    resData.forEach((ele,index) => {
        let items = ele.userItem;
        switch (items){
            case `food`:
                foodSum+=Number(ele.userPrice);
                totalData+=Number(ele.userPrice);
                break;
            case `sandh`:
                shSum+=Number(ele.userPrice);
                totalData+=Number(ele.userPrice);
                break;
            case `cloth`:
                clothSum += Number(ele.userPrice);
                totalData+=Number(ele.userPrice);
                break;
            case `travel`:
                travelSum += Number(ele.userPrice);
                totalData+=Number(ele.userPrice);
                break;
            case `groceries`:
                groceriesSum += Number(ele.userPrice);
                totalData+=Number(ele.userPrice);
                break;
            case `outing`:
                outingSum+= Number(ele.userPrice);
                totalData+=Number(ele.userPrice);
                break;
            case `others`:
                othersSum+= Number(ele.userPrice);
                totalData+=Number(ele.userPrice);
        };
    });
    if(who == 'hamna'){
        htable.querySelector(`#fValue`).innerHTML = foodSum +`&#8377`;
        htable.querySelector(`#shValue`).innerHTML = shSum +`&#8377`;
        htable.querySelector(`#cValue`).innerHTML = clothSum +`&#8377`;
        htable.querySelector(`#tValue`).innerHTML = travelSum +`&#8377`;
        htable.querySelector(`#gValue`).innerHTML = groceriesSum +`&#8377`;
        htable.querySelector(`#outValue`).innerHTML = outingSum +`&#8377`;
        htable.querySelector(`#othValue`).innerHTML = othersSum +`&#8377`;
        htable.querySelector(`#totValue`).innerHTML = totalData+`&#8377`;
        if(totalData>6000){
            htable.querySelector(`#status`).innerHTML = `OverBudget`;
        }else{
            htable.querySelector(`#status`).innerHTML=`Under Budget`;
        }
        if(resData.length!=0)
        document.querySelector(`#hupdate`).innerHTML =`${resData[resData.length-1].userDate}`;


    }
    else{
        mtable.querySelector(`#fValue`).innerHTML = foodSum +`&#8377`;
        mtable.querySelector(`#shValue`).innerHTML = shSum +`&#8377`;
        mtable.querySelector(`#cValue`).innerHTML = clothSum +`&#8377`;
        mtable.querySelector(`#tValue`).innerHTML = travelSum +`&#8377`;
        mtable.querySelector(`#gValue`).innerHTML = groceriesSum +`&#8377`;
        mtable.querySelector(`#outValue`).innerHTML = outingSum +`&#8377`;
        mtable.querySelector(`#othValue`).innerHTML = othersSum +`&#8377`;
        mtable.querySelector(`#totValue`).innerHTML = totalData+`&#8377`;
        if(totalData>6000){
            mtable.querySelector(`#status`).innerHTML = `OverBudget`;
        }else{
            mtable.querySelector(`#status`).innerHTML=`Under Budget`;
        }
        if(resData.length!=0)
        document.querySelector(`#mupdate`).innerHTML =resData[resData.length-1].userDate;
    }
}
}
//FUNCTION FOR VALIDATION 
function validateForm() {
    if (name.value === "" || date.value === "" || item.value === "" || price.value === "") {
        return false;
    }
    return true; 
}


