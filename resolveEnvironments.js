global.globalEnvironment = {
	prod: {
		app: 'https://www.crexi.com/',
		api: 'https://api.crexi.com/',
		apiRegex: 'https:\/\/api-crexi.com/',
		excludeTests: '|@onlystaging',
	},
	staging: {
		app: '',
		api: '',
		apiRegex: '',
		excludeTests: '|@onlyprod|',
	}
};

/**
 * @description This will set the environment where our test are going to run
 * Supported values are 'qa' || 'staging'
 */
const resolveEnvironment = () => {
	switch (process.env.ENVIRONMENT_URL) {
		case 'staging':
			return globalEnvironment.staging;
		default:
			return globalEnvironment.prod;
	};
};

export {
	resolveEnvironment
};
