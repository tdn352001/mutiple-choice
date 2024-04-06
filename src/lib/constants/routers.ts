export const routers = {
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  courses: '/dashboard/courses',
  admin: {
    login: '/admin/login',
    dashboard: '/admin/dashboard',
  },
}

export const nameRouters = {
  [routers.login]: 'Đăng nhập',
  [routers.register]: 'Đăng ký',
  [routers.dashboard]: 'Trang chủ',
  [routers.courses]: 'Khóa học',
  [routers.admin.login]: 'Đăng nhập',
  [routers.admin.dashboard]: 'Trang chủ',
}
