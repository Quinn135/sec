"use strict";
import { useState, useEffect, useRef } from "react";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  // const [height, setHeight] = useState(window.innerHeight - 40);
  // const header = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   setHeight(header.current ? header.current.getBoundingClientRect().height - 16 : 40);

  //   window.addEventListener("resize", () => {
  //     setHeight(header.current ? header.current.getBoundingClientRect().height - 16 : 40);
  //   });
  // }, []);

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 0.5,
      smoothTouch: 0,
      effects: true,
    })

    var scrollMoreTL = gsap.timeline({
      scrollTrigger: {
        start: 0,
        end: 250,
        scrub: true,
      }
    })

    scrollMoreTL.to(".scrollMore", {
      bottom: 75,
      opacity: 0,
      display: "none"
    });

    // make noise noisy
    gsap.to("#seed", {
      repeat: -1,
      repeatDelay: 0.25,
      duration: 0,
      ease: "none",
      onRepeat: () => {
        gsap.to("#seed", {
          attr: { seed: Math.floor(Math.random() * 1000) },
          duration: 0,
          ease: "none"
        });
        console.log("update");
      }
    });

    let mm = gsap.matchMedia();

    mm.add("(max-width: 1023px", () => {
      // set init
      gsap.set(".innerImage", {
        clearProps: "all",
      });

      //   // gsap.set("#name", {
      //   //   display: "flex",
      //   //   alignItems: "center",
      //   //   justifyContent: "center",
      //   // });

      var tl = gsap.timeline({
        scrollTrigger: {
          start: 0,
          endTrigger: "#text",
          end: "bottom bottom",
          scrub: true,

          // pin: ".image",
          // pinSpacing: false,
        }
      });

      tl.from("body", {
        background: "#fffee6",
        duration: 0.2,
      }, 0);

      tl.to({}, { duration: 0 }, 1);
      //   tl.to(".innerImage", {
      //     height: "10rem",
      //     xPercent: -50,
      //     yPercent: -40,
      //     duration: 1,
      //   }, 0);

      //   // tl.to("#name div h1", {
      //   //   width: "100%",
      //   //   duration: 0,
      //   // }, 0.4);
      //   // tl.to("#name", {
      //   //   width: "100%",
      //   //   alignItems: "start",
      //   //   justifyContent: "start",
      //   // }, 0.4);

      //   tl.to(".innerImage", {
      //     opacity: 0,
      //     duration: 0.3,
      //   }, 0.4);
    });

    mm.add("(min-width: 1024px)", () => {
      gsap.set(".innerImage", {
        // clearProps: "all", // Remove all GSAP inline styles first
        xPercent: -50,
        yPercent: -50,
        left: "50%",
        top: "50%",
        scale: 0.95
      });
      gsap.set("#name", { opacity: 1, display: "grid" });

      var tl = gsap.timeline({
        scrollTrigger: {
          start: 0,
          endTrigger: "#text",
          end: "bottom bottom",
          scrub: 0.4,

          pin: ".image",
          pinSpacing: false,
        }
      });

      tl.set(".innerImage", {
        xPercent: 0,
        scale: 0.95,
      });

      tl.from("body", {
        background: "#fffee6",
        duration: 0.2,
      }, 0);
      tl.to("#name", {
        opacity: 0,
        display: "none",
        duration: 0.2,
      }, 0.1);
      tl.to(".innerImage", {
        xPercent: -100,
        scale: 0.95,
        duration: 0.5,
      }, 0);
      tl.from(".prose", {
        opacity: 0,
        duration: 0.4
      }, 0.1)
      tl.to({}, { duration: 0 }, 1);
    });
  }, { dependencies: [] });

  return (
    <>
      <div id="name" className="not-lg:hidden fixed w-full h-full grid grid-cols-2">
        <div className="col-span-1 flex items-center justify-center">
          <h1 className="w-min text-5xl font-bold z-50">Sarah Engle Counseling</h1>
        </div>
      </div>
      <div className="bg">
        {/* <svg>
          <defs>
            <filter id="nnnoise-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="linearRGB">
              <feTurbulence id="seed" type="turbulence" baseFrequency="0.183" numOctaves="4" seed="15" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
              <feSpecularLighting surfaceScale="12" specularConstant="0.5" specularExponent="20" lightingColor="#7957A8" x="0%" y="0%" width="100%" height="100%" in="turbulence" result="specularLighting">
                <feDistantLight azimuth="3" elevation="76"></feDistantLight>
              </feSpecularLighting>
              <feColorMatrix type="saturate" values="0" x="0%" y="0%" width="100%" height="100%" in="specularLighting" result="colormatrix"></feColorMatrix>
            </filter>
          </defs>
        </svg> */}
        {/* <svg><defs><filter id="nnnoise-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="linearRGB">
          <feTurbulence id="seed" type="turbulence" baseFrequency="0.183" numOctaves="4" seed="15" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
          <feSpecularLighting surfaceScale="6" specularConstant="0.7" specularExponent="20" lightingColor="#7957A8" x="0%" y="0%" width="100%" height="100%" in="turbulence" result="specularLighting">
            <feDistantLight azimuth="3" elevation="86"></feDistantLight>
          </feSpecularLighting>
          <feColorMatrix type="saturate" values="0" x="0%" y="0%" width="100%" height="100%" in="specularLighting" result="colormatrix"></feColorMatrix>
        </filter></defs></svg> */}
        {/* <svg><defs><filter id="nnnoise-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB">
          <feTurbulence id="seed" type="turbulence" baseFrequency="0.183" numOctaves="4" seed="15" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
          <feSpecularLighting surfaceScale="20" specularConstant="1.5" specularExponent="20" lighting-color="#7957A8" x="0%" y="0%" width="100%" height="100%" in="turbulence" result="specularLighting">
            <feDistantLight azimuth="3" elevation="86"></feDistantLight>
          </feSpecularLighting>
          <feColorMatrix type="saturate" values="0" x="0%" y="0%" width="100%" height="100%" in="specularLighting" result="colormatrix"></feColorMatrix>
        </filter></defs></svg> */}
        <svg><defs><filter id="nnnoise-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="linearRGB">
          <feTurbulence id="seed" type="turbulence" baseFrequency="0.183" numOctaves="4" seed="15" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
          <feSpecularLighting surfaceScale="7" specularConstant="1.7" specularExponent="20" lightingColor="#7957A8" x="0%" y="0%" width="100%" height="100%" in="turbulence" result="specularLighting">
            <feDistantLight azimuth="3" elevation="66"></feDistantLight>
          </feSpecularLighting>
          <feColorMatrix type="saturate" values="0" x="0%" y="0%" width="100%" height="100%" in="specularLighting" result="colormatrix"></feColorMatrix>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" /> {/* opacity */}
          </feComponentTransfer>
        </filter></defs></svg>
        {/* <svg>
          <defs>
            <filter id="nnnoise-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="linearRGB">
              <feTurbulence id="seed" type="turbulence" baseFrequency="0.183" numOctaves="4" seed="15" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
              <feSpecularLighting surfaceScale="6" specularConstant="3" specularExponent="20" lightingColor="#7957A8" x="0%" y="0%" width="100%" height="100%" in="turbulence" result="specularLighting">
                <feDistantLight azimuth="3" elevation="86"></feDistantLight>
              </feSpecularLighting>
              <feColorMatrix type="saturate" values="0" x="0%" y="0%" width="100%" height="100%" in="specularLighting" result="colormatrix"></feColorMatrix>
            </filter>
          </defs>
        </svg> */}
      </div>
      {/* <div id="bottomNav" className="fixed bottom-0 left-0 w-dvw z-30 p-1.5 backdrop-blur-md not-lg:hidden"><a href="/">Sarah Engle Counseling</a></div> */}
      <div id="smooth-wrapper">
        {/* <div ref={header} className="fixed top-0 left-0 right-0 w-full bg-[#ff72f36a] backdrop-blur-lg backdrop-brightness-150 shadow flex flex-row p-2 px-6 justify-between items-center z-50">
        <a href="/"><span>SE | </span>Sarah Engle Counseling</a>
      </div> */}
        <div className="not-lg:hidden fixed left-0 right-0 w-full flex justify-center bottom-3 scrollMore z-40">
          <span className="not-lg:hidden bg-[#fffdff5c] p-2 rounded backdrop-blur-sm backdrop-brightness-200">Scroll for more</span>
        </div>
      </div>
      <div className="grid items-center justify-center h-dvh">
        <div className="fixed left-0 right-0 flex w-full justify-center items-center" style={{ opacity: opacity, bottom: bottom }}>Scroll for more</div>
        <div className="z-30 md:grid w-full md:grid-cols-5 flex flex-col md:flex-col p-6">
          <div className="md:col-span-2 md:px-6 flex flex-col justify-center top-0 left-0 prose mb-8">
            <h1 className="text-5xl font-bold mb-3 oswald">Sarah Engle Counseling</h1>
            <p className="text-lg whitespace-pre-line">hello! I am Sarah Engle!{"\n"}
              learn about me here congratulations
            </p>
          </div>
          <div className="md:col-span-3 grid items-center justify-center">
            <img src="lady.png" alt="lady" className="w-full" style={{ transform: `rotate(${rotation}deg)` }} />
          </div>
        </div>  */}
      </div>
    </div >
    </>
  )
}

export default App
