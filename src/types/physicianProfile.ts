export interface PhysicainProfileType {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  physicianProfileUrl: string;
  address: string;
  medicalSystemCode: string;
  telePhoneNumber: string;
  provinceName: string;
  cityName: string;
  cityEnName: string;
  hasImage: boolean;
  isFavorite: boolean;
  patientAppointmentLimitDaysPeriod: number;
  patientAppointmentLimitTotalAppointment: number;
  onlineAppointment: boolean;
  textConsultation: boolean;
  voiceConsultation: boolean;
  immediateConsultation: boolean;
  latitude: number;
  longitude: number;
  aboutDr: string;
  textConsultationPrice: number;
  description: string;
  rate: number;
  firstAppointment?: any;
  physicianSpecialities: PhysicianSpeciality[];
  comments: any[];
  extraImages: ExtraImageType[];
  appointmentPrice: number;

  // relatedPhysicians: RelatedPhysicianType[];
  today: string;
  physicianProfileSetting: {
    fridayConsultationTextPlan: boolean;
    id: string;
    mondayConsultationTextPlan: boolean;
    physicianProfile: null;
    physicianProfileId: null;
    saturdayConsultationTextPlan: boolean;
    sundayConsultationTextPlan: boolean;
    thursdayConsultationTextPlan: boolean;
    tuesdayConsultationTextPlan: boolean;
    wednesdayConsultationTextPlan: boolean;
  } | null;
}

export interface CommentType {
  approveState: number;
  createdAt: string;
  firstName: string;
  id: string;
  isSuggested: boolean;
  lastName: string;
  message: string;
  physicianProfileId: string;
  rate: number;
  userPhysicianProfileClanedarId: string;
  userPublicName: string;
  waitingTime: number;
  physicianFirstName: string;
  physicianLastName: string;
}

export interface RelatedPhysicianType {
  id: string;
  firstName: string;
  lastName: string;
  provinceName: string;
  cityName: string;
  hasImage: boolean;
  physicianProfileUrl: string;
  onlineAppointment: boolean;
  textConsultation: boolean;
  voiceConsultation: boolean;
  immediateConsultation: boolean;
  rate: number;
  physicianSpecialities: PhysicianSpeciality[];
  bg?: string;
}

export interface PhysicianSpeciality {
  id: number;
  specialityTitle: string;
  counter: number;
  enName?: any;
  parentId?: any;
  parent?: any;
  citySpecialties?: any;
}

export interface ExtraImageType {
  id: string;
  physicianProfileId: string;
  createdAt: string;
  clickHandler: () => void;
  alt: string;
}

// ------------------------------------------------------------------------------------//
export interface PhysicainProfileSecondaryType {
  id: string;
  firstName: string;
  lastName: string;
  physicianProfileUrl: string;
  cityId: number;
  cityName: string;
  provinceId: number;
  provinceName: string;
  hasImage: boolean;
  rate: number;
  onlineAppointment: boolean;
  textConsultation: boolean;
  voiceConsultation: boolean;
  immediateConsultation: boolean;
  firstAppointment?: any;
  freeMode?: boolean;
  physicianSpecialities: PhysicianSpeciality[];
}
