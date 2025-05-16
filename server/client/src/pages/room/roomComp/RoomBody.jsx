import BodyHead from './roomBodyComp/BodyHead'
import BodyContent from './roomBodyComp/BodyContent'
import BodyInput from './roomBodyComp/BodyInput'
import { useParams } from 'react-router-dom'
import BodyWelcome from './roomBodyComp/BodyWelcome';

export default function RoomBody() {
    const { room_id } = useParams();
    return (
        <div className='flex flex-col h-full'>
            <BodyHead />
            {
                room_id ?
                    <>
                        <BodyContent key={room_id} />
                        <BodyInput />
                    </>
                    : <BodyWelcome />
            }
        </div>
    )
}
