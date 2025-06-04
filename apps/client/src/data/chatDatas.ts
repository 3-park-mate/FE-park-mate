import {
  ChatMessageType,
  ChatPreviewItemType,
  ChatRoomInfoType,
} from '@/types/chatDataTypes';

export const chatPreviewItemDummyData: ChatPreviewItemType[] = [
  {
    chatRoomId: '',
    parkingLotThumbnailUrl: 'https://dummyimage.com/48x48',
    chatRoomName: '주차는 내가 왕',
    lastMessage: '지금바로 입차 가능합니다.',
    updatedAt: '2025-06-04T09:00:00',
    unReadCount: 0,
  },
  {
    chatRoomId: '',
    parkingLotThumbnailUrl: 'https://dummyimage.com/48x48',
    chatRoomName: '부산주차장',
    lastMessage: '지금바로 입차 가능합니다.',
    updatedAt: '2025-06-03T14:00:00',
    unReadCount: 2,
  },
  {
    chatRoomId: '',
    parkingLotThumbnailUrl: 'https://dummyimage.com/48x48',
    chatRoomName: '주차장3',
    lastMessage: '연락바랍니다.',
    updatedAt: '2025-05-29T09:42:00',
    unReadCount: 10,
  },
  {
    chatRoomId: '',
    parkingLotThumbnailUrl: 'https://dummyimage.com/48x48',
    chatRoomName: '부산주차장',
    lastMessage: 'ㄴㅇㄹㄴㅇㄻ',
    updatedAt: '2024-05-29T09:42:00',
    unReadCount: 0,
  },
];

export const ChatMessageDummyDatas: ChatMessageType[] = [
  {
    chatRoomUuid: '1',
    chatMessageUuid: '1',
    senderUuid: 'a1',
    message: '지금 바로 사용 가능합니다.',
    messageType: 'string',
    createdAt: '2024-05-25T09:42:00',
  },
  {
    chatRoomUuid: '1',
    chatMessageUuid: '2',
    senderUuid: 'a1',
    message: '이용 시간 초과 시 추가요금 부과되므로 유의바랍니다.',
    messageType: 'string',
    createdAt: '2024-05-25T09:43:00',
  },
  {
    chatRoomUuid: '1',
    chatMessageUuid: '3',
    senderUuid: 'b1',
    message: '네.',
    messageType: 'string',
    createdAt: '2024-05-25T09:50:00',
  },
  {
    chatRoomUuid: '1',
    chatMessageUuid: '4',
    senderUuid: 'b1',
    message: '예약 바로 진행할게요.',
    messageType: 'string',
    createdAt: '2024-05-25T09:50:12',
  },
  {
    chatRoomUuid: '1',
    chatMessageUuid: '5',
    senderUuid: 'b1',
    message: '예약 바로 진행할게요.',
    messageType: 'string',
    createdAt: '2024-05-25T09:50:12',
  },
  {
    chatRoomUuid: '1',
    chatMessageUuid: '6',
    senderUuid: 'a1',
    message: '이용 시간 30분 초과되었습니다.',
    messageType: 'string',
    createdAt: '2024-05-28T09:50:12',
  },
];

export const ChatRoomInfoDummyData: ChatRoomInfoType = {
  chatRoomName: '부산주차장',
  hostUuid: 'a1',
  hostNickname: '부산 제임스',
  parkingLotThumbnailUrl: 'https://dummyimage.com/36x36',
  userUuid: 'b1',
  userNickname: '사용자1',
  userProfileUrl: 'https://dummyimage.com/36x36',
};
