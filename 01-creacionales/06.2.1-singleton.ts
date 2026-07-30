/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

import { configManager } from "./singleton/config-manager.ts";

configManager.setConfig('APIUrlBase', 'http://localhost:3001/api');
configManager.setConfig('TimeOut', '5000');
configManager.setConfig('ApiKey', 'lsdfl123a52');

console.log(configManager.getConfig('APIUrlBase'));
console.log(configManager.getConfig('TimeOut'));
console.log(configManager.getConfig('ApiKey'));