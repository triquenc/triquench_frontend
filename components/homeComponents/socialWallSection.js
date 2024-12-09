import React from "react";
import Image from "next/image";

export default function SocialWallSection() {
  return (
    <>
      <section className="social-wall-section">
        <div className="container">
          <div className="title-block">
            <h2 className="has-green-bar">SOCIAL WALL</h2>
          </div>
            <div className="social-grid">
            <div className="social-grid-item">
            <a 
              href="https://www.instagram.com/triquench_spindlemotor/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-grid-inner">
              <div className="social-grid-inner">
                <div className="img-wrapper">
                  <picture className='bg-img'> 
                    <Image src="/images/social_media_wall_2.png" height={190} width={340} alt="Post" className='bg-img'/>
                    <source srcSet="/images/social_media_wall_2.png" type="image/webp"/>
                    <Image src="/images/social_media_wall_1.png" height={190} width={340} alt="Post" className='bg-img'/>
                  </picture>
                </div>
               <div className="bottom-outer">
                  <div className="bottom-wrapper">
                    <em className="absolute-img">
                    <Image src="/images/facebook-blue.svg" height={20} width={20} alt="facebook"/>
                    </em>
                    <p>
                    Maximize Productivity and Precision with TriQuench's Automatic Tool Changer (ATC) Spindle for Your CNC Machine!
                   </p>
                    <p className="company-name">TriQuench INDIA Pvt. Ltd.</p>
                 {/*  <span className="date">Triquench_ Sept 12</span>*/}
                  </div>
                  {/*  <div className="action-row">
                    <div className="left">
                      <ul>
                        <li>
                          <em>
                            <Image src="/images/heart.svg" alt="heart" height={30} width={30} className="action-ic" />12
                          </em>
                        </li>
                        <li>
                          <em>
                            <Image src="/images/comment.svg" alt="comment" height={30} width={30} className="action-ic" />12
                          </em>
                        </li>
                        <li>
                          <em>
                            <Image src="/images/repeat.svg" alt="repeat" height={30} width={30} className="action-ic" />2
                          </em>
                        </li>
                      </ul>
                    </div>
                    <div className="right">
                        <em>
                          <Image src="/images/repeat.svg" height={25} width={25} alt="upload" className="action-ic" />
                        </em>
                    </div>
                  </div>
                   */}
               </div>
                 
              </div>
              </a>
            </div>
            <div className="social-grid-item">
            <a 
              href="https://www.instagram.com/triquench_spindlemotor/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-grid-inner">
              <div className="social-grid-inner">
                <div className="img-wrapper">
                  <picture className='bg-img'> 
                    <source srcSet="/images/social_media_wall_3.png" type="image/webp"/>
                    <Image src="/images/social-post2.jpg" height={190} width={340} alt="Post" className='bg-img'/>
                  </picture>
                </div>
               <div className="bottom-outer">
                <div className="bottom-wrapper">
                  <em className="absolute-img">
                    <Image src="/images/insta-blue.svg" height={20} width={20} alt="Instagram Icon"/>
                  </em>
                  <p>
                  Unlock superior machining with our BT40 Motorized Spindle—perfect for CNC Milling, Automotive, and Aerospace industries!
                  </p>
                  <p className="company-name">TriQuench INDIA Pvt. Ltd.</p>
                 {/* <span className="date">Triquench_ Sept 12</span>*/}
                </div>
                {/*<div className="action-row">
                  <div className="left">
                  <ul>
                        <li>
                          <em>
                            <Image src="/images/heart.svg" alt="heart" height={30} width={30} className="action-ic" />12
                          </em>
                        </li>
                        <li>
                          <em>
                            <Image src="/images/comment.svg" alt="comment" height={30} width={30} className="action-ic" />12
                          </em>
                        </li>
                        <li>
                          <em>
                            <Image src="/images/repeat.svg" alt="repeat" height={30} width={30} className="action-ic" />2
                          </em>
                        </li>
                      </ul>
                  </div>
                  <div className="right">
                      <em>
                        <Image src="/images/repeat.svg" height={25} width={25} alt="upload" className="action-ic" />
                      </em>
                  </div>
                </div>
                */}
               </div>
              </div>
              </a>
            </div>
            <div className="social-grid-item">
                <a 
              href="https://www.instagram.com/triquench_spindlemotor/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-grid-inner">
              <div className="social-grid-inner">
                <div className="img-wrapper">
                  <picture className='bg-img'> 
                    <source srcSet="/images/social_media_wall_1.png" type="image/webp" />
                    <Image src="/images/social_media_wall_1.png" height={190} width={340} alt="Post" className='bg-img'/>
                  </picture>
                </div>
               <div className="bottom-outer">
                  <div className="bottom-wrapper">
                    <em className="absolute-img">
                      <Image src="/images/insta-blue.svg" height={20} width={20} alt="Instagram Icon"/>
                    </em>
                    <p>
                    TriQuench India offers premium-quality LM Guideways (Linear Motion Rail & Block) for precise and smooth movement in your CNC machines

                    </p>
                    <p className="company-name">TriQuench INDIA Pvt. Ltd.</p>
                     {/* <span className="date">Triquench_ Sept 12</span> */}
                  </div>
                 {/* <div className="action-row">
                    <div className="left">
                      <ul>
                          <li>
                            <em>
                              <Image src="/images/heart.svg" alt="heart" height={30} width={30} className="action-ic" />12
                            </em>
                          </li>
                          <li>
                            <em>
                              <Image src="/images/comment.svg" alt="comment" height={30} width={30} className="action-ic" />12
                            </em>
                          </li>
                          <li>
                            <em>
                              <Image src="/images/repeat.svg" alt="repeat" height={30} width={30} className="action-ic" />2
                            </em>
                          </li>
                        </ul>
                    </div>
                    <div className="right">
                        <em>
                            <Image src="/images/repeat.svg" height={25} width={25} alt="upload" className="action-ic" />
                        </em>
                    </div>
                  </div>
                 */}
               </div>
              </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
