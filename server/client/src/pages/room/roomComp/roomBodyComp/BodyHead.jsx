import { Link } from 'react-router-dom'

export default function BodyHead() {
    return (
        <div className='flex-[1]'>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                </div>
                <div className="flex-none space-x-2">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <details>
                                <summary>Options</summary>
                                <ul className="bg-base-100 rounded-t-none px-6 w-[150px] z-50">
                                    <li><Link to={'/'}>Exit</Link></li>
                                    <li><Link to={'/'}>Exit</Link></li>
                                    <li><Link to={'/'}>Exit</Link></li>
                                </ul>
                            </details>
                        </li>
                        <li className='btn btn-error'><Link to={'/'}>Exit</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
