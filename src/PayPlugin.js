import React from 'react';
import { VERSION, Tab } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import PayComponent from './components/PayComponent.js';


const PLUGIN_NAME = 'PayPlugin';

export default class PayPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {

    flex.TaskCanvasTabs.Content.add(
      <Tab icon={<CreditCardIcon/>} iconActive={<CreditCardIcon/>} key="pay-tab">
        <PayComponent key="pay-component"/>
      </Tab>
      
    );

    flex.RootContainer.Content.remove("project-switcher")
    
    manager.strings.NoTasks = "PCI Payment Demo"
    
    flex.AgentDesktopView.defaultProps.splitterOptions = { initialFirstPanelSize: "400px", minimumFirstPanelSize: "400px" }

  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
