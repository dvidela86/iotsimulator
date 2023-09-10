
var client = mqtt.connect("wss://broker.emqx.io:8083/mqtt");
var prueb = document.getElementById("pruebita01");
var voltaje = document.getElementById("voltaje");
var presion = document.getElementById("presion");
var nivel = document.getElementById("nivel");
var enviar = document.getElementById("enviar");
var mensajes = [];


//VALORES PARA CONFIGURAR BROKER PAGO:
// var Opciones = {
//   host: "localhost",
//   port: 1883,
//   protocol: "mqtt",
//   clientId: "YoCodigo1",
// };
// var client = mqtt.connect(Opciones);

//ACTUAL FORMATO DEL JSON A ENVIAR PARA LA TABLA

//funcion para conectarse al broker
function EventoConectar() {
  client.subscribe("Nostvs/#", function (err) {
    if (!err) {
      console.log("conectado a: "+ client.log.namespace)
    }
  });
}

//funcion para publicar mensajes
function EventoPublicar(){
  client.publish("Nostvs/Telemetry", 
  `{
    "voltaje":"${voltaje.value}", 
    "presion":"${presion.value}", 
    "nivel":"${nivel.value}" 
  }`);
}


//funcion para ver mensajes
function EventoMensaje(topic, message) {

  if (topic == "Nostvs/Telemetry") {
    console.log(message.toString());
  }

  mensajes.push(message.toString());
  cargarValores(mensajes)
  // client.end()
}

client.on("connect", EventoConectar);
client.on("message", EventoMensaje);
enviar.addEventListener("click", EventoPublicar);

//card para motrar

function cargarValores(mensajes){
  text = ""
  mensajes.forEach(mensaje => {
    text += retornarCardHTML(JSON.parse(mensaje));
  });
  pruebita01.innerHTML = text;
 
   }


function retornarCardHTML(mensaje) {
  console.log(mensaje);
  card = `

  <tr>

  <td>${mensaje.voltaje}</td>
  <td>${mensaje.presion}</td>
  <td>${mensaje.nivel}</td>
</tr>`;
  
  return(card);
  }
