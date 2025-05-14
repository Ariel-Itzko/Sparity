import React, { useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
    Bold,
    Italic,
    Strikethrough,
    Plus,
    X,
} from 'lucide-react';
import './tiptap.css';
import { createPofileApi } from '../../util/apis/user_post/createPost.api';

export default function AddPost() {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            post_heading: '',
            required_skills: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'required_skills',
    });

    const [skillInput, setSkillInput] = useState('');

    const editor = useEditor({
        extensions: [StarterKit],
        content: '',
    });

    const handleSkillInputChange = (e) => {
        setSkillInput(e.target.value);
    };

    const handleAddSkill = () => {
        const trimmed = skillInput.trim();
        if (trimmed && !fields.some((item) => item.skill_name.toLowerCase() === trimmed.toLowerCase())) {
            append({ skill_name: trimmed });
            setSkillInput('');
        }
    };

    const onSubmit = async (data) => {
        const post_text = editor?.getHTML() || '';

        if (!post_text.trim() || post_text === '<p></p>') {
            alert('Post text is required');
            return;
        }

        if (data.required_skills.length === 0) {
            alert('At least one skill is required');
            return;
        }

        const formattedData = {
            post_heading: data.post_heading,
            post_text: post_text,
            required_skills: data.required_skills,
        };

        await createPofileApi(formattedData);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-4 space-y-6">
            <div className="space-y-4">
                <div>
                    <label className="block font-semibold mb-1">Post Heading</label>
                    <Controller
                        name="post_heading"
                        control={control}
                        rules={{ required: 'Heading is required' }}
                        render={({ field }) => (
                            <input {...field} className="input input-bordered w-full" />
                        )}
                    />
                    {errors.post_heading && <p className="text-red-500">{errors.post_heading.message}</p>}
                </div>

                <div>
                    <label className="block font-semibold mb-2">Skills</label>
                    <div className="space-y-2">
                        <div className="flex gap-2 items-center">
                            <input
                                type="text"
                                value={skillInput}
                                onChange={handleSkillInputChange}
                                placeholder="Type a skill"
                                className="input input-bordered flex-1"
                            />
                            <button
                                type="button"
                                onClick={handleAddSkill}
                                className="btn btn-outline btn-sm"
                            >
                                <Plus className="w-4 h-4 mr-1" /> Add
                            </button>
                        </div>
                        <div className="mt-2">
                            {fields.map((item, index) => (
                                <div key={item.id} className="inline-flex items-center border rounded px-2 py-1 mr-2 mb-2">
                                    <span>{item.skill_name}</span>
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="ml-2 btn btn-xs"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    {fields.length === 0 && <p className="text-red-500">At least one skill is required</p>}
                </div>

                {/* Post Text */}
                <div className="space-y-4">
                    <label className="block font-semibold">Post Text</label>
                    <div className="flex gap-2 mb-3">
                        <button type="button" className="btn btn-sm" onClick={() => editor?.chain().focus().toggleBold().run()}>
                            <Bold className="w-4 h-4" />
                        </button>
                        <button type="button" className="btn btn-sm" onClick={() => editor?.chain().focus().toggleItalic().run()}>
                            <Italic className="w-4 h-4" />
                        </button>
                        <button type="button" className="btn btn-sm" onClick={() => editor?.chain().focus().toggleStrike().run()}>
                            <Strikethrough className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="editor border border-gray-300 p-3 rounded min-h-[150px] relative">
                        {(!editor?.getHTML()?.trim() || editor?.getHTML() === '<p></p>') && (
                            <span className="absolute left-3 top-3 text-gray-500 select-none">
                                Enter your post text here...
                            </span>
                        )}
                        <EditorContent editor={editor} />
                    </div>
                    {(!editor?.getHTML()?.trim() || editor?.getHTML() === '<p></p>') && (
                        <p className="text-red-500">Post text is required</p>
                    )}
                </div>

                <div className="flex justify-between">
                    <button type="submit" className="btn btn-success">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
}
