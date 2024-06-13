export const PER_PAGE_OPTIONS = [10, 20, 30, 40]
export const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://duane1804.info.vn/api'
export const MAX_IMAGE_SIZE = 3 * 1024 * 1024
export const COURSE_SORTABLE_PROPS = ['id', 'course_name', 'course_code']
export const TOPICS_SORTABLE_PROPS = ['id', 'topic_name', 'topic_code']
export const EXAM_SORTABLE_PROPS = [
  'id',
  'exam_name',
  'exam_code',
  'number_of_questions',
  'time_limit',
  'number_attempts',
  'date_created',
]
