import { toast } from "sonner"

import { addUserRespAPi } from "../../../util/apis/post_resp_api/addUserResp.api.js"

export default function PostCard({ post }) {
    const handleAddResp = async (post_id) => {
        let resp = await addUserRespAPi(post_id)
        if (resp) {
            toast.success('A request message has been sent')
        }
    }
    return (
        <div className='shadow-lg p-3'>
            <div className='flex items-center h-14'>
                <div className="avatar">
                    <div className="w-12 rounded-full">
                        <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                    </div>
                </div>
                <div className='flex pt-3 ml-3 items-baseline flex-col h-full'>
                    <p className='italic font-bold'>{`${post.user_id.first_name} ${post.user_id.last_name}`}</p>
                    <p className='text-xs'>{new Date(post.createdAt).toLocaleString()}</p>
                </div>
            </div>
            <div className='flex border-t border-t-base-300 justify-between px-4 pt-4'>
                <h1 className='text-lg font-bold'>{post.post_heading}</h1>
                <div className="flex flex-wrap gap-2 mt-1">
                    {post.required_skills.map((skill) => (
                        <span
                            key={skill._id}
                            className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded"
                        >
                            {skill.skill_name}
                        </span>
                    ))}
                </div>
            </div>
            <div
                className="prose max-w-none mb-4 px-4"
                dangerouslySetInnerHTML={{ __html: post.post_text }}
            />
            <div className="mt-auto flex justify-between items-end pt-4 px-4">
                <div className="flex gap-3">
                    <button className="btn btn-sm btn-primary">Check in Details</button>
                    <button className="btn btn-sm btn-secondary" onClick={() => {
                        handleAddResp(post._id)
                    }}>Apply Now</button>
                </div>
            </div>
        </div>
    )
}
