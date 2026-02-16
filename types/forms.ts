export interface LoginData {
  email:    string;
  password: string;
}

export interface RegisterData extends LoginData {
  name:     string;
  confirmPassword?: string; 
}

export interface CheckoutFormData {
  name:     string;
  email:    string;
  address:  string;
  phone?:   string; 
  comment?: string; 
}