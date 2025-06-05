import { ChatMessageType, ChatRoomInfoType } from '@/types/chatDataTypes';
import { formatFullDatePartsUtils } from '@/utils/datetimeUtils';

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

  const dateOnly = formatFullDatePartsUtils(message.createdAt).fullDate;
  const prevDateOnly = prevMessage
    ? formatFullDatePartsUtils(prevMessage.createdAt).fullDate
    : null;

  const showDate = !prevMessage || dateOnly !== prevDateOnly;

  return {
    isFromMe,
    showProfile,
    senderProfile,
    dateOnly,
    showDate,
  };
}
