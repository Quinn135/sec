"use strict";
import { useState, useEffect } from 'react'

function App() {
  const [opacity, setOpacity] = useState(0);
  const [bottom, setBottom] = useState(24);
  const [rotation, setRotation] = useState(0);

  // run at start
  useEffect(() => {
    const handleScroll = () => {
      setOpacity(Math.max(0, (275 - scrollY)/275));
      setBottom(24 + (scrollY) / 275 * 20);
      setRotation(scrollY / window.innerHeight * 360);
    };

    window.addEventListener("scroll", handleScroll);

    setOpacity(Math.max(0, (275 - scrollY)/275));

    // cleanup I guess
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="w-full bg-[#fca8f5] shadow flex flex-row p-2 px-6 justify-between items-center fixed top-0 left-0 right-0 z-50">
        <a href="/"><span>SE | </span>Sarah Engle Counseling</a>
        <div>
          <a href="#about">About</a>
        </div>
      </div>
      <div className="grid items-center justify-center h-dvh">
        <div className="fixed left-0 right-0 flex w-full justify-center items-center" style={{opacity: opacity, bottom: bottom}}>Scroll for more</div>
        <div className="z-30 md:grid w-full md:grid-cols-5 flex flex-col md:flex-col p-6">
          <div className="md:col-span-2 md:px-6 flex flex-col justify-center top-0 left-0 prose mb-8">
            <h1 className="text-5xl font-bold mb-3 oswald">Sarah Engle Counseling</h1>
            <p className="text-lg whitespace-pre-line">hello! I am Sarah Engle!{"\n"}
              learn about me here congratulations
            </p>
          </div>
          <div className="md:col-span-3 grid items-center justify-center">
            <img src="lady.png" alt="lady" className="md:w-full w-3/4 overflow-hidden" style={{transform: `rotate(${rotation}deg)`}} />
          </div>
        </div>
      </div>
      <div className="min-h-dvh pt-16 p-6 flex flex-col items-center justify-center" id="about">
          <div className="prose">
            <h1 className="text-3xl font-semibold w-full">About me!</h1>
            <img className="rounded max-w-full max-h-1/2" src="https://medschool.umich.edu/sites/default/files/styles/jumbo_16_9/public/2023-10/doctoring-course-hero.jpg?h=f0fb51a5&itok=-w_0Fe57" alt="doctoring" />
            <p>I am a therapist hello yes. This is me. Am I doctor? Or counselor? I don't know. Haha! Hello!</p>
          </div>
      </div>
      <div className="bg-[#fca8f5] w-full p-6 "><p className="prose">hello this is a footer</p></div>
    </>
  )
}

export default App
