
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

export const Results = () => {

    const { width, height } = useWindowSize()
    return (
        <>


         <div className='flex flex-col justify-center items-center mt-10 '>
             <Confetti
                 tweenDuration={6000}
                 width={width-20}
                 height={height-20}
                 recycle={false}

             />
            <div className='text-white bg-[#3f33b0] text-4xl py-3   px-8 rounded-lg mb-10 '>
                Final Results
            </div>
             <div className='flex w-9/10  md:w-150 h-96 justify-between  '>

                 <div
                     className='bg-cyan-500 shadow-2xl  shadow-blue-400 w-4/13  flex flex-col   items-center justify-center  relative rounded-lg h-68 mt-auto'>
                     <div
                         className=' shadow-lg shadow-yellow-800 rounded-lg bg-[#fef08a]  p-2 absolute -top-3 text-[#a16207] font-bold '>Issam
                     </div>
                     <p className=' text-black opacity-20 text-[11rem] mt-38 '>2</p>
                 </div>
                 <div
                     className='  relative bg-[#facc15] w-4/13  shadow-2xl shadow-yellow-300/80 flex flex-col  items-center justify-center rounded-lg h-80 mt-auto'>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 213.93333"
                          className="absolute z-0 w-40 text-yellow-400 fill-current -top-16">
                         <g transform="matrix(1.3333333,0,0,-1.3333333,0,213.93333)">
                             <g transform="scale(0.1)">
                                 <path
                                     d="m 2551.23,897.617 c -155.57,63.281 -225.41,592.283 -225.41,592.283 0,0 -293.13,-522.482 -472.34,-503.537 -188.06,19.867 -353.49,618.147 -353.49,618.147 0,0 -165.42,-598.28 -353.47,-618.147 C 967.297,967.418 674.18,1489.9 674.18,1489.9 c 0,0 -69.828,-529.002 -225.407,-592.283 C 337.18,852.195 0,1074.16 0,1074.16 L 245.785,409.648 C 354.898,527.395 874.898,616.621 1500,616.621 c 625.1,0 1145.1,-89.226 1254.22,-206.973 L 3000,1074.16 c 0,0 -337.18,-221.965 -448.77,-176.543 z m 7.27,-495.312 C 2338.88,477.156 1946.98,527.012 1500,527.012 1053.01,527.012 661.121,477.156 441.504,402.305 351.406,371.594 290.328,336.672 266.344,299.258 258.848,287.57 254.895,275.637 254.895,263.508 254.895,117.969 812.34,0 1500,0 c 687.67,0 1245.11,117.969 1245.11,263.508 0,12.129 -3.97,24.062 -11.46,35.75 -23.97,37.414 -85.06,72.336 -175.15,103.047 z M 2415.8,187.551 C 2275.84,135.918 1918.64,99.1914 1500,99.1914 c -418.64,0 -775.844,36.7266 -915.801,88.3596 -40.801,15.058 -63.191,31.367 -63.191,48.418 0,75.554 438.312,136.797 978.992,136.797 540.68,0 979,-61.25 979,-136.797 0,-17.051 -22.4,-33.36 -63.2,-48.418"></path>
                             </g>
                         </g>
                     </svg>

                     <div className='rounded-full bg-yellow-400 border-5 border-yellow-300 absolute top-10 h-[7em] overflow-hidden'>
                         <img src='https://avatars.saasmates.workers.dev/svg?isCircle=false ' alt='avatar'
                              className='object-cover h-[7rem] '/>
                     </div>
                     <div
                         className=' shadow-lg shadow-yellow-800 rounded-lg bg-[#fef08a]  p-2 absolute -top-3 text-[#a16207] font-bold '>Issamff
                     </div>

                     <p className=' text-black opacity-20 text-[11rem] mt-49 '>1</p>
                 </div>
                 <div
                     className=' relative bg-[#e879f9] shadow-2xl shadow-pink-400  w-4/13 flex flex-col items-center justify-center rounded-lg h-50 mt-auto'>
                     <div
                         className=' shadow-lg shadow-yellow-800 rounded-lg bg-[#fef08a]  p-2 absolute -top-3 text-[#a16207] font-bold '>ISM
                     </div>
                     <p className=' text-black opacity-20 text-[11rem] mt-19  '>3</p>
                 </div>
             </div>

         </div>
        </>
    );
};