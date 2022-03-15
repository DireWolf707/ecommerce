import { writable } from 'svelte/store';
import { browser } from "$app/env";
import axios from 'axios';
import { goto } from '$app/navigation';

const getUser = async () => {
	try {
		const res = await axios.get('http://localhost:8080/user/me',{
			withCredentials: true
		});
		return res.data
	} catch (error) {
		return undefined
	}
}

const createUser = async() => {
    const initialData = browser && await getUser();
	const { subscribe, set, update } = writable(initialData);
	return {
		subscribe,

		loginIn: async (_email,_password) => {
			const res = await axios.post('http://localhost:8080/user/login',{
				email:_email,password:_password
			},{
				withCredentials: true
			})
			if (!res.data.message) {
				set(res.data)
				goto('/')
				//goto next location.search
			}
		},

		signUp: async (_email,_password,_name) => {
			const res = await axios.post('http://localhost:8080/user/signup',{
				email:_email,password:_password,name:_name
			},{
				withCredentials: true
			})
			if (!res.data.message) {
				set(res.data)
				goto('/')
				// goto next location.search
			}
		},
		
		logout: async () => {
			const res = await axios.post('http://localhost:8080/user/logout',{},{
				withCredentials: true
			})
			if (res.data.status) {
				set(undefined);
				goto('/');
			} else {
				set(res.data);
			}
		},

		updateUser: async (email, name) => {
			const res = await axios.put('http://localhost:8080/user/me',{
				email, name
			},{
				withCredentials: true
			})
			if (!res.data.message) {
				set(res.data);
			}
		},

		updatePassword: async (pass1, pass2) => {
			const res = await axios.post('http://localhost:8080/user/me',{
				pass1, pass2
			},{
				withCredentials: true
			})
			if (!res.data.message) {
				set(res.data);
			}
		}
	}
}


export const user = await createUser();