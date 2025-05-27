import { useState } from "react";
import { UserNameSetUpApi } from "../../../util/apis/profile_api/username_setup.api";

export default function UserNameSet() {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoaing] = useState(false);

    const validateUsername = (name) => {
        const validPattern = /^[a-zA-Z0-9_-]+$/;

        if (!name) {
            return "Please enter a valid username.";
        }
        if (name.length < 3) {
            return "Username must be at least 3 characters.";
        }
        if (!validPattern.test(name)) {
            return "Username can only contain letters, numbers, underscores, and hyphens (no spaces or special characters).";
        }

        return "";
    };

    const handleUsernameSubmit = async () => {
        const validationError = validateUsername(username);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError("");
        try {
            setLoaing(true)
            const resp = await UserNameSetUpApi({ username });
            console.log(resp);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoaing(false)
        }
    };

    return (
        <section className="flex items-center justify-center h-full w-full px-4 py-8 lg:p-0">
            <div className="flex flex-col lg:flex-row w-full lg:w-[65%] h-full lg:h-[80vh] border border-base-300 shadow-md rounded-lg bg-base-200 overflow-hidden">

                <div className="hidden lg:block lg:w-1/2 h-full">
                    <img
                        src="/usernamepage.avif"
                        alt="Profile setup illustration"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="w-full lg:w-1/2 flex flex-col lg:justify-start justify-between items-center px-4 lg:px-10 py-10 lg:pt-20 h-full text-center">
                    <header className="mb-6">
                        <h1 className="text-xl lg:text-2xl font-bold">Get your profile started</h1>
                        <p className="text-sm mt-4">
                            Pick a unique username that represents you — it’s how others will discover and connect with you.
                        </p>
                        <p className="text-xs mt-3 text-base-content/80">
                            Once you set your username, it can’t be changed — so make it count!
                        </p>
                    </header>

                    <div className="w-full text-left mb-6">
                        <label htmlFor="username" className="text-xs font-medium block mb-2">
                            Choose your username
                        </label>
                        <input
                            id="username"
                            type="text"
                            className={`input input-bordered w-full focus:outline-none ${error && 'input-error'}`}
                            placeholder="Jhon-Deep"
                            value={username}
                            onChange={(e) => setUsername(e.target.value.trimStart())} // trim start while typing
                        />
                        {error && (
                            <p className="text-error text-xs mt-1 text-end">{error}</p>
                        )}
                        {
                            loading &&
                            <p className="loading loading-spinner loading-xs"></p>
                        }
                    </div>

                    <div className="w-full">
                        <button
                            className="btn btn-primary lg:w-full w-auto"
                            onClick={handleUsernameSubmit}
                        >
                            Setup my username
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
