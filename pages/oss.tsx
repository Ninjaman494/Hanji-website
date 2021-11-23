import Head from 'next/head';
import {
  FooterSection,
  Header,
  HeroSection,
  ScrollAppBar,
  Slices,
  RepoCard,
  RepoCardProps,
} from '@components';
import {
  Box,
  Container,
  GridList,
  GridListTile,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import React, { FC } from 'react';
import {
  Client,
  HomePageSection,
  RepoSlice,
  Slice,
} from 'prismic-configuration';
import { RichText, RichTextBlock } from 'prismic-reactjs';

const useStyles = makeStyles({
  tile: { display: 'flex', overflow: 'visible' },
});

interface OSSPageData {
  hero_title: RichTextBlock[];
  body: Slice[];
}

interface Props {
  title: RichTextBlock[];
  sections: HomePageSection[];
  repoSection: {
    header: RichTextBlock[];
    blurb: RichTextBlock[];
    repos: RepoCardProps[];
  };
}

export async function getStaticProps() {
  const data: OSSPageData = (await Client().getSingle('oss_page', {})).data;
  const { primary, items } = data.body[1] as RepoSlice;

  return {
    props: {
      title: data.hero_title,
      sections: data.body[0].items as HomePageSection[],
      repoSection: {
        header: primary.header,
        blurb: primary.blurb,
        repos: items,
      },
    },
  };
}

const OSSPage: FC<Props> = ({ title, sections, repoSection }) => {
  const { breakpoints } = useTheme();
  const classes = useStyles();
  const matchedSm = useMediaQuery(breakpoints.up('sm'));

  let cols = 1;
  if (matchedSm) {
    cols = 2;
  }

  return (
    <div style={{ overflowX: 'hidden', margin: -8 }}>
      <Head>
        <title>Hanji - Commitment to Open Source Software</title>
      </Head>
      <ScrollAppBar />
      <HeroSection>
        <Typography variant="h1" align="center">
          {RichText.asText(title)}
        </Typography>
      </HeroSection>
      <Slices slices={sections} />
      <Box pt={16} pb={16} bgcolor={grey[100]}>
        <Container>
          <Header>{RichText.asText(repoSection.header)}</Header>
          <Box mt={2} mb={8}>
            <Typography color="textSecondary">
              {RichText.asText(repoSection.blurb)}
            </Typography>
          </Box>
          <GridList
            cols={cols}
            cellHeight="auto"
            style={{ overflow: 'visible' }}
          >
            {repoSection.repos.map((repo) => (
              <GridListTile classes={{ tile: classes.tile }}>
                <RepoCard {...repo} />
              </GridListTile>
            ))}
          </GridList>
        </Container>
      </Box>
      <FooterSection />
    </div>
  );
};

export default OSSPage;
