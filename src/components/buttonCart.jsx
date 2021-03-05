import React from "react"

const ButtonCard = ({ qty = 10, handle }) => (
    <div className="fixed right-0 bottom-0 m-8">
        <div className="relative">
            <button 
                onClick={ handle }
                className="p-4 rounded-full bg-green-600 text-white text-2xl w-16 h-16">
                <i class="fas fa-shopping-basket"></i>
            </button>

            <span 
                className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white rounded-full text-sm flex items-center justify-center font-bold"
            >{ qty }</span>
        </div>

    </div>
)

export default ButtonCard