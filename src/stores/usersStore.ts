import { defineStore } from 'pinia';
import { Cookies } from 'quasar';
import { api } from 'src/boot/axios';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
    username: '',
    password: '',
    accessToken: '',
    refreshToken: '',
  }),

  getters: {
    getUsers: (state) => state.users,
  },

  actions: {
    async getAll() {
      await api.get('/api/users/all?page=1',
        {
          headers:
          {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookies.get('Authorization'),
            'refreshToken': Cookies.get('refreshToken'),
          },
        }
      ).then((response) => {
        this.users = response.data.data;
      }).catch((error) => {
        console.log(error);
      });
    },
  }
});
