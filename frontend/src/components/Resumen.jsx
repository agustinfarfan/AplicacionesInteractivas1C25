import React from 'react'

const Resumen = ({ data, activo = true }) => {
    return (
        <>
            <h2 className='text-2xl font-bold mb-3'>Resumen del pedido</h2>
            {activo && (
                <div className='flex flex-col gap-2 justify-between h-full'>
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col justify-between'>
                            <p className='text-md font-medium'>Subtotal: </p>
                            {data.carritoDetalle.map(product => (
                                <div key={product.producto_id} className='flex items-center flex-row justify-between pl-2'>
                                    <p className='text-md font-normal text-neutral-600'>{product.nombre_producto}</p>
                                    <p className='text-md font-normal text-neutral-600'>${product.subtotal}</p>
                                </div>
                            ))}

                        </div>
                        <div className='flex flex-row justify-between'>
                            <p className='text-md font-medium'>Descuento: </p>
                            <p className='text-md font-medium'>${Number(data.descuento).toFixed(2)}</p>
                        </div>
                        {/* <div className='flex flex-row justify-between'>
                            <p className='text-md font-medium'>Impuestos: </p>
                            <p className='text-md font-medium'>$0.00</p>
                        </div> */}
                    </div>
                    <div className='flex flex-row justify-between border-t-2 border-zinc-200 pt-3'>
                        <p className='text-md font-medium '>Total: </p>
                        <p className='text-md font-medium'>${Number(data.total).toFixed(2)}</p>
                    </div>
                </div>
            )}

        </>
    )
}

export default Resumen