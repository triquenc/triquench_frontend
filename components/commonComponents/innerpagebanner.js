import React from "react";
import Image from "next/image";


export default function InnerPageBanner({ title, subtitle, paragraph, bannerImage, buttonText, buttonUrl, className }) {

    return (
        <>
            <section className={`inner-page-banner ${className || ""}`}>
                <div className="container">
                    <div className="inner-page-banner-wrapper">
                        <div className="inner-page-banner-left">
                            <span className="sub-title">{subtitle}</span>     
                            <h1 className="has-green-bar">{title}</h1>
                            <p>{paragraph}</p>
                            {buttonText && (
                                <a href={buttonUrl || "#"} className="banner-button">
                                    {buttonText}
                                </a>
                            )}
                        </div>
                        <div className="inner-page-banner-right">
                            <Image src={bannerImage} alt="About Banner" height={470} width={630}/>
                        </div>
                    </div>    
                </div>    
            </section> 
        </>
      );
}