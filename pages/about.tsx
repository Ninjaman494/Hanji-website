import Head from 'next/head';
import {
  FooterSection,
  HeroSection,
  ScrollAppBar,
  Slices,
  StyleSheet,
} from '@components';
import { Box, Container, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import Image from 'next/image';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import { Client, Graphic, HomePageSection, Slice } from 'prismic-configuration';

interface AboutPageData {
  hero_title: RichTextBlock[];
  company_header: RichTextBlock[];
  company_blurb: RichTextBlock[];
  company_graphic: Graphic;
  body: Slice[];
}

interface Props {
  title: RichTextBlock[];
  companySection: {
    header: RichTextBlock[];
    blurb: RichTextBlock[];
    graphic: Graphic;
  };
  sections: HomePageSection[];
}

export async function getStaticProps() {
  const data: AboutPageData = (await Client().getSingle('about_page', {})).data;

  return {
    props: {
      title: data.hero_title,
      sections: data.body[0].items as HomePageSection[],
      companySection: {
        header: data.company_header,
        blurb: data.company_blurb,
        graphic: data.company_graphic,
      },
    },
  };
}

const AboutPage: FC<Props> = ({ title, sections, companySection }) => {
  return (
    <div style={{ overflowX: 'hidden', margin: -8 }}>
      <Head>
        <title>Hanji - About</title>
      </Head>
      <ScrollAppBar />
      <HeroSection>
        <Typography variant="h1" align="center">
          {RichText.asText(title)}
        </Typography>
      </HeroSection>
      <Slices slices={sections} />
      <Box pt={16} pb={16}>
        <Container maxWidth="sm" style={styles.centered}>
          <Typography variant="h3" gutterBottom align="center">
            {RichText.asText(companySection.header)}
          </Typography>
          <Typography variant="body1" color="textSecondary" align="center">
            {RichText.asText(companySection.blurb)}
          </Typography>
          <Box mt={8}>
            <Image
              src={companySection.graphic.url}
              width={companySection.graphic.dimensions.width}
              height={companySection.graphic.dimensions.height}
              quality={100}
            />
          </Box>
        </Container>
      </Box>
      <FooterSection />
    </div>
  );
};

const styles: StyleSheet = {
  centered: {
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'column',
  },
};

export default AboutPage;
