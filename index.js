/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import StackMain from './components/StackMain'

AppRegistry.registerComponent(appName, () => StackMain);
