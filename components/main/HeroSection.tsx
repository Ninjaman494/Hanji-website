import React, { FC } from 'react';
import { Box, Container, Grid, Toolbar, useTheme } from '@material-ui/core';
import Image from 'next/image';
import { StyleSheet } from '@components';
import { Graphic } from 'prismic-configuration';
import { RichTextBlock } from 'prismic-reactjs';
import HeroContent from './HeroContent';

export interface HeroSectionProps {
  title: RichTextBlock[];
  description: RichTextBlock[];
  image: Graphic;
  onWaitClick: () => void;
}

const HeroSection: FC<HeroSectionProps> = ({ image, ...rest }) => {
  const { palette } = useTheme();

  return (
    <>
      <Toolbar style={{ background: palette.primary.main }} />
      <Box pt={8} bgcolor={palette.primary.main}>
        <Container>
          <Grid container spacing={10} alignItems="center" justify="center">
            <Grid item xs={12} md={6}>
              <HeroContent {...rest} />
            </Grid>
            <Grid item xs={12} md={6} style={styles.gridColumn}>
              <Image
                src={image.url}
                width={image.dimensions.width}
                height={image.dimensions.height}
                quality={100}
                priority
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <div style={styles.endWave}>
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          style={{ height: '100%', width: '100%' }}
        >
          <path
            d="M-3.10,93.25 C149.99,150.00 271.49,-49.98 501.41,94.23 L500.00,0.00 L0.00,0.00 Z"
            style={{ stroke: 'none', fill: palette.primary.main }}
          />
        </svg>
      </div>
    </>
  );
};

const styles: StyleSheet = {
  gridColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  endWave: {
    height: 150,
    overflow: 'hidden',
  },
};

export default HeroSection;
