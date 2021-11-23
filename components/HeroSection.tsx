import React, { FC, ReactNode } from 'react';
import { Box, Container, Toolbar, useTheme } from '@material-ui/core';
import { StyleSheet } from '@components';

interface HeroSectionProps {
  children: NonNullable<ReactNode>;
}

const HeroSection: FC<HeroSectionProps> = ({ children }) => {
  const { palette } = useTheme();

  return (
    <>
      <Toolbar style={{ background: palette.primary.main }} />
      <Box
        pt={8}
        bgcolor={palette.primary.main}
        color="white"
        height="60vh"
        display="flex"
      >
        <Container maxWidth="md" style={styles.container}>
          {children}
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
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  endWave: {
    height: 150,
    overflow: 'hidden',
  },
};

export default HeroSection;
