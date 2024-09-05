export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface User {
  email: string;
  _id: string;
  aboutMe?: string;
  birthdate?: string;
  address?: Address;
  currentPage: number;
}
