export interface UserType {
  firstName: string;
  lastName: string;
  nationalNumber: string;
  shomareShenasname?: any;
  phoneNumber: string;
  cityId: number;
  cityName: string;
  gender: string;
  provinceId: number;
  provinceName: string;
  accountBalance: number;
}

export interface TransctionsType {
  id: string;
  isSuccess: boolean;
  userId: string;
  user?: any;
  accountBalanceBeforeAction: number;
  description?: any;
  amount: number;
  status?: any;
  createdAt: string;
  actionType: number;
  authority?: any;
  refId?: any;
  isValidConnectToBankForPay: boolean;
  isValidConnectToBankForResult: boolean;
  userPhysicianProfileClanedarId: string;
  userPhysicianProfileClanedar?: any;
}

export interface SpecialityType {
  id: number;
  specialityTitle: string;
  counter: number;
  enName: string;
  parentId?: any;
  parent?: any;
  citySpecialties?: any;
  physicianSpecialtySigns?: any;
  physicianSpecialtyDiseases?: any;
}
