var formElement=null;
var respCorrecta=null;
var respCorrecta1=null;
var respCorrecta2=null;
var respCorrecta3=null;
var respuestaSelect=null;
var respuestaSelect1=null;
var respuestasCheckbox = [];
var respuestasCheckbox1 = [];
var respuestaRadio = [];
var respuestaRadio1 = [];
var respuestaRadio2 = [];
var respuestasMultiple = [];
var respuestasMultiple1 = [];
var nota = 0;  //nota de la prueba sobre 13 puntos (hay 13 preguntas)
var xmlDoc=null;
var xslDoc=null;
//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 

 //CORREGIR al apretar el botón
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){
  
   inicializar();
  //if(comprobar()){
   corregirText();
   corregirSelect();
   corregirCheckbox();
   corregirRadio();
   corregirMultiple();
   corregirRadio1();
   corregirRadio2();
   corregirText1();
   corregirText2();
   corregirMultiple1();
   corregirCheckbox1();
   corregirText3();
   corregirSelect1();
   presentarNota();
//  }
   return false; 
 }
 
 //LEER XML de xml/preguntas.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET", "xml/questions.xml", true);
 xhttp.send();


//LEER XSL de xml/questions.xml
 var xhttp2 = new XMLHttpRequest();
 xhttp2.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   xslDoc=this.responseXML;
  }
 };
 xhttp2.open("GET", "xsl/questions.xsl", true);
 xhttp2.send();
 
 }

//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/preguntas.xml
// xmlDOC es el documento leido XML. 
function gestionarXml(dadesXml){
 xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc
 
 //TEXT
 //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
 var tituloInput=xmlDoc.getElementsByTagName("title")[0].innerHTML;
 ponerDatosInputHtml(tituloInput);
 //respCorrecta=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);
 respCorrecta=xmlDoc.getElementsByTagName("answer")[0].innerHTML;
 
  //SELECT
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementsByTagName("title")[1].innerHTML;
 var xpath="/questions/question[@id='jklm_002']/option";
 var nodesSelect = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosSelectHtml(tituloSelect,nodesSelect);
 respuestaSelect=parseInt(xmlDoc.getElementsByTagName("answer")[1].innerHTML);

 //CHECKBOX
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox = xmlDoc.getElementsByTagName("title")[2].innerHTML;
 xpath="/questions/question[@id='jklm_004']/option";
 var nodesCheckbox = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null); 
 ponerDatosCheckboxHtml(tituloCheckbox,nodesCheckbox);
 var nres = xmlDoc.getElementById("jklm_004").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox[i]=xmlDoc.getElementById("jklm_004").getElementsByTagName("answer")[i].innerHTML;
 }

 // RADIO
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloRadio = xmlDoc.getElementsByTagName("title")[3].innerHTML;
 xpath="/questions/question[@id='jklm_001']/option";
 var nodesRadio = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosRadioHtml(tituloRadio,nodesRadio);
 //respuestaRadio=parseInt(xmlDoc.getElementsByTagName("answer")[4].innerHTML);
 var nres = xmlDoc.getElementById("jklm_001").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
 respuestaRadio[i]=xmlDoc.getElementById("jklm_001").getElementsByTagName("answer")[i].innerHTML;
 }

 // MULTIPLE
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloMultiple = xmlDoc.getElementsByTagName("title")[4].innerHTML;
  xpath="/questions/question[@id='jklm_009']/option";
 var nodesMultiple = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosMultipleHtml(tituloMultiple,nodesMultiple);
 //respuestasMultiple=parseInt(xmlDoc.getElementsByTagName("answer")[4].innerHTML);
 var nres = xmlDoc.getElementById("jklm_009").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasMultiple[i]=xmlDoc.getElementById("jklm_009").getElementsByTagName("answer")[i].innerHTML;
 }


// RADIO
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloRadio1 = xmlDoc.getElementsByTagName("title")[5].innerHTML;
 xpath="/questions/question[@id='jklm_002']/option";
 var nodesRadio1 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosRadio1Html(tituloRadio1,nodesRadio1);
 //respuestaRadio=parseInt(xmlDoc.getElementsByTagName("answer")[4].innerHTML);
   var nres = xmlDoc.getElementById("jklm_002").getElementsByTagName('answer').length;
   for (i = 0; i < nres; i++) { 
    respuestaRadio1[i]=xmlDoc.getElementById("jklm_002").getElementsByTagName("answer")[i].innerHTML;
 }

// RADIO
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloRadio2 = xmlDoc.getElementsByTagName("title")[6].innerHTML;
 xpath="/questions/question[@id='jklm_006']/option";
 var nodesRadio2 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosRadio2Html(tituloRadio2,nodesRadio2);
 //respuestaRadio=parseInt(xmlDoc.getElementsByTagName("answer")[4].innerHTML);
 var nres = xmlDoc.getElementById("jklm_006").getElementsByTagName('answer').length;
   for (i = 0; i < nres; i++) { 
    respuestaRadio2[i]=xmlDoc.getElementById("jklm_006").getElementsByTagName("answer")[i].innerHTML;
 }

 //TEXT
 //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
 var tituloInput1=xmlDoc.getElementsByTagName("title")[7].innerHTML;
 ponerDatosInputHtml1(tituloInput1);
 //respCorrecta=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);
 respCorrecta1=xmlDoc.getElementsByTagName("answer")[8].innerHTML;

 //TEXT
 //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
 var tituloInput2=xmlDoc.getElementsByTagName("title")[8].innerHTML;
 ponerDatosInputHtml2(tituloInput2);
 //respCorrecta=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);
 respCorrecta2=xmlDoc.getElementsByTagName("answer")[9].innerHTML;

// MULTIPLE
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloMultiple1 = xmlDoc.getElementsByTagName("title")[9].innerHTML;
 xpath="/questions/question[@id='jklm_010']/option";
 var nodesMultiple1 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosMultipleHtml1(tituloMultiple1,nodesMultiple1);
 //respuestasMultiple=parseInt(xmlDoc.getElementsByTagName("answer")[4].innerHTML);
 var nres = xmlDoc.getElementById("jklm_010").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasMultiple1[i]=xmlDoc.getElementById("jklm_010").getElementsByTagName("answer")[i].innerHTML;
 }


 //CHECKBOX
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox1 = xmlDoc.getElementsByTagName("title")[10].innerHTML;
xpath="/questions/question[@id='jklm_011']/option";
 var nodesCheckbox1 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null); 
 ponerDatosCheckboxHtml1(tituloCheckbox1,nodesCheckbox1);
 var nres = xmlDoc.getElementById("jklm_011").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox1[i]=xmlDoc.getElementById("jklm_011").getElementsByTagName("answer")[i].innerHTML;
 }

 //TEXT
 //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
 var tituloInput3=xmlDoc.getElementsByTagName("title")[11].innerHTML;
 ponerDatosInputHtml3(tituloInput3);
 //respCorrecta=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);
 respCorrecta3=xmlDoc.getElementsByTagName("answer")[13].innerHTML;

  //SELECT
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect1=xmlDoc.getElementsByTagName("title")[12].innerHTML;
 xpath="/questions/question[@id='jklm_013']/option";
 var nodesSelect1 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosSelectHtml1(tituloSelect1,nodesSelect1);
 respuestaSelect1=parseInt(xmlDoc.getElementsByTagName("answer")[14].innerHTML);
}

//****************************************************************************************************
//implementación de la corrección

function corregirText(){
  //Vosotros debéis comparar el texto escrito con el texto que hay en el xml
  //en este ejemplo hace una comparación de números enteros
  var s=formElement.elements[0].value;     
  if (s==respCorrecta) {
   darRespuestaHtml("P1: Exacto!");
   nota +=1;
   
  }
  else {
   darRespuestaHtml("P1: Te has equivocado");
   // if (s!=respCorrecta) darRespuestaHtml("P1: Te has equivocado");
  }
  var useranswer = xmlDoc.createElement("useranswer");   
  useranswer.innerHTML = s;
  xmlDoc.getElementById("jklm_001").appendChild(useranswer);
}

function corregirSelect(){
  //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
  //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
  //luego comparar ese value con el value guardado en answer
  var sel = formElement.elements[1];  
  if (sel.selectedIndex-1==respuestaSelect) {
   darRespuestaHtml("P2: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("P2: Incorrecto");
 var useranswer = xmlDoc.createElement("useranswer");   
  useranswer.innerHTML = sel.selectedIndex;
  xmlDoc.getElementById("jklm_002").appendChild(useranswer);
}


//Si necesitáis ayuda para hacer un corregirRadio() decirlo, lo ideal es que a podáis construirla modificando corregirCheckbox
function corregirCheckbox(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.historia.length; i++) {  //"historia" es el nombre asignado a todos los checkbox
   if (f.historia[i].checked) {
    var useranswer = xmlDoc.createElement("useranswer");   
    useranswer.innerHTML = i+1;
    xmlDoc.getElementById("jklm_003").appendChild(useranswer);
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox.length; j++) {
     if (i==respuestasCheckbox[j]) escorrecta[i]=true;
    }
   } 
  }
  //Por cada opción que está chequedada, si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
  for (i = 0; i < f.historia.length; i++) {   
   if (f.historia[i].checked) {
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P3: "+"posicion "+i+" correcta");    
    } else {
     nota -=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P3: "+"posicion "+i+" incorrecta");
    }   
   }
  }
}

function corregirRadio(){
 
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.historia1.length; i++) {  //"historia1" es el nombre asignado a todos los checkbox
   if (f.historia1[i].checked) {
    var useranswer = xmlDoc.createElement("useranswer");   
    useranswer.innerHTML = i+1;
    xmlDoc.getElementById("jklm_004").appendChild(useranswer);
    escorrecta[i]=false;     
    for (j = 0; j < respuestaRadio.length; j++) {
     if (i==respuestaRadio[j]) escorrecta[i]=true;
    }
   } 
  }
  //Por cada opción que está chequedada, si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
  for (i = 0; i < f.historia1.length; i++) {   
   if (f.historia1[i].checked) {
    if (escorrecta[i]) {
     nota +=1.0/respuestaRadio.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P4: "+"posicion "+i+" correcta");    
    } else {
     nota -=1.0/respuestaRadio.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P4: "+"posicion "+i+" incorrecta");
    }   
   }
  }
}

function corregirMultiple(){
 
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  var contador=0;
  x = new Boolean(false);
  for (i = 0; i < f.mul.length; i++) {  //"historia" es el nombre asignado a todos los checkbox
   if (f.mul[i].selected) {
    var useranswer = xmlDoc.createElement("useranswer");   
    useranswer.innerHTML = i+1;
    xmlDoc.getElementById("jklm_005").appendChild(useranswer);
    escorrecta[i]=false;     
    for (j = 0; j < respuestasMultiple.length; j++) {
     if (i==respuestasMultiple[j]){
      escorrecta[i]=true;
      contador=contador+1;
      x=true;
    }else{ 
      contador=contador-1;
      x=false;
    }
   } 
  }
  }
  //Por cada opción que está chequedada, si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
  for (i = 0; i < f.mul.length; i++) {   
   if (f.mul[i].selected) {
    
    if (escorrecta[i]) {
     nota +=1.0/respuestasMultiple.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P5 "+"posicion "+i+" correcta");    
    } else {
     nota -=1.0/respuestasMultiple.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P5: "+"posicion "+i+" incorrecta");
    }  
    
   }
   
  }
    if(x && contador>=2){
     darRespuestaHtml("Tiene todas las opciones correctas seleccionadas. Respuesta correcta");
    }else{
     darRespuestaHtml("Tiene la respuesta incorrecta");
     }
 
}

function corregirRadio1(){
 
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.historia2.length; i++) {  //"historia1" es el nombre asignado a todos los checkbox
   if (f.historia2[i].checked) {
    var useranswer = xmlDoc.createElement("useranswer");   
    useranswer.innerHTML = i+1;
    xmlDoc.getElementById("jklm_006").appendChild(useranswer);
    escorrecta[i]=false;     
    for (j = 0; j < respuestaRadio1.length; j++) {
     if (i==respuestaRadio1[j]) escorrecta[i]=true;
    }
   } 
  }
  //Por cada opción que está chequedada, si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
  for (i = 0; i < f.historia2.length; i++) {   
   if (f.historia2[i].checked) {
    if (escorrecta[i]) {
     nota +=1.0/respuestaRadio1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P6: "+"posicion "+i+" correcta");    
    } else {
     nota -=1.0/respuestaRadio1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P6: "+"posicion "+i+" incorrecta");
    }   
   }
  }
}


function corregirRadio2(){
 
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.historia3.length; i++) {  //"historia1" es el nombre asignado a todos los checkbox
   if (f.historia3[i].checked) {
     var useranswer = xmlDoc.createElement("useranswer");   
     useranswer.innerHTML = i+1;
     xmlDoc.getElementById("jklm_007").appendChild(useranswer);
    escorrecta[i]=false;     
    for (j = 0; j < respuestaRadio2.length; j++) {
     if (i==respuestaRadio2[j]) escorrecta[i]=true;
    }
   } 
  }
  //Por cada opción que está chequedada, si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
  for (i = 0; i < f.historia3.length; i++) {   
   if (f.historia3[i].checked) {
    if (escorrecta[i]) {
     nota +=1.0/respuestaRadio2.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P7: "+"posicion "+i+" correcta");    
    } else {
     nota -=1.0/respuestaRadio2.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P7: "+"posicion "+i+" incorrecta");
    }   
   }
  }
}

function corregirText1(){
  //Vosotros debéis comparar el texto escrito con el texto que hay en el xml
  //en este ejemplo hace una comparación de números enteros
  var s1=formElement.elements[17].value;     
  if (s1==respCorrecta1) {
   darRespuestaHtml("P8: Exacto!");
   nota +=1;
  }
  else {
   darRespuestaHtml("P8: Te has equivocado");
   // if (s!=respCorrecta) darRespuestaHtml("P1: Te has equivocado"); 
  }
 var useranswer = xmlDoc.createElement("useranswer");   
  useranswer.innerHTML = s;
  xmlDoc.getElementById("jklm_008").appendChild(useranswer);
}


function corregirText2(){
  //Vosotros debéis comparar el texto escrito con el texto que hay en el xml
  //en este ejemplo hace una comparación de números enteros
  var s2=formElement.elements[18].value;     
  if (s2==respCorrecta2) {
   darRespuestaHtml("P9: Exacto!");
   nota +=1;
  }
  else {
   darRespuestaHtml("P9: Te has equivocado");
   // if (s!=respCorrecta) darRespuestaHtml("P1: Te has equivocado");
    
  }
 var useranswer = xmlDoc.createElement("useranswer");   
  useranswer.innerHTML = s;
  xmlDoc.getElementById("jklm_009").appendChild(useranswer);
}


function corregirMultiple1(){

  var f=formElement;
  var escorrecta = [];
  var contador=0;
  x = new Boolean(false);
  for (i = 0; i < f.mul1.length; i++) {  //"historia" es el nombre asignado a todos los checkbox
   if (f.mul1[i].selected) {
     var useranswer = xmlDoc.createElement("useranswer");   
     useranswer.innerHTML = i+1;
     xmlDoc.getElementById("jklm_010").appendChild(useranswer);
    escorrecta[i]=false;     
    for (j = 0; j < respuestasMultiple1.length; j++) {
     if (i==respuestasMultiple1[j]){
      escorrecta[i]=true;
      contador=contador+1;
      x=true;
    }else{
      contador=contador-1;
     x=false;
    }
   } 
  }
 }
  //Por cada opción que está chequedada, si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
  for (i = 0; i < f.mul1.length; i++) {   
   if (f.mul1[i].selected) {
    
    if (escorrecta[i]) {
     nota +=1.0/respuestasMultiple1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P10 "+"posicion "+i+" correcta");    
    } else {
     nota -=1.0/respuestasMultiple1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P10: "+"posicion "+i+" incorrecta");
    }  
    
   }
   
  }
    if(x && contador>=2){
     darRespuestaHtml("Tiene todas las opciones correctas seleccionadas. Respuesta correcta");
    }else{darRespuestaHtml("Tienes la respuesta incorrecta");
}
}

function corregirCheckbox1(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.historia4.length; i++) {  //"historia" es el nombre asignado a todos los checkbox
   if (f.historia4[i].checked) {
    var useranswer = xmlDoc.createElement("useranswer");   
    useranswer.innerHTML = i+1;
    xmlDoc.getElementById("jklm_011").appendChild(useranswer);
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox1.length; j++) {
     if (i==respuestasCheckbox1[j]) escorrecta[i]=true;
    }
   } 
  }
  //Por cada opción que está chequedada, si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
  for (i = 0; i < f.historia4.length; i++) {   
   if (f.historia4[i].checked) {
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P11: "+"posicion "+i+" correcta");    
    } else {
     nota -=1.0/respuestasCheckbox1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P11: "+"posicion "+i+" incorrecta");
    }   
   }
  }
}

function corregirText3(){
  
  var s3=formElement.elements[23].value;     
  if (s3==respCorrecta3) {
   darRespuestaHtml("P12: Exacto!");
   nota +=1;
  }
  else {
   darRespuestaHtml("P12: Te has equivocado");
   // if (s!=respCorrecta) darRespuestaHtml("P1: Te has equivocado");
  }
 var useranswer = xmlDoc.createElement("useranswer");   
  useranswer.innerHTML = s;
  xmlDoc.getElementById("jklm_012").appendChild(useranswer);
 
}

function corregirSelect1(){
  //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
  //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
  //luego comparar ese value con el value guardado en answer
  var sel1 = formElement.elements[24];  
  if (sel1.selectedIndex-1==respuestaSelect1) {
   darRespuestaHtml("P13: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("P13: Incorrecto");
    var useranswer = xmlDoc.createElement("useranswer");   
    useranswer.innerHTML = sel.selectedIndex;
    xmlDoc.getElementById("jklm_013").appendChild(useranswer);
}

  
//****************************************************************************************************
// poner los datos recibios en el HTML
function ponerDatosInputHtml(t){
 document.getElementById("tituloInput").innerHTML = t;
}

function ponerDatosSelectHtml(t,nodes){
  document.getElementById("tituloSelect").innerHTML=t;
  var select = document.getElementsByTagName("select")[0];
  var result = nodes.iterateNext();
  i=0;
  while (result) {
   var option = document.createElement("option");
   option.text = result.innerHTML;
   option.value=i+1; i++;
   select.options.add(option);
   result = nodes.iterateNext();
  } 
}

function ponerDatosCheckboxHtml(t,nodes){
 var checkboxContainer=document.getElementById('checkboxDiv');
 document.getElementById('tituloCheckbox').innerHTML = t;
   var result = nodes.iterateNext();
  i=0;
  while (result) {
   var input = document.createElement("input");
   var label = document.createElement("label");   
   label.innerHTML = result.innerHTML
   label.setAttribute("for", "historia_"+i);
   input.type="checkbox";
   input.name="historia";
   input.id="historia_"+i; i++;
   checkboxContainer.appendChild(input);
   checkboxContainer.appendChild(label);
   checkboxContainer.appendChild(document.createElement("br"));
   result = nodes.iterateNext();
  }   
}

function ponerDatosRadioHtml(t,nodes){
 var radioContainer=document.getElementById('radioDiv');
  document.getElementById('tituloRadio').innerHTML=t;
  var result = nodes.iterateNext();
  i=0;
  while (result) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML = result.innerHTML
   label.setAttribute("for", "historia1_"+i);
    input.type="radio";
    input.name="historia1";
    input.id="historia1_"+i;i++;    
    radioContainer.appendChild(input);
    radioContainer.appendChild(label);
    radioContainer.appendChild(document.createElement("br"));
    result = nodes.iterateNext();
 }  
}

function ponerDatosMultipleHtml(t,nodes){
  document.getElementById('tituloMultiple').innerHTML=t;
 // var select = document.getElementById("mul").multiple=true;
 var select = document.getElementsByTagName("select")[1];
 var result = nodes.iterateNext();
  i=0;
  while (result) {
   var option = document.createElement("option");
   option.text = result.innerHTML;
   option.value=i+1; i++;
   select.options.add(option);
   result = nodes.iterateNext();
  }  
}

function ponerDatosRadioHtml1(t,nodes){
 var radioContainer=document.getElementById('radioDiv1');
  document.getElementById('tituloRadio1').innerHTML=t;
  var result = nodes.iterateNext();
  i=0;
  while (result) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML = result.innerHTML
   label.setAttribute("for", "historia2_"+i);
    input.type="radio";
    input.name="historia2";
    input.id="historia2_"+i;i++;    
    radioContainer.appendChild(input);
    radioContainer.appendChild(label);
    radioContainer.appendChild(document.createElement("br"));
    result = nodes.iterateNext();
 }  
}



function ponerDatosRadioHtml2(t,nodes){
 var radioContainer=document.getElementById('radioDiv2');
  document.getElementById('tituloRadio2').innerHTML=t;
  var result= nodes.iterateNext();
  i=0;
  while (result) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=result.innerHTML;
   label.setAttribute("for", "historia3_"+i);
    input.type="radio";
    input.name="historia3";
    input.id="historia3_"+i;i++;    
    radioContainer.appendChild(input);
    radioContainer.appendChild(label);
    radioContainer.appendChild(document.createElement("br"));
    result = nodes.iterateNext();
 }  
}

function ponerDatosInputHtml1(t){
 document.getElementById("tituloInput1").innerHTML = t;
}

function ponerDatosInputHtml2(t){
 document.getElementById("tituloInput2").innerHTML = t;
}


function ponerDatosMultipleHtml1(t,nodes){
  document.getElementById('tituloMultiple1').innerHTML=t;
 // var select = document.getElementById("mul").multiple=true;
 var select = document.getElementsByTagName("select")[2];
  var result = nodes.iterateNext();
 i=0;
 while (result) { 
    var option = document.createElement("option");
    option.text = result.innerHTML;
    option.value=i+1; i++;
    select.options.add(option);
   result = nodes.iterateNext();
 }  
}


function ponerDatosCheckboxHtml1(t,nodes){
   var checkboxContainer=document.getElementById('checkboxDiv1');
   document.getElementById('tituloCheckbox1').innerHTML = t;
    var result = nodes.iterateNext();
    i=0;
    while (result) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=result.innerHTML;
    label.setAttribute("for", "historia4_"+i);
    input.type="checkbox";
    input.name="historia4";
    input.id="historia4_"+i;i++;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
    checkboxContainer.appendChild(document.createElement("br"));
    result = nodes.iterateNext();
 }  
}

function ponerDatosInputHtml3(t){
 document.getElementById("tituloInput3").innerHTML = t;
}

function ponerDatosSelectHtml1(t,nodes){
   document.getElementById("tituloSelect1").innerHTML=t;
   var select2 = document.getElementsByTagName("select")[3];
   var result = nodes.iterateNext();
   i=0;
   while (result) {
    var option = document.createElement("option");
    option.text = result.innerHTML;
    option.value=i+1; i++;
    select2.options.add(option);
    result = nodes.iterateNext();
 }  
}

//****************************************************************************************************
//Gestionar la presentación de las respuestas
function darRespuestaHtml(r){
 var p = document.createElement("p");
 var node = document.createTextNode(r);
 p.appendChild(node);
 document.getElementById('resultadosDiv').appendChild(p);
}

function presentarNota(){
   document.getElementById('resultadosDiv').style.display = "block";
   //Código transformación xslt con xmlDoc y xslDoc
   if (document.implementation && document.implementation.createDocument) {
        xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xslDoc);
        resultDocument = xsltProcessor.transformToFragment(xmlDoc, document);
        document.getElementById('resultadosDiv').appendChild(resultDocument);
   }
   darRespuestaHtml("Nota: "+nota+" puntos sobre 13");
    //bloquear formulario (recargar para volver a empezar)
   var f=formElement;
   var e = f.elements;
   for (var i = 0, len = e.length; i < len; ++i) {
    e[i].disabled = true;
   }
}

function inicializar(){
   document.getElementById('resultadosDiv').innerHTML = "";
   nota=0.0;
}

//Comprobar que se han introducido datos en el formulario
function comprobar(){
   var f=formElement;
   var checked=false;
   var checked1=false;
   var checked2=false;
   var checked3=false;
   var checked4=false;
   for (i = 0; i < f.historia.length; i++) {  //"historia,historia1..." es el nombre asignado a todos los checkbox
      if (f.historia[i].checked) checked=true;
      if (f.historia1[i].checked) checked1 =true;
      if (f.historia2[i].checked) checked2 =true;
      if (f.historia3[i].checked) checked3 =true;
      if (f.historia4[i].checked) checked4 =true;
   }
 
   if (f.elements[0].value=="") {
    f.elements[0].focus();
    alert("Escribe una respuesta");
    return false;
   
   } else if (f.elements[1].selectedIndex==0) {
    f.elements[1].focus();
    alert("Selecciona una opción");
    return false;
     
   } else if (!checked) {    
    document.getElementsByTagName("h3")[2].scrollIntoView();
    alert("Selecciona una opción del checkbox");
    return false;
   
   } else if (!checked1) {    
    document.getElementsByTagName("h3")[3].scrollIntoView();
    alert("Selecciona una opción del radio");
    return false;
    
   } else if (f.mul[i].selected==0) {
    document.getElementsByTagName("h3")[4].scrollIntoView();
    alert("Selecciona una opción del select múltiple");
    return false;
    
   }else  return true;
}
/*corregirText();
   corregirSelect();
   corregirCheckbox();
   corregirRadio();
   corregirMultiple();
   corregirRadio1();
   corregirRadio2();
   corregirText1();
   corregirText2();
   corregirMultiple1();
   corregirCheckbox1();
   corregirText3();
   corregirSelect1();*/
