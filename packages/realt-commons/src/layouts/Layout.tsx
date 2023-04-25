import { createStyles } from '@mantine/core';
import { FC, ReactNode } from 'react';
import { Footer, Header, Websites } from '../components';

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: '100vh'
  },
  main: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflowY: "auto",
    padding: `0 ${theme.spacing.xl}px`
  }
}));

type LayoutProps = { 
  children: ReactNode, 
  currentWebsite: Websites
};

export const Layout: FC<LayoutProps> = ({ children, currentWebsite }) => {

  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <Header currentWebsite={currentWebsite}/>
      <div className={classes.main}>
        {children}
      </div>
      <Footer />
    </div>
  );
};
