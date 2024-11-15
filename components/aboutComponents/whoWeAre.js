import React from "react";
import Image from "next/image";

export default function WhoWeAre() {

    return (
        <>
            <section className="who-we-are">
                <div className="container">
                    <div className="title-block">
                        <h2 className="has-green-bar">Who we are</h2>
                    </div>
                    <div className="content-block">
                        <p>In India, Known for our Active and Dynamic Customer Service Practices and catering to a broad assortment of product categories such as Belt Driven Spindle, Edge Banding Spindle Motor, Air Cooled, Spindle Motor ATC, Spindle Motor MTC, Machine Tools Spindle, CNC Router Spindle, and Spindle Accessories.</p>
                        <p>We are strengthening and Expanding towards providing world-class Repairing Services in the Indian Diaspora.</p>
                        <p>We provide “Intelligent Spindle Solutions” and Aspiring to be of Service to Society and Grow along with it.</p>
                    </div>
                    <div className="who-we-are-grid">
                        <div className="who-we-are-grid-item">
                            <Image src="/images/who-we-are-img1.jpg" width={555} height={396} alt="Who We Are Image1"/>
                        </div>
                        <div className="who-we-are-grid-item">
                            <Image src="/images/who-we-are-img2.jpg" width={555} height={396} alt="Who We Are Image2"/>   
                        </div>
                    </div>
                </div>
            </section>
        </>
      );
}