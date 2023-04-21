import axios from 'axios';

export default axios.create({
	baseURL: 'http://localhost:8081',

	// baseURL: 'https://pa-shop-service.azurewebsites.net',
});
