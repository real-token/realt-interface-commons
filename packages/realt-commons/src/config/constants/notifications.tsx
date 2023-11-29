import { Translation } from 'react-i18next';
// import { NotificationProps } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';
import { asConst } from '../../utils/asConst';

export enum NotificationsID {
  userCopied = 'userCopied',
}

export const NOTIFICATIONS = asConst<
  Record<
    NotificationsID,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any | ((payload: any) => any)
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
