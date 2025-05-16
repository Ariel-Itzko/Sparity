import { useEffect, useState } from "react";
import useUserProfileStore from "../../../../../store/userProfile.store";

export default function MessageBubble({ message }) {
    const { userProfile } = useUserProfileStore();
    const [isloggedUser, setIsloggedUser] = useState(message.sender_id._id === userProfile._id)
    useEffect(() => {
        console.log(isloggedUser);
    }, [])
    return (
        <>
            <div className={`chat ${!isloggedUser ? 'chat-start' : 'chat-end'}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS chat bubble component"
                            src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                        />
                    </div>
                </div>
                <div className="chat-header">
                    {`${message.sender_id.first_name} ${message.sender_id.last_name}`}
                    <time className="text-xs opacity-50">{new Date(message.send_at).toLocaleString()}</time>
                </div>
                <div className="chat-bubble">{message.message_text}</div>
            </div>
        </>
    )
}
