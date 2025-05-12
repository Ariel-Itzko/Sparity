export default function MyPostCard({ post }) {
    return (
        <div className="border border-gray-200 rounded-xl shadow-md p-6 bg-white flex flex-col h-full">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold mb-2">{post.post_heading}</h2>
                <div className="mb-3">
                    <div className="flex flex-wrap gap-2 mt-1">
                        {post.required_skills.map((skill) => (
                            <span
                                key={skill._id}
                                className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded"
                            >
                                {skill.skill_name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div
                className="prose max-w-none mb-4"
                dangerouslySetInnerHTML={{ __html: post.post_text }}
            />

            <div className="mt-auto flex justify-between items-end pt-4">
                <div className="flex gap-3">
                    <button className="btn btn-xs btn-primary">Edit</button>
                    <button className="btn btn-xs btn-error">Delete</button>
                </div>
                <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleString()}
                </p>
            </div>
        </div>
    );
}
