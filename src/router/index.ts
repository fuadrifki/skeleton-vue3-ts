import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const LayoutAccess = () => import('@/layout/allow-access.vue');
const LayoutDenied = () => import('@/layout/denied-access.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: LayoutDenied,
    meta: {
      show: false,
    },
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        meta: {
          show: false,
        }
      },
    ]
  },
  {
    path: '/beranda',
    name: 'Beranda',
    component: LayoutAccess,
    meta: {
      show: true,
    },
    children: [
      {
        path: '',
        name: 'Beranda',
        component: () => import('../views/Home.vue'),
      },
    ],
  },
  {
    path: '/rule',
    name: 'Rule',
    component: LayoutAccess,
    meta: {
      show: true,
    },
    children: [
      {
        path: '',
        name: 'Rule',
        component: () => import('../views/Rule.vue'),
      },
    ],
  },
  {
    path: '/diseases',
    name: 'Jenis Penyakit',
    component: LayoutAccess,
    meta: {
      show: true,
    },
    children: [
      {
        path: '',
        name: 'Jenis Penyakit',
        component: () => import('../views/Diseases.vue'),
      },
    ],
  },
  {
    path: '/symptoms',
    name: 'Gejala',
    component: LayoutAccess,
    meta: {
      show: true,
    },
    children: [
      {
        path: '',
        name: 'Gejala',
        component: () => import('../views/Symptoms.vue'),
      },
    ],
  },
  {
    path: '/diagnosis',
    name: 'Diagnosa',
    component: LayoutAccess,
    meta: {
      show: true,
    },
    children: [
      {
        path: '',
        name: 'Diagnosa',
        component: () => import('../views/Diagnosis.vue'),
      },
    ],
  },
  {
    path: '/report',
    name: 'Laporan',
    component: LayoutAccess,
    meta: {
      show: true,
    },
    children: [
      {
        path: '',
        name: 'Laporan',
        component: () => import('../views/Report.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
