import AccountsPage from '@/pages/account/AccountsPage.vue'
import AnalysisPage from '@/pages/AnalysisPage.vue'
import AssetsPage from '@/pages/asset/AssetsPage.vue'
import BudgetsPage from '@/pages/budget/BudgetsPage.vue'
import InvestmentsPage from '@/pages/investment/InvestmentsPage.vue'
import LoansPage from '@/pages/loan/LoansPage.vue'
import OverviewPage from '@/pages/OverviewPage.vue'
import PaymentsPage from '@/pages/payment/PaymentsPage.vue'
import SavingGoalsPage from '@/pages/saving_goal/SavingGoalsPage.vue'
import TransactionsPage from '@/pages/transaction/TransactionsPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/overview',
    },
    {
      path: '/overview',
      component: OverviewPage,
    },
    {
      path: '/analysis',
      component: AnalysisPage,
    },
    {
      path: '/account',
      component: AccountsPage,
    },
    {
      path: '/transaction',
      component: TransactionsPage,
    },
    {
      path: '/payment',
      component: PaymentsPage,
    },
    {
      path: '/budget',
      component: BudgetsPage,
    },
    {
      path: '/saving-goal',
      component: SavingGoalsPage,
    },
    {
      path: '/loan',
      component: LoansPage,
    },
    {
      path: '/asset',
      component: AssetsPage,
    },
    {
      path: '/investment',
      component: InvestmentsPage,
    },
  ],
})

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - Nokroner` : 'Nokroner'
  next()
})

export default router
