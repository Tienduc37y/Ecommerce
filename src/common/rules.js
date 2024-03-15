export const min6 = {
    min: 6,
    message: 'Ít nhất 6 ký tự'
}
export const max30 = {
    max: 30,
    message: 'Tối đa 30 ký tự'
}
export const requiredRule = {
    required: true,
    message: 'Bạn cần phải nhập thông tin'
}
export const emailType = { 
    type: 'email',
    message: 'Email sai định dạng' 
}

export const checkMatchPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Nhập lại mật khẩu phải trùng khớp'));
    },
})

export const usernameRule = [ min6, max30, requiredRule ]
export const emailRule = [ min6, max30, requiredRule, emailType ]
export const passwordRule = [ min6, max30, requiredRule ]
export const rePasswordRule = [ min6, max30, requiredRule, checkMatchPassword ]