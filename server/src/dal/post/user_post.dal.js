import UserPostModel from '../../model/post/user_post.model.js';

export const getUserPostById = (postId) => {
    return UserPostModel.findById(postId).populate('user_id');
};

export const getAllUserPosts = () => {
    return UserPostModel.find().populate('user_id').sort({ createdAt: -1 });
};

export const getUserPostsByUserId = (userId) => {
    return UserPostModel.find({ user_id: userId }).sort({ createdAt: -1 });
};

export const updateUserPost = (postId, updateData) => {
    return UserPostModel.findByIdAndUpdate(postId, updateData, { new: true });
};

export const deleteUserPost = (userId, postId) => {
    return UserPostModel.findOneAndDelete({ _id: postId, user_id: userId });
};

export const createUserPost = (postData) => {
    const newPost = new UserPostModel(postData);
    return newPost.save();
};