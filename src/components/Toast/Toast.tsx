'use client'
import ReactToast  from 'react-bootstrap/Toast';
type TostProps = {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onClick: () => void;
};

export default function Toast({ message, type, onClick }: TostProps) {
  return (
    <>
      <ReactToast onClick={onClick} className="position-absolute end-0  top-10 m-5">
        <ReactToast.Header className='bg-danger text-white '>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto"> <b>{ type.toUpperCase()}</b></strong>
        </ReactToast.Header>
        <ReactToast.Body><b>{message}</b> </ReactToast.Body>
      </ReactToast>
    </>
  )
}