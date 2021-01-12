float lat = 1000;
float lon = 1100;
float lat_acel = 10;
float lon_acel = 15;
int count = 0;
void setup()
{
  Serial.begin(9600);
}

void loop()
{
  lat += lat_acel;
  lon += lon_acel;

  if (count > 5)
  {
    lon = 1100;
    lon_acel -= 24;
    if (count == 10)
    {
      count = 0;
    }
  }

  else
  {
    lat_acel += 10;
    lon_acel += 25;
  }

  count++;
  Serial.print("25,1500,1,34,");
  Serial.print(lat);
  Serial.print(',');
  Serial.println(lon);
  delay(1000);
}