interface Theme {
  id?: string;
  name?: string;
  category?: string;
  author?: string;
  description?: string;
  styles?: Record<string, string>;
  thumbnail?: string;
  path?: string; // Using external themes are allowed!
}

export { Theme };
