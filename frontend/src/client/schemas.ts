export const $Body_login_login_access_token = {
	properties: {
		grant_type: {
			type: "any-of",
			contains: [
				{
					type: "string",
					pattern: "^password$",
				},
				{
					type: "null",
				},
			],
		},
		username: {
			type: "string",
			isRequired: true,
		},
		password: {
			type: "string",
			isRequired: true,
		},
		scope: {
			type: "string",
			default: "",
		},
		client_id: {
			type: "any-of",
			contains: [
				{
					type: "string",
				},
				{
					type: "null",
				},
			],
		},
		client_secret: {
			type: "any-of",
			contains: [
				{
					type: "string",
				},
				{
					type: "null",
				},
			],
		},
	},
} as const;

export const $Card = {
	properties: {
		front: {
			type: "string",
			isRequired: true,
		},
		back: {
			type: "string",
			isRequired: true,
		},
		id: {
			type: "string",
			isRequired: true,
			format: "uuid",
		},
		collection_id: {
			type: "string",
			isRequired: true,
			format: "uuid",
		},
	},
} as const;

export const $CardCreate = {
	properties: {
		front: {
			type: "string",
			isRequired: true,
		},
		back: {
			type: "string",
			isRequired: true,
		},
	},
} as const;

export const $CardList = {
	properties: {
		data: {
			type: "array",
			contains: {
				type: "Card",
			},
			isRequired: true,
		},
		count: {
			type: "number",
			isRequired: true,
		},
	},
} as const;

export const $Collection = {
	properties: {
		name: {
			type: "string",
			isRequired: true,
		},
		description: {
			type: "any-of",
			contains: [
				{
					type: "string",
				},
				{
					type: "null",
				},
			],
		},
		id: {
			type: "string",
			isRequired: true,
			format: "uuid",
		},
		user_id: {
			type: "string",
			isRequired: true,
			format: "uuid",
		},
		cards: {
			type: "array",
			contains: {
				type: "Card",
			},
			isRequired: true,
		},
	},
} as const;

export const $CollectionCreate = {
	properties: {
		name: {
			type: "string",
			isRequired: true,
		},
		description: {
			type: "any-of",
			contains: [
				{
					type: "string",
				},
				{
					type: "null",
				},
			],
		},
	},
} as const;

export const $CollectionList = {
	properties: {
		data: {
			type: "array",
			contains: {
				type: "Collection",
			},
			isRequired: true,
		},
		count: {
			type: "number",
			isRequired: true,
		},
	},
} as const;

export const $CollectionUpdate = {
	properties: {
		name: {
			type: "any-of",
			contains: [
				{
					type: "string",
				},
				{
					type: "null",
				},
			],
		},
		description: {
			type: "any-of",
			contains: [
				{
					type: "string",
				},
				{
					type: "null",
				},
			],
		},
	},
} as const;

export const $HTTPValidationError = {
	properties: {
		detail: {
			type: "array",
			contains: {
				type: "ValidationError",
			},
		},
	},
} as const;

export const $Token = {
	properties: {
		access_token: {
			type: "string",
			isRequired: true,
		},
		token_type: {
			type: "string",
			default: "bearer",
		},
	},
} as const;

export const $UserPublic = {
	properties: {
		email: {
			type: "string",
			isRequired: true,
			format: "email",
			maxLength: 255,
		},
		is_active: {
			type: "boolean",
			default: true,
		},
		is_superuser: {
			type: "boolean",
			default: false,
		},
		full_name: {
			type: "any-of",
			contains: [
				{
					type: "string",
					maxLength: 255,
				},
				{
					type: "null",
				},
			],
		},
		id: {
			type: "string",
			isRequired: true,
			format: "uuid",
		},
	},
} as const;

export const $UserRegister = {
	properties: {
		email: {
			type: "string",
			isRequired: true,
			format: "email",
			maxLength: 255,
		},
		password: {
			type: "string",
			isRequired: true,
			maxLength: 40,
			minLength: 8,
		},
		full_name: {
			type: "any-of",
			contains: [
				{
					type: "string",
					maxLength: 255,
				},
				{
					type: "null",
				},
			],
		},
	},
} as const;

export const $ValidationError = {
	properties: {
		loc: {
			type: "array",
			contains: {
				type: "any-of",
				contains: [
					{
						type: "string",
					},
					{
						type: "number",
					},
				],
			},
			isRequired: true,
		},
		msg: {
			type: "string",
			isRequired: true,
		},
		type: {
			type: "string",
			isRequired: true,
		},
	},
} as const;
