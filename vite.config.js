import glsl from 'vite-plugin-glsl';

const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env;

export default {
    root: './',
    base: isCodeSandbox ? '/' : '/mcvlix.github.io/', // Adjust 'your-repo-name' to your actual repository name
    server: {
        host: true,
        open: !isCodeSandbox, // Open if it's not a CodeSandbox
    },
    build: {
        outDir: '../docs',
        emptyOutDir: true,
        sourcemap: true,
    },
    plugins: [
        glsl(),
    ],
    resolve: {
        alias: {
            // If you have any alias mappings
        },
    },
};

