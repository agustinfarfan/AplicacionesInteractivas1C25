import React from 'react'

const Resumen = ({ data }) => {
    return (
        <>
            <h2 className='text-2xl font-bold mb-5'>Resumen del pedido</h2>
            <div className='flex flex-col gap-2 justify-between h-full'>
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-row justify-between'>
                        <p className='text-md font-medium'>Subtotal: </p>
                        <p className='text-md font-medium'>$0.00</p>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <p className='text-md font-medium'>Envío: </p>
                        <p className='text-md font-medium'>$0.00</p>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <p className='text-md font-medium'>Impuestos: </p>
                        <p className='text-md font-medium'>$0.00</p>
                    </div>
                </div>
                <div className='flex flex-row justify-between border-t-2 border-zinc-200 pt-3'>
                    <p className='text-md font-medium '>Total: </p>
                    <p className='text-md font-medium'>$0.00</p>
                </div>
            </div>
        </>
    )
}

export default Resumen