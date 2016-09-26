export default {
    description: `
    A roc plugin to enable the typed-css-modules, which generates typescript definition
    files for your css files.

    ## How to use?
    Install the plugin as a dev dependency in your roc project:
    \`\`\`
    npm install --save-dev roc-plugin-typed-css-modules
    \`\`\`

    The plugin will now automatically scan any css imports you have in your .ts and
    .tsx files and generate d.ts-files for them. **Be aware though that no type
    definition files are generated until you reference a style in your css file:**
    \`\`\`javascript
    import * as React from 'react';
    // It's not enough to just import the style...
    import * as styles from './style.scss';

    export const MyReactComponent = () => (
    // ...you need to reference it as well before the plugin will kick in and generate type definitions!
      <div className={styles.main}>
        <p>Hello CSS Modules world!</p>
      </div>
    );
    \`\`\`

    Once a reference has been made, the plugin will automatically refresh the type
    definitions when you add new styles into your CSS-file.

    ## Caveats
    Currently, the webpack build with roc isn't automatically rerunning after the type
    definitions have been generated, which means that the typescript compiler will fail
    when trying to compile the file that is referencing the CSS file. Right now, the
    solution is unfortunately to rerun the build (or, in development, restart the dev
    server). For more on these issues, see [this discussion.](https://github.com/Quramy/typed-css-modules/issues/2)

    ### Could not find required extension. Needs roc-plugin-typescript@^*version*
    You'll get this warning if the typescript plugin isn't loaded before this plugin
    is. Per default, [roc will look](https://github.com/rocjs/roc/blob/master/docs/LoadingExtensions.md)
    for any roc-plugin-* packages in your package.json and load them in alphabetic
    order. To get rid of the warning, you'll need to specify the load order explicitly
    in your package.json file:
    \`\`\`
        ...
        "devDependencies": {
            ...
            // Alphabetic order
            "roc-plugin-typed-css-modules": "^2.0.0",
            "roc-plugin-typescript": "^2.0.0-alpha",
            ...
        },
        "roc": {
            // Needed to specify load order correctly to fullfill plugin dependencies
            "plugins": [
                ...
                // Reverse order from above
                "roc-plugin-typescript",
                "roc-plugin-typed-css-modules",
                ...
            ]
        }
    \`\`\`
    `,
    actions: [{
        hook: 'add-style',
        description: 'generates typescript definition files for your css files.',
        action: () => () => () => ({
            extensions: ['css'],
            loaders: require.resolve('typed-css-modules-loader'),
        }),
    }],
    required: {
        'roc-plugin-typescript': '^2.0.0-alpha',
        'roc-plugin-style-css': '^1.0.0-beta.2',
    },
};
