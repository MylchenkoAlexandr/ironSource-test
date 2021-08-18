import { notification } from 'antd';

export const showMessage = ( description ) => {
    const args = {
        message: 'Notification',
        description,
        duration: 2
    };
    return notification.open(args);
};