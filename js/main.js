const validacion = /^[0-9]+[+-/*]{1}[0-9]+$|^[0-9]+[+-/*]{1}\([0-9]+[+-/*]{1}[0-9]+\)$|^\([0-9]+[+-/*]{1}[0-9]+\)[+-/*][0-9]+$|^\([0-9]+[+-/*]{1}[0-9]+\)[+-/*]\([0-9]+[+-/*]{1}[0-9]+\)$/;
let btn1 = document.getElementById("btn_generar");
let arbol = document.getElementById("contenido_arbol");
let dibujo = ``;
const estilos ={
    color: '#fff',
    outline: false,
    endPlugOutline: false,
    endPlugSize: 1,
    startPlug: 'behind',
    endPlug: 'behind'
}

const nodo = (valor,id) => {
    return `<div class='col-2 align-self-end'><span id="${id}" class='btn btn-sucess rounded-circle'>${valor}</span></div>`;
}
const nodo2 = (valor,id) =>{
return `<div class='col-2 align-self-end'><span id="${id}" class='btn btn-sucess rounded-circle'>${valor}</span></div>`;
}

const generar_arbol = (expresion,id) => {
    let hojas = expresion.split(/[+-/*]/);
    let operador = expresion.replace(/[0-9]+/g,"");
    dibujo = `<div class="row justify-content-around" style="height: 100px;">${hojas[0]? nodo(hojas[0],"a"+id) : ""}`;
    dibujo += nodo2(operador,"o"+id);
    dibujo += `${hojas[1]? nodo(hojas[1],"b"+id) : ""}</div>`;
    arbol.innerHTML += `<div class="col">${dibujo}</div>`;
}
const conectar = (expresion,id) => {
    let hojas = expresion.split(/[+-/*]/);
    if(hojas[0]){
        new LeaderLine(
            document.getElementById("o"+id),
            document.getElementById("a"+id),
            estilos
        );
    }else{
        new LeaderLine(
            document.getElementById("o"+id),
            document.getElementById("o"+(id-1)),
            estilos
        );

    }
    if(hojas[1]){
        new LeaderLine(
            document.getElementById("o"+id),
            document.getElementById("b"+id),
            estilos
        );
    }else{
        new LeaderLine(
            document.getElementById("o"+id),
            document.getElementById("o"+(id-1)),
            estilos
        );

    }
}
const determinar_operaciones = (expresion) =>{
    let op = expresion.split(/\)+|\(+/g);
    return op.map((operacion) => operacion.replace(/\(/, ""));
}
btn1.addEventListener("click", () =>{
    arbol.innerHTML = "";
    let cont = 0;
    let expresion = document.getElementById("expresion").value;
    if(validacion.test(expresion)){
        if(/\)
    }
})