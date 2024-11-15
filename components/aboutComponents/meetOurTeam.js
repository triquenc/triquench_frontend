import React from "react";
import Image from "next/image";

export default function MeetOurTeam() {

    return (
        <>
        <section className="our-team-section">
          <div className="container">
            <div className="title-block">
                <span className="sub-title">Our Team</span>
                <h2 className="has-green-bar">MEET OUR TEAM</h2>
            </div>
            <div className="our-team-grid">
              <div className="our-team-item half-width">
                  <div className="our-team-img-wrapper">
                    <Image src="/images/team-member1.jpg" width={555} height={287} alt="Member Image1"/>
                  </div>
                  <h3>John Jacob</h3>
                  <span className="designation">Director</span>
              </div>
              <div className="our-team-item half-width">
                  <div className="our-team-img-wrapper">
                    <Image src="/images/team-member2.jpg" width={555} height={287} alt="Member Image2"/>
                  </div>
                  <h3>Sara Harper</h3>
                  <span className="designation">Director</span>
              </div>
              <div className="our-team-item">
                  <div className="our-team-img-wrapper">
                    <Image src="/images/team-member3.jpg" width={263} height={292} alt="Member Image3"/>
                  </div>
                  <h3>Mark Parker</h3>
                  <span className="designation">Team</span>
              </div>
              <div className="our-team-item">
                  <div className="our-team-img-wrapper">
                    <Image src="/images/team-member4.jpg" width={263} height={292} alt="Member Image4"/>
                  </div>
                  <h3>Stellina Mark</h3>
                  <span className="designation">Team</span>
              </div>
              <div className="our-team-item">
                  <div className="our-team-img-wrapper">
                    <Image src="/images/team-member5.jpg" width={263} height={292} alt="Member Image5"/>
                  </div>
                  <h3>Steffen David</h3>
                  <span className="designation">Team</span>
              </div>
              <div className="our-team-item">
                  <div className="our-team-img-wrapper">
                    <Image src="/images/team-member6.jpg" width={263} height={292} alt="Member Image6"/>
                  </div>
                  <h3>Elina Harper</h3>
                  <span className="designation">Team</span>
              </div>
            </div>
          </div>
        </section>
        </>
      );
}