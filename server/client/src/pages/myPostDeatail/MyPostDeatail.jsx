import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostByIdApi } from '../../util/apis/user_post/getPostbyId.api';
import { getPostReviewApi } from '../../util/apis/post_resp_api/getPostResp.Api';
import MyPostReviewCard from './myPostDetailComp/MyPostReviewCard';

export default function MyPostDetail() {
    const { post_id } = useParams();
    const [post, setPost] = useState(null);
    const [postResp, setPostResp] = useState([]);
    const [filteredResp, setFilteredResp] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            const data = await getPostByIdApi(post_id);
            setPost(data);

            const resp = await getPostReviewApi(data._id);
            setPostResp(resp?.resp_users);
            setLoading(false);
        };
        init();
    }, [post_id]);

    useEffect(() => {
        if (!postResp) return;

        const filtered = {
            all: postResp,
            pending: postResp.filter(resp => resp.status === 'Pending'),
            approved: postResp.filter(resp => resp.status === 'Accepted'),
            rejected: postResp.filter(resp => resp.status === 'Rejected'),
        };

        setFilteredResp(filtered[activeTab]);
    }, [activeTab, postResp]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner text-primary scale-150"></span>
            </div>
        );
    }

    if (!post || Object.keys(post).length === 0) {
        return <h1 className="text-center text-error text-2xl mt-10 font-semibold">Invalid Post ID</h1>;
    }

    const refreshResponses = async () => {
        const resp = await getPostReviewApi(post._id);
        setPostResp(resp.resp_users);
    };


    return (
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold text-primary mb-2">{post.post_heading}</h1>
                <p className="text-sm text-base-content/70">Posted on {new Date(post.createdAt).toLocaleString()}</p>
            </div>

            <section>
                <h2 className="text-2xl font-semibold text-primary mb-3">Required Skills</h2>
                <div className="flex flex-wrap gap-3">
                    {post.required_skills.map(skill => (
                        <span
                            key={skill._id}
                            className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium"
                        >
                            {skill.skill_name}
                        </span>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-primary mb-3">Post Description</h2>
                <div
                    className="prose max-w-none text-base-content"
                    dangerouslySetInnerHTML={{ __html: post.post_text }}
                />
            </section>

            <section className='space-x-2.5 mt-10'>
                <button className='btn btn-primary'>Edit</button>
                <button className='btn btn-error'>Delete</button>
            </section>

            <div className="tabs tabs-lifted mb-6">
                {['all', 'pending', 'approved', 'rejected'].map(tab => (
                    <button
                        key={tab}
                        className={`tab tab-bordered ${activeTab === tab ? 'tab-active text-primary font-bold' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <section className="space-y-4">
                {filteredResp && filteredResp.length > 0 ? (
                    filteredResp.map((resp, index) => (
                        <MyPostReviewCard key={index} resp={resp} onStatusChange={refreshResponses} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No responses found for "{activeTab}"</p>
                )}
            </section>
        </div>
    );
}
