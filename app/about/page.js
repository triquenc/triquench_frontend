import InnerPageBanner from '../../components/commonComponents/innerpagebanner';
import WhoWeAre from '../../components/aboutComponents/whoWeAre';
import WhyChooseTriquench from '@/components/aboutComponents/whyChooseTriquench';
import MeetOurTeam from '@/components/aboutComponents/meetOurTeam';
import OurVision from '@/components/aboutComponents/ourVision';

export default function Aboutus() {
    return (
      <div>
       {/*} <InnerPageBanner 
        title="About Us"
        subtitle="TRIQUENCH"
        paragraph="We provide “Intelligent Spindle Solutions” and aspire to be of service to society and grow along with it."
        bannerImage="/images/building png.png"
        />*/}

        <img src='https://res.cloudinary.com/dd1na5drh/image/upload/v1733200123/about_us_hero_page_se7t8n.png'></img>
        <WhoWeAre />
        <WhyChooseTriquench />
        <MeetOurTeam />
        <OurVision />
      </div>
    );
}