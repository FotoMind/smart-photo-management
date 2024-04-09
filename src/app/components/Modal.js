import Upload from "./Upload"

export default function Modal() {
    return(
        <div className="">
            <button className="btn bg-white hover:bg-red hover:text-black px-24" onClick={()=>document.getElementById('my_modal_2').showModal()}>Upload</button>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg text-black">Hello!</h3>
                    <p className="py-4 text-black">Press ESC key or click outside to close</p>
                    <div className="">
                    <Upload></Upload>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}
