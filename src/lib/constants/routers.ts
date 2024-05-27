import { update } from 'lodash'

export const routers = {
  login: '/login',
  register: '/register',
  verifyAccount: '/verify-account',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  dashboard: '/dashboard',
  courses: '/dashboard/courses',
  createCourse: '/dashboard/courses/create',

  admin: {
    login: '/admin/login',
    dashboard: '/admin/dashboard',
  },
} as const

export const dynamicRouters = {
  courseById: (id: string | number) => `/dashboard/courses/detail/${id}`,
  updateCourse: (id: string | number) => `/dashboard/courses/update/${id}`,
  createTopic: (id: string | number) => `/dashboard/courses/detail/${id}/topics`,
  updateTopic: (id: string | number) => `/dashboard/topics/update/${id}`,
  topicById: (id: string | number) => `/dashboard/topics/detail/${id}`,
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
