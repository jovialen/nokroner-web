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

export const routes: (RouteRecordRaw & {
  name: string
  icon: FunctionalComponent
  hidden?: boolean
})[] = [
  {
    hidden: true,
    name: 'home',
    icon: LayoutDashboardIcon,
    path: '/',
    redirect: '/overview',
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
    name: 'transactions',
    icon: ArrowLeftRightIcon,
    path: '/transaction',
    component: TransactionsPage,
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
    name: 'saving goals',
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
