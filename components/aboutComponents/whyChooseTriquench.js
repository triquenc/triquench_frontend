import React from "react";
import Image from "next/image";

export default function WhyChooseTriquench() {

    return (
        <>
        <section className="why-choose-triquench">
            <div className="container">
                <div className="title-block">
                    <span className="sub-title">Our strengths</span>
                    <h2 className="has-green-bar">WHY CHOOSE TRIQUENCH</h2>
                </div>
                <div className="why-choose-grid">
                    <div className="why-choose-item">
                        <div className="why-choose-item-inner">
                            <Image src="/images/innovative-thinking.svg"  alt="Innovative Thinking Icon" height={50} width={50}/>
                            <h3>Innovative Thinking</h3>
                            <p>Our team brings years of experience and deep industry knowledge to ensure that you receive the highest quality of service. We are committed to staying ahead of the latest trends and innovations.</p>
                        </div>
                    </div>
                    <div className="why-choose-item">
                        <div className="why-choose-item-inner">
                            <Image src="/images/proven-result.svg" alt="Proven Results Icon" height={50} width={50}/>
                            <h3>Proven Results</h3>
                            <p>Our team brings years of experience and deep industry knowledge to ensure that you receive the highest quality of service. We are committed to staying ahead of the latest trends and innovations.</p>
                        </div>
                    </div>
                    <div className="why-choose-item">
                        <div className="why-choose-item-inner">
                            <Image src="/images/pricing.svg" alt="Competitive Pricing Icon" height={50} width={50}/>
                            <h3>Competitive Pricing</h3>
                            <p>Our team brings years of experience and deep industry knowledge to ensure that you receive the highest quality of service. We are committed to staying ahead of the latest trends and innovations.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
      );
}