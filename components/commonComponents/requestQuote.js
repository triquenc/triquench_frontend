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
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy. </p>
                            <a href="#" className="site-btn">SUBMIT ENQUIRY</a>
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