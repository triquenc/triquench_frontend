import InnerPageBanner from '../../components/commonComponents/innerpagebanner';
import WhoWeAre from '../../components/aboutComponents/whoWeAre';
import WhyChooseTriquench from '@/components/aboutComponents/whyChooseTriquench';
import MeetOurTeam from '@/components/aboutComponents/meetOurTeam';
import OurVision from '@/components/aboutComponents/ourVision';

export default function Aboutus() {
    return (
      <div>
        <InnerPageBanner 
        title="About Us"
        subtitle="TRIQUENCH"
        paragraph="We provide “Intelligent Spindle Solutions” and aspire to be of service to society and grow along with it."
        bannerImage="/images/about-banner.png"
        />
        <WhoWeAre />
        <WhyChooseTriquench />
        <MeetOurTeam />
        <OurVision />
      </div>
    );
}