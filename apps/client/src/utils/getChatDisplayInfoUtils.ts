import { ChatMessageType, ChatRoomInfoType } from '@/types/chatDataTypes';
import {
  formatFullDatePartsUtils,
  formatTimeENUtils,
} from '@/utils/datetimeUtils';

export function getChatDisplayInfoUtil({
  currentMessage,
  prevMessage,
  currentUser,
  chatRoomInfo,
}: {
  currentMessage: ChatMessageType;
  prevMessage?: ChatMessageType;
  currentUser: string;
  chatRoomInfo: ChatRoomInfoType;
}) {
  const isFromMe = currentMessage.senderUuid === currentUser;

  const showProfile =
    !isFromMe &&
    (!prevMessage || currentMessage.senderUuid !== prevMessage.senderUuid);

  const senderProfile = chatRoomInfo.usersProfile.find(
    (profile) => profile.userUuid === currentMessage.senderUuid
  );

  const date = formatFullDatePartsUtils(currentMessage.createdAt).fullDate;
  const prevDateOnly = prevMessage
    ? formatFullDatePartsUtils(prevMessage.createdAt).fullDate
    : null;

  const showDate = !prevMessage || date !== prevDateOnly;

  const time = formatTimeENUtils(currentMessage.createdAt);

  return {
    isFromMe,
    showProfile,
    senderProfile,
    showDate,
    date,
    time,
  };
}
