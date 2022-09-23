import {
  Link,
  useRouteMatch,
} from 'react-router-dom';

import { makeStyles, Theme } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

interface Props extends React.ComponentPropsWithoutRef<"div">{
  width: number,
  open: boolean,
  onClose: () => void,
}

const useStyles = makeStyles((theme: Theme) => ({
  temporaryDrawer: (props: Props) => ({
    '& .MuiDrawer-paper': {
      width: props.width,
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  }),

  permanentDrawer: (props: Props) => ({
    '& .MuiDrawer-paper': {
      width: props.width,
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  }),

  nestedListItems: {
    paddingLeft: theme.spacing(4),
  },
}));

function Sidebar(props: Props) {
  const { url } = useRouteMatch();
  const classes = useStyles(props);

  const menuItems = (
    <div>
      <Divider style={{ marginTop: '60px' }} />
      <List>
        
        <ListItem>
          <ListItemText primary="PROJETOS" />
        </ListItem>
        <ListItem className={classes.nestedListItems} button component={Link} to={`${url}/project/myprojects`}>
          <ListItemText primary="Projetos em Andamento" />
        </ListItem>
        <ListItem className={classes.nestedListItems} button component={Link} to={`${url}/project/view`}>
          <ListItemText primary="Projetos Disponíveis" />
        </ListItem>
        <ListItem className={classes.nestedListItems} button component={Link} to={`${url}/project/finished`}>
          <ListItemText primary="Projetos Finalizados" />
        </ListItem>
        <ListItem className={classes.nestedListItems} button component={Link} to={`${url}/project/create`}>
          <ListItemText primary="Criar Projeto" />
        </ListItem>
        <Divider />

        <ListItem>
          <ListItemText primary="CARTEIRA" />
        </ListItem>
        <ListItem className={classes.nestedListItems} button component={Link} to={`${url}/project/mywallet`}>
          <ListItemText primary="Minha Carteira" />
        </ListItem>
        <Divider />

        {/* <ListItem>
          <ListItemText primary="CONTA" />
        </ListItem>
        <ListItem className={classes.nestedListItems} button>
          <ListItemText primary="Meus Dados" />
        </ListItem> */}
      </List>
    </div>
  );

  return (
    <nav>
      <Drawer
        className={classes.temporaryDrawer}
        variant="temporary"
        open={props.open}
        onClose={props.onClose}
        onClick={props.onClick}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {menuItems}
      </Drawer>

      <Drawer
        className={classes.permanentDrawer}
        variant="permanent"
      >
        {menuItems}
      </Drawer>
    </nav>
  );
}

export default Sidebar;
