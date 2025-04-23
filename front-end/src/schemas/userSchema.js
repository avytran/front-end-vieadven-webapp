import * as yup from 'yup';

const userSchema = yup.object().shape({
    name: yup.string()
        .required("Tên là bắt buộc"),
    email: yup.string()
        .email("Định dạng email không hợp lệ")
        .required("Email là bắt buộc"),
    avatar_url: yup.string()
});

export { userSchema };