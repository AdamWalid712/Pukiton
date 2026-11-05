import {
    RiAddLine,
    RiArrowUpLine,
    RiGeminiFill
} from "@remixicon/react";

type props = {
    xPosition: number
}

export default function AIChatBox({ xPosition }: props) {
    console.log(xPosition)
    return (
        <div className={`transition ease-in-out -z-4 translate-x-${xPosition} p-1 flex flex-col rounded-2xl bg-orange-200 h-full w-62 shadow-aggressive shadow-black ring-2 `}>
            <div className="flex-2">
                <div className="text-gray-900 capitalize text-center font-semibold w-full h-full flex flex-col gap-3 justify-center items-center px-5">
                    <RiGeminiFill className="text-3xl" />
                    <p className="w-full text-lg">Power your drawing experience with AI</p>
                </div>
            </div>
            <form className="relative flex flex-col gap-0 items-center justify-center p-1">
                <textarea
                    className="h-20 w-full resize-none scrollbar-gutter-stable  scrollbar-thumb-orange-100 scrollbar-track-transparent focus:outline-none p-2 rounded-t-2xl bg-orange-300 text-lg border-2 border-b-0 border-black font-bold capitalize placeholder:text-gray-900"
                    placeholder="Ask AI anything..."
                ></textarea>
                <div className="m-0 w-full flex justify-between items-center bg-orange-100 rounded-b-2xl border-2 border-black p-1.5">
                    <button type="button" className="AIChatBoxBtn">
                        <RiAddLine className="text-2xl" />
                    </button>
                    <button type="submit" className="AIChatBoxBtn">
                        <RiArrowUpLine className="text-2xl" />
                    </button>
                </div>
            </form>
        </div>
    )
}