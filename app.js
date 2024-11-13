/*console.log("hi");*/
const textBox = document.getElementById("boxPid");
const total = document.getElementById("total");
let table = document.getElementById("table");

const btnRemove = document.getElementById("btnRemove");
const btnPrimary = document.getElementById("btnPrimary");
const btnSecondary = document.getElementById("btnSecondary");
const btnCcmod = document.getElementById("btnCcmod");
const btnQc = document.getElementById("btnQc");
const btnCbct = document.getElementById("btnCbct");
const btnCbctSecondary = document.getElementById("btnCbctSecondary");
const btnCbctCcmod = document.getElementById("btnCbctCcmod");
const bntClean = document.getElementById("btnClean");

const txtPrimary = "Primary";
const txtSecondary = "Secondary";
const txtCcmod = "CCMod";
const txtQc = "QC";
const txtCbct = "CBCT-Primary";
const txtCbctSecondary = "CBCT-Secondary";
const txtCbctCc = "CBCT-CCMod";

const primary = 4.56;
const secondary = 3.74;
const ccmod = 2.82;
const qc = 1.10;
const CbctPrimary = 7;
const CbctSecondary = 5.32;
const CbctCcmod = 4.11;

//Arrays para texto
const text = [
  txtPrimary,
  txtSecondary,
  txtCcmod,
  txtQc,
  txtCbct,
  txtCbctSecondary,
  txtCbctCc
];
//Arrays de numeros
const percentages = [
  primary,
  secondary,
  ccmod,
  qc,
  CbctPrimary,
  CbctSecondary,
  CbctCcmod
];


/*Eventos de los botones*/

btnRemove.addEventListener("click", removePrevious);

btnPrimary.addEventListener("click", function (event) {
  checkEmpty(event, text[0], percentages[0]);
});

btnSecondary.addEventListener("click", function (event) {
  checkEmpty(event, text[1], percentages[1]);
});

btnCcmod.addEventListener("click", function (event) {
  checkEmpty(event, text[2], percentages[2]);
});

btnQc.addEventListener("click", function (event) {
  checkEmpty(event, text[3], percentages[3]);
});

btnCbct.addEventListener("click", function (event) {
  checkEmpty(event, text[4], percentages[4]);
});

btnCbctSecondary.addEventListener("click", function (event) {
  checkEmpty(event, text[5], percentages[5]);
});

btnCbctCcmod.addEventListener("click", function (event) {
  checkEmpty(event, text[6], percentages[6]);
});
//Fin eventos



function checkEmpty(event, type, percentage) { //aca se hacen todos los procesos del sistema mainProcess

  if (textBox.value.trim() === '') {

    alert("The PID field must not be empty");

  } else {

    const pid = textBox.value;
    let pidInt = parseInt(pid);
    addTable(pid, type, percentage);
    timeU();
    completions();
    clearTextBox();
  }

}
function removePrevious() {

  if (table.rows.length > 1) {
    table.deleteRow(1);
    timeU();

  } else {
    console.log("nothing to remove");

  }
  completions();
}

function addTable(pid, type, percentage) {

  let row = table.insertRow(1);
  let c1 = row.insertCell(0);
  let c2 = row.insertCell(1);
  let c3 = row.insertCell(2);

  c1.innerText = pid;
  c2.innerText = type;
  c3.innerText = percentage;
}

function timeU() {
  let suma = 0;
  let cellData = 0;
  let totalS = 0;

  for (let i = 1; i < table.rows.length; i++) {

    cellData = table.rows[i].cells[2].textContent;
    suma += parseFloat(cellData);
    totalS = suma.toFixed(2);

    /*color(totalS);*/
  }

  console.log(totalS);

  total.textContent = totalS + '%';

}


function clearTextBox() {
  textBox.value = '';
}

function completions() {

  let primaryCompletion = document.getElementById('primaryCompletion');
  let secondaryCompletion = document.getElementById('SecondaryCompletion');
  let ccmodCompletion = document.getElementById('ccmodCompletion');
  let qcCompletion = document.getElementById('qcCompletion');
  let totalCompletion = document.getElementById('totalCompletion');

  let primary = 0;
  let secondary = 0;
  let ccmod = 0;
  let qc = 0;
  let total = 0;

  for (let i = 1; i < table.rows.length; i++) {

    if (table.rows[i].cells[1].innerText === txtPrimary || table.rows[i].cells[1].innerText === txtCbct) {
      primary++;
      console.log(primary);

    } else if (table.rows[i].cells[1].textContent === txtSecondary || table.rows[i].cells[1].textContent === txtCbctSecondary) {
      secondary++;

    } else if (table.rows[i].cells[1].textContent === txtCcmod || table.rows[i].cells[1].textContent === txtCbctCc) {

      ccmod++;
    } else if (table.rows[i].cells[1].textContent === txtQc) {
      qc++;
    }

  }
  primaryCompletion.textContent = primary;
  secondaryCompletion.textContent = secondary;
  ccmodCompletion.textContent = ccmod;
  qcCompletion.textContent = qc;

  total = total + primary + secondary + ccmod + qc;
  totalCompletion.textContent = total;
}
