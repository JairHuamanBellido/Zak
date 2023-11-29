import { writable } from 'svelte/store';

const jwtTokenStore = writable<string>('');

export { jwtTokenStore };
