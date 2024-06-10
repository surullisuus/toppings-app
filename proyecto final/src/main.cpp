//Este skecht se ha desarrollado para activar el bombillo a partir del umbral
//también el ventilador cuando la temperatura suba por encima de cierto umbral
#include "Arduino.h"
//*************** Coneción a ThinkSpeak *********
#include <ThingSpeak.h>
#include <ESP8266WebServer.h>

// Información del Canal y Campos de ThingSpeak
char thingSpeakAddress[] = "api.thingspeak.com";
unsigned long channelID = 2562683;
char* readAPIKey = (char*)"FUZ3V069YNYI0HPS";
char* writeAPIKey = (char*)"FSICGHFCJU3U8GN0";
const unsigned long postingInterval = 5L * 1000L;
unsigned int dataFieldOne = 1;                       // Calpo para escribir el estado de la Temperatura
unsigned int dataFieldTwo = 2;                       // Campo para escribir el estado del Bombillo
unsigned int dataFieldThree = 3;                     // Campo para escribir el estado del ventilador
unsigned int dataFieldFour = 4;                      // FCampo para enviar el tiempo de medición
//*************** Fin Conección ThinkSpeak *******

//------------------------- Activar WIFI ESP8266 -----------------------
#include <ESP8266WiFi.h>

char ssid[] = "RICOLETTO";
char password[] = "lencydorado7";
WiFiClient client;              //Cliente Wifi para ThingSpeak
//-------------------------- Fin Configuración WIFI ESP8266 --------------
ESP8266WebServer server(80);
//const int sensorluzpin = A3; 
const int suichepin = D0;   
const int bombillopin = D2;      //Simulado con un led 13 en Arduino
const int ventiladorpin = D3;    //Relay del ventilador
const int temperaturapin = A0;  //Temperatura Grove 
int suicheState = LOW;
//Variables Globales
int umbralLuz = 500;            //Es el umbral en el cual se enciende el bombillo
int umbralTemperatura = 30;     //Es el umbral en el cual se enciende el ventilador
float luminosidad;              //Toma el valor en voltaje
float temperatura;              //Toma el valor en grados
boolean estadoventilador=false; //false = apagado
boolean estadobombillo = false; //false = apagado

//Métodos para encapsular las funcionalidades
//Simular lectura de fotocelda 

void handleRoot() {
  server.send(200, "text/plain", "Bienvenido al servidor ESP8266");
}

void handleOn() {
  digitalWrite(bombillopin, HIGH);
  server.send(200, "text/plain", "LED encendido");
}

void handleOff() {
  digitalWrite(bombillopin, LOW);
  server.send(200, "text/plain", "LED apagado");
}

//Funcion para obtener los valores de los sensores
void LeerSensores(void)
{
  
   temperatura = analogRead(temperaturapin); //Obtencion del valor leido
   float resistance=(float)(1023-temperatura)*10000/temperatura; //Obtencion del valor de la resistencia
   temperatura=(temperatura*3.3*100)/1024;
}

void ImprimirValoresSensores(void)
{
 //Imprimir los valores sensados
  Serial.println("========================================");
  
 //Temeratura
 Serial.print("Temperatura: ");
 Serial.print(temperatura);
 Serial.print(" ");
 Serial.println(" ℃ ");
 //Estado del Bombillo
 if (estadobombillo == false)
    Serial.println("Bombillo Apagado");
 else
    Serial.println("Bombillo Encendido");

 //Estado del Ventilador
 if (estadoventilador == false)
    Serial.println("Ventilador Apagado");
 else
    Serial.println("Ventilador Encendido");
}

boolean UmbraldeTemperatura(float umbral)
{
  if(temperatura > umbral){
    digitalWrite(bombillopin, HIGH); // Enciende el bombillo
    delay(2000); // Espera 1 segundo
    digitalWrite(bombillopin, LOW);
    return true;
  }  
  else{
    digitalWrite(bombillopin, LOW); // Apaga el bombillo
    delay(10); // Espera 10 milisegundos
    return false;
  } 
}
boolean UmbraldeTemperaturaVentilador(float umbral)
{
  if(temperatura > umbral){
    digitalWrite(ventiladorpin, HIGH); // Enciende el ventilador
    delay(3000); // Espera 1 segundo
    digitalWrite(ventiladorpin, LOW);
    return true;
  }  
  else{
    digitalWrite(ventiladorpin, LOW); // Apaga el ventilador
    delay(10); // Espera 10 milisegundos
    return false;
  } 
  
}



// Use this function if you want to write a single field
int writeTSData( long TSChannel, unsigned int TSField, float data ){
  int  writeSuccess = ThingSpeak.writeField( TSChannel, TSField, data, writeAPIKey ); // Write the data to the channel
  if ( writeSuccess ){
    //lcd.setCursor(0, 1);
    //lcd.print("Send ThinkSpeak");
    Serial.println( String(data) + " written to Thingspeak." );
    }
    
    return writeSuccess;
}

//use this function if you want multiple fields simultaneously
int write2TSData( long TSChannel, unsigned int TSField1, 
                  float field1Data,unsigned int TSField2, long field2Data,
                  unsigned int TSField3, long field3Data ,
                  unsigned int TSField4, long field4Data ){

  ThingSpeak.setField( TSField1, field1Data );
  ThingSpeak.setField( TSField2, field2Data );
  ThingSpeak.setField( TSField3, field3Data );
  ThingSpeak.setField( TSField4, field4Data );

  int printSuccess = ThingSpeak.writeFields( TSChannel, writeAPIKey );
  return printSuccess;
}


//metodo cliente para controlar los eventos R1 y R2
void setup()
{
  //Abrir el puerto de lectura en el PC para mensajes
  Serial.begin(115200);
  WiFi.begin(ssid, password);

   Serial.println("Conectando a WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("");
  Serial.print("Conectado a WiFi, IP: ");
  Serial.println(WiFi.localIP());

  server.on("/", handleRoot);
  server.on("/on", HTTP_GET, handleOn);
  server.on("/off", HTTP_GET, handleOff);

  server.begin();
  Serial.println("Servidor iniciado.");

  Serial.println("");
  Serial.println("WiFi conectada");
  Serial.println(WiFi.localIP());
  //----------- Fin de conección ESP8266 -----------------------------

  //Establecer los modos de los puertos
  //pinMode(sensorluzpin, INPUT);
  pinMode(bombillopin, OUTPUT);
  pinMode(ventiladorpin, OUTPUT);
  pinMode(temperaturapin, INPUT);
  pinMode(suichepin, INPUT_PULLUP);
  digitalWrite(bombillopin, LOW);

  //************ Conectar Cliente ThinkSpeak *******
    ThingSpeak.begin( client );
  //************ Fin Conectar Cliente ThingSpeak ***
  
  //Inicializar el generador de numeros aleatorios
  randomSeed(analogRead(0));
  
}

//metodo repetitivo
unsigned long lastConnectionTime = 0;
long lastUpdateTime = 0;

  unsigned long startTime = 0;
  bool bombilloEncendido = false;
  bool suichePresionado = false;
  bool suichePrevEstado = HIGH;
  int contador = 0;

void loop()                    
{
  bool suicheEstado = digitalRead(suichepin);
server.handleClient();
  // Detectar el cambio de estado del microswitch (de no presionado a presionado)
  if (suicheEstado == LOW && suichePrevEstado == HIGH) {
    suichePresionado = true;
    Serial.println("Suiche activado");
    contador ++;
    Serial.print("Pulsaciones: ");
    Serial.println(contador);
    // Encender el bombillo
    digitalWrite(bombillopin, HIGH);
    // Guardar el tiempo de inicio
    startTime = millis();
    bombilloEncendido = true;
  }

  // Actualizar el estado anterior del microswitch
  suichePrevEstado = suicheEstado;

  // Si el bombillo está encendido y han pasado 3 segundos
  if (bombilloEncendido && millis() - startTime >= 3000) {
    // Apagar el bombillo
    digitalWrite(bombillopin, LOW);
    bombilloEncendido = false;
    Serial.println("Bombillo apagado");
  }

  // Only update if posting time is exceeded
  if (millis() - lastUpdateTime >=  postingInterval) {
    lastUpdateTime = millis();
    LeerSensores();
    ImprimirValoresSensores();
    //Verificar los umbrales
    estadobombillo = UmbraldeTemperatura(umbralTemperatura);
    estadoventilador = UmbraldeTemperaturaVentilador(umbralTemperatura);
    //Enviar los Datos a ThinkSpeak
    write2TSData( channelID , dataFieldOne , temperatura , 
                      dataFieldTwo , estadobombillo,
                      dataFieldThree , estadoventilador,
                      dataFieldFour, millis());     
    }
}