export interface Address {
  street: string;
  houseNumber: string;
  zipCode: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
}

export interface CustomerRequest {
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
}