export interface Recording {
  id: string;
  title: string;
  description: string;
  recorded_at: string;
  location: {
    city: string;
    country: string;
  };
  duration: number;
  tags: string[];
  audio_url: string;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      recordings: {
        Row: Recording;
        Insert: Omit<Recording, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Recording, 'id' | 'created_at' | 'updated_at'>>;
      };
      tags: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
      };
    };
  };
} 