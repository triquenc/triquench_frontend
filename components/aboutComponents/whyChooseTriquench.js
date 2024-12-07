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
                            <h3>QUALITY</h3>
                            <p>We are committed to providing our customers with the highest quality CNC spindle products and services. We achieve this through rigorous quality control processes and a dedication to continuous improvement.                            </p>
                        </div>
                    </div>
                    <div className="why-choose-item">
                        <div className="why-choose-item-inner">
                            <Image src="/images/proven-result.svg" alt="Proven Results Icon" height={50} width={50}/>
                            <h3>INNOVATION</h3>
                            <p>We are constantly striving to develop new and innovative CNC spindle solutions that meet the evolving needs of our customers. Our team of experienced engineers is dedicated to research and development, ensuring that our products are at the forefront of CNC spindle technology.</p>
                        </div>
                    </div>
                    <div className="why-choose-item">
                        <div className="why-choose-item-inner">
                            <Image src="/images/pricing.svg" alt="Reliability Icon" height={50} width={50}/>
                            <h3>RELIABILITY</h3>
                            <p>We understand that our customers rely on our products to keep their operations running smoothly. That's why we focus on providing reliable CNC spindle solutions that you can count on.</p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
        </>
      );
}