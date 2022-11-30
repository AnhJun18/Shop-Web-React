import axios from 'axios';

export default axios.create({
	baseURL: 'https://pa-shop-service.azurewebsites.net',
});
