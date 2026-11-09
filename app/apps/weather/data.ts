// ข้อมูลสภาพอากาศจำลอง แก้ตัวเลข/เมืองได้ที่ไฟล์นี้
export type WeatherKind = 'cloud-sun' | 'cloud' | 'rain' | 'sun';

export const CURRENT = {
  label: 'HOME',
  city: 'Bangkok',
  temp: 33,
  feelsLike: 38,
  hi: 34,
  lo: 26,
  condition: 'Partly Cloudy',
  humidity: 65,
  windKmh: 12,
  gustsKmh: 20,
};

// พยากรณ์รายชั่วโมง (ชั่วโมงแสดงตามเวลาจริงของเครื่อง)
export const HOURLY: { icon: WeatherKind; temp: number }[] = [
  { icon: 'cloud-sun', temp: 33 },
  { icon: 'cloud-sun', temp: 34 },
  { icon: 'cloud', temp: 33 },
  { icon: 'cloud', temp: 32 },
  { icon: 'rain', temp: 30 },
  { icon: 'rain', temp: 29 },
];

// พยากรณ์ 10 วัน (ชื่อวันคำนวณจากวันที่จริง วันแรกคือ Today)
export const DAILY: { icon: WeatherKind; lo: number; hi: number }[] = [
  { icon: 'cloud-sun', lo: 26, hi: 34 },
  { icon: 'rain', lo: 26, hi: 33 },
  { icon: 'cloud', lo: 26, hi: 34 },
  { icon: 'cloud', lo: 26, hi: 34 },
  { icon: 'cloud-sun', lo: 26, hi: 34 },
  { icon: 'cloud', lo: 26, hi: 34 },
  { icon: 'rain', lo: 26, hi: 33 },
  { icon: 'cloud', lo: 25, hi: 34 },
  { icon: 'cloud-sun', lo: 26, hi: 35 },
  { icon: 'rain', lo: 26, hi: 34 },
];

// ช่วงอุณหภูมิของแถบกราฟในรายการ 10 วัน
export const RANGE_MIN = 25;
export const RANGE_MAX = 35;
