import { networkInterfaces } from 'os';

import { Logger } from 'eazy-logger';

import { isset } from './common.js';

const eazyLoggerInstance = Logger();
const ifaces = networkInterfaces();

export const logger = (name, port) => () => {
  const addresses = [];
  Object.keys(ifaces).forEach((ifname) => {
    const info = ifaces[ifname];
    if (isset(info)) {
      info.forEach((iface) => {
        if ('IPv4' !== iface.family || iface.internal !== false) return;
        addresses.push(`http://${ iface.address }:${ port }`);
      });
    }
  });
  const local = `http://localhost:${ port }`;
  const length = [ local, ...addresses ]
    .reduce((acc, current) => current.length > acc ? current.length : acc, 0);
  const hyphensAmount = 11;
  const spacesAmount = 4;
  const underline = new Array(hyphensAmount + length).join('-');

  eazyLoggerInstance.info(`Runned ${ name }:`);
  eazyLoggerInstance.info('{grey:%s}', underline);
  eazyLoggerInstance.info('%s: {red:%s}', `${ new Array(spacesAmount).join(' ') }Local`, local);
  addresses.forEach((address) => eazyLoggerInstance.info('%s: {red:%s}', 'External', address));
  eazyLoggerInstance.info('{grey:%s}', underline);
};
