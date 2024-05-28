export interface MyAppointmentType {
  id: string;
  calendarId: string;
  physicianProfileId: string;
  index: number;
  physicianName: string;
  physicianProfileUrl: string;
  status: string;
  passedOrFuture: string;
  hour: string;
  minute: string;
  hasImage: boolean;
  onlineAppointment: boolean;
  textConsultation: boolean;
  voiceConsultation: boolean;
  immediateConsultation: boolean;
  calendar: CalendarType;
  specialities: Speciality[];
  [key: string]: any;
}

export interface CalendarType {
  id: string;
  dayOffset: number;
  year: string;
  month: string;
  dayOfMonth: string;
  dayOfWeek: string;
  isHoliday: boolean;
}

export interface Speciality {
  id: number;
  specialityTitle: string;
  counter: number;
  enName: any;
  parentId: any;
  parent: any;
  citySpecialties: any;
}

//--------------------------------------------------------------------------------------------------------------
export interface PhysicianCalendarType {
  physicianProfile: PhysicianProfile;
  physicianProfileCalendars: PhysicianProfileCalendar[];
  specialityTags: SpecialityTag[];
  firstppointment: Firstppointment | null;
  isServerAppointmentActive: boolean;
}

export interface Firstppointment {
  index: number;
  physicianProfileId: string;
  calendarId: string;
  year: number;
  month: number;
  dayOfMonth: number;
  dayOfWeek: number;
  hour: number;
  minute: number;
}

export interface SpecialityTag {
  id: number;
  title: string;
}

export interface PhysicianProfileCalendar {
  calendar: CalendarType;
  availableHours: string;
  available: boolean;
}


export interface PhysicianProfile {
  id: string;
  firstName: string;
  lastName: string;
  terms?: any;
  description: string;
  physicianProfileUrl: string;
  physicianProfileImageUrl?: any;
  maxDayOffsetForAppointment: number;
  telePhoneNumber: string;
  address: string;
  medicalSystemCode: string;
  instagramUrl: string;
  doNotShowMyCalendar: boolean;
  hasImage: boolean;
  appointmentPrice: number;
  appointmentTimeLimition?: boolean
  oldPatienOnly: boolean;
  rate: number;
  city: City;
  seenCount: number;
  latitude: number;
  longitude: number;
  aboutDr?: any;
  specialties: Specialty[];
  physicianSpecialities?: PhysicianSpeciality[]
}

export interface Specialty {
  name: string;
}

export interface City {
  id: number;
  name: string;
  centerName: string;
  province: Province;
}

export interface Province {
  id: number;
  name: string;
}

//--------------------------------------------------------------------------------------------------------------
export interface OneAppointmentType {
  userFirstName: string;
  userLastName: string;
  userNationalNumber: string;
  userPhoneNumber: string;
  physicianId: string;
  physicianFirstName: string;
  physicianLastName: string;
  hasImage: boolean;
  physicianPhoneNumber: string;
  address: string;
  latitude: number;
  longitude: number;
  physicianSpecialities: PhysicianSpeciality[];
  calendar: Calendar;
  passedOrFuture: string;
  hour: string;
  minute: string;
}

export interface Calendar {
  id: string;
  dayOffset: number;
  year: number;
  month: number;
  dayOfMonth: number;
  dayOfWeek: number;
  isHoliday: boolean;
}

export interface PhysicianSpeciality {
  id: number;
  specialityTitle: string;
  counter: number;
  enName: null;
  parentId: null;
  parent: null;
  citySpecialties: null;
}
