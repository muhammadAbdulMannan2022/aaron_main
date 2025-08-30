function ShimmerButton() {
    const customCss = `
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }

    /* The keyframe animation simply transitions the --angle property
      from its start (0deg) to its end (360deg).
    */
    @keyframes shimmer-spin {
      to {
        --angle: 360deg;
      }
    }
  `;
    return (<div className="flex items-center justify-center font-sans">
        <style>{customCss}</style>
        <button className="relative inline-flex items-center justify-center p-[2.5px]  dark:bg-black rounded-full overflow-hidden group">
            <div className="absolute inset-0" style={{
                background: 'conic-gradient(from var(--angle), transparent 25%, #463CCB, transparent 50%)',
                animation: 'shimmer-spin 2.5s linear infinite'
            }} />
            <span className="relative z-10 inline-flex items-center rounded-full hover:cursor-pointer justify-center w-full h-full px-8 py-3 text-text-primary bg-gray-button-bg transition-colors duration-300 hover:bg-gray-button-bg/80">
                Subscribe Today
            </span>
        </button>
    </div>
    );
}
import React from 'react'

export default function SubscribeS() {
    return (
        <div className='bg-black/80 flex items-center justify-center py-10 md:py-20'>
            <div className='max-w-7xl w-full bg-gray-button-bg rounded-2xl text-center gap-5 flex flex-col landing-shadow p-8 md:p-16 items-center justify-center py-10 md:py-28' >
                <h1 className='text-3xl md:text-5xl max-w-2xl font-semibold text-[#C6CED3]'> Our powerful analytics provides invaluable insights.</h1>
                <p className='max-w-3xl text-base text-gray-400'>Unlock the power of data with our cutting-edge analytics product. Get instant insights with our user-friendly Analytics Dashboard, and take advantage of our innovative digital credit tokens to reward your customers and incentivize engagement. </p>
                <ShimmerButton />
            </div>
        </div>
    )
}
