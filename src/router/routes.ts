import AccountsPage from '@/pages/account/AccountsPage.vue'
import CreateAccountPage from '@/pages/account/CreateAccountPage.vue'
import AnalysisPage from '@/pages/AnalysisPage.vue'
import AssetsPage from '@/pages/asset/AssetsPage.vue'
import LoginPage from '@/pages/auth/LoginPage.vue'
import RegisterPage from '@/pages/auth/RegisterPage.vue'
import BudgetsPage from '@/pages/budget/BudgetsPage.vue'
import InvestmentsPage from '@/pages/investment/InvestmentsPage.vue'
import LoansPage from '@/pages/loan/LoansPage.vue'
import OverviewPage from '@/pages/OverviewPage.vue'
import PaymentsPage from '@/pages/payment/PaymentsPage.vue'
import SavingGoalsPage from '@/pages/saving_goal/SavingGoalsPage.vue'
import CreateTransactionPage from '@/pages/transaction/CreateTransactionPage.vue'
import TransactionsPage from '@/pages/transaction/TransactionsPage.vue'
import {
  ArrowLeftRightIcon,
  ChartLineIcon,
  CoinsIcon,
  CreditCardIcon,
  FileSpreadsheetIcon,
  HouseIcon,
  LandmarkIcon,
  LayoutDashboardIcon,
  PercentIcon,
  WalletIcon,
} from 'lucide-vue-next'
import type { FunctionalComponent } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export const routes: (RouteRecordRaw &
  (
    | {
        icon: FunctionalComponent
        hidden?: false
      }
    | { hidden: true }
  ))[] = [
  {
    hidden: true,
    name: 'home',
    path: '/',
    redirect: '/overview',
  },
  {
    hidden: true,
    name: 'login',
    path: '/login',
    component: LoginPage,
    meta: {
      allowUnauthorized: true,
    },
  },
  {
    hidden: true,
    name: 'register',
    path: '/register',
    component: RegisterPage,
    meta: {
      allowUnauthorized: true,
    },
  },
  {
    name: 'overview',
    icon: LayoutDashboardIcon,
    path: '/overview',
    component: OverviewPage,
  },
  {
    name: 'analysis',
    icon: ChartLineIcon,
    path: '/analysis',
    component: AnalysisPage,
  },
  {
    name: 'accounts',
    icon: WalletIcon,
    path: '/account',
    component: AccountsPage,
  },
  {
    hidden: true,
    name: 'create_account',
    path: '/account/create',
    component: CreateAccountPage,
  },
  {
    name: 'transactions',
    icon: ArrowLeftRightIcon,
    path: '/transaction',
    component: TransactionsPage,
  },
  {
    hidden: true,
    name: 'create_transaction',
    path: '/transaction/create',
    component: CreateTransactionPage,
  },
  {
    name: 'payments',
    icon: CreditCardIcon,
    path: '/payment',
    component: PaymentsPage,
  },
  {
    name: 'budgets',
    icon: FileSpreadsheetIcon,
    path: '/budget',
    component: BudgetsPage,
  },
  {
    name: 'saving_goals',
    icon: CoinsIcon,
    path: '/saving-goal',
    component: SavingGoalsPage,
  },
  {
    name: 'loans',
    icon: LandmarkIcon,
    path: '/loan',
    component: LoansPage,
  },
  {
    name: 'assets',
    icon: HouseIcon,
    path: '/asset',
    component: AssetsPage,
  },
  {
    name: 'investments',
    icon: PercentIcon,
    path: '/investment',
    component: InvestmentsPage,
  },
]
