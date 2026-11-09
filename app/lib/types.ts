import type { ComponentType, ReactNode } from 'react';

export type Origin = { x: number; y: number };

/** light = ตัวหนังสือสีขาว (ใช้กับพื้นหลังมืด) | dark = ตัวหนังสือสีดำ (ใช้กับพื้นหลังสว่าง) */
export type StatusBarTheme = 'light' | 'dark';

export interface AppDefinition {
  id: string;
  name: string;
  /** ชื่อไฟล์ใน public/icons เช่น 'instagram.png' (ไม่ใส่ = ใช้ icon ที่วาดด้วยโค้ด) */
  iconSrc?: string;
  /** ไอคอนสำรอง (แสดงเมื่อไม่มีไฟล์รูป) */
  icon: ReactNode;
  badge?: number;
  url?: string;
  component: ComponentType;
  /** class พื้นหลังของหน้าต่างแอป */
  background: string;
  statusBar: StatusBarTheme;
}
