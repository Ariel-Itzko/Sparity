import RoomMemberModel from "../../model/room/room_member.model.js";

export const createRoom = async (post_id, admin_id) => {
    return await RoomMemberModel.create({ post_id, admin_id });
};

export const getRoomByPostId = async (post_id) => {
    return await RoomMemberModel.findOne({ post_id });
};

export const getRoomById = async (id) => {
    return await RoomMemberModel.findById(id)
};

export const addParticipant = async (post_id, user_id) => {
    return await RoomMemberModel.updateOne(
        {
            post_id,
            "participants.user": { $ne: user_id },
        },
        {
            $push: { participants: { user: user_id } }
        }
    )
};

export const removeParticipant = async (post_id, user_id) => {
    return await RoomMemberModel.updateOne(
        {
            post_id,
        },
        {
            $pull: { participants: { user: user_id } }
        }
    )
};

export const getRoomsForUser = async (user_id) => {
    return RoomMemberModel.find({
        $or: [
            { admin_id: user_id, },
            { "participants.user": user_id }
        ]
    }).populate('admin_id post_id participants.user')
};

export const deleteRoomByPostId = async (post_id) => {
    return RoomMemberModel.deleteOne({ post_id });
};

export const isUserParticipant = async (post_id, user_id) => {
    return RoomMemberModel.exists({
        post_id,
        "participants.user": user_id
    });
};

export const countParticipants = async (post_id) => {
    return RoomMemberModelr.aggregate([
        { $match: { post_id } },
        { $project: { count: { $size: "$participants" } } }
    ]);
};

export const isUserAdmin = async (post_Id, user_Id) => {
    const room = await RoomMemberModel.findOne({ post_Id });
    if (!room) return false;

    return room.admin_id.toString() === user_Id.toString();
};