import React from "react";
import Image from "next/image";

export default function ServiceWeProvide() {

    return (
        <>
            <section className="service-we-provide">
                <span className="prop1 prop"><Image src="/images/prop1.svg" width={232} height={253} alt="Prop1" /></span>
                <span className="prop2 prop"><Image src="/images/prop2.svg" width={223} height={214} alt="Prop2" /></span>
                <span className="prop3 prop"><Image src="/images/prop3.svg" width={213} height={215} alt="Prop3" /></span>
                <span className="prop4 prop"><Image src="/images/prop4.svg" width={241} height={227} alt="Prop4" /></span>
                <div className="container-sm">
                    <div className="title-block">
                        <h2 >Service We Provide</h2>
                        <span className="sut-text">24h Service Hotline</span>
                    </div>
                    <div className="service-content-block">
                        <div className="service-content-block-inner">
                            <div className="icon-list-wrapper">
                                <ul>
                                    <li>
                                        <div className="d-flex align-center">
                                            <Image src="/images/spindle-repair.svg" height={50} width={50} alt="Spindle Repair Icon"/>
                                            <span>Spindle Repair</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex align-center">
                                            <Image src="/images/spindle-rebuild.svg" height={50} width={50} alt="Spindle Rebuild Icon"/>
                                            <span>Spindle Rebuild</span>
                                        </div>
                                    </li>
                                    <li><div className="d-flex align-center">
                                            <Image src="/images/customized-spindle.svg" height={50} width={50} alt="Customised Spindle Icon"/>
                                            <span>Customised Spindle</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex align-center">
                                            <Image src="/images/prebuild-spindles.svg" height={50} width={50} alt="Prebuilt Spindles Icon"/>
                                            <span>Prebuilt Spindles</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <p>With <strong>12 years of expertise</strong>, we specialize in CNC spindle motor repair and rebuilds, ensuring optimal performance and longevity. Trust our seasoned professionals for top-notch precision in spindle maintenance.</p>
                        </div>
                        <div className="button-block">
                            <a href="tel:9601111615" className="give-a-call">
                                    <div className="d-flex align-center">
                                        <Image src="/images/call-ic-white.svg" height={40} width={40} alt="Call Icon"/>
                                        <span>
                                            <span className="small-text">Kaushal panchal</span>
                                            <span className="bold-text">9601111615</span>
                                        </span> 
                                    </div> 
                            </a>
                            <a href="" className="get-a-quote">
                                <span className="small-text">Submit enquiry?</span>
                                <span className="bold-text">Get a Quote</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section> 
        </>
      );
}