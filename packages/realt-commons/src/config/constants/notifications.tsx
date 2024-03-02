import { Translation } from 'react-i18next';
import { NotificationData } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { asConst } from '../../utils/asConst';

export enum NotificationsID {
  userCopied = 'userCopied',
}

export const NOTIFICATIONS = asConst<
  Record<
    NotificationsID,
    NotificationData | ((payload: any) => NotificationData)
  >
>()({
  [NotificationsID.userCopied]: {
    id: 'user-copied',
    color: 'teal',
    icon: <IconCheck size={14} />,
    title: (
      <Translation ns={'notifications'}>
        {(t) => t('userCopied.title')}
      </Translation>
    ),
    message: (
      <Translation ns={'notifications'}>
        {(t) => t('userCopied.message')}
      </Translation>
    ),
  },
});
