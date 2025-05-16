import React, { useState } from 'react';
import { addRoomChatApi } from '../../../../util/apis/room_api/addRoomMessage.api';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function BodyInput() {
    const { room_id } = useParams()
    const [inputValue, setInputValue] = useState('');

    const handleSend = async () => {
        if (!inputValue) {
            return toast('Empty Message not Allowed')
        }
        await addRoomChatApi({ room_id, message: inputValue })
        setInputValue('');
    };

    return (
        <div className='flex-[1] flex justify-center px-4 gap-2'>
            <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button className='btn btn-ghost' onClick={handleSend}>Send</button>
        </div>
    );
}
