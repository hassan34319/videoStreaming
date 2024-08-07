import { Spinner } from '@vidstack/react';

export function BufferingIndicator() {
  return (
    <div className="h-full absolute bg-black bg-opacity-50 w-screen media-buffering:flex hidden flex items-center justify-center opacity-100 transition-opacity duration-[200ms] ease-[ease]">
      <div
        className="animate-fadeInOutRotate"
        style={{
          width: '96px',
          height: '96px',
          animation: 'fadeInOut 3s ease-in-out infinite',
        }}
      >
        <img
          src="/Wajo.png" // Replace this with the actual path to your logo
          alt="Logo"
          className="opacity-75 w-full h-full z-100"
          style={{
            transform: 'translate(50%)',
          }}
        />
      </div>
    </div>
  );
}
