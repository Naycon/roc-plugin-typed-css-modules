import config from '../config/roc.config.js';
import meta from '../config/roc.config.meta.js';

import { name } from './util';

export default {
    name,
    config,
    meta,
    actions: {
        typedCssModules: {
            hook: 'add-style',
            description: 'generates typescript definition files for your css files.',
            action: () => () => () => () => ({
                extensions: ['css'],
                loaders: `${require.resolve('typed-css-modules-loader')}`
            })
        }
    },
    required: {
        'roc-plugin-typescript': '^1.0.3'
    }
};
