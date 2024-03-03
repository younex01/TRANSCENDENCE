import Link from 'next/link'

export default function NotUser() {
    return (
        <div className='h-screen flex flex-col justify-center items-center w-screen bg-center bg-[#dbe0f6] z-[1001] absolute'>
            <div>
                <div className='flex justify-center items-center'>

                <div className="text-[#252f5b] text-[155px] font-bold">4</div>
                <div className='flex items-center justify-center w-[140px] h-[140px] bg-[#D2E5F5] rounded-full shadow-notmember bg-cover' style={{backgroundImage: `url(/giphyluu.gif)`}}>
                
                </div>
                <div className="text-[#252f5b] text-[155px] font-bold pl-5">4</div>
                </div>
            </div>
            <div className='flex  items-center justify-center gap-[26px]'>
                <div className="text-[#252f5b] text-[155px] font-bold tracking-wide pr-4" >Not </div>
                <div className="text-[#252f5b] text-[155px] font-bold">F</div>
                <div className='flex items-center justify-center w-[140px] h-[140px] bg-[#D2E5F5] rounded-full shadow-notmember bg-cover ' style={{backgroundImage: `url(/giphyluu.gif)`}}>
                
                </div>
                <div className="text-[#252f5b] text-[155px] font-bold">und</div>
            </div>
                <div className='flex flex-col items-center justify-center gap-[26px]'>
                    <Link href='/Profile' className='text-[#FFF] text-[20px] max-w-[481px] font-[Poppins] font-[600] text-center bg-[#252f5b] py-[19px] px-[94px] rounded-[11px] shadow-notmember1' >
                        Go back To profile
                    </Link>
                </div>
        </div>
    )
}