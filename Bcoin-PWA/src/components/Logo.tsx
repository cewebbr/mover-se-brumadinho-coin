import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 'fit-content',
    textAlign: 'center',
  },
  b: {
    color: theme.palette.primary.main,
    fontSize: '48px',
    lineHeight: 'normal',
  },
  coin: {
    color: theme.palette.text.secondary,
    fontSize: '40px',
  },
  slogan: {
    color: theme.palette.text.secondary,
    fontSize: '16px',
  },
  highlight: {
    color: theme.palette.primary.main,
  },
}), { name: 'Logo' });

type LogoType = {
  slogan?: boolean,
}

function Logo(props: LogoType) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span className={classes.b}>B</span>
      <span className={classes.coin}>Coin</span>
      { props.slogan
        ? (
          <div className={classes.slogan}>
            Uma moeda ambiental
            <span className={classes.highlight}> solidária </span>
          </div>
        )
        : ' '}
    </div>
  );
}

export default Logo;
