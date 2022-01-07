export interface User {
  id?: number | null;
  
  first_name: string;
  last_name?: string;
  full_name?: string;
  email: string;
  
  isLogged?: boolean
  is_superuser?: boolean;
  is_staff?: boolean;
  is_active?: boolean;
  
  last_login?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Video {
  id?: number;
  title: string;
  url: string;
  thumbnail: string;
  download_times: number;
  channel: string;
  duration: number;

  created_at: string;
  updated_at: string;
}