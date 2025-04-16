import React from 'react'
import logoOk from './../assets/icons/svg/Group 47786.svg'

function ModalSendEmailComponent({ isOpen }) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
            <div className="bg-white rounded-lg shadow-lg max-w-sm mx-auto p-6 relative z-10">

                <div className="flex flex-col justify-center space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                        E-mail enviado!
                    </h2>
                    <img src={logoOk} height={50} width={50} className="mx-auto"/>
                    <p className="text-gray-600 mb-6 text-center">
                        Lhe enviaremos um e-mail com um link para recuperação da sua senha
                    </p>
                    <button
                        className="bg-primary-400 hover:bg-cyan-950 text-white font-semibold py-2 px-4 rounded"
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalSendEmailComponent