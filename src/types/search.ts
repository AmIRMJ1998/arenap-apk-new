export interface SearchSmallCardType {
  id: string;
  firstName: string;
  lastName: string;
  physicianProfileUrl: string;
  address: string;
  medicalSystemCode: string;
  provinceName: string;
  cityName: string;
  hasImage: boolean;
  patientAppointmentLimitDaysPeriod: number;
  patientAppointmentLimitTotalAppointment: number;
  aboutDr: string;
  physicianSpecialities: PhysicianSpecialityType[];
  bg?: string;
}

export interface PhysicianSpecialityType {
  id?: string
  specialityTitle: string;
}

export interface SpecialitySearchTagType {
  id: number;
  name: string;
  enName?: any;
  link: string;
}


export interface Specialty {
  id: number;
  name: string;
  enName?: any;
}

export interface PhysicianProfileType {
  id: string;
  firstName: string;
  lastName: string;
  physicianProfileUrl: string;
  address: string;
  medicalSystemCode: string;
  provinceName: string;
  cityName: string;
  hasImage: boolean;
  patientAppointmentLimitDaysPeriod: number;
  patientAppointmentLimitTotalAppointment: number;
  aboutDr?: string;
  physicianSpecialities: PhysicianSpecialityType[];
  bg?: string
}

// ---------------------------------------------------------------------------------------


export interface PhysicianSearchType {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  physicianProfileUrl: string;
  address: string;
  medicalSystemCode: string;
  provinceName: string;
  cityName: string;
  hasImage: boolean;
  patientAppointmentLimitDaysPeriod: number;
  patientAppointmentLimitTotalAppointment: number;
  onlineAppointment: boolean;
  textConsultation: boolean;
  voiceConsultation: boolean;
  immediateConsultation: boolean;
  aboutDr?: any;
  rate: number;
  firstAppointment: FirstAppointment | null;
  physicianInsurances: any[];
  physicianSpecialities: PhysicianSpeciality[];
  online?: boolean;
  freeMode?: boolean;
  
}

interface PhysicianSpeciality {
  id: number;
  specialityTitle: string;
  counter: number;
  enName?: any;
  parentId?: any;
  parent?: any;
  citySpecialties?: any;
  physicianSpecialtySigns?: any;
  physicianSpecialtyDiseases?: any;
}

interface FirstAppointment {
  year: number;
  month: number;
  dayOfMonth: number;
  dayOfWeek: number;
  hour: number;
  minute: number;
}


export interface ServiceType {
  id: number;
  name: string;
  enName: string
}

export interface DiseaseType {
  id: number;
  name: string;
  enName: string
}

export interface SignType {
  id: number;
  name: string;
  enName: string
}

export interface PhysicianDataSearch {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  physicianProfileUrl: string;
  address: string;
  medicalSystemCode: string;
  provinceName: string;
  cityName: string;
  hasImage: boolean;
  patientAppointmentLimitDaysPeriod: number;
  patientAppointmentLimitTotalAppointment: number;
  onlineAppointment: boolean;
  textConsultation: boolean;
  voiceConsultation: boolean;
  immediateConsultation: boolean;
  aboutDr: null;
  rate: number;
  firstAppointment: null;
  physicianInsurances: any[];
  physicianSpecialities: PhysicianSpeciality[];
}


