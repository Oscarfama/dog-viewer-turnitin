export interface DogImage {
  id: string;      
  url: string;
  breed: string;
}

export interface RandomImagesResponse {
  message: string[];
  status: 'success' | 'error';
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
