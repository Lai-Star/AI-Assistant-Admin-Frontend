import React from 'react'

function ModalEditCancelComponent({ isOpen, onClose, onConfirm, title, description }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
            <div className="bg-white rounded-lg shadow-lg max-w-sm mx-auto p-6 relative z-10">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">{title}</h2>
                <p className="text-gray-600 mb-6 text-center">{description}</p>
                <div className="flex justify-center space-x-2">
                    <button
                        className="border border-black bg-white text-black font-semibold py-2 px-4 rounded hover:bg-gray-100"
                        onClick={onClose}
                    >
                        No
                    </button>
                    <button
                        className="bg-primary-400 hover:bg-cyan-950 text-white font-semibold py-2 px-4 rounded"
                        onClick={onConfirm}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalEditCancelComponent
