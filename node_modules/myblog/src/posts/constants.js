// Post configuration constants
export const POST_CONFIG = {
  WORDS_PER_MINUTE: 200,
  DEFAULT_AUTHOR: 'Ayesha Tariq',
  IMAGE_BASE_PATH: '/assets',
  CATEGORIES: {
    WEB_DEVELOPMENT: 'Web Development',
    SPACE_TECHNOLOGY: 'Space Technology',
    PROGRAMMING: 'Programming',
  },
};

// Post schema validation
export const REQUIRED_POST_FIELDS = [
  'id',
  'title',
  'excerpt',
  'content',
  'date',
  'author',
  'imageUrl',
  'tags',
  'category',
];

// Markdown rendering configuration
export const MARKDOWN_CONFIG = {
  breaks: true,
  gfm: true,
  headerIds: true,
};

// Date formatting options
export const DATE_FORMAT_OPTIONS = {
  full: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
  compact: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
};
