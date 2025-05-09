
import Framework7, { utils, getDevice, createStore } from 'framework7/lite';
import Dialog from 'framework7/components/dialog';
import Popup from 'framework7/components/popup';
import Popover from 'framework7/components/popover';
import Actions from 'framework7/components/actions';
import Sheet from 'framework7/components/sheet';
import Toast from 'framework7/components/toast';
import Preloader from 'framework7/components/preloader';
import Progressbar from 'framework7/components/progressbar';
import Sortable from 'framework7/components/sortable';
import Swipeout from 'framework7/components/swipeout';
import Accordion from 'framework7/components/accordion';
import ContactsList from 'framework7/components/contacts-list';
import Tabs from 'framework7/components/tabs';
import Panel from 'framework7/components/panel';
import Card from 'framework7/components/card';
import Chip from 'framework7/components/chip';
import Form from 'framework7/components/form';
import Input from 'framework7/components/input';
import Checkbox from 'framework7/components/checkbox';
import Radio from 'framework7/components/radio';
import Toggle from 'framework7/components/toggle';
import Range from 'framework7/components/range';
import Stepper from 'framework7/components/stepper';
import SmartSelect from 'framework7/components/smart-select';
import Grid from 'framework7/components/grid';
import Calendar from 'framework7/components/calendar';
import Picker from 'framework7/components/picker';
import PullToRefresh from 'framework7/components/pull-to-refresh';
import DataTable from 'framework7/components/data-table';
import Fab from 'framework7/components/fab';
import Searchbar from 'framework7/components/searchbar';
import Messages from 'framework7/components/messages';
import Messagebar from 'framework7/components/messagebar';
import Swiper from 'framework7/components/swiper';
import Notification from 'framework7/components/notification';
import Autocomplete from 'framework7/components/autocomplete';
import Tooltip from 'framework7/components/tooltip';
import Skeleton from 'framework7/components/skeleton';
import ColorPicker from 'framework7/components/color-picker';
import Breadcrumbs from 'framework7/components/breadcrumbs';
import Typography from 'framework7/components/typography';
import ListIndex from 'framework7/components/list-index';

Framework7.use([
  Dialog,
  Popup,
  Popover,
  Actions,
  Sheet,
  Toast,
  Preloader,
  Progressbar,
  Sortable,
  Swipeout,
  Accordion,
  ContactsList,
  Tabs,
  Panel,
  Card,
  Chip,
  Form,
  Input,
  Checkbox,
  Radio,
  Toggle,
  Range,
  Stepper,
  SmartSelect,
  Grid,
  Calendar,
  Picker,
  PullToRefresh,
  DataTable,
  Fab,
  Searchbar,
  Messages,
  Messagebar,
  Swiper,
  Notification,
  Autocomplete,
  Tooltip,
  Skeleton,
  ColorPicker,
  Breadcrumbs,
  Typography,
  ListIndex
]);

export default Framework7;
export { utils, getDevice, createStore };
