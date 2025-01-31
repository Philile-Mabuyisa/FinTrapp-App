let sal = 0, othIn = 0, groc = 0, rates = 0, elec = 0, sub = 0, fuel = 0, out = 0, insure = 0, phone = 0, tax = 0, loan = 0;
let tableIndex = []; 
let taxBrac = [       
    [0, 0.18],
    [237101, 0.26],
    [370501, 0.31],
    [512801, 0.36],
    [673001, 0.39],
    [857901, 0.41],
    [1817001, 0.45]
    ];
let itemList = [
    ["Salary","sal", 0],
    ["Other Income","othIn", 0],
    "empty_space",
    ["Groceries","groc", 0],
    ["Rates","rates", 0],
    ["Electricity","elec", 0],
    ["Subsciptions","sub", 0],
    ["Fuel/transportation","fuel", 0],
    ["Outings","out", 0],
    ["Insurance","insure", 0],
    ["Phone bill","phone", 0],
    "empty_space",
    ["Tax","tax", 0],
    "empty_space",
    ["Loan","loan", 0]
    ]
     // [[Heading, id, val],...] 
     console.log("Section 0");    

function onCheckboxChange(itemIndex) { 
  let checkbox = document.getElementById(itemList[itemIndex - 2][1]+"ChBx");
  if (checkbox.checked) {
    console.log("Section 1.1");
    onChecked(itemIndex); // Runs function for checked state
    
  } else {
    console.log("Section 1.2");
    onUnchecked(itemIndex); // Runs function for unchecked state
    
  }
}

function onChecked(rowIndex) { // Perform actions for checked state
  console.log("Section 2.1");
    let table = document.getElementById("cashFlowSheet");
    table.deleteRow(rowIndex); //Removes row at index val

    let newRow = table.insertRow(rowIndex); // Insert a row at index val
    let val = rowIndex - 2;
    newRow.setAttribute("id", rowIndex); // Sets row ID
    let th = document.createElement("TH"); // Create Table heading
    th.setAttribute("id", (itemList[val][1]+"Th")); // Sets TH ID
    th.innerHTML = itemList[val][0];

    let td = document.createElement("TD");
    let td1 = document.createElement("TD");
    td.setAttribute("id", (itemList[val][1]+"Td"));
    

    if (rowIndex == 14) {
      //td.innerHTML = ;
      let outputBx = document.createElement("SPAN");
      outputBx.setAttribute("id", (itemList[val][1]));
      outputBx.setAttribute("class","taxBx")
      let inputValue = tax;
      
      outputBx.innerHTML = inputValue;
      td.appendChild(outputBx); // Fills td with tax var

    }
    else {
      td.innerHTML = 'R ';

      let inputBx = document.createElement("INPUT");
      inputBx.setAttribute("id", (itemList[val][1]));

      let inBox = "calculateNet(" + val +")";
      inputBx.setAttribute("oninput", inBox);
      inputBx.setAttribute("type","number");
      inputBx.setAttribute("min","1");
      console.log(inputBx.attributes);
      td.appendChild(inputBx);
    }
    
    newRow.appendChild(th);
    newRow.appendChild(td);

    if (rowIndex == 14){

      outputBx = document.createElement("SPAN");
      inputValue = "D";
      outputBx.innerHTML = inputValue;
      td1.appendChild(outputBx);
      newRow.appendChild(td1);
    }

    if (rowIndex == 16){

      outputBx = document.createElement("SPAN");
      inputValue = "F";
      outputBx.innerHTML = inputValue;
      td1.appendChild(outputBx);
      newRow.appendChild(td1);
    }
    console.log("Checkbox is checked");
    
}

function onUnchecked(rowId) { // Perform actions for unchecked state
  console.log("Section 2.2");
    let val = rowId - 2;
    itemList[val][2] = 0;
    calculateNet();
    var table = document.getElementById("cashFlowSheet");
    
    // Find the row with the specified ID
    var rowToRemove = document.getElementById(rowId);
    
    // Check if the row with the specified ID exists
    if (rowToRemove) {
        // Get the index of the row
        var rowIndex = rowToRemove.rowIndex;
        
        // Remove the row from the table
        table.deleteRow(rowIndex);
       
        let newRow = table.insertRow(rowIndex); // Insert a row at index val to replace deleted row
        newRow.setAttribute("id", rowIndex); // Sets row ID
        let td = document.createElement("TD"); // Creates table data
        td.innerHTML = "<span> </span>"; // Fills td with empty
        
        newRow.appendChild(td); // Adds td to new row
        if (rowId == 14){
          tax = 0;
          
        }
        console.log("Row with ID " + rowId + " removed");
        
    } else {
        console.log("Row with ID " + rowId + " not found");
    }
     
}

function calculateNet(val1) {
  console.log("Section 3.1");
      
     if (val1 >= 0){
      console.log(val1);
     handleElement(val1);
     }
     
     sal = itemList[0][2] || "0";
     othIn = itemList[1][2] || "0";     
    let grIn = parseFloat(sal) + parseFloat(othIn);
    document.getElementById("grIn").innerHTML = grIn;
     
    console.log("Section 3.2");

     groc = itemList[3][2] || "0";
     rates = itemList[4][2] || "0";
     elec = itemList[5][2] || "0";
     sub = itemList[6][2] || "0";
     fuel = itemList[7][2] || "0";
     out = itemList[8][2] || "0";
     insure = itemList[9][2] || "0";
     phone = itemList[10][2] || "0";
             
     let expen = parseFloat(groc) + parseFloat(rates) + parseFloat(elec) + parseFloat(sub) + parseFloat(fuel) + parseFloat(out) + parseFloat(insure) + parseFloat(phone);
       document.getElementById("expen").innerHTML = expen
       console.log("Section 3.3");
     let inBTax = parseFloat(grIn) - parseFloat(expen);
       document.getElementById("inBTax").innerHTML = inBTax;
     calculateTax(grIn);
       //document.getElementById("tax").innerHTML = tax || "0";
       
       console.log(tax); 
     let inATax = parseFloat(inBTax) - parseFloat(tax);
       document.getElementById("inATax").innerHTML = inATax;
    
       loan = itemList[14][2] || "0"; 
     let net = parseFloat(inATax) - parseFloat(loan);
       document.getElementById("net").innerHTML = net;  
       console.log("Section 3.4");          
}

function handleElement(indName) {
  console.log("Section 4.0");
    listElement = document.getElementById(itemList[indName][1]).value;
    console.log(itemList[indName][1]);
    console.log(listElement);
    
    if (listElement) {
      console.log("Section 4.1");
        let inputValue = listElement;
        itemList[indName][2] = inputValue;
        //
    } else {
      console.log("Section 4.2");
        // Element ID is not available or not assigned yet
        let inputValue = 0;
        itemList[indName][2] = inputValue;
        //let indVar = inputValue;
        console.log("Element with ID '" + itemList[indName][1] + "' is not available or not assigned yet");
    }
    console.log("Section 4.3");
    
    console.log(itemList[indName]);
}

function calculateTax(grIn) {
    let taxAmount = 0;
    let gross = grIn * 12;
    if (gross < taxBrac[1][0]){
        taxAmount = gross * 0.18;

    }
    else{
        for (let val = 0; val < taxBrac.length; val++) {
            let bracketLimit = taxBrac[val][0];
            let taxRate = taxBrac[val][1];

            if (gross <= bracketLimit) {
                // If income is within the bracket
                taxAmount += gross * taxRate;
                break; // Exit the loop as we have calculated tax for the entire income
            } else {
                taxAmount += bracketLimit * taxRate;
                gross -= bracketLimit;
            }

            if (val === taxBrac.length - 1) {
                // If it's the last bracket
                taxAmount += gross * taxRate;
                break; // Exit the loop as we have calculated tax for the entire income
            }
        }
    }    
    let roundTaxAmm = taxAmount / 12;
    itemList[12][2] = roundTaxAmm.toFixed(2);
    tax = itemList[12][2] || "0"; 
    document.getElementById("tax").innerHTML = "<p>R " + tax +"</p>" || "0";

    console.log("Section 5, TaxAmount: " + tax);
} 
