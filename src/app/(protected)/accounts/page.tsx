"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight, Wallet, PiggyBank, Clock } from "lucide-react"

// Define account types
type AccountType = 'current' | 'savings' | 'fixed'

interface AccountBalance {
  total: number
  monthlyChange: number
  monthlyPercentage: number
}

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  type: 'credit' | 'debit'
}

// Mock data for different accounts
const accountData: Record<AccountType, {
  balance: AccountBalance
  recentTransactions: Transaction[]
}> = {
  current: {
    balance: {
      total: 5420.50,
      monthlyChange: 850.20,
      monthlyPercentage: 18.6,
    },
    recentTransactions: [
      {
        id: "1",
        date: "2024-03-15",
        description: "Salary Deposit",
        amount: 3000.00,
        type: "credit"
      },
      {
        id: "2",
        date: "2024-03-14",
        description: "Grocery Shopping",
        amount: 150.75,
        type: "debit"
      },
    ]
  },
  savings: {
    balance: {
      total: 15780.25,
      monthlyChange: 1200.00,
      monthlyPercentage: 8.2,
    },
    recentTransactions: [
      {
        id: "1",
        date: "2024-03-15",
        description: "Interest Credit",
        amount: 45.50,
        type: "credit"
      },
      {
        id: "2",
        date: "2024-03-10",
        description: "Savings Deposit",
        amount: 1000.00,
        type: "credit"
      },
    ]
  },
  fixed: {
    balance: {
      total: 25000.00,
      monthlyChange: 125.00,
      monthlyPercentage: 0.5,
    },
    recentTransactions: [
      {
        id: "1",
        date: "2024-03-15",
        description: "Interest Credit",
        amount: 125.00,
        type: "credit"
      },
    ]
  }
}

// Update the accountIcons definition to use a component
const AccountIcon = ({ type, className }: { type: AccountType; className?: string }) => {
  const icons = {
    current: <Wallet className={className} />,
    savings: <PiggyBank className={className} />,
    fixed: <Clock className={className} />,
  }
  return icons[type]
}

export default function AccountsPage() {
  const [activeTab, setActiveTab] = useState<AccountType>('current')

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Accounts</h1>

      <Tabs defaultValue="current" onValueChange={(value) => setActiveTab(value as AccountType)}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="current">Current Account</TabsTrigger>
          <TabsTrigger value="savings">Savings Account</TabsTrigger>
          <TabsTrigger value="fixed">Fixed Deposit</TabsTrigger>
        </TabsList>

        {Object.entries(accountData).map(([accountType, data]) => (
          <TabsContent key={accountType} value={accountType}>
            <div className="grid gap-4">
              {/* Account Summary Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AccountIcon type={accountType as AccountType} className="h-5 w-5" />
                      <CardTitle>Account Summary</CardTitle>
                    </div>
                    <span className="text-2xl font-bold">
                      ${data.balance.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Monthly Change</span>
                    <div className="flex items-center gap-2">
                      {data.balance.monthlyChange >= 0 ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                      )}
                      <span className={data.balance.monthlyChange >= 0 ? "text-green-600" : "text-red-600"}>
                        ${Math.abs(data.balance.monthlyChange).toLocaleString('en-US', { minimumFractionDigits: 2 })} 
                        ({data.balance.monthlyPercentage}%)
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Transactions Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                        <span className={`font-medium ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}
                          ${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}