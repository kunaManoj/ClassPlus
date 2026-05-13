export interface Template {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  isPremium: boolean;
}

export const CATEGORIES = ['All', 'Love', 'Birthday', 'Anniversary', 'Festival'];

export const mockTemplates: Template[] = [
  {
    id: '1',
    title: 'Love Story Sunset',
    category: 'Love',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf4U6m9wJsEJEKSQeZaL6hSl1vKPBm_K_L5A&s',
    isPremium: false,
  },
  {
    id: '2',
    title: 'Rose & Book',
    category: 'Love',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf4U6m9wJsEJEKSQeZaL6hSl1vKPBm_K_L5A&s',
    isPremium: true,
  },
  {
    id: '3',
    title: 'Neon Birthday Bash',
    category: 'Birthday',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf4U6m9wJsEJEKSQeZaL6hSl1vKPBm_K_L5A&s',
    isPremium: false,
  },
  {
    id: '4',
    title: 'Elegant Anniversary',
    category: 'Anniversary',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf4U6m9wJsEJEKSQeZaL6hSl1vKPBm_K_L5A&s',
    isPremium: true,
  },
  {
    id: '5',
    title: 'Diwali Lights',
    category: 'Festival',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf4U6m9wJsEJEKSQeZaL6hSl1vKPBm_K_L5A&s',
    isPremium: false,
  },
  {
    id: '6',
    title: 'Christmas Cheers',
    category: 'Festival',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf4U6m9wJsEJEKSQeZaL6hSl1vKPBm_K_L5A&s',
    isPremium: true,
  },
  {
    id: '7',
    title: 'Golden Anniversary',
    category: 'Anniversary',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf4U6m9wJsEJEKSQeZaL6hSl1vKPBm_K_L5A&s',
    isPremium: false,
  },
  {
    id: '8',
    title: 'Surprise Party',
    category: 'Birthday',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf4U6m9wJsEJEKSQeZaL6hSl1vKPBm_K_L5A&s',
    isPremium: true,
  },
  {
    id: '9',
    title: 'Valentine Hearts',
    category: 'Love',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf4U6m9wJsEJEKSQeZaL6hSl1vKPBm_K_L5A&s',
    isPremium: false,
  },
  {
    id: '10',
    title: 'Silver Jubilee',
    category: 'Anniversary',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf4U6m9wJsEJEKSQeZaL6hSl1vKPBm_K_L5A&s',
    isPremium: true,
  },
];
