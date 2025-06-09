export interface ChatPreviewItemType {
  chatRoomId: string;
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

export interface profileInfoType {
  userUuid: string;
  userNickName: string;
  profileImageUrl: string;
}

export interface ChatRoomInfoType {
  chatRoomName: string;
  usersProfile: profileInfoType[];
}

export interface ChatMessageDisplayInfoType {
  isFromMe: boolean;
  showProfile: boolean;
  senderProfile?: profileInfoType;
  showDate: boolean;
  date: string;
  time: string;
}

export interface chatMessageBlockInfoType {
  prevMessage: ChatMessageType | undefined;
  currentMessage: ChatMessageType;
  currentUser: string;
  chatRoomInfo: ChatRoomInfoType;
}
