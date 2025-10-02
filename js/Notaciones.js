// EXPRESIONES REGULARES
const regexInfija = /^([()\d+\-*/\s]+)$/; 
const regexPrefija = /^([+\-/*]\s+\d+(\s+\d+)*)$/;        
const regexPostfija = /^(\d+(\s+\d+)*\s+[+\-/*])$/;       

let btn1 = document.getElementById("btn_generar");
let arbol = document.getElementById("contenido_arbol");

function precedencia(op) {
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/') return 2;
    return 0;
}
//  POSTFIJA
function infijaToPostfija(exp) {
    let salida = [];
    let stack = [];
    let tokens = exp.match(/\d+|[+\-*/()]/g); // separar números y operadores

    tokens.forEach(token => {
        if (!isNaN(token)) {
            salida.push(token);
        } else if (token === '(') {
            stack.push(token);
        } else if (token === ')') {
            while (stack.length && stack[stack.length - 1] !== '(') {
                salida.push(stack.pop());
            }
            stack.pop();
        } else { 
            while (stack.length && precedencia(stack[stack.length - 1]) >= precedencia(token)) {
                salida.push(stack.pop());
            }
            stack.push(token);
        }
    });

    while (stack.length) salida.push(stack.pop());
    return salida.join(" ");
}
//  PREFIJA
function infijaToPrefija(exp) {
    let tokens = exp.match(/\d+|[+\-*/()]/g).reverse();
    tokens = tokens.map(t => {
        if (t === '(') return ')';
        if (t === ')') return '(';
        return t;
    });

    let postfija = infijaToPostfija(tokens.join(" "));
    return postfija.split(" ").reverse().join(" ");
}
btn1.addEventListener("click", () =>{
    arbol.innerHTML = "";
    let expresion = document.getElementById("expresion").value.trim();

    let tipo = "";
    if(regexInfija.test(expresion)){
        tipo = "INFija";
    }else if(regexPrefija.test(expresion)){
        tipo = "PREfija";
    }else if(regexPostfija.test(expresion)){
        tipo = "POSTfija";
    }else{
        tipo = "No válida";
    }

    arbol.innerHTML = `<p><strong>Tipo de notación detectada:</strong> ${tipo}</p>`;

    if(tipo === "INFija"){
        let post = infijaToPostfija(expresion);
        let pre = infijaToPrefija(expresion);

        arbol.innerHTML += `
            <p><strong>Infija:</strong> ${expresion}</p>
            <p><strong>Prefija:</strong> ${pre}</p>
            <p><strong>Postfija:</strong> ${post}</p>
        `;

        generar_arbol(expresion,1);
        conectar(expresion,1);
    }
});
