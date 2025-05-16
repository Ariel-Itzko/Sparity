import React, { useEffect, useState } from 'react'
import { getUserRoom } from '../../util/apis/room_api/getUserRoom.api';
import { Link, useParams } from 'react-router-dom';
import DrawerCard from './roomComp/DrawerCard';
import RoomBody from './roomComp/roomBody';
import { Menu } from 'lucide-react';

export default function Room() {
    const [roomList, setRoomList] = useState([]);
    useEffect(() => {
        const init = async () => {
            let room = await getUserRoom();
            setRoomList(room);
        };
        init();
    }, [])
    return (
        <>
            <div className="drawer lg:drawer-open">
                <div className="drawer-content h-screen">
                    <RoomBody />
                </div>
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle absolute" />
                <label htmlFor="my-drawer-2" className="btn absolute m-2 btn-primary drawer-button lg:hidden">
                    <Menu />
                </label>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {
                            roomList?.map((room) => {
                                return <li className="border border-base-300 my-1 shadow-md" key={room._id}><Link to={`/room/${room._id}`}>
                                    <DrawerCard key={room._id} room={room} />
                                </Link></li>
                            })
                        }
                    </ul>
                </div>
            </div>

        </>
    )
}
