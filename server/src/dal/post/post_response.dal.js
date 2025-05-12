import PostResponseModel from "../../model/post/post_response.model.js";

export const addNewUser_PostResp = async (post_id, user_id) => {
    let respPost = await PostResponseModel.findOne({ post_id });

    if (!respPost) {
        respPost = new PostResponseModel({
            post_id,
            resp_users: [{ user_id }]
        });
    } else {
        respPost.resp_users.push({ user_id });
    }

    await respPost.save();
};

export const getUserResp_PostResp = async (post_id, user_id) => {
    return await PostResponseModel.findOne({
        post_id,
        'resp_users.user_id': user_id
    }, {
        'resp_users.$': 1,
        post_id: 1
    })
};

export const getallResp_PostResp = async (post_id) => {
    return await PostResponseModel.findOne({ post_id }).populate('resp_users.user_id');
};

export const updateResp_PostResp = async (post_id, user_id, newStatus) => {
    const result = await PostResponseModel.updateOne(
        {
            post_id,
            'resp_users.user_id': user_id
        },
        {
            $set: {
                'resp_users.$.status': newStatus
            }
        }
    );

    return result.modifiedCount > 0;
};

export const deleteResp_PostResp = async (post_id) => {
    return PostResponseModel.findOneAndDelete({ post_id })
};

export const getAllUserPostResponses = async (user_id) => {
    return await PostResponseModel.aggregate([
        {
            $match: {
                'resp_users.user_id': mongoose.Types.ObjectId(user_id)
            }
        },
        {
            $project: {
                post_id: 1,
                resp_users: {
                    $filter: {
                        input: "$resp_users",
                        as: "user",
                        cond: { $eq: ["$$user.user_id", mongoose.Types.ObjectId(user_id)] }
                    }
                },
                createdAt: 1,
                updatedAt: 1
            }
        }
    ]);
};
