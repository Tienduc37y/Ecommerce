import {notification} from 'antd'

export default function useNotification(){
    const [api, contextHolder] = notification.useNotification();
    const infoNotify = (placement, message, description) => {
        api.info({
            message: message || `Loi dang nhap`,
            description: description || 'Dang nhap k thanh cong',
            placement,
        });
    };

    const errorNotify = (placement, message, description) => {
        api.error({
            message: message || `Loi dang nhap`,
            description: description || 'Dang nhap k thanh cong',
            placement,
        });
    };

    return  {contextHolder, infoNotify, errorNotify }
}