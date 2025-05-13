import { useParams } from 'react-router-dom';
import { updateUserRespApi } from '../../../util/apis/post_resp_api/updateUserResp.api';

export default function MyPostReviewCard({ resp, onStatusChange }) {
    const { post_id } = useParams();
    const handleUpdate = async (user_id, status) => {
        await updateUserRespApi(post_id, status, user_id);
        if (onStatusChange) {
            onStatusChange();
        }
    }
    return (
        <div>
            <div className='flex items-center p-5 justify-between shadow-md '>
                <div className='flex'>
                    <div className="avatar">
                        <div className="w-12 rounded-full">
                            <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                        </div>
                    </div>
                    <div className='flex pt-3 ml-3 items-baseline flex-col h-full'>
                        <p className='italic font-bold'>{`${resp.user_id.first_name} ${resp.user_id.last_name}`}</p>
                        <p className='text-xs'>{new Date(resp.responded_at).toLocaleString()}</p>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='badge badge-info self-end'>{resp.status}</div>
                    <div className='flex gap-3'>
                        <div className="btn btn-primary" onClick={() => {
                            handleUpdate(resp.user_id._id, 'Accepted')
                        }}>Accept</div>
                        <div className="btn btn-error" onClick={() => {
                            handleUpdate(resp.user_id._id, 'Rejected')
                        }}>Reject</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
