import { Box, Grid, Typography, Button, withStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import AndroidIcon from '@material-ui/icons/Android';
import { StyleSheet } from '@components';
import React, { FC } from 'react';
import { RichText, RichTextBlock } from 'prismic-reactjs';

export interface HeroContentProps {
  title: RichTextBlock[];
  description: RichTextBlock[];
  onWaitClick: () => void;
}

const AndroidButton = withStyles(() => ({
  root: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);

const HeroContent: FC<HeroContentProps> = ({
  title,
  description,
  onWaitClick,
}) => {
  return (
    <Box color="white">
      <Grid container spacing={5} direction="column">
        <Grid item>
          <Typography variant="h1" gutterBottom>
            {RichText.asText(title)}
          </Typography>
          <Typography variant="body1" style={styles.secondaryText}>
            {RichText.asText(description)}
          </Typography>
        </Grid>
        <Grid item container spacing={3}>
          <Grid item xs={6}>
            <AndroidButton
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disableElevation
              href="https://play.google.com/store/apps/details?id=com.a494studios.koreanconjugator"
              startIcon={<AndroidIcon />}
            >
              Download Now
            </AndroidButton>
            <Box mt={5}>
              <Typography variant="h3" align="center">
                4.8
              </Typography>
              <Typography
                variant="body1"
                align="center"
                style={styles.secondaryText}
              >
                Rating
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="default"
              size="large"
              fullWidth
              disableElevation
              onClick={onWaitClick}
            >
              Join Waitlist
            </Button>
            <Box mt={5}>
              <Typography variant="h3" align="center">
                10,000+
              </Typography>
              <Typography
                variant="body1"
                align="center"
                style={styles.secondaryText}
              >
                Downloads
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const styles: StyleSheet = {
  secondaryText: {
    opacity: 0.8,
  },
};

export default HeroContent;
