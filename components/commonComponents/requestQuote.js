import React from "react";
import Image from "next/image";


export default function RequestQuote() {

    return (
        <>
            <section className="request-quote-section">
                <div className="container">
                    <div className="request-quote-inner">
                        <div className="request-quote-left">
                            <h2>Request Quote</h2>
                            <p>Share your requirements, and we’ll provide a tailored quote. Explore our premium CNC spindles, VFDs, tool holders, and more for unmatched performance.</p>
                            <a href="https://www.spindlemotor.in/contact" className="site-btn">SUBMIT ENQUIRY</a>
                        </div>
                        <div className="request-quote-right">
                            <Image src="/images/request-quote-image.svg" width={300} height={283} alt="Request Quote Image"/>
                        </div>
                    </div>  
                </div>    
            </section> 
        </>
      );
}
