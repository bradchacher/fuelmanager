export interface Client {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  date?: any;
  nationalId?: string;
  fuelLevel?: string;
  // vehicle?: {
  //   registration: string,
  //   model: string
  // }
  fuelBalance?: number
}