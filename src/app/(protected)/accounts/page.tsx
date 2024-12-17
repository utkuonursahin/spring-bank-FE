"use client"

import { useState } from "react"
import { useQuery } from '@tanstack/react-query';
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight, Wallet, PiggyBank, Clock } from "lucide-react"
import { AccountDto } from "@/dto/AccountDto"
import { TransactionDto } from "@/dto/TransactionDto"
import { TransactionType } from "@/enum/TransactionType"

// Define account types
type AccountType = 'CURRENT' | 'SAVINGS' | 'FIXED_DEPOSIT'

// Fetch account data from the API
const fetchAccounts = async (accountType: AccountType) => {
  const response = await axios.get(`http://localhost:8080/api/v1/account/me/${accountType}`, {
    withCredentials: true
  })
  return response.data as AccountDto
}

// Add the fetch transactions function
const fetchTransactions = async (accountId: string) => {
  const response = await axios(
    `http://localhost:8080/api/v1/transaction/me/account?accountId=${accountId}&page=0&size=10`,
    { withCredentials: true }
  )
  return response.data
}

// Update the accountIcons definition to use a component
const AccountIcon = ({ type, className }: { type: AccountType; className?: string }) => {
  const icons = {
    CURRENT: <Wallet className={className} />,
    SAVINGS: <PiggyBank className={className} />,
    FIXED_DEPOSIT: <Clock className={className} />,
  }
  return icons[type]
}

export default function AccountsPage() {
  const [activeTab, setActiveTab] = useState<AccountType>('CURRENT')

  const { data: accountData, isLoading: isLoadingAccounts, isError: isErrorAccounts } = useQuery({
    queryKey: ['account', activeTab],
    queryFn: () => fetchAccounts(activeTab)
  })

  // Add transactions query
  const { data: transactionsPage } = useQuery({
    queryKey: ['transactionsPage', accountData?.id],
    queryFn: () => fetchTransactions(accountData?.id!),
    enabled: !!accountData?.id // Only fetch when we have an account ID
  })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Accounts</h1>

      <Tabs defaultValue="CURRENT" onValueChange={(value) => setActiveTab(value as AccountType)}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="CURRENT">Current Account</TabsTrigger>
          <TabsTrigger value="SAVINGS">Savings Account</TabsTrigger>
          <TabsTrigger value="FIXED_DEPOSIT">Fixed Deposit</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {!isLoadingAccounts && !isErrorAccounts && <div className="grid gap-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AccountIcon type={activeTab} className="h-5 w-5" />
                    <CardTitle>Account Summary</CardTitle>
                  </div>
                  <span className="text-2xl font-bold">
                    ${accountData?.cash?.toLocaleString('en-US', { minimumFractionDigits: 2 }) ?? '0.00'}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Account Type</span>
                  <span className="capitalize">{accountData?.accountType}</span>
                </div>
              </CardContent>
            </Card>
          </div>}

          {isLoadingAccounts && <div>Loading accounts...</div>}
          {isErrorAccounts && <div>Error fetching accounts</div>}
        </TabsContent>
      </Tabs>

      {/* Add transactions list */}
      {transactionsPage && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {transactionsPage.transactions?.map((transaction: TransactionDto) => (
                  <div key={transaction.id} className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        {transaction.type === TransactionType.DEPOSIT && 'Deposit'}
                        {transaction.type === TransactionType.WITHDRAW && 'Withdrawal'}
                        {transaction.type === TransactionType.TRANSFER && (
                          <>
                            {transaction.sender.id === accountData?.id ? 'Sent to ' : 'Received from '}
                            {transaction.sender.id === accountData?.id 
                              ? transaction.receiver?.owner?.id 
                              : transaction.sender?.owner?.id}
                          </>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Transaction ID: {transaction.id}
                      </p>
                    </div>
                    <span className={`font-medium ${
                      transaction.type === TransactionType.WITHDRAW || 
                      (transaction.type === TransactionType.TRANSFER && transaction.sender.id === accountData?.id)
                        ? 'text-red-600' 
                        : 'text-green-600'
                    }`}>
                      {transaction.type === TransactionType.WITHDRAW || 
                      (transaction.type === TransactionType.TRANSFER && transaction.sender.id === accountData?.id)
                        ? '-' 
                        : '+'}
                      ${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}