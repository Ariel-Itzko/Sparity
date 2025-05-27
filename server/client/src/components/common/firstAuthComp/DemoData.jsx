import React from 'react'
import useUserProfileStore from '../../../store/userProfile.store'

export default function DemoData() {
    const { userProfile } = useUserProfileStore();
    return (
        <div className='border border-base-300 shadow-2xl h-full rounded-md'>
            <div>
                <div className='p-5'>
                    <h1 className='text-2xl text-center'>Hi!
                        <span className='text-primary font-semibold'>{` ${userProfile.first_name} ${userProfile.last_name} `}</span>
                        your account has been created!
                        Let’s complete your profile so we can know more about you.
                    </h1>
                </div>
            </div>
        </div>
    )
}
