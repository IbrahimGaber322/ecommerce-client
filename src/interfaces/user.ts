export default interface User {
  id: number;
  password: string;
  last_login: string | null;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  profile_image: string | undefined;
  cover_image: string | null;
  is_verified: boolean;
  about: string | null;
}
