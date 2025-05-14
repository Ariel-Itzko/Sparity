import { useEffect } from 'react'
import { gatAllPostsApi } from '../../util/apis/user_post/getAllPosts.api'
import { useState } from 'react'
import PostCard from './postComp/PostCard';

export default function Post() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const init = async () => {
            let data = await gatAllPostsApi();
            setPosts(data)
        }
        init()
    }, []);

    return (
        <div>
            <div className='text-center'>
                <h1 className='text-2xl font-bold'>Posts</h1>
            </div>
            <div className='flex gap-3 flex-col'>
                {
                    posts.map((post, index) => {
                        return <PostCard key={index} post={post} />
                    })
                }
            </div>
        </div>
    )
}
