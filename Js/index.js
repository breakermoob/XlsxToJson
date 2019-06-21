/*Leon Arango 2019*/

var cursos;

$(document).ready(function () {
   /* Se importa el archivo con un XMLHttpRequest */
   var url = "./xlsx/Cursos.xlsx";
   var oReq = new XMLHttpRequest();
   oReq.open("GET", url, true);
   oReq.responseType = "arraybuffer";

   oReq.onload = function (e) {
      var arraybuffer = oReq.response;

      /* Convertir Datos en un String binario*/
      var data = new Uint8Array(arraybuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");

      /* Llamar el archivo*/
      var workbook = XLSX.read(bstr, { type: "binary" });

      /* DO SOMETHING WITH workbook HERE */
      var first_sheet_name = workbook.SheetNames[0];

      /* Get worksheet */
      var worksheet = workbook.Sheets[first_sheet_name];
      cursos = (XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      console.log(cursos)

      /*Llenar la tabla con los cursos*/
      for (var i = 0; i < cursos.length; i++) {
         var tr = `<tr>
         <td>`+ cursos[i].codigo + `</td>
         <td>`+ cursos[i].curso + `</td>
       </tr>`;
         $("#tablaCursos").append(tr)
      }
   }
   oReq.send()
});