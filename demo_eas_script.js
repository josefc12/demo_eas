document.addEventListener('DOMContentLoaded', function () {
    
    const btn_reset = document.getElementById('btn_reset');
    const btn_det = document.getElementById('btn_det');
    let set_size = 64; //Default
    
    generateCanvas(set_size);
    applyListeners();
    btn_reset.addEventListener('click', () => {
        removeCanvas();
        generateCanvas(set_size);
        applyListeners();
    });
    btn_det.addEventListener('click', () => {
        set_size = prompt("Set detail of the canvas");
        if(set_size != null){
            set_size = parseInt(set_size);
            let pNum = isOdd(set_size);
            if(pNum == 1){
                set_size +=1;
            };
            if(set_size > 128){
                set_size = 128;
            };
            removeCanvas();
            generateCanvas(set_size);
            applyListeners();
        };
    });
 });

 function generateCanvas(size){
    const masterdiv = document.createElement("div");
    masterdiv.id = "master_div";
    masterdiv.className = "master_div";
    masterdiv.style = "background-color: red;";
    masterdiv.style.width = "512px";
    masterdiv.style.height = "512px";
    masterdiv.style.display= "flex";
    masterdiv.style.flexDirection = "column";
    document.body.appendChild(masterdiv);  

    const mstrDiv = document.querySelector('.master_div');
    let rows = size;
    let columns = size;
    for (i = 0; i < rows; i++){
        let rowdiv = document.createElement("div");
        rowdiv.id = `row${parseInt(i)}`;
        rowdiv.className = "row_div";
        rowdiv.style = "background-color: green;";
        rowdiv.style.width = "100%";
        rowdiv.style.display= "flex";
        rowdiv.style.height = `${parseInt(mstrDiv.style.width) / rows}px`;
        mstrDiv.appendChild(rowdiv);
        let mstrRow = document.getElementById(`row${parseInt(i)}`);
        
        for (x = 0; x < columns; x++){
            let celldiv = document.createElement("div");
            celldiv.className = "cell_div";
            celldiv.style = "background-color: blue;";
            celldiv.style.width = `${parseInt(mstrDiv.style.width) / columns}px`;
            celldiv.style.height = `${parseInt(mstrDiv.style.width) / rows}px`;
            mstrRow.appendChild(celldiv); 
        }       
    }
};

function removeCanvas(){
    //Remove existing canvas first:
    const currentCanvas = document.getElementById('master_div');
    // Remove all children
    while (currentCanvas.firstChild) {
        currentCanvas.firstChild.remove();
    };
    // Remove the parent
    currentCanvas.remove();
};

function applyListeners(){

    let isMouseDown = false;

    document.querySelectorAll('.cell_div').forEach(function(element) {
        element.addEventListener('mouseenter', function(e) {
            // Change the background color of the clicked element
            if(isMouseDown){
                 e.target.style.backgroundColor = 'yellow'; // You can use any color you prefer
            }
        });
        element.addEventListener('mousedown', function(e) {
            // Change the background color of the clicked element
            e.preventDefault();
            e.target.style.backgroundColor = 'yellow';
            isMouseDown = true; // You can use any color you prefer
        });
        element.addEventListener('mouseup', function(e) {
            isMouseDown = false;
        });
    });
};

function isOdd(num) { return num % 2;};