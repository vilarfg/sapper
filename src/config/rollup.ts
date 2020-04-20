import { dev, src, dest } from './env';
import { InputOption, OutputOptions } from 'rollup';

const sourcemap = dev ? 'inline' : false;

export default {
	dev,

	client: {
		input: (): InputOption => {
			return `${src}/client.js`
		},

		output: (outputOptions?: OutputOptions): OutputOptions => {
			const options: OutputOptions = {
				entryFileNames: '[name].[hash].js',
				chunkFileNames: '[name].[hash].js',
				format: 'esm',
				sourcemap,
				...outputOptions
			}
			options.dir = `${dest}/${options.dir || 'client'}`
			if (process.env.SAPPER_LEGACY_BUILD) options.dir += `/legacy`;

			return options;
		}
	},

	server: {
		input: (): InputOption => {
			return {
				server: `${src}/server.js`
			};
		},

		output: (): OutputOptions => {
			return {
				dir: `${dest}/server`,
				format: 'cjs',
				sourcemap
			};
		}
	},

	serviceworker: {
		input: (): InputOption => {
			return `${src}/service-worker.js`;
		},

		output: (): OutputOptions => {
			return {
				file: `${dest}/service-worker.js`,
				format: 'iife',
				sourcemap
			}
		}
	}
};