import React from 'react';

export default function StatisticsSection() {
  return (
    <>
     <section className="statistics-section">
      <div className="container">
        <div className="title-block">
              <h2 className="has-green-bar">WE ADVISE YOU,<span className='d-block'>YOU CALL THE RIGHT DECISION!</span></h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
            </div>
            <div className="statistics-grid">
              <div className="statistics-item">
                <div className="statistics-inner">
                  <h3 className="number">90</h3>
                  <p className="name">Companies</p>
                </div>
              </div>
              <div className="statistics-item">
                <div className="statistics-inner">
                  <h3 className="number">25</h3>
                  <p className="name">Our Consultants</p>
                </div>
              </div>
              <div className="statistics-item">
                <div className="statistics-inner">
                  <h3 className="number">72</h3>
                  <p className="name">Awards Winning</p>
                </div>
              </div>
              <div className="statistics-item">
                <div className="statistics-inner">
                  <h3 className="number">240</h3>
                  <p className="name">Happy Clients</p>
                </div>
              </div>
            </div>
      </div>
     </section>
    </>
  );
};

