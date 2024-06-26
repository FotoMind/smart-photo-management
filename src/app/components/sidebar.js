'use client'
import Modal from "./Modal"

export default function Sidebar() {

    return(
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-80 min-h-full bg-dark-blue text-white">
                {/* Sidebar content here */}
                <li>
                    <Modal></Modal>
                </li>
                
                <li><a>Photos</a></li>
                <li><a>Albums</a></li>
                </ul>
            </div>
        </div>
    )
}