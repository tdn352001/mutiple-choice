export const routers = {
  login: '/login',
  register: '/register',
  verifyAccount: '/verify-account',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  dashboard: '/dashboard',
  courses: '/dashboard/courses',
  topics: '/dashboard/topics',
  exams: '/dashboard/exams',
  createCourse: '/dashboard/courses/create',
  createTopic: '/dashboard/topics/create',
  createExam: '/dashboard/exams/create',
  members: '/dashboard/members',
  admin: {
    login: '/admin/login',
    dashboard: '/admin/dashboard',
  },
} as const

export const dynamicRouters = {
  courseById: (id: string | number) => `/dashboard/courses/detail/${id}`,
  updateCourse: (id: string | number) => `/dashboard/courses/update/${id}`,
  createTopic: (id: string | number) => `/dashboard/topics/create?course_id=${id}`,
  updateTopic: (id: string | number) => `/dashboard/topics/update/${id}`,
  topicById: (id: string | number) => `/dashboard/topics/detail/${id}`,
  examById: (id: string | number) => `/dashboard/exams/detail/${id}`,
  updateExam: (id: string | number) => `/dashboard/exams/update/${id}`,
  quiz: (id: string | number) => `/quiz/${id}`,
}

export const nameRouters = {
  [routers.login]: 'Đăng nhập',
  [routers.register]: 'Đăng ký',
  [routers.verifyAccount]: 'Xác thực tài khoản',
  [routers.forgotPassword]: 'Quên mật khẩu',
  [routers.resetPassword]: 'Đặt lại mật khẩu',
  [routers.dashboard]: 'Trang chủ',
  [routers.courses]: 'Khóa học',
  [routers.createCourse]: 'Tạo khóa học',
  [routers.admin.login]: 'Đăng nhập',
  [routers.admin.dashboard]: 'Trang chủ',
} as const
