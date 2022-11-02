export interface UserInfo {
  id: string;
  name: string;
  email: string;
  cart_id: string;
  role: "AD" | "CM";
}

export interface User {
  token: string | null;
  tokenExpiredTime: number | null;
  userLoading: boolean;
  info: UserInfo;
}

export interface FirebaseUser {
  uid: string;
  email: string | null;
  emailVerified: boolean | null;
  photoURL: string | null;
  token: string;
}

export interface FireBaseUserData {
  name: string | null;
  cart_id: string | null;
  role: "CM" | "AD";
}

export interface GoogleUser extends FirebaseUser {
  displayName: string | null;
}
