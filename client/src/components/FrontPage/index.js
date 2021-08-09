import React from 'react';
import Hero from './Hero';
import ImageSection from './ImageSection/';
import PricingSection from './PricingSection';
import Footer from './Footer/';
import { useSelector } from 'react-redux';

const FrontPage = () => {
  const { settings } = useSelector((state) => state.settings);
  return (
    <>
      <Hero />
      <ImageSection
        imageUrl={
          'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&blend=6366F1&sat=-100&blend-mode=multiply'
        }
        reversed={true}
        title={'Over 9000 machines to workout on'}
        subtitle={'A gym for everyone'}
        content={
          'Whether you are a professional weightlifter or completely new to training, we have all the equipment and space you possibly need to start your journey towards your fitness goals!'
        }
        buttonText={'Check the pricing'}
        buttonUrl={'#pricing'}
      />
      <ImageSection
        imageUrl={
          'https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&blend=6366F1&sat=-100&blend-mode=multiply'
        }
        reversed={false}
        title={"We won't make you go bankrupt"}
        subtitle={'Affordable pricing'}
        content={
          'We offer you multiple different options for paying your membership. You can go with one month plan if you are still unsure, or as long as one year if you are already fully determined.'
        }
        buttonText={'Check the pricing'}
        buttonUrl={'#pricing'}
      />
      <PricingSection />
      <Footer settings={settings} />
    </>
  );
};

export default FrontPage;
