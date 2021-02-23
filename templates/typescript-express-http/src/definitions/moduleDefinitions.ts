/*
 * Module is defined by {module: Module, prefix: string} 
 */
import {ExampleModule} from "../modules/exampleModule/init";
export const appModules = [
  {appModule: new ExampleModule(), prefix: '/example'}
];
