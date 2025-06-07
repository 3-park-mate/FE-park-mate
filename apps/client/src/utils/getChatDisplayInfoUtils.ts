import { ChatMessageType, ChatRoomInfoType } from '@/types/chatDataTypes';
import {
  formatFullDatePartsUtils,
  formatTimeENUtils,
} from '@/utils/datetimeUtils';

export function getChatDisplayInfoUtil({
  message,
  prevMessage,
  currentUser,
  chatRoomInfo,
}: {
  message: ChatMessageType;
  prevMessage?: ChatMessageType;
  currentUser: string;
  chatRoomInfo: ChatRoomInfoType;
}) {
  const isFromMe = message.senderUuid === currentUser;

  const showProfile =
    !isFromMe &&
    (!prevMessage || message.senderUuid !== prevMessage.senderUuid);

  const senderProfile = chatRoomInfo.usersProfile.find(
    (profile) => profile.userUuid === message.senderUuid
  );

  const date = formatFullDatePartsUtils(message.createdAt).fullDate;
  const prevDateOnly = prevMessage
    ? formatFullDatePartsUtils(prevMessage.createdAt).fullDate
    : null;

  const showDate = !prevMessage || date !== prevDateOnly;

  const time = formatTimeENUtils(message.createdAt);

  return {
    isFromMe,
    showProfile,
    senderProfile,
    showDate,
    date,
    time,
  };
}
