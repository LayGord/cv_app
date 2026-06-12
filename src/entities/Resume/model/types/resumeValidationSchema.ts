export type PersonalDataErrorTypes =
  | 'REQUIRED'
  | 'TOO_SHORT'
  | 'INVALID_DATE'
  | 'INVALID_PHOTO';

export interface PersonalDataErrors {
    firstname?: PersonalDataErrorTypes
    lastname?: PersonalDataErrorTypes
    patronymic?: PersonalDataErrorTypes
    birthdate?: PersonalDataErrorTypes
    photo?: PersonalDataErrorTypes
    sex?: PersonalDataErrorTypes
    citizenship?: PersonalDataErrorTypes
    country?: PersonalDataErrorTypes
    city?: PersonalDataErrorTypes
};