import { defineStore } from 'pinia';
import { Cookies } from 'quasar';
import { api } from 'src/boot/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    username: '',
    password: '',
    accessToken: '',
    refreshToken: '',
    refreshTokenTimeout: 0,
  }),

  getters: {
    getAccessToken: (state) => state.accessToken,
    getRefreshToken: (state) => state.refreshToken,
  },

  actions: {
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
        this.startRefreshTokenTimer();
      }).catch((error) => {
        console.log(error);
      });
    },

    async refresh() {
      await api.post('/api/auth/refresh',
        null,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookies.get('Authorization'),
            'refreshToken': Cookies.get('refreshToken'),
          }
        }
      ).then((response) => {
        this.accessToken = response.data.accessToken;
        Cookies.set('Authorization', this.accessToken, { expires: '15m', secure: true });
        console.log(this.accessToken);
        this.startRefreshTokenTimer();
      }).catch((error) => {
        console.log(error);
      });
    },

    async logout() {
      Cookies.remove('Authorization');
      Cookies.remove('refreshToken');

      this.accessToken = '';
      this.refreshToken = '';

      this.stopRefreshTokenTimer();
      this.router.push({ name: 'login' });
    },

    startRefreshTokenTimer() {
      // 840000: 14 minutes
      // 45000: 45 seconds
      // 59000: 59 seconds
      // 899000: 14 minutes and 59 seconds
      this.refreshTokenTimeout = window.setTimeout(this.refresh, 899000);
    },

    stopRefreshTokenTimer() {
      clearTimeout(this.refreshTokenTimeout);
    }
  }
});
