let locations = [
    "Branford, CT",
    "Fairfield, CT",
    "Hamden, CT",
    "Milford, CT",
    "Orange, CT"
];
let salesPerson = "Fisher";

let theTitle = document.querySelector("title");
let controller = document.querySelector("#controller");
let salesInput = document.querySelector("#salesInput");
salesInput.focus();
salesInput.select();
let cards = document.querySelector(".cards");

let stateName = "";
let tftParagraphs = [];
let salesNames = [];
let qrImages = [];
let controlText = locations[0];
let stateLocation = controlText.substring(controlText.indexOf(",") + 2, controlText.length);
let imgControlText = controlText.replace(", ","-").toLowerCase();

theTitle.innerText = `TFT Card - ${controlText.replace(",","")} - ${salesPerson}`;

getStateName();
let selectLocation = createElementPlus("select",controller,null,{id:"location",name:"location"},null);

for (let i = 0; i < locations.length; i++) {
    const location = locations[i];
    createElementPlus("option",selectLocation,null,{value: `${location}`},location);
}

let printCards = createElementPlus("button",controller,"print-card",null,"Print Card");
printCards.addEventListener("click",function(){
    print()
});
salesInput.addEventListener('click', () => {
    salesInput.select();
});
salesInput.addEventListener("keyup",function(){
    salesPerson = salesInput.value;
    salesNames.forEach(function(sn){
        sn.innerText = salesPerson;
    });
    theTitle.innerText = `TFT Card - ${controlText.replace(",","")} - ${salesPerson}`;
});
selectLocation.addEventListener("change",function(){
    controlText = locations[selectLocation.options.selectedIndex];
    stateLocation = controlText.substring(controlText.indexOf(",") + 2,controlText.length );
    getStateName();
    tftParagraphs.forEach(function(tftP){
        tftP.innerHTML = `Town Fair Tire Centers <br>of ${stateName} LLC <br>${controlText}`;
    });
    imgControlText = controlText.replace(", ","-").toLowerCase();
    qrImages.forEach(function(qrImg){
        qrImg.setAttribute("src",`images/qr-codes/${imgControlText}.png`);
    });
    
    theTitle.innerText = `TFT Card - ${controlText.replace(",","")} - ${salesPerson}`;
});

for (let i = 0; i < 12; i++) {  
    let card = createElementPlus("div",cards,"card",null,null);
    let images = createElementPlus("div",card,"images",null,null);
    // Create tft-logo
    createElementPlus("img",images,null,{src:`images/Town Fair Logo_Red Back.png`,alt:`tft-logo`},null);
    // Create QR Code Logo
    let qrImage = createElementPlus("img",images,null,{src:`images/qr-codes/${imgControlText}.png`,alt:`QR Code`},null);
    qrImages.push(qrImage);
    
    let textDiv = createElementPlus("div",card,"text",null,null);
    let top = createElementPlus("div",textDiv,"top",null,null);

    // Name of sales person
    let mid = createElementPlus("div",textDiv,"mid",null,salesPerson);
    salesNames.push(mid);
    // console.log(salesNames[0].innerText);
    // Create top paragraph
    createElementPlus("p",top,null,null,"Guaranteed Lowest Price");
    // Create next two paragraphs
    let tftParagraph = createElementPlus("p",top,null,null,`Town Fair Tire Centers <br>of ${stateName} LLC <br>${controlText}`);
    tftParagraphs.push(tftParagraph);
    let stars = createElementPlus("div",top,"stars",null,null);
    for (let i = 0; i < 5; i++) {
        // create star image
        createElementPlus("img",stars,null,{src:"images/star.png",alt:"star"},null);
        // createElementPlus("div",stars,"star",null,null);
    }
    let bottom = createElementPlus("div",textDiv,"bottom",null,null);
    // Create Salesman line
    createElementPlus("p",bottom,null,null,"Your Salesman");
    let footer = createElementPlus("footer",card,null,null,null);
    // Create footer paragraph
    createElementPlus("p",footer,null,null,"Satisfied with your service? Let us know on");
    // Create Google image in bottom paragraph
    createElementPlus("img",footer,null,{src:"images/google_logo-667x400.png",alt:"Google Logo"},null);
}

function createElementPlus(elementType,appendToElement,theClass,theAttributes,theText) {
    let createdElement = document.createElement(elementType);
    appendToElement.appendChild(createdElement);  
    if (theClass) {
        createdElement.classList.add(theClass);
    }
    for (const key in theAttributes) {
        if (Object.hasOwnProperty.call(theAttributes, key)) {
            const attName = theAttributes[key];
            createdElement.setAttribute(key,attName);
        }
    }
    createdElement.innerHTML = theText;
    return createdElement;
}

function getStateName(){
    if (stateLocation == "CT") {
        stateName = "Connecticut";
    } else if (stateLocation == "NH"){
        stateName = "New Hampshire";
    } else if (stateLocation == "MA"){
        stateName = "Massachusetts";
    } else if (stateLocation == "NY"){
        stateName = "New York";
    }
};