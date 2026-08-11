export interface Address {
  street: string;
  houseNumber: string;
  zipCode: string;
}

export interface Customer {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  address: Address;
}

export interface CustomerRequest {
  firstname: string;
  lastname: string;
  email: string;
  address: Address;
}