import { useParams } from 'react-router-dom';
import MessageBubble from './contentComp/MessageBubble';
import { useQuery } from '@tanstack/react-query';
import { getRoomChatApi } from '../../../../util/apis/room_api/getRoomChat.api';

export default function BodyContent() {
    const { room_id } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['roomMessages', room_id],
        queryFn: () => getRoomChatApi(room_id),
        refetchInterval: 5000, 
    });

    if (isLoading) return <div>Loading messages...</div>;
    if (isError) return <div>Error loading messages.</div>;

    return (
        <div className='flex-[6] overflow-scroll'>
            {data?.messages.map((message, index) => (
                <MessageBubble key={index} message={message} />
            ))}
        </div>
    );
}
