import { defineStore } from 'pinia';
import { Cookies } from 'quasar';
import { api } from 'src/boot/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    username: '',
    password: '',
    accessToken: '',
    refreshToken: '',
  }),

  getters: {
    getAccessToken: (state) => state.accessToken,
    getRefreshToken: (state) => state.refreshToken,
  },

  actions: {
    checkLogin() {
    },

    async login(username: string, password: string) {
      this.username = username;
      this.password = password;

      await api.post('/api/auth/login',
        { userName: this.username, password: this.password },
        { headers: { 'Content-Type': 'application/json' } }
      ).then((response) => {
        this.accessToken = response.data.data.accessToken;
        this.refreshToken = response.data.data.refreshToken;

        Cookies.set('Authorization', this.accessToken, { expires: '15m', secure: true });
        Cookies.set('refreshToken', this.refreshToken, { expires: 1, secure: true });

        this.router.push({ name: 'me' });
      }).catch((error) => {
        console.log(error);
      });
    },

    async logout() {
      Cookies.remove('Authorization');
      Cookies.remove('refreshToken');

      this.accessToken = '';
      this.refreshToken = '';

      this.router.push({ name: 'login' });
    }
  }
});
