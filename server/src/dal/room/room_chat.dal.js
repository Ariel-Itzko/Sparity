import RoomChatModel from "../../model/room/room_chat.model.js";

export const createChatRoom = (room_id) => {
  return RoomChatModel.create({ room_id, messages: [] });
};

export const getMessagesByRoomId = (room_id) => {
  return RoomChatModel.findOne({ room_id }).populate("messages.sender_id");
};

export const addMessageToRoom = (room_id, sender_id, message_text) => {
  return RoomChatModel.updateOne(
    { room_id },
    { $push: { messages: { sender_id, message_text } } }
  );
};

export const clearMessagesInRoom = (room_id) => {
  return RoomChatModel.updateOne(
    { room_id },
    { $set: { messages: [] } }
  );
};

export const deleteChatRoom = (room_id) => {
  return RoomChatModel.deleteOne({ room_id });
};

export const chatRoomExists = (room_id) => {
  return RoomChatModel.exists({ room_id });
};

export const getLatestMessages = (room_id, limit = 20) => {
  return RoomChatModel.aggregate([
    { $match: { room_id } },
    { $project: {
        messages: { $slice: ["$messages", -limit] }
      }
    }
  ]);
};

// export const getAllMessages = (room_id) => {
//   return RoomChatModel.aggregate([
//     { $match: { room_id } },
//     { $project: { messages: 1 } }
//   ]);
// };

