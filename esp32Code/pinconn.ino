#include <WiFi.h>
#include <WebServer.h>

const char* ssid     = "";
const char* password = "";

#define OUTPUT_PIN 18   // ye pin HIGH dega
#define INPUT_PIN  19   // ye pin read hoga

WebServer server(80);

void handleStatus() {
  bool connected = digitalRead(INPUT_PIN) == HIGH;

  server.sendHeader("Access-Control-Allow-Origin", "*"); // React app ko allow karne ke liye
  server.send(200, "application/json",
              connected ? "{\"state\":\"CONNECTED\"}"
                        : "{\"state\":\"NOT_CONNECTED\"}");
}

void setup() {
  Serial.begin(115200);

  pinMode(OUTPUT_PIN, OUTPUT);
  digitalWrite(OUTPUT_PIN, HIGH);
  pinMode(INPUT_PIN, INPUT_PULLDOWN);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("WiFi connect ho raha hai");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.print("ESP32 IP: ");
  Serial.println(WiFi.localIP());   // ye IP React app mein daalna hai

  server.on("/status", handleStatus);
  server.begin();
}

void loop() {
  server.handleClient();
}