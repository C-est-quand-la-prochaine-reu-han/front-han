import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import LogInView from '@/views/LogInView.vue';
import MenuView from '@/views/MenuView.vue';
import ProfileView from '@/views/ProfileView.vue';
import AllPlayersView from '@/views/AllPlayersView.vue';
import GameView from '@/views/GameView.vue';
import TournamentView from '@/views/TournamentView.vue';

const routes = [
	{ path: '/', component: LogInView },
	{ path: '/menu', component: MenuView },
	{ path: '/profile', component: ProfileView },
	{ path: '/all-players', component: AllPlayersView },
	{ path: '/game', component: GameView },
	{ path: '/tournament', component: TournamentView }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
	const isConnected = useAuthStore().token !== null;
	
	if (!isConnected && to.path !== '/') {
		next('/');
	} else {
		next();
	}
})

export default router;
