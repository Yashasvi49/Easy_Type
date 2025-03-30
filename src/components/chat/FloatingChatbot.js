import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

const FloatingChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isOpen ? (
                <div className="bg-white rounded-lg shadow-xl" style={{ width: '350px', height: '500px' }}>
                    <div className="flex justify-between items-center p-3 bg-blue-600 text-white rounded-t-lg">
                        <span className="font-semibold">Chat Assistant</span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-200 transition-colors"
                        >
                            <IoMdClose size={24} />
                        </button>
                    </div>
                    <iframe
                        id="bp-web-widget"
                        title="Chatbot Assistant"
                        frameBorder="0"
                        src="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/03/29/18/20250329184217-IAQBC325.json&enableVoice=true"
                        className="w-full h-[calc(100%-48px)]"
                        allow="microphone"
                    />
                </div>
            ) : (
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-300 rounded-full animate-ping opacity-75"></div>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="relative bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-colors"
                    >
                        <IoChatbubbleEllipsesSharp size={48} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default FloatingChatbot; 