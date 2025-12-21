export interface AdmissionType {
  name: string;
  email: string;
  age: string;
  phone: string;
  prevSchool_doc: File[] | null;
  gender: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  profile: File | null;
}
