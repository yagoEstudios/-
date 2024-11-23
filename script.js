// Diccionario para convertir letras a binario según las reglas
const letraABinario = {
    'A': '1011', 'B': '11010101', 'C': '110101101', 'D': '110101', 'E': '1',
    'F': '10101101', 'G': '1101101', 'H': '1010101', 'I': '101', 'J': '1011011011',
    'K': '1101011', 'L': '10110101', 'M': '11011', 'N': '1101', 'O': '11011011',
    'P': '101101101', 'Q': '1101101011', 'R': '101101', 'S': '10101', 'T': '11',
    'U': '101011', 'V': '10101011', 'W': '1011011', 'X': '110101011', 'Y': '1101011011',
    'Z': '110110101', '1': 'a', '2': 'b', '3': 'c', '4': 'd',
    '5': 'e', '6': 'f', '7': 'g', '8': 'h',
    '9': 'i', '0': 'j'
};

// Variable para almacenar el resultado en binario
let binaryResult = ''
let flag = false;
let co;
let deco;

let nfilas;
let decofils;
let decoPals;
let decoLetras;

let numPalabrasEnLaFila;

function binaryToLetter(binary) {
    // Recorremos el diccionario y buscamos el binario
    for (const [letter, bin] of Object.entries(letraABinario)) {
        if (bin === binary) {
            return letter;  // Si encontramos el binario, devolvemos la letra
        }
    }
    return null; // Si no encontramos la letra, devolvemos null
}

// Función para convertir un mensaje a binario

/*

con 00 separamos letras
con 000 separamos palabras
con 0000 hacemos cambio de linea

*/

function binarioAEmojisSVG(binario) {


    binario = binaryResult;
    // Convertir la cadena binaria en una matriz de emoticonos (cuadrados)
    const svgWidth = 20; // Ancho de cada cuadrado
    const svgHeight = 20; // Altura de cada cuadrado
    const padding = 2; // Espaciado entre los cuadrados
    let x = 1; // Posición inicial en el eje X
    let y = 1; // Posición inicial en el eje Y

    let svgContent = '';
    const rows = binario.split('\n'); // Dividir por líneas

    rows.forEach(row => {
        row.split('').forEach(char => {
            if (char === '1') {
                // Cuadrado negro (⬛)
                svgContent += `<rect x="${x}" y="${y}" width="${svgWidth}" height="${svgHeight}" fill="black" />`;
            } else if (char === '0') {
                // Cuadrado blanco (⬜)
                svgContent += `<rect x="${x}" y="${y}" width="${svgWidth}" height="${svgHeight}" fill="white" stroke="black" stroke-width="0.1" />`;
            }

            x += svgWidth + padding; // Mover a la derecha para el siguiente cuadrado
        });

        x = 0; // Resetear posición X al inicio de la siguiente línea
        y += svgHeight + padding; // Mover hacia abajo para la siguiente fila
    });

    // Crear el SVG completo
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${(svgWidth + padding) * binario.length}" height="${(svgHeight + padding) * rows.length}" viewBox="0 0 ${(svgWidth + padding) * binario.length} ${(svgHeight + padding) * rows.length}">
            ${svgContent}
        </svg>
    `;

    // Crear un blob para descargar el SVG
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    // Crear un enlace para descargar el SVG
    const a = document.createElement('a');
    a.href = url;
    a.download = 'magia.svg';
    a.click(); // Descargar el archivo SVG

    // Limpiar el objeto URL después de descargar
    URL.revokeObjectURL(url);
}

// Ejemplo de uso:
const binario = "10101 001\n1001";
binarioAEmojisSVG(binario);



function create3DArray(dim1, dim2, dim3, initialValue = 0) {
    const array = [];
    for (let i = 0; i < dim1; i++) {
        array[i] = [];
        for (let j = 0; j < dim2; j++) {
            array[i][j] = [];
            for (let k = 0; k < dim3; k++) {
                array[i][j][k] = initialValue;
            }
        }
    }
    return array;
}



function convertToBinary() {
    const inputText = document.getElementById('inputText').value.toUpperCase(); // Convertir a mayúsculas
    binaryResult = ''; // Reinicia el resultado

    for (let i = 0; i < inputText.length; i++) {
        const char = inputText[i];
        //console.log(char);

        if (char === ' ') {
            // Si es un espacio, agregamos "000" para separarlo de la siguiente palabra
            binaryResult += '000';
            //console.log('000');   
        } 
        else if (char === '\n') {
            // Si es un salto de línea, agregamos "0000" para representarlo
            binaryResult += '0000';
            //console.log('0000');
        } 
        else {

            if(i===inputText.length-1){//si es el ultimo elemento  
            binaryResult += letraABinario[char]; // Añadir la letra codificada en binario
            //console.log(letraABinario[char])
            }
            else if((inputText[i+1])==='\n' || inputText[i+1]===' '){//si el siguiente es un salto de linea o espacio
                binaryResult += letraABinario[char];
              //  console.log(letraABinario[char])
            }
            else{
                binaryResult += letraABinario[char] + '00';
                //console.log(letraABinario[char] + '00')
            }
            
        }
    }

    document.getElementById('outputText').value = binaryResult;
}



// Función para decodificar de binario a texto
function convertToText() {

    let filasBinary = [];
    let palabrasBinary = [];
    let letrasBinary = create3DArray();
    let result = '';
    let longPalabra;

    const inputBinary = document.getElementById('inputText').value.trim();
    //console.log(inputBinary);
    
    
    filasBinary = inputBinary.split('0000');
    nfilas = filasBinary.length;

   // console.log(filasBinary); // Separar por 0000 (representa un Enter)
    decofils = filasBinary;

    for(let j = 0 ; j<nfilas ;j++){
        palabrasBinary[j] = filasBinary[j].split('000');
       // console.log(palabrasBinary[j]) // 
        }
    
    decoPals = palabrasBinary;
    
    for(let k = 0 ; k < nfilas ; k++){

        if (!letrasBinary[k]) {
            letrasBinary[k] = []; // Inicializa letrasBinary[k] como un array si no existe
        }

        for(let p = 0 ; p < palabrasBinary[k].length ; p++){
            //console.log(k);
            //console.log(p);
            letrasBinary[k][p] = decoPals[k][p].split('00');
           // console.log(letrasBinary[k][p]) // 
        }
    }

    decoLetras = letrasBinary;


    

    
    for(let l = 0;l<decoLetras.length;l++){ //decoLetras.length == numero de filas


        numPalabrasEnLaFila = decoLetras[l]
        //por cada fila
        for(let r =0;r<decoLetras[l].length;r++){ //decoLetras[l].length == numero de palabras en una fila
            //por cada palabra

            longPalabra = decoLetras[l][r].length;

            for(let m =0;m<longPalabra;m++){
            //por cada letra    
                
            //decoLetras[l][r].length == numero de letras en una palabra de una fila == longitud de una palabra 

            result += binaryToLetter(decoLetras[l][r][m]);
        
            if(m===decoLetras[l][r].length -1)
                result += ' ' 
            }

            
            if(r != numPalabrasEnLaFila-1)
                result += ' '

            

        

        }
        if(l != decoLetras.length-1)
                result += '\n'




    }
        

    
    


    //console.log(result);
    testo = result;
    // Mostrar el resultado decodificado
    document.getElementById('outputText').value = result;
}



// Función para exportar el binario a un archivo .ya
function exportBinary() {
    if (!binaryResult) {
        alert('Primero debes generar un binario para exportar.');
        return;
    }

    const blob = new Blob([binaryResult], { type: 'text/plain' }); // Crea un archivo de texto
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'codificado.ya'; // Nombre del archivo de exportación
    a.click(); // Dispara la descarga
}

// Función para importar un archivo .ya
function importBinary() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Selecciona un archivo para importar.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const content = event.target.result.trim();
        document.getElementById('inputText').value = content;
        document.getElementById('outputText').innerText = "Archivo importado con éxito. Ahora puedes decodificar o continuar.";
    };
    reader.readAsText(file);
}

// Función para copiar el contenido del área de salida al portapapeles
function copyToClipboard() {
    let outputText = document.getElementById('outputText');
    
    // Verificamos si estamos usando un textarea o un div
    if (outputText.tagName === "TEXTAREA") {
        // Si es un textarea, seleccionamos su contenido y lo copiamos
        outputText.select();
        document.execCommand('copy');  // Copiar al portapapeles

        // Notificación de éxito
        showNotification('Texto copiado al portapapeles.', 'success');
    } else if (outputText.tagName === "DIV") {
        // Si es un div, usamos la API moderna del portapapeles
        navigator.clipboard.writeText(outputText.innerText).then(() => {
            // Notificación de éxito
            showNotification('Texto copiado al portapapeles.', 'success');
        }).catch(err => {
            // En caso de error
            showNotification('Error al copiar el texto: ' + err, 'error');
        });
    } else {
        // En caso de que el elemento de salida no sea ni un textarea ni un div
        showNotification('No hay texto para copiar.', 'error');
    }
}

// Función para mostrar una notificación en la página
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;

    // Agregar la notificación a la página
    document.body.appendChild(notification);

    // Desaparecer la notificación después de 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
