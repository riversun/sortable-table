import './index.scss';
import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faDog, faCat } from '@fortawesome/free-solid-svg-icons';

library.add(faDog, faCat);

dom.i2svg();

export { default } from './sortable-table';
