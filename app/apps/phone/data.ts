// รายชื่อผู้ติดต่อ และประวัติการโทรเริ่มต้น แก้ได้ที่ไฟล์นี้
export const CONTACTS = ['i meen', 'jayj', 'jenet', 'my bb', 'supermom'];

export type CallKind = 'LINE Audio' | 'mobile' | 'FaceTime Audio';
export type Direction = 'missed' | 'incoming' | 'outgoing';

export interface CallEntry {
  id: number;
  name: string;
  kind: CallKind;
  direction: Direction; // missed = ชื่อสีแดง
  time: string;
}

const c = (id: number, name: string, kind: CallKind, direction: Direction, time: string): CallEntry => ({
  id,
  name,
  kind,
  direction,
  time,
});

export const INITIAL_CALLS: CallEntry[] = [
  c(1, 'my bb', 'LINE Audio', 'missed', '14:25'),
  c(2, 'my bb', 'LINE Audio', 'missed', '14:25'),
  c(3, 'supermom', 'mobile', 'incoming', '14:21'),
  c(4, 'jayj', 'LINE Audio', 'outgoing', '13:58'),
  c(5, 'my bb', 'FaceTime Audio', 'incoming', '13:40'),
  c(6, 'jenet', 'LINE Audio', 'missed', '12:15'),
  c(7, 'i meen', 'mobile', 'outgoing', '11:52'),
  c(8, 'my bb', 'LINE Audio', 'outgoing', '11:03'),
  c(9, 'supermom', 'LINE Audio', 'missed', '10:47'),
  c(10, 'jayj', 'mobile', 'incoming', '09:30'),
  c(11, 'my bb', 'LINE Audio', 'missed', '08:12'),
  c(12, 'jenet', 'FaceTime Audio', 'outgoing', 'Yesterday'),
  c(13, 'my bb', 'LINE Audio', 'incoming', 'Yesterday'),
  c(14, 'supermom', 'mobile', 'missed', 'Yesterday'),
  c(15, 'i meen', 'LINE Audio', 'incoming', 'Yesterday'),
  c(16, 'my bb', 'LINE Audio', 'outgoing', 'Yesterday'),
  c(17, 'jayj', 'LINE Audio', 'missed', 'Tuesday'),
  c(18, 'supermom', 'mobile', 'outgoing', 'Tuesday'),
  c(19, 'my bb', 'LINE Audio', 'missed', 'Monday'),
  c(20, 'jenet', 'mobile', 'incoming', 'Monday'),
  c(21, 'my bb', 'FaceTime Audio', 'outgoing', 'Sunday'),
  c(22, 'i meen', 'mobile', 'missed', 'Sunday'),
  c(23, 'jayj', 'LINE Audio', 'incoming', 'Saturday'),
  c(24, 'supermom', 'LINE Audio', 'outgoing', 'Saturday'),
];
