//Versão do código para o Arduino que controla o placar via Bluetooth 
//Passivel de melhorias, mas funcional para o propósito do projeto

#include <SoftwareSerial.h>

SoftwareSerial bluetooth(10, 11); // RX, TX para o módulo Bluetooth

// Definindo os pinos dos segmentos para cada display
const int segmentPins1[] = {2, 3, 4, 5, 6, 7, 8};       // Pinos para o display 1
const int segmentPins2[] = {9, 10, 11, 12, 13, A0, A1};  // Pinos para o display 2

// Mapeamento de segmentos para cada número (0 a 9)
byte digits[10] = {
  B00111111, // 0
  B00000110, // 1
  B01011011, // 2
  B01001111, // 3
  B01100110, // 4
  B01101101, // 5
  B01111101, // 6
  B00000111, // 7
  B01111111, // 8
  B01101111  // 9
};

int currentNumber1 = 0;
int currentNumber2 = 0;

void setup() {
  for (int i = 0; i < 7; i++) {
    pinMode(segmentPins1[i], OUTPUT);
    digitalWrite(segmentPins1[i], LOW);
    pinMode(segmentPins2[i], OUTPUT);
    digitalWrite(segmentPins2[i], LOW);
  }
  bluetooth.begin(9600);
  Serial.begin(9600);
  displayDigit(currentNumber1, segmentPins1);
  displayDigit(currentNumber2, segmentPins2);
  Serial.println("Arduino pronto. Aguardando comandos...");
}

void loop() {
  if (bluetooth.available()) {
    String command = bluetooth.readString();
    command.trim(); // Remove espaços/newlines

    if      (command == "A1") { currentNumber1 = (currentNumber1 + 1) % 10; }
    else if (command == "D1") { currentNumber1 = (currentNumber1 - 1 + 10) % 10; }
    else if (command == "R1") { currentNumber1 = 0; }
    else if (command == "A2") { currentNumber2 = (currentNumber2 + 1) % 10; }
    else if (command == "D2") { currentNumber2 = (currentNumber2 - 1 + 10) % 10; }
    else if (command == "R2") { currentNumber2 = 0; }

    displayDigit(currentNumber1, segmentPins1);
    displayDigit(currentNumber2, segmentPins2);

    // Confirma recebimento para o app
    bluetooth.println("OK");

    Serial.print("CMD: "); Serial.print(command);
    Serial.print(" | P1: "); Serial.print(currentNumber1);
    Serial.print(" | P2: "); Serial.println(currentNumber2);
  }
}

void displayDigit(int digit, const int segmentPins[]) {
  byte segments = digits[digit];
  for (int i = 0; i < 7; i++) {
    digitalWrite(segmentPins[i], segments & (1 << i));
  }
}
