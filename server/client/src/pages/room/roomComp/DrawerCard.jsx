import React from 'react';

export default function DrawerCard({ room }) {
    const truncateText = (text, maxLength = 40) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };
    return (
        <>
            <div className="avatar-group -space-x-6">
                {room.participants.map((member, index) => (
                    <div className="avatar" key={index}>
                        <div className="w-12">
                            <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
                        </div>
                    </div>
                ))}
                {/* for admin */}
                <div className="avatar">
                    <div className="w-12">
                        <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
                    </div>
                </div>
                <div className="avatar avatar-placeholder">
                    <div className="bg-neutral text-neutral-content w-12">
                        <span>{room.participants?.length || 0}</span>
                    </div>
                </div>
            </div>
            <div>
                {truncateText(room.post_id.post_heading, 20)}
            </div>
        </>
    );
}
