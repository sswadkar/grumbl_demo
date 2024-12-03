export interface Restaurant {
    id: string;
    name: string;
    distance: string;
    likes: number;
    imageUrl: string;
    description?: string;
    tags?: string[];
  }
  
  export type SwipeDirection = 'left' | 'right' | 'up' | 'down' | null;