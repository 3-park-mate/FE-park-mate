'use server';
export const sendChatMessage = async (
  chatRoomUuid: string,
  message: string,
  messageType: 'text' | 'image' | 'file',
  senderUuid: string
): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:9000/api/v1/chat/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatRoomUuid,
        message,
        messageType,
        senderUuid,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send chat message');
    }

    console.log('Message sent successfully:', response);
  } catch (error) {
    console.error('Error sending chat message:', error);
  }
};
