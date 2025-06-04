export interface ChatPreviewItemType {
  chatRoomId: string;
  parkingLotThumbnailUrl: string;
  chatRoomName: string;
  lastMessage: string;
  updatedAt: string;
  unReadCount: number;
}

export interface ChatMessageType {
  chatRoomUuid: string;
  chatMessageUuid: string;
  senderUuid: string;
  message: string;
  messageType: string;
  createdAt: string;
}

export interface ChatRoomInfoType {
  chatRoomName: string;
  hostUuid: string;
  hostNickname: string;
  parkingLotThumbnailUrl: string;
  userUuid: string;
  userNickname: string;
  userProfileUrl: string;
}
