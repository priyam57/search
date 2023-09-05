import { createPortal } from 'react-dom'
import { AiOutlineClose } from 'react-icons/ai'

const Modal = ({onClose, isOpen, children}) => {


  return createPortal(
    <>
    {isOpen && (
        <div>
        <div  className=' grid place-items-center backdrop-blur top-0 z-40 h-screen w-screen absolute'>
        <div className='z-50 relative m-auto min-h-[200px] min-w-[50%] bg-white p-4'>
        <div className='flex justify-end'>
            <AiOutlineClose onClick={onClose} className='text-2xl self-end'/>
        </div>
        {children}
        </div>
        </div>
        </div>
        
        )}
    </>,
    document.getElementById('modal-root')
  
  )
}

export default Modal