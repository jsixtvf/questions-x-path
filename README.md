# questions

**Examen autocorregido**

03/02/2017

- He cambiado del fichero questions.xml esta declaración en la etiqueta DOCTYPE:
 SYSTEM 'questions.dtd'


10/03/2017

- De la rama principal master hay dos branches que son questions-indent y questions-minify.
- La carpeta img contiene imagenes para usar como border-image. Falta implementarlo.
- Al modelo inicial de plantilla de javascript se han adaptado a la hoja XML las funciones de cargar elementos al HTML, como son las preguntas y respuestas, al igual que las funciones de corrección de type select multiple, type radio y se han adaptado convenientemente las funciones de corregir input text, corregir input select y corregir checkbox.

Por mejorar: 

- El uso de sombras y relieves en fuentes, contenedores div, que sea más acorde con CSS3.
- Hay que corregir el corregirSelect y corregirInputText apuntando a la respuesta correcta e identificar en que posicion está realmente cada element dentro del archivo html. Las preguntas 8, 9, 12 y 13 no dan el valor esperado.

11/03/2017

- Se corrige la corrección de las preguntas tipo text y select, mediante la consola del navegador.

25/03/2017

- Se ha sustituido los arrays de opciones por nodes mediante XPath. 
- Se aplica una hoja XSLT con respuestas con los datos XML.
- Método JS de comprobar la respuesta del usuario, si no selecciona o hace input en las preguntas estas empezando por la primera, muestran un mensaje informativo de que tiene que poner algo en la primera pregunta si no ha contestando, así en sucesivo, Para ello se hace un condicional anidado. También se recorren las opciones que se tienen, si ninguna ha sido seleccionada es cuando mostramos el mensaje.





