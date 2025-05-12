import { useEffect, useState } from 'react';
import { userPostApi } from '../../util/apis/user_post/userPosts.api';
import MyPostCard from './myPostComp/MyPostCard';

export default function MyPost() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    useEffect(() => {
        const init = async () => {
            const resp = await userPostApi();
            setPosts(resp);
        };
        init();
    }, []);

    const totalPages = Math.ceil(posts.length / postsPerPage);
    const start = (currentPage - 1) * postsPerPage;
    const currentPosts = posts.slice(start, start + postsPerPage);

    const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-center mb-6">My Posts</h1>

            <div className="grid grid-cols-1 gap-4">
                {currentPosts.map(post => (
                    <MyPostCard key={post._id} post={post} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-4">
                    <button disabled={currentPage === 1} onClick={handlePrev}>Previous</button>
                    <span className="text-lg font-medium mt-1">Page {currentPage} of {totalPages}</span>
                    <button disabled={currentPage === totalPages} onClick={handleNext}>Next</button>
                </div>
            )}
        </div>
    );
}
